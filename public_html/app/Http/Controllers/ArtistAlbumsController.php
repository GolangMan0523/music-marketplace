<?php namespace App\Http\Controllers;

use App\Models\Artist;
use App\Services\Artists\PaginateArtistAlbums;
use Common\Core\BaseController;

class ArtistAlbumsController extends BaseController
{
    public function __construct(protected PaginateArtistAlbums $paginator)
    {
    }

    public function index(Artist $artist)
    {
        $this->authorize('show', $artist);

        return $this->success([
            'pagination' => $this->paginator->execute(
                $artist,
                request()->all(),
            ),
        ]);
    }
}
