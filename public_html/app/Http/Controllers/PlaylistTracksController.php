<?php namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Services\Playlists\PlaylistTracksPaginator;
use Auth;
use Common\Core\BaseController;
use DB;
use Illuminate\Http\Request;

class PlaylistTracksController extends BaseController
{
    public function __construct(
        protected Request $request,
        protected PlaylistTracksPaginator $paginator,
        protected Playlist $playlist,
    ) {
    }

    public function index(int $playlistId)
    {
        $pagination = $this->paginator->paginate($playlistId);
        return $this->success(['pagination' => $pagination]);
    }

    public function add(int $playlistId)
    {
        $playlist = $this->playlist->findOrFail($playlistId);

        $this->authorize('modifyTracks', $playlist);

        $ids = collect($this->request->get('ids'))->mapWithKeys(
            fn($id, $index) => [
                $id => ['position' => $index + 1, 'added_by' => Auth::id()],
            ],
        );

        DB::table('playlist_track')
            ->where('playlist_id', $playlist->id)
            ->increment('position', count($ids));

        $playlist->tracks()->sync($ids, false);
        $this->updateImage($playlist);

        return $this->success(['playlist' => $playlist]);
    }

    public function remove(int $id)
    {
        $playlist = $this->playlist->findOrFail($id);

        $this->authorize('modifyTracks', $playlist);

        $ids = $this->request->get('ids');
        $playlist->tracks()->detach($ids);
        $this->updateImage($playlist);

        return $this->success(['playlist' => $playlist]);
    }

    private function updateImage(Playlist $playlist)
    {
        if (
            !$playlist->image &&
            ($firstTrack = $playlist
                ->tracks()
                ->with('album')
                ->first())
        ) {
            if ($firstTrack->image) {
                $playlist->image = $firstTrack->image;
            } elseif ($firstTrack->album) {
                $playlist->image = $firstTrack->album->image;
            }
            $playlist->save();
        }
    }
}
