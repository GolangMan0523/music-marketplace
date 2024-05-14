<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Repost;
use App\Models\User;
use Common\Core\BaseController;
use Illuminate\Support\Facades\Auth;

class RepostController extends BaseController
{
    public function index(User $user)
    {
        $this->authorize('show', $user);

        $pagination = $user
            ->reposts()
            ->with('repostable.artists')
            ->simplePaginate(20);

        [$albums, $tracks] = $pagination->partition(function (Repost $repost) {
            return $repost->repostable?->model_type === Album::MODEL_TYPE;
        });

        $albums->load('repostable.tracks');

        $pagination->setCollection($tracks->concat($albums)->values());

        return $this->success(['pagination' => $pagination]);
    }

    public function toggle()
    {
        $this->middleware('auth');

        $userId = Auth::id();
        $repostableType = request('repostable_type');

        $table = $repostableType === Album::MODEL_TYPE ? 'albums' : 'tracks';
        $this->validate(request(), [
            'repostable_type' => 'required',
            'repostable_id' => "required|exists:$table,id",
        ]);

        $existingRepost = Repost::where('user_id', $userId)
            ->where('repostable_id', request('repostable_id'))
            ->where('repostable_type', $repostableType)
            ->first();

        if ($existingRepost) {
            $existingRepost->delete();
            return $this->success(['action' => 'removed']);
        } else {
            $newRepost = Repost::create([
                'user_id' => $userId,
                'repostable_id' => request('repostable_id'),
                'repostable_type' => $repostableType,
            ]);
            return $this->success([
                'action' => 'added',
                'repost' => $newRepost,
            ]);
        }
    }
}
