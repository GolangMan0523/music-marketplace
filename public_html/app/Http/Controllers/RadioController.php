<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Genre;
use App\Models\Track;
use App\Services\Providers\ProviderResolver;
use Cache;
use Carbon\Carbon;
use Common\Core\BaseController;

class RadioController extends BaseController
{
    public function getRecommendations(string $modelType, int $modelId): array
    {
        $model = $this->findModel($modelType, $modelId);

        $this->authorize('show', $model);

        $recommendations = Cache::remember(
            "radio.$modelType.$model->id",
            Carbon::now()->addDays(2),
            function () use ($model, $modelType) {
                $recommendations = app(ProviderResolver::class)
                    ->get('radio')
                    ->getRecommendations($model, $modelType);

                return empty($recommendations) ? null : $recommendations;
            },
        );

        return [
            'type' => $modelType,
            'seed' => $model,
            'recommendations' => $recommendations ?: [],
        ];
    }

    private function findModel(string $type, int $modelId)
    {
        if ($type === 'artist') {
            return Artist::findOrFail($modelId);
        } elseif ($type === 'genre') {
            return Genre::findOrFail($modelId);
        } elseif ($type === 'track') {
            return Track::with('album.artists')->findOrFail($modelId);
        }

        abort(404, 'Invalid radio seed');
    }
}
