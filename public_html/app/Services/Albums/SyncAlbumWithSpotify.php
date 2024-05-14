<?php

namespace App\Services\Albums;

use App\Models\Album;
use App\Models\Artist;
use App\Services\Providers\SaveOrUpdate;
use App\Services\Providers\Spotify\SpotifyAlbum;
use App\Services\Providers\Spotify\SpotifyTrackSaver;

class SyncAlbumWithSpotify
{
    use SaveOrUpdate;

    public function execute(Album $album): Album
    {
        $spotifyAlbum = app(SpotifyAlbum::class)->getContent($album);
        if (!$spotifyAlbum) {
            return $album;
        }

        // if album artists are not in database yet, fetch and save them
        $notSavedArtists = $spotifyAlbum['artists']->filter(function (
            $spotifyArtist,
        ) use ($album) {
            return !$album->artists
                ->where('spotify_id', $spotifyArtist['spotify_id'])
                ->first();
        });
        if (!empty($notSavedArtists)) {
            $this->saveOrUpdate($notSavedArtists, 'artists');
            $artistIds = Artist::whereIn(
                'spotify_id',
                $notSavedArtists->pluck('spotify_id'),
            )->pluck('id');
            $album->artists()->syncWithoutDetaching($artistIds);
        }

        $this->saveOrUpdate(collect([$spotifyAlbum]), 'albums');
        app(SpotifyTrackSaver::class)->save(
            collect([$spotifyAlbum]),
            collect([$album]),
        );

        return $album;
    }
}
