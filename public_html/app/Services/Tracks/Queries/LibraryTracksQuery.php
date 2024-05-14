<?php

namespace App\Services\Tracks\Queries;

use App\Models\Track;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class LibraryTracksQuery extends BaseTrackQuery
{
    const ORDER_COL = 'added_at';

    public function get(int $userId): Builder
    {
        return $this->baseQuery()
            ->join('likes', 'tracks.id', '=', 'likes.likeable_id')
            ->where('likes.user_id', $userId)
            ->where('likes.likeable_type', Track::MODEL_TYPE)
            ->select('tracks.*', 'likes.created_at as added_at');
    }

    public function getOrder(): array
    {
        $orderBy = Arr::get($this->params, 'orderBy');
        $orderDir = Arr::get($this->params, 'orderDir');

        // library tracks page loading will error without this, column is called 'added_at' on the track model
        if ($orderBy === 'likes.created_at') {
            $orderBy = 'added_at';
        }

        return [
            'col' => $orderBy ?: static::ORDER_COL,
            'dir' => $orderDir ?: static::ORDER_DIR,
        ];
    }
}
