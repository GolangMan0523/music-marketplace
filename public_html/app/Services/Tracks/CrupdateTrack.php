<?php

namespace App\Services\Tracks;

use App\Models\Album;
use App\Models\Genre;
use App\Models\Track;
use App\Notifications\ArtistUploadedMedia;
use App\Services\Providers\SaveOrUpdate;
use Arr;
use Auth;
use Common\Tags\Tag;
use DB;
use Exception;
use Illuminate\Support\Collection;
use Notification;

class CrupdateTrack
{
    use SaveOrUpdate;

    public function __construct(
        protected Track $track,
        protected Tag $tag,
        protected Genre $genre,
    ) {
    }

    public function execute(
        array $data,
        Track $initialTrack = null,
        Album|array $album = null,
        bool $loadRelations = true,
    ): Track {
        $track = $initialTrack ?: $this->track->newInstance();

        $inlineData = Arr::except($data, [
            'artists',
            'tags',
            'genres',
            'album',
            'waveData',
            'lyrics',
        ]);
        $inlineData['spotify_id'] =
            $inlineData['spotify_id'] ?? Arr::get($initialTrack, 'spotify_id');

        if (!$initialTrack) {
            $inlineData['owner_id'] = Auth::id();
        }

        if ($album) {
            $inlineData['album_id'] = $album['id'];
        }

        $track->fill($inlineData)->save();

        $newArtists = collect($this->getArtistIds($data, $album) ?: []);
        $newArtists = $newArtists->map(function ($artistId) {
            if ($artistId === 'CURRENT_USER') {
                return Auth::user()->getOrCreateArtist()->id;
            } else {
                return $artistId;
            }
        });

        // make sure we're only attaching new artists to avoid too many db queries
        if ($track->relationLoaded('artists')) {
            $newArtists = $newArtists->filter(function ($newArtistId) use (
                $track,
            ) {
                return !$track
                    ->artists()
                    ->where('artists.id', $newArtistId)
                    ->first();
            });
        }

        if ($newArtists->isNotEmpty()) {
            $pivots = $newArtists->map(function ($artistId, $index) use (
                $track,
            ) {
                return [
                    'artist_id' => $artistId,
                    'track_id' => $track['id'],
                    'primary' => $index === 0,
                ];
            });

            DB::table('artist_track')
                ->where('track_id', $track->id)
                ->delete();
            DB::table('artist_track')->insert($pivots->toArray());
        }

        $tags = Arr::get($data, 'tags', []);
        $tagIds = $this->tag->insertOrRetrieve($tags)->pluck('id');
        $track->tags()->sync($tagIds);

        $genres = Arr::get($data, 'genres', []);
        $genreIds = $this->genre->insertOrRetrieve($genres)->pluck('id');
        $track->genres()->sync($genreIds);

        if ($loadRelations) {
            $track->load('artists', 'tags', 'genres');
        }

        if (!$initialTrack && !$album) {
            $track->artists
                ->first()
                ->followers()
                ->chunkById(1000, function ($followers) use ($track) {
                    try {
                        Notification::send(
                            $followers,
                            new ArtistUploadedMedia($track),
                        );
                    } catch (Exception $e) {
                        //
                    }
                });
        }

        if ($waveData = Arr::get($data, 'waveData')) {
            $this->track
                ->getWaveStorageDisk()
                ->put("waves/{$track->id}.json", json_encode($waveData));
        }

        if ($lyrics = Arr::get($data, 'lyrics')) {
            $track->lyric()->create(['text' => $lyrics]);
        }

        return $track;
    }

    private function getArtistIds(array|Collection $trackData, array|Album $album = null): array|Collection|null
    {
        if ($trackArtists = Arr::get($trackData, 'artists')) {
            return $trackArtists;
        } elseif (isset($album['artists'])) {
            return $album['artists'];
        }

        return null;
    }
}
