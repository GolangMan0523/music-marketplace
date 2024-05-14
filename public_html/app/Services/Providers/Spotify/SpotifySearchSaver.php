<?php namespace App\Services\Providers\Spotify;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Track;
use App\Services\Providers\SaveOrUpdate;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class SpotifySearchSaver
{
    use SaveOrUpdate;

    public function save(array $spotifyResults): array
    {
        $merged = $this->prepareData($spotifyResults);
        return $this->saveAndGetData($merged, $spotifyResults);
    }

    private function prepareData(array $spotifyResults): array
    {
        $spotifyResults['albums']['items'] = $spotifyResults['albums'][
            'items'
        ]->concat($spotifyResults['tracks']['items']->pluck('album'));

        // pull artists from albums array
        $spotifyResults['artists']['items'] = $spotifyResults['artists'][
            'items'
        ]->concat(
            $spotifyResults['albums']['items']->pluck('artists')->flatten(1),
        );

        // pull albums and artists from tracks array
        $spotifyResults['artists']['items'] = $spotifyResults['artists'][
            'items'
        ]->concat(
            $spotifyResults['tracks']['items']->pluck('artists')->flatten(1),
        );

        return $spotifyResults;
    }

    private function saveAndGetData(array $merged, array $original): array
    {
        $savedArtists = $this->saveAndGetArtists($merged['artists']['items']);
        $savedAlbums = $this->saveAndGetAlbums(
            $merged['albums']['items'],
            $savedArtists,
        );
        $savedTracks = $this->saveAndGetTracks(
            $merged['tracks']['items'],
            $savedAlbums,
            $savedArtists,
        );

        $originalArtists = $savedArtists
            ->filter(
                fn($savedArtist) => $original['artists']['items']->contains(
                    'spotify_id',
                    $savedArtist['spotify_id'],
                ),
            )
            ->values();

        $originalAlbums = $savedAlbums
            ->filter(
                fn($savedAlbum) => $original['albums']['items']->contains(
                    'spotify_id',
                    $savedAlbum['spotify_id'],
                ),
            )
            ->values();

        $originalTracks = $savedTracks
            ->filter(
                fn($savedTrack) => $original['tracks']['items']->contains(
                    'spotify_id',
                    $savedTrack['spotify_id'],
                ),
            )
            ->values();

        return [
            'albums' => [...$original['artists'], 'items' => $originalAlbums],
            'tracks' => [...$original['tracks'], 'items' => $originalTracks],
            'artists' => [...$original['artists'], 'items' => $originalArtists],
        ];
    }

    private function saveAndGetTracks(
        Collection $normalizedTracks,
        Collection $savedAlbums,
        Collection $savedArtists,
    ): Collection {
        $normalizedTracks = $normalizedTracks->map(function (
            $normalizedTrack,
        ) use ($savedAlbums) {
            $albumId = $savedAlbums
                ->where('spotify_id', $normalizedTrack['album']['spotify_id'])
                ->first()->id;
            $normalizedTrack['album_id'] = $albumId;
            return $normalizedTrack;
        });

        $this->saveOrUpdate($normalizedTracks, 'tracks');

        $savedTracks = Track::with('album', 'artists')
            ->whereIn('spotify_id', $normalizedTracks->pluck('spotify_id'))
            ->orderByPopularity('desc')
            ->get();

        $pivots = $normalizedTracks
            ->map(function ($normalizedTrack) use (
                $savedTracks,
                $savedArtists,
            ) {
                try {
                    $trackId = $savedTracks
                        ->where('spotify_id', $normalizedTrack['spotify_id'])
                        ->first()->id;
                } catch (Exception $e) {
                    Log::error('Search saver issue.', $normalizedTrack);
                    return null;
                }
                return $normalizedTrack['artists']->map(function (
                    $normalizedArtist,
                ) use ($trackId, $savedArtists) {
                    $artistId = $savedArtists
                        ->where('spotify_id', $normalizedArtist['spotify_id'])
                        ->first()->id;
                    return [
                        'track_id' => $trackId,
                        'artist_id' => $artistId,
                    ];
                });
            })
            ->flatten(1)
            ->filter();

        $this->saveOrUpdate($pivots, 'artist_track');
        $savedTracks->load('artists');
        return $savedTracks;
    }

    private function saveAndGetAlbums(
        Collection $normalizedAlbums,
        Collection $savedArtists,
    ): Collection {
        $normalizedAlbums = $normalizedAlbums->unique('spotify_id')->filter();
        $this->saveOrUpdate($normalizedAlbums, 'albums');

        $savedAlbums = Album::whereIn(
            'spotify_id',
            $normalizedAlbums->pluck('spotify_id'),
        )
            ->orderBy('spotify_popularity', 'desc')
            ->get();

        $pivots = $normalizedAlbums
            ->map(function ($normalizedAlbum) use (
                $savedAlbums,
                $savedArtists,
            ) {
                try {
                    $albumId = $savedAlbums
                        ->where('spotify_id', $normalizedAlbum['spotify_id'])
                        ->first()->id;
                } catch (Exception $e) {
                    Log::error('Search saver issue.', $normalizedAlbum);
                    return null;
                }
                return $normalizedAlbum['artists']->map(function (
                    $normalizedArtist,
                ) use ($albumId, $savedArtists) {
                    $artistId = $savedArtists
                        ->where('spotify_id', $normalizedArtist['spotify_id'])
                        ->first()->id;
                    return [
                        'album_id' => $albumId,
                        'artist_id' => $artistId,
                    ];
                });
            })
            ->flatten(1)
            ->filter();

        $this->saveOrUpdate($pivots, 'artist_album');
        $savedAlbums->load('artists');

        return $savedAlbums;
    }

    private function saveAndGetArtists(Collection $artists): Collection
    {
        $uniqueArtists = $artists->unique('spotify_id')->map(
            fn($artist) => [
                'name' => $artist['name'],
                'spotify_id' => $artist['spotify_id'],
                'spotify_popularity' =>
                    Arr::get($artist, 'spotify_popularity') ?: null,
                'spotify_followers' =>
                    Arr::get($artist, 'spotify_followers') ?: null,
                'image_small' => Arr::get($artist, 'image_small') ?: null,
            ],
        );

        $this->saveOrUpdate($uniqueArtists, 'artists');
        $loadedArtists = Artist::whereIn(
            'spotify_id',
            $uniqueArtists->pluck('spotify_id'),
        )->get();

        return $uniqueArtists->map(
            fn($uniqueArtist) => $loadedArtists
                ->where('spotify_id', $uniqueArtist['spotify_id'])
                ->first(),
        );
    }
}
