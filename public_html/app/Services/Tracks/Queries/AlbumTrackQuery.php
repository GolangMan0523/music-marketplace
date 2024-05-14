<?php

namespace App\Services\Tracks\Queries;

use App\Models\Album;
use App\Services\Albums\LoadAlbum;
use Illuminate\Database\Eloquent\Builder;

class AlbumTrackQuery extends BaseTrackQuery
{
    const ORDER_COL = 'number';
    const ORDER_DIR = 'asc';

    public function get(int $albumId): Builder
    {
        // fetch album tracks from spotify, if not fetched already
        (new LoadAlbum())->execute(Album::find($albumId), 'trackQuery');

        return $this->baseQuery()->where('tracks.album_id', $albumId);
    }
}
