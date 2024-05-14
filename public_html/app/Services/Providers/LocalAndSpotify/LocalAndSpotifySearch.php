<?php

namespace App\Services\Providers\LocalAndSpotify;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Track;
use App\Services\Providers\Local\LocalSearch;
use App\Services\Providers\Spotify\SpotifySearch;
use Illuminate\Support\Collection;

class LocalAndSpotifySearch extends SpotifySearch
{
    public function search(
        string $q,
        int $page,
        int $perPage,
        $modelTypes,
    ): Collection {
        $spotifyResults = parent::search($q, $page, $perPage, $modelTypes);

        //  local provider for the rest of types, so there's no need to double search
        $localModelTypes = array_intersect($modelTypes, [
            Artist::MODEL_TYPE,
            Album::MODEL_TYPE,
            Track::MODEL_TYPE,
        ]);
        if (!empty($localModelTypes)) {
            $localResults = app(LocalSearch::class)->search(
                $q,
                $page,
                $perPage,
                $localModelTypes,
            );
        }

        foreach ($spotifyResults as $type => $results) {
            if (
                isset($localResults[$type]) &&
                count($localResults[$type]->items())
            ) {
                $mergedResults = $results
                    ->getCollection()
                    ->merge($localResults[$type]->getCollection())
                    ->unique('id')
                    ->take($perPage);
                $results->setCollection($mergedResults);
            }
        }

        return $spotifyResults;
    }
}
