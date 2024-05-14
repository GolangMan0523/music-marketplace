<?php

namespace App\Services\Albums;

use App\Models\Album;
use App\Models\Track;
use App\Services\Tracks\DeleteTracks;
use Common\Files\Actions\Deletion\DeleteEntries;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DeleteAlbums
{
    public function execute(array|Collection $albumIds): void
    {
        $albums = Album::query()
            ->whereIn('id', $albumIds)
            ->get();

        // delete images
        app(DeleteEntries::class)->execute([
            'paths' => $albums
                ->pluck('image')
                ->filter()
                ->toArray(),
        ]);

        // detach likeables
        DB::table('likes')
            ->whereIn('likeable_id', $albumIds)
            ->where('likeable_type', Album::MODEL_TYPE)
            ->delete();

        // detach genres
        DB::table('genreables')
            ->whereIn('genreable_id', $albumIds)
            ->where('genreable_type', Album::MODEL_TYPE)
            ->delete();

        // detach tags
        DB::table('taggables')
            ->whereIn('taggable_id', $albumIds)
            ->where('taggable_type', Album::MODEL_TYPE)
            ->delete();

        // detach reposts
        DB::table('reposts')
            ->whereIn('repostable_id', $albumIds)
            ->where('repostable_type', Album::MODEL_TYPE)
            ->delete();

        // detach artists
        DB::table('artist_album')
            ->whereIn('album_id', $albumIds)
            ->delete();

        // delete albums
        app(Album::class)->destroy($albums->pluck('id'));

        // delete tracks
        $trackIds = Track::query()
            ->whereIn('album_id', $albumIds)
            ->pluck('id');
        app(DeleteTracks::class)->execute($trackIds->toArray());
    }
}
