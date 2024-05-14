<?php

namespace App\Services\Albums;

use App\Models\Album;
use App\Models\Genre;
use App\Models\Tag;
use App\Models\Track;
use App\Notifications\ArtistUploadedMedia;
use App\Services\Tracks\CrupdateTrack;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class CrupdateAlbum
{
    public function __construct(protected CrupdateTrack $crupdateTrack)
    {
    }

    public function execute(array $data, Album $initialAlbum = null): Album
    {
        $album = $initialAlbum ?? app(Album::class)->newInstance();

        $inlineData = Arr::except($data, ['tracks', 'tags', 'genres']);
        $inlineData['spotify_id'] =
            $inlineData['spotify_id'] ?? Arr::get($initialAlbum, 'spotify_id');

        if (!$initialAlbum) {
            $inlineData['owner_id'] = Auth::id();
        }

        $album->fill($inlineData)->save();

        $newArtists = collect(Arr::get($data, 'artists', []));
        $newArtists = $newArtists->map(function ($artistId) {
            if ($artistId === 'CURRENT_USER') {
                return Auth::user()->getOrCreateArtist()->id;
            } else {
                return $artistId;
            }
        });

        // make sure we're only attaching new artists to avoid too many db queries
        if ($album->relationLoaded('artists')) {
            $newArtists = $newArtists->filter(function ($newArtistId) use (
                $album,
            ) {
                return !$album
                    ->artists()
                    ->where('artists.id', $newArtistId)
                    ->first();
            });
        }

        if ($newArtists->isNotEmpty()) {
            $pivots = $newArtists->map(function ($artistId, $index) use (
                $album,
            ) {
                return [
                    'artist_id' => $artistId,
                    'album_id' => $album['id'],
                    'primary' => $index === 0,
                ];
            });

            DB::table('artist_album')
                ->where('album_id', $album->id)
                ->delete();
            DB::table('artist_album')->insert($pivots->toArray());
        }

        $tags = Arr::get($data, 'tags', []);
        $tagIds = app(Tag::class)
            ->insertOrRetrieve($tags)
            ->pluck('id');
        $album->tags()->sync($tagIds);

        $genres = Arr::get($data, 'genres', []);
        $genreIds = app(Genre::class)
            ->insertOrRetrieve($genres)
            ->pluck('id');
        $album->genres()->sync($genreIds);

        $this->saveTracks($data, $album);

        $album->load('tracks', 'artists', 'genres', 'tags');
        $album->tracks->load('artists');

        if (!$initialAlbum) {
            $album->artists
                ->first()
                ->followers()
                ->chunkById(1000, function ($followers) use ($album) {
                    try {
                        Notification::send(
                            $followers,
                            new ArtistUploadedMedia($album),
                        );
                    } catch (Exception $e) {
                        //
                    }
                });
        }

        return $album;
    }

    private function saveTracks($albumData, Album $album): void
    {
        if (!Arr::get($albumData, 'tracks')) {
            return;
        }
        $tracks = collect(Arr::get($albumData, 'tracks', []));

        $trackIds = $tracks->pluck('id')->filter();
        $savedTracks = $album
            ->tracks()
            ->with('artists')
            ->get();
        $tracksToDetach = $savedTracks
            ->pluck('id')
            ->filter(fn($trackId) => !$trackIds->contains($trackId));
        if ($tracksToDetach->isNotEmpty()) {
            Track::whereIn('id', $tracksToDetach)->update(['album_id' => null]);
        }

        $tracks->each(function ($trackData, $index) use ($album, $savedTracks) {
            $trackModel = Arr::get($trackData, 'id')
                ? $savedTracks->find($trackData['id'])
                : null;
            $this->crupdateTrack->execute(
                // reorder tracks based on the array order
                array_merge(Arr::except($trackData, 'album'), [
                    'number' => $index + 1,
                ]),
                $trackModel,
                $album,
                false,
            );
        });
    }
}
