<?php namespace App\Services\Providers\Spotify;

use App\Models\Artist;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class SpotifyArtist
{
    public function __construct(
        protected SpotifyHttpClient $httpClient,
        protected SpotifyNormalizer $normalizer,
    ) {
    }

    public function getContent(Artist $artist, array $options = []): ?array
    {
        if ($artist->spotify_id) {
            $spotifyArtist = $this->httpClient->get(
                "artists/{$artist->spotify_id}",
            );
        }

        // if couldn't find artist, bail
        if (!isset($spotifyArtist['name'])) {
            return null;
        }

        $mainInfo = $this->normalizer->artist($spotifyArtist, true);

        // make sure name is the same as we got passed in as sometimes spaces
        // and other things might be in different places on our db and spotify
        if ($artist->name) {
            $mainInfo['name'] = $artist->name;
        }
        $response = [
            'mainInfo' => $mainInfo,
            'genres' => $spotifyArtist['genres'],
        ];

        if (Arr::get($options, 'importAlbums', true)) {
            $partialAlbums = $this->httpClient->get(
                "artists/{$artist->spotify_id}/albums?offset=0&limit=50&album_type=album,single",
            );
            $response['albums'] = $this->getFullAlbums($partialAlbums);
        }
        if (Arr::get($options, 'importSimilarArtists', true)) {
            $response['similar'] = $this->getSimilar($spotifyArtist['id']);
        }
        return $response;
    }

    public function getSimilar(string $spotifyId): Collection
    {
        $response = $this->httpClient->get(
            "artists/{$spotifyId}/related-artists",
        );

        return collect($response['artists'])->map(function ($artist) {
            return $this->normalizer->artist($artist);
        });
    }

    public function getFullAlbums(array $partialAlbums): Collection
    {
        $albums = collect();

        if (empty($partialAlbums['items'])) {
            return $albums;
        }

        // limit to 40 albums per artist max
        // can only fetch 20 albums per spotify request
        $ids = array_slice($this->makeAlbumsIdString($partialAlbums), 0, 2);
        if (!$ids) {
            return $albums;
        }

        // get full album objects from spotify
        foreach ($ids as $key => $idsString) {
            $response = $this->httpClient->get("albums?ids=$idsString");
            if (!isset($response['albums'])) {
                continue;
            }
            $albums = $albums->concat($response['albums']);
        }

        return $albums->map(function ($spotifyAlbum) {
            return $this->normalizer->album($spotifyAlbum);
        });
    }

    /**
     * Concat ids strings for all albums we want to fetch from spotify.
     */
    private function makeAlbumsIdString(array $response): array
    {
        $filtered = [];
        $ids = '';

        // filter out deluxe albums and same albums that were released in different markets
        if (isset($response['items']) && count($response['items'])) {
            foreach ($response['items'] as $album) {
                $name = str_replace(' ', '', strtolower($album['name']));

                if (Str::contains($name, '(clean')) {
                    continue;
                }

                if (
                    isset($filtered[$name]) &&
                    count($filtered[$name]['available_markets']) >=
                        count($album['available_markets'])
                ) {
                    continue;
                }

                $filtered[$name] = $album;
            }

            // make multidimensional array of 20 spotify album ids as that is the max for albums query
            $chunked = array_chunk(
                array_map(fn($a) => $a['id'], $filtered),
                20,
            );

            $ids = array_map(fn($a) => implode(',', $a), $chunked);
        }

        return $ids;
    }
}
