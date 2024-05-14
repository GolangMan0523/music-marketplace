<?php

namespace App\Services\Artists;

use App\Models\Artist;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class GetSimilarArtists
{
    public function execute(Artist $artist, array $params = []): Collection
    {
        $genreIds = $artist->genres->pluck('id');

        if ($genreIds->isNotEmpty()) {
            return $this->getByGenres($genreIds, $artist->id, $params);
        }

        return collect();
    }

    private function getByGenres(
        Collection $genreIds,
        $artistId,
        $params,
    ): Collection {
        $prefix = DB::getTablePrefix();
        return Artist::select(
            DB::raw("{$prefix}artists.*, COUNT(*) AS tag_count"),
        )
            ->join('genreables', 'genreable_id', '=', 'artists.id')
            ->whereIn('genreables.genre_id', $genreIds)
            ->where('genreables.genreable_type', Artist::MODEL_TYPE)
            ->where('artists.id', '!=', $artistId)
            ->groupBy('artists.id')
            ->orderBy('tag_count', 'desc')
            ->limit(Arr::get($params, 'limit', 10))
            ->get();
    }
}
