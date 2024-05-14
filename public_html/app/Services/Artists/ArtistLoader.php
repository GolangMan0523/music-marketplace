<?php

namespace App\Services\Artists;

use App\Models\Artist;
use Illuminate\Support\Arr;

class ArtistLoader
{
    public static array $artistPageTabs = [
        'discography' => 1,
        'similar' => 2,
        'about' => 3,
        'tracks' => 4,
        'albums ' => 5,
        'followers' => 6,
    ];

    public function execute(Artist $artist, string $loader): array
    {
        $response = [
            'artist' => $artist,
            'loader' => $loader,
            'selectedAlbumLayout' => Arr::get(
                $_COOKIE,
                'artistPage-albumLayout',
                settings('player.default_artist_view', 'list'),
            ),
        ];

        $tabIds = collect(settings('artistPage.tabs'))
            ->filter(fn($tab) => $tab['active'])
            ->map(fn($tab) => $tab['id']);

        if ($loader === 'artistPage') {
            if ($artist->needsUpdating()) {
                $newArtist = (new SyncArtistWithSpotify())->execute($artist);
                $response['artist'] = $newArtist ?? $artist;
            }
            $response = $this->loadSimilar($response);
            $response = $this->loadProfile($response);
            $response['artist']->load(['genres']);
            $response['artist']->loadCount(['likes']);
            if ($tabIds->contains(static::$artistPageTabs['tracks'])) {
                $response['tracks'] = (new PaginateArtistTracks())->execute(
                    $artist,
                );
            }
            if ($tabIds->contains(static::$artistPageTabs['discography'])) {
                $response = $this->loadArtistPageAlbums($response);
                $response['artist']->load(['topTracks']);
            }
        } elseif ($loader === 'editArtistPage') {
            $artist->setHidden([]);
            $response = $this->loadEditPageAlbums($response);
            $response = $this->loadProfile($response);
            $response['artist']->load(['genres']);
        }

        return $response;
    }

    protected function loadProfile(array $response): array
    {
        $response['artist']->load(['profile', 'profileImages', 'links']);
        return $response;
    }

    protected function loadArtistPageAlbums(array $response): array
    {
        $layout = $response['selectedAlbumLayout'];
        $response['albums'] = (new PaginateArtistAlbums())->execute(
            $response['artist'],
            [
                'paginate' => 'simple',
                'loadAlbumTracks' => $layout === 'list',
                'albumsPerPage' => $layout === 'list' ? 5 : 25,
            ],
        );
        return $response;
    }

    protected function loadEditPageAlbums(array $response): array
    {
        $response['albums'] = (new PaginateArtistAlbums())->execute(
            $response['artist'],
            ['albumsPerPage' => 50, 'paginate' => 'simple'],
        );
        $response['albums']->loadCount('tracks');
        $response['albums']->transform(fn($album) => $album->setHIdden([]));
        return $response;
    }

    protected function loadSimilar(array $response): array
    {
        if (settings('artist_provider') !== 'spotify') {
            $similar = (new GetSimilarArtists())->execute($response['artist']);
            $response['artist']->setRelation('similar', $similar);
        } else {
            $response['artist']->load('similar');
        }
        return $response;
    }
}
