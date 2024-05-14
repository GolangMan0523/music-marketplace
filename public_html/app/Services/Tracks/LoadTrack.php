<?php

namespace App\Services\Tracks;

use App\Models\Artist;
use App\Models\Genre;
use App\Models\Track;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoadTrack
{
    public function execute(Track $track, string $loader): array
    {
        $data = ['track' => $track, 'loader' => $loader];

        if ($loader === 'trackPage' || 'loader' === 'editTrackPage') {
            $data['track']->load(['tags', 'genres', 'artists']);
            $data['track']->loadCount(['reposts', 'likes']);
            $data = $this->loadFullAlbum($data);
            $data['track']->makeVisible('description');
        }

        if ($loader === 'editTrackPage') {
            $data['track']->setHidden([]);
            $data['track']->setRelation(
                'artists',
                $data['track']->artists->map(
                    fn(Artist $artist) => $artist->toNormalizedArray(),
                ),
            );
            $data['track']->setRelation(
                'genres',
                $data['track']->genres->map(
                    fn(Genre $genre) => $genre->toNormalizedArray(),
                ),
            );
        }

        if ($data['track']->relationLoaded('album') && $data['track']->album) {
            $data['track']->album->addPopularityToTracks();
        }

        return $data;
    }

    protected function loadFullAlbum(array $data): array
    {
        $data['track']->load([
            'album' => fn(BelongsTo $builder) => $builder->with([
                'artists',
                'tracks.artists',
            ]),
        ]);
        return $data;
    }
}
