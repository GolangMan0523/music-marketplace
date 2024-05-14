<?php namespace App\Services\Playlists;

use App\Services\Tracks\Queries\PlaylistTrackQuery;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;

class PlaylistTracksPaginator
{
    public function paginate(int $playlistId): AbstractPaginator
    {
        $builder = (new PlaylistTrackQuery([
            'orderBy' => request()->get('orderBy', 'position'),
            'orderDir' => request()->get('orderDir', 'asc'),
        ]))->get($playlistId);

        $params = request()->all();
        $params['perPage'] = request('perPage', 30);
        $params['paginate'] = request('paginate', 'simple');

        $datasource = (new Datasource($builder, $params));
        $datasource->order = false;

        return $datasource->paginate();
    }
}
