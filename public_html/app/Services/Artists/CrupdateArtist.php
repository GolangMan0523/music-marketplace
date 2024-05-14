<?php

namespace App\Services\Artists;

use App\Models\Artist;
use App\Models\Genre;
use Arr;

class CrupdateArtist
{
    public function __construct(
        protected Artist $artist,
        protected Genre $genre,
    ) {
    }

    public function execute($data, Artist $artist = null): Artist
    {
        if (!$artist) {
            $artist = $this->artist->newInstance();
        }

        $artist
            ->fill([
                'name' => $data['name'],
                'verified' => $data['verified'] ?? false,
                'image_small' => Arr::get($data, 'image_small'),
                'spotify_id' =>
                    $data['spotify_id'] ?? Arr::get($artist, 'spotify_id'),
            ])
            ->save();

        if (Arr::get($data, 'genres')) {
            $genreIds = $this->genre
                ->insertOrRetrieve(Arr::get($data, 'genres'))
                ->pluck('id');
            $artist->genres()->sync($genreIds);
        }

        if ($profile = Arr::get($data, 'profile')) {
            $artist->profile()->updateOrCreate(
                ['artist_id' => $artist->id],
                [
                    'description' => $profile['description'] ?? null,
                    'country' => $profile['country'] ?? null,
                    'city' => $profile['city'] ?? null,
                ],
            );
        }

        if (array_key_exists('profile_images', $data)) {
            $artist->profileImages()->delete();
            $profileImages = array_map(function ($img) {
                return is_string($img) ? ['url' => $img] : $img;
            }, array_filter($data['profile_images']));
            $artist->profileImages()->createMany($profileImages);
        }

        if (array_key_exists('links', $data)) {
            $links = array_filter(
                $data['links'],
                fn($link) => Arr::get($link, 'url') && Arr::get($link, 'title'),
            );
            $artist->links()->delete();
            $artist->links()->createMany($links);
        }

        return $artist->load(
            'albums.tracks',
            'genres',
            'profile',
            'profileImages',
            'links',
        );
    }
}
