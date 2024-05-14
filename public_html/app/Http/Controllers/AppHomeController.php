<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Common\Billing\Models\Product;
use Common\Core\Controllers\HomeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AppHomeController extends HomeController
{
    public function __invoke()
    {
        if (
            Str::startsWith(settings('homepage.type'), 'channel') ||
            (Auth::check() && settings('homepage.type') === 'landingPage')
        ) {
            return app(FallbackRouteController::class)->renderChannel(
                settings('homepage.value'),
            );
        } else {
            return $this->renderClientOrApi([
                'pageName' => 'landing-page',
                'data' => [
                    'loader' => 'landingPage',
                    'products' => Product::with(['permissions', 'prices'])
                        ->limit(15)
                        ->orderBy('position', 'asc')
                        ->get(),
                    'trendingArtists' => Artist::orderBy('views', 'desc')
                        ->take(8)
                        ->get(),
                ],
            ]);
        }
    }
}
