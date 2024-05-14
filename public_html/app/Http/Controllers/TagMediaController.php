<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Common\Core\BaseController;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TagMediaController extends BaseController
{
    public function tracks(string $tagName)
    {
        $tag = Tag::where('name', $tagName)->firstOrFail();
        $this->authorize('show', $tag);
        $perPage = request('perPage', 15);

        $pagination = $tag
            ->tracks()
            ->with('artists')
            ->simplePaginate($perPage);

        return $this->success(['pagination' => $pagination]);
    }

    public function albums(string $tagName)
    {
        $tag = Tag::where('name', $tagName)->firstOrFail();
        $this->authorize('show', $tag);
        $perPage = request('perPage', 15);

        $pagination = $tag
            ->albums()
            ->withCount('plays')
            ->with([
                'artists',
                'tracks' => function (HasMany $query) {
                    $query
                        ->orderBy('number', 'desc')
                        ->select(
                            'tracks.id',
                            'album_id',
                            'name',
                            'plays',
                            'image',
                            'src',
                            'duration',
                        );
                },
            ])
            ->simplePaginate($perPage);

        return $this->success(['pagination' => $pagination]);
    }
}
