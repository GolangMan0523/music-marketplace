<?php

namespace App\Services\Albums;

use App\Models\Album;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LoadAlbum
{
    public function execute(Album $album, string $loader): array
    {
        $data = ['album' => $album, 'loader' => $loader];

        // sync album data with spotify, if needed by this loader
        if (
            ($loader === 'albumPage' || $loader === 'trackQuery') &&
            $album->needsUpdating()
        ) {
            $data['album'] = (new SyncAlbumWithSpotify())->execute(
                $data['album'],
            );
        }

        if ($loader === 'albumPage' || $loader === 'editAlbumPage') {
            $album->load(['tags', 'genres', 'artists']);
            $album->loadCount(['reposts', 'likes']);
            $data = $this->loadFullTracks($data);
        } elseif ($loader === 'albumEmbed') {
            $album->load(['artists', 'tracks', 'genres']);
        }

        // show all data for edit page
        if ($loader === 'editAlbumPage') {
            $album->setHidden([]);
            $album->tracks->setHidden([]);
        }

        if ($album->relationLoaded('tracks')) {
            $album->addPopularityToTracks();
        }

        return $data;
    }

    protected function loadFullTracks(array $data): array
    {
        $data['album']->load([
            'tracks' => fn(HasMany $builder) => $builder->with([
                'artists',
                'tags',
                'genres',
            ]),
        ]);
        return $data;
    }
}
