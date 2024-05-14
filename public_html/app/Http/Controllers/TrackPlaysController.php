<?php namespace App\Http\Controllers;

use App\Models\Track;
use App\Services\Tracks\LogTrackPlay;
use App\Services\Tracks\Queries\HistoryTrackQuery;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Carbon;

class TrackPlaysController extends BaseController
{
    public function index($userId)
    {
        $orderBy = request()->get('orderBy');
        $orderDir = request()->get('orderDir');

        // prevent ambiguous column db error
        if ($orderBy === 'created_at') {
            $orderBy = 'track_plays.created_at';
        }

        $query = (new HistoryTrackQuery([
            'orderBy' => $orderBy,
            'orderDir' => $orderDir,
        ]))->get($userId);

        $params = request()->all();
        $params['perPage'] = request()->get('perPage', 30);
        $datasource = new Datasource($query, $params);
        $datasource->order = false;

        $pagination = $datasource->paginate();
        $pagination->transform(function (Track $track) {
            $track->added_at = $track->added_at
                ? new Carbon($track->added_at)
                : null;
            return $track;
        });

        return $this->success(['pagination' => $pagination]);
    }

    public function create(Track $track)
    {
        $this->authorize('show', $track);

        app(LogTrackPlay::class)->execute($track, request()->get('queueId'));

        return $this->success();
    }
}
