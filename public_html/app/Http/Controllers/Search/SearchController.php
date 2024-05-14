<?php namespace App\Http\Controllers\Search;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Playlist;
use App\Models\Track;
use App\Models\User;
use App\Services\Providers\ProviderResolver;
use Common\Core\BaseController;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class SearchController extends BaseController
{
    public function index()
    {
        $defaultModelTypes = [
            Artist::MODEL_TYPE,
            Album::MODEL_TYPE,
            Track::MODEL_TYPE,
            User::MODEL_TYPE,
            Playlist::MODEL_TYPE,
        ];
        $loader = request('loader', 'searchPage');
        $perPage = $loader === 'searchPage' ? 20 : 3;
        $query = request()->route('query') ?: request('query');
        $data = [
            'query' => e($query),
            'results' => [],
            'loader' => $loader,
        ];

        if (request('modelTypes')) {
            $modelTypes = explode(',', request('modelTypes'));
        } else {
            $modelTypes = $defaultModelTypes;
        }

        if ($query) {
            $modelTypes = array_filter($modelTypes, function ($modelType) {
                return Gate::inspect(
                    'index',
                    modelTypeToNamespace($modelType),
                )->allowed();
            });

            $data['results'] = (new ProviderResolver())
                ->get('search')
                ->search($query, request('page') ?? 1, $perPage, $modelTypes);
        }

        return $this->renderClientOrApi([
            'pageName' => $loader === 'searchPage' ? 'search-page' : null,
            'data' => $data,
        ]);
    }

    public function searchSingleModelType(string $modelType)
    {
        $this->authorize('index', modelTypeToNamespace($modelType));

        $data = (new ProviderResolver())
            ->get('search')
            ->search(request('query'), request('page'), request('perPage'), [
                $modelType,
            ]);

        return $this->success([
            'pagination' => $data[Str::plural($modelType)]->toArray(),
        ]);
    }

    public function searchAudio(
        int $trackId,
        string $artistName,
        string $trackName,
    ) {
        $this->authorize('index', Track::class);

        $results = (new ProviderResolver())
            ->get('audio_search')
            ->search($trackId, $artistName, $trackName, 1);

        return $this->success(['results' => $results]);
    }

    /**
     * Remove artists that were blocked by admin from search results.
     */
    private function filterOutBlockedArtists(array $results): array
    {
        if ($artists = settings('artists.blocked')) {
            $artists = json_decode($artists);

            if (isset($results['artists'])) {
                foreach ($results['artists'] as $k => $artist) {
                    if ($this->shouldBeBlocked($artist['name'], $artists)) {
                        unset($results['artists'][$k]);
                    }
                }
            }

            if (isset($results['albums'])) {
                foreach ($results['albums'] as $k => $album) {
                    if (isset($album['artists'])) {
                        if (
                            $this->shouldBeBlocked(
                                $album['artists'][0]['name'],
                                $artists,
                            )
                        ) {
                            unset($results['albums'][$k]);
                        }
                    }
                }
            }

            if (isset($results['tracks'])) {
                foreach ($results['tracks'] as $k => $track) {
                    if (isset($track['album']['artists'])) {
                        if (
                            $this->shouldBeBlocked(
                                $track['album']['artists'][0]['name'],
                                $artists,
                            )
                        ) {
                            unset($results['tracks'][$k]);
                        }
                    }
                }
            }
        }

        return $results;
    }

    /**
     * Check if given artist should be blocked.
     */
    private function shouldBeBlocked(string $name, array $toBlock): bool
    {
        foreach ($toBlock as $blockedName) {
            $pattern =
                '/' . str_replace('*', '.*?', strtolower($blockedName)) . '/i';
            if (preg_match($pattern, $name)) {
                return true;
            }
        }
    }
}
