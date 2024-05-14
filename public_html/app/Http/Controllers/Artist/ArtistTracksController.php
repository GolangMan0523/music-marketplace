<?php

namespace App\Http\Controllers\Artist;

use App\Models\Artist;
use App\Services\Artists\PaginateArtistTracks;
use Common\Core\BaseController;

class ArtistTracksController extends BaseController
{
    public function index(Artist $artist)
    {
        $userId = request('userId');
        $this->authorize('index', [$artist, $userId]);

        $pagination = (new PaginateArtistTracks())->execute($artist);

        return $this->success(['pagination' => $pagination]);
    }
}
