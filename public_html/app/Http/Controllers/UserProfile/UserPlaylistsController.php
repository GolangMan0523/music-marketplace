<?php namespace App\Http\Controllers\UserProfile;

use App\Models\Playlist;
use App\Models\User;
use App\Services\Playlists\PaginatePlaylists;
use Common\Core\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserPlaylistsController extends BaseController
{
    public function __construct(
        protected Request $request,
        protected Playlist $playlist,
    ) {
        $this->middleware('auth', ['only' => ['follow', 'unfollow']]);
    }

    public function index(User $user): Response
    {
        $this->authorize('show', $user);

        $builder = $user->playlists();

        if ($user->id !== Auth::id()) {
            $builder->where('public', true);
        }

        $pagination = app(PaginatePlaylists::class)->execute(
            array_merge($this->request->all(), ['compact' => true]),
            $builder,
        );

        return $this->success(['pagination' => $pagination]);
    }

    public function follow(int $id): Response
    {
        $playlist = $this->playlist->findOrFail($id);

        $this->authorize('show', $playlist);

        $this->request
            ->user()
            ->playlists()
            ->sync([$id], false);

        return $this->success();
    }

    public function unfollow(int $id): Response
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
