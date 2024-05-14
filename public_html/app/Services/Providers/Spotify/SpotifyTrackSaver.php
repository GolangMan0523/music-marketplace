<?php

namespace App\Services\Providers\Spotify;

use App\Models\Artist;
use App\Models\Track;
use App\Services\Providers\SaveOrUpdate;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class SpotifyTrackSaver
{
    use SaveOrUpdate;

    public function save(Collection $spotifyAlbums, Collection $savedAlbums)
    {
        // set memory to unlimited
        ini_set('memory_limit', '-1');

        $spotifyTracks = $spotifyAlbums
            ->map(function ($spotifyAlbum) use ($savedAlbums) {
                $albumId = $savedAlbums
                    ->where('spotify_id', $spotifyAlbum['spotify_id'])
                    ->first()->id;
                return $spotifyAlbum['tracks']->map(function ($albumTrack) use (
                    $albumId,
                ) {
                    $albumTrack['album_id'] = $albumId;
                    $albumTrack['updated_at'] = Carbon::now();
                    $albumTrack['created_at'] = Carbon::now();
                    return $albumTrack;
                });
            })
            ->flatten(1);

        $this->saveOrUpdate($spotifyTracks, 'tracks');

        // attach artists to tracks
        $artists = collect($spotifyTracks)
            ->pluck('artists')
            ->flatten(1)
            ->unique('spotify_id');

        $this->saveOrUpdate($artists, 'artists');
        $savedArtists = app(Artist::class)
            ->whereIn('spotify_id', $artists->pluck('spotify_id'))
            ->get(['spotify_id', 'id', 'name'])
            ->keyBy('spotify_id');
        $savedTracks = app(Track::class)
            ->whereIn('spotify_id', $spotifyTracks->pluck('spotify_id'))
            ->with(['album' => fn($query) => $query->select(['id', 'name'])])
            ->get(['name', 'album_id', 'spotify_id', 'id'])
            ->keyBy('spotify_id');

        $pivots = collect($spotifyTracks)
            ->map(function ($normalizedTrack) use (
                $savedArtists,
                $savedTracks,
                $spotifyTracks,
            ) {
                return $normalizedTrack['artists']->map(function (
                    $normalizedArtist,
                ) use (
                    $normalizedTrack,
                    $savedArtists,
                    $savedTracks,
                    $spotifyTracks,
                ) {
                    $savedTrack = $savedTracks[$normalizedTrack['spotify_id']];
                    $savedArtist =
                        $savedArtists[$normalizedArtist['spotify_id']];
                    if (!$savedTrack) {
                        $savedTrack = $savedTracks->first(function (
                            Track $track,
                        ) use ($normalizedTrack) {
                            return $track->name === $normalizedTrack['name'] &&
                                $track->album->name ===
                                    $normalizedTrack['album']['name'];
                        });
                    }
                    if (!$savedArtist) {
                        $savedArtist = $savedArtists->first(function (
                            Artist $artist,
                        ) use ($normalizedArtist) {
                            return $artist->name === $normalizedArtist['name'];
                        });
                    }
                    return [
                        'track_id' => $savedTrack->id,
                        'artist_id' => $savedArtist->id,
                    ];
                });
            })
            ->flatten(1);

        $this->saveOrUpdate($pivots, 'artist_track');
    }
}
