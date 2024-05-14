<?php

namespace App\Services\Backstage;

use App\Models\BackstageRequest;
use Illuminate\Support\Facades\Auth;

class CrupdateBackstageRequest
{
    public function __construct(protected BackstageRequest $backstageRequest)
    {
    }

    public function execute(
        array $data,
        BackstageRequest $backstageRequest = null,
    ): ?BackstageRequest {
        if (!$backstageRequest) {
            $backstageRequest = $this->backstageRequest->newInstance([
                'user_id' => Auth::id(),
            ]);
        }

        if (!isset($data['artist_id'])) {
            $artist = Auth::user()->primaryArtist();
            $data['artist_id'] = $artist->id ?? null;
        }

        $attributes = [
            'artist_name' => $data['artist_name'],
            'artist_id' => $data['artist_id'],
            'type' => $data['type'],
            'data' => json_encode($data['data']),
        ];

        $backstageRequest->fill($attributes)->save();

        return $backstageRequest;
    }
}
