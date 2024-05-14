<?php

namespace App\Services\Artists;

use App\Models\Artist;
use App\Services\Providers\Spotify\SpotifyArtist;

class SyncArtistWithSpotify
{
    public function execute(Artist $artist, ?array $options = []): Artist
    {
        $spotifyArtist = app(SpotifyArtist::class)->getContent(
            $artist,
            $options,
        );
        if ($spotifyArtist) {
            $artist = app(ArtistSaver::class)->save($spotifyArtist);
            $artist = app(ArtistBio::class)->get($artist);
            unset($artist['albums']);
        }
        return $artist;
    }
}
