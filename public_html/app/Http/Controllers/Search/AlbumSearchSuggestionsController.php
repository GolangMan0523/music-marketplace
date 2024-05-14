<?php

namespace App\Http\Controllers\Search;

use App\Models\Album;
use Auth;
use Common\Core\BaseController;
use Symfony\Component\HttpFoundation\Response;

class AlbumSearchSuggestionsController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show($modelId)
    {
        $this->authorize('index', Album::class);

        $model = Album::findOrFail($modelId);

        return $this->success(['model' => $model->toNormalizedArray()]);
    }

    public function index(): Response
    {
        $this->authorize('index', Album::class);

        $limit = request('limit', 10);
        $query = request('query');
        $user = Auth::user();

        $builder =
            $user->hasPermission('music.update') ||
            $user->getRestrictionValue('music.create', 'artist_selection')
                ? Album::query()
                : $user->primaryArtist()->albums();

        $albums = $builder
            ->where('name', 'like', $query . '%')
            ->limit($limit)
            ->with('artists')
            ->get()
            ->map(fn(Album $album) => $album->toNormalizedArray());

        return $this->success(['results' => $albums]);
    }
}
