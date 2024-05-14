<?php

namespace App\Services\Tracks\Queries;

use Illuminate\Database\Eloquent\Builder;

class HistoryTrackQuery extends BaseTrackQuery
{
    const ORDER_COL = 'track_plays.created_at';

    public function get(int $userId): Builder
    {
        return $this->baseQuery()
            // select latest row from track_plays using windowing function
            ->join(
                'track_plays',
                'tracks.id',
                '=',
                'track_plays.track_id',
            )
            ->groupBy('tracks.id')
            ->where('track_plays.user_id', $userId)
            ->select('tracks.*', 'track_plays.created_at as added_at');
    }
}
