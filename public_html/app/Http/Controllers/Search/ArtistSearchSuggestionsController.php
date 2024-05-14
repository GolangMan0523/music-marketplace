<?php

namespace App\Http\Controllers\Search;

use App\Models\Artist;
use Common\Core\BaseController;
use Illuminate\Support\Facades\Auth;

class ArtistSearchSuggestionsController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show($modelId)
    {
        $this->authorize('index', Artist::class);

        if ($modelId === 'CURRENT_USER') {
            $model = $this->getCurrentUserArtist();
        } else {
            $model = Artist::findOrFail($modelId)->toNormalizedArray();
        }

        return $this->success(['model' => $model]);
    }

    public function index()
    {
        $this->authorize('index', Artist::class);

        $limit = request('limit', 10);
        $query = request('query');
        $user = Auth::user();

        $shouldListAll =
            $user?->hasPermission('music.update') ||
            $user?->getRestrictionValue('music.create', 'artist_selection') ||
            request()->has('listAll');

        $builder = $shouldListAll ? Artist::query() : $user->artists();

        $artists = $builder
            ->where('name', 'like', $query . '%')
            ->limit($limit)
            ->get();

        $alreadyHasCurrentUser = $artists->first(function (Artist $artist) {
            return $artist->pivot && $artist->pivot->user_id === Auth::id();
        });

        $artists = $artists->map(
            fn(Artist $artist) => $artist->toNormalizedArray(),
        );

        if (!$alreadyHasCurrentUser && !request()->has('excludeSelf')) {
            $artists->prepend((object) $this->getCurrentUserArtist());
        }

        return $this->success(['results' => $artists]);
    }

    private function getCurrentUserArtist(): array
    {
        return [
            'id' => 'CURRENT_USER',
            'name' => Auth::user()->display_name,
            'image' => Auth::user()->avatar,
            'model_type' => Artist::MODEL_TYPE,
        ];
    }
}
