<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Common\Core\BaseController;

class LandingPageController extends BaseController
{
    public function artists()
    {
        $artists = Artist::orderBy('views', 'desc')
            ->take(8)
            ->get();

        return $this->success(['artists' => $artists]);
    }
}
