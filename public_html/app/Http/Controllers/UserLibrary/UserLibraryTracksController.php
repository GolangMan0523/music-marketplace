<?php namespace App\Http\Controllers\UserLibrary;

use App\Models\User;
use App\Services\Tracks\Queries\LibraryTracksQuery;
use Carbon\Carbon;
use Common\Core\BaseController;
use Common\Database\Paginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserLibraryTracksController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth')->only(['addToLibrary', 'removeFromLibrary']);
    }

    public function index(User $user = null)
    {
        $user = $user ?? Auth::user();
        $this->authorize('show', $user);

        $query = (new LibraryTracksQuery([
            'orderBy' => request('orderBy', 'likes.created_at'),
            'orderDir' => request('orderDir', 'desc'),
        ]))->get($user->id);
        $paginator = new Paginator($query, request()->all());
        $paginator->dontSort = true;
        $paginator->defaultPerPage = 30;

        $paginator->searchCallback = function (Builder $builder, $query) {
            $builder->where(function ($builder) use ($query) {
                $builder->where('name', 'LIKE', $query . '%');
                $builder->orWhereHas('album', function (Builder $q) use (
                    $query,
                ) {
                    return $q
                        ->where('name', 'LIKE', $query . '%')
                        ->orWhereHas('artists', function (Builder $q) use (
                            $query,
                        ) {
                            return $q->where('name', 'LIKE', $query . '%');
                        });
                });
            });
        };

        $pagination = $paginator->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    public function addToLibrary()
    {
        $likeables = collect(request()->get('likeables'))->map(function (
            $likeable,
        ) {
            $likeable['user_id'] = Auth::user()->id;
            $likeable['created_at'] = Carbon::now();
            return $likeable;
        });
        DB::table('likes')->insert($likeables->toArray());
        return $this->success();
    }

    public function removeFromLibrary()
    {
        $this->validate(request(), [
            'likeables.*.likeable_id' => 'required|int',
            'likeables.*.likeable_type' => 'required|in:track,album,artist',
        ]);

        $userId = Auth::id();
        $values = collect(request()->get('likeables'))
            ->map(function ($likeable) use ($userId) {
                return "('$userId', '{$likeable['likeable_id']}', '{$likeable['likeable_type']}')";
            })
            ->implode(', ');
        DB::table('likes')
            ->whereRaw("(user_id, likeable_id, likeable_type) in ($values)")
            ->delete();
        return $this->success();
    }
}
