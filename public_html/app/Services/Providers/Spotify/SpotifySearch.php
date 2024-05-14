<?php namespace App\Services\Providers\Spotify;

use App\Services\Providers\Local\LocalSearch;
use App\Services\Search\SearchInterface;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Contracts\Pagination\Paginator as PaginatorContract;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class SpotifySearch extends LocalSearch implements SearchInterface
{
    protected array $formattedResults;

    public function __construct(
        protected SpotifyHttpClient $httpClient,
        protected SpotifyNormalizer $normalizer,
    ) {
    }

    public function search(
        string $q,
        int $page,
        int $perPage,
        array $modelTypes,
    ): Collection {
        $this->query = urldecode($q);
        $this->perPage = $perPage ?: 10;
        $this->page = $page;

        $spotifyTypes = collect($modelTypes)->filter(
            fn($type) => in_array($type, ['artist', 'album', 'track']),
        );

        // if searching only local model types, there's no need to call spotify API
        if ($spotifyTypes->isNotEmpty()) {
            try {
                $typeString = $spotifyTypes->implode(',');
                $offset = ($page - 1) * $perPage;
                $response = $this->httpClient->get(
                    "search?q=$q&type=$typeString&limit=$perPage&offset=$offset",
                );
                $this->formattedResults = $this->formatResponse($response);
                $this->formattedResults = (new SpotifySearchSaver())->save(
                    $this->formattedResults,
                );
            } catch (RequestException $e) {
                if ($e->getResponse()) {
                    Log::error(
                        $e
                            ->getResponse()
                            ->getBody()
                            ->getContents(),
                        ['query' => $q],
                    );
                }
            }
        }

        return parent::search($q, $page, $perPage, $modelTypes);
    }

    private function formatResponse(array $response): array
    {
        $artists = [
            'items' => collect(Arr::get($response, 'artists.items', []))->map(
                fn($spotifyArtist) => $this->normalizer->artist($spotifyArtist),
            ),
            'total' => $response['artists']['total'] ?? 0,
            'offset' => $response['artists']['offset'] ?? 0,
        ];
        $albums = [
            'items' => collect(Arr::get($response, 'albums.items', []))->map(
                fn($spotifyAlbum) => $this->normalizer->album($spotifyAlbum),
            ),
            'total' => $response['albums']['total'] ?? 0,
            'offset' => $response['albums']['offset'] ?? 0,
        ];
        $tracks = [
            'items' => collect(Arr::get($response, 'tracks.items', []))->map(
                fn($spotifyTrack) => $this->normalizer->track($spotifyTrack),
            ),
            'total' => $response['tracks']['total'] ?? 0,
            'offset' => $response['tracks']['offset'] ?? 0,
        ];
        return [
            'albums' => $albums,
            'tracks' => $tracks,
            'artists' => $artists,
        ];
    }

    public function artists(): PaginatorContract
    {
        if (isset($this->formattedResults['artists']['items'])) {
            return $this->paginator($this->formattedResults['artists']);
        }

        return parent::artists();
    }

    public function albums(): PaginatorContract
    {
        if (isset($this->formattedResults['albums']['items'])) {
            return $this->paginator($this->formattedResults['albums']);
        }

        return parent::albums();
    }

    public function tracks(): PaginatorContract
    {
        if (isset($this->formattedResults['tracks']['items'])) {
            return $this->paginator($this->formattedResults['tracks']);
        }

        return parent::tracks();
    }

    protected function paginator(array $data): PaginatorContract
    {
        return new Paginator(
            items: $data['items'],
            perPage: $this->perPage,
            currentPage: $this->page,
        );
    }
}
