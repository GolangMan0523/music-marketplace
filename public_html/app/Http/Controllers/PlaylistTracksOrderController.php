<?php namespace App\Http\Controllers;

use App\Models\Playlist;
use Common\Core\BaseController;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class PlaylistTracksOrderController extends BaseController {

    public function change(Playlist $playlist): Response {

        $this->authorize('update', $playlist);

        $this->validate(request(), [
            'ids'   => 'array|min:1',
            'ids.*' => 'integer'
        ]);

        $queryPart = '';
        foreach(request()->get('ids') as $position => $id) {
            $position++;
            $queryPart .= " when track_id=$id then $position";
        }

        DB::table('playlist_track')
            ->where('playlist_id', $playlist->id)
            ->whereIn('track_id', request()->get('ids'))
            ->update(['position' => DB::raw("(case $queryPart end)")]);

        return $this->success();
    }
}
