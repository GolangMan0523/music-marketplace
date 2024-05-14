<?php namespace App\Http\Controllers;

use App\Http\Requests\ModifyPlaylist;
use App\Models\Playlist;
use App\Services\IncrementModelViews;
use App\Services\Playlists\DeletePlaylists;
use App\Services\Playlists\PaginatePlaylists;
use App\Services\Playlists\PlaylistTracksPaginator;
use Auth;
use Common\Core\BaseController;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PlaylistController extends BaseController
{
    public function __construct(
        protected Request $request,
        protected Playlist $playlist,
        protected PlaylistTracksPaginator $tracksPaginator,
    ) {
    }

    public function index()
    {
        $this->authorize('index', Playlist::class);

        $pagination = app(PaginatePlaylists::class)->execute(
            $this->request->all(),
        );

        $pagination->makeVisible(['updated_at', 'views', 'description']);

        return $this->success(['pagination' => $pagination]);
    }

    public function show(int $id)
    {
        $playlist = $this->playlist
            ->with('editors')
            ->withCount('tracks')
            ->findOrFail($id);

        $playlist->makeVisible(['description']);

        $this->authorize('show', $playlist);

        $loader = request('loader', 'playlistPage');
        $data = [
            'playlist' => $playlist,
            'tracks' => $this->tracksPaginator->paginate($playlist->id),
            'totalDuration' => (int) $playlist
                ->tracks()
                ->sum('tracks.duration'),
            'loader' => $loader,
        ];

        app(IncrementModelViews::class)->execute($playlist->id, 'playlist');

        return $this->renderClientOrApi([
            'pageName' => $loader === 'playlistPage' ? 'playlist-page' : null,
            'data' => $data,
        ]);
    }

    public function store(ModifyPlaylist $validate): Response
    {
        $this->authorize('store', Playlist::class);

        $params = $this->request->all();
        $params['owner_id'] = Auth::id();
        Playlist::unguard();
        $newPlaylist = $this->request
            ->user()
            ->playlists()
            ->create($params, ['editor' => true]);

        $newPlaylist->load('editors');

        return $this->success(['playlist' => $newPlaylist]);
    }

    public function update(
        Playlist $playlist,
        ModifyPlaylist $validate,
    ): Response {
        $this->authorize('update', $playlist);

        $playlist->fill($this->request->all())->save();
        $playlist->load('editors');
        $playlist->loadCount('tracks');
        $playlist->makeVisible(['description']);

        return $this->success(['playlist' => $playlist]);
    }

    public function destroy(string $ids): Response
    {
        $playlistIds = explode(',', $ids);
        $playlists = $this->playlist
            ->with('editors')
            ->whereIn('id', $playlistIds)
            ->get();

        $this->authorize('destroy', [Playlist::class, $playlists]);

        app(DeletePlaylists::class)->execute($playlists);

        return $this->success();
    }

    public function follow(int $id)
    {
        $playlist = $this->playlist->findOrFail($id);

        $this->authorize('show', $playlist);

        return $this->request
            ->user()
            ->playlists()
            ->sync([$id], false);
    }

    public function unfollow(int $id)
    {
        $playlist = $this->request
            ->user()
            ->playlists()
            ->find($id);

        $this->authorize('show', $playlist);

        if ($playlist) {
            $this->request
                ->user()
                ->playlists()
                ->detach($id);
        }

        return $this->success();
    }
}
