<?php

namespace App\Services;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Channel;
use App\Models\Genre;
use App\Models\Track;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GenerateDefaultChannels
{
    public function execute(): void
    {
        $popularAlbums = Channel::create([
            'name' => 'Popular Albums',
            'slug' => 'popular-albums',
            'user_id' => 1,
            'config' => [
                'contentType' => 'listAll',
                'contentModel' => Album::MODEL_TYPE,
                'contentOrder' => 'popularity:desc',
                'layout' => 'grid',
                'nestedLayout' => 'carousel',
                'seoTitle' => 'Popular Albums',
                'seoDescription' =>
                    'Most popular albums from hottest artists today.',
            ],
        ]);

        $newReleases = Channel::create([
            'name' => 'New Releases',
            'slug' => 'new-releases',
            'user_id' => 1,
            'config' => [
                'contentType' => 'listAll',
                'contentModel' => Album::MODEL_TYPE,
                'contentOrder' => 'created_at:desc',
                'layout' => 'grid',
                'nestedLayout' => 'carousel',
                'seoTitle' => 'Latest Releases',
                'seoDescription' =>
                    'Browse and listen to newest releases from popular artists.',
            ],
        ]);

        $tracks = Channel::create([
            'name' => 'Popular Tracks',
            'slug' => 'popular-tracks',
            'user_id' => 1,
            'config' => [
                'contentType' => 'listAll',
                'contentModel' => Track::MODEL_TYPE,
                'contentOrder' => 'popularity:desc',
                'layout' => 'trackTable',
                'nestedLayout' => 'trackTable',
                'seoTitle' => 'Popular Tracks',
                'seoDescription' =>
                    'Global Top 50 chart of most popular songs.',
            ],
        ]);

        $mainGenreChannel = $this->seedGenreChannels();

        $discover = Channel::create([
            'name' => 'Discover',
            'slug' => 'discover',
            'user_id' => 1,
            'config' => [
                'contentType' => 'manual',
                'contentModel' => Channel::MODEL_TYPE,
                'hideTitle' => true,
                'contentOrder' => 'channelables.order:asc',
                'layout' => 'list',
                'nestedLayout' => 'list',
                'seoTitle' => '{{site_name}} - Listen to music for free',
                'seoDescription' =>
                    'Find and listen to millions of songs, albums and artists, all completely free on {{SITE_NAME}}.',
            ],
        ]);

        DB::table('channelables')->insert([
            [
                'channel_id' => $discover->id,
                'channelable_type' => Channel::MODEL_TYPE,
                'channelable_id' => $popularAlbums->id,
                'order' => 1,
            ],
            [
                'channel_id' => $discover->id,
                'channelable_type' => Channel::MODEL_TYPE,
                'channelable_id' => $tracks->id,
                'order' => 2,
            ],
            [
                'channel_id' => $discover->id,
                'channelable_type' => Channel::MODEL_TYPE,
                'channelable_id' => $newReleases->id,
                'order' => 3,
            ],
            [
                'channel_id' => $discover->id,
                'channelable_type' => Channel::MODEL_TYPE,
                'channelable_id' => $mainGenreChannel->id,
                'order' => 4,
            ],
        ]);

        settings()->save([
            'homepage.type' => 'channel',
            'homepage.value' => $discover->id,
        ]);

        collect([
            $newReleases,
            $tracks,
            $mainGenreChannel,
            $popularAlbums,
        ])->each(function (Channel $channel) {
            $channel->updateContentFromExternal();
        });
    }

    protected function seedGenreChannels(): Channel
    {
        $mainChannel = Channel::create([
            'name' => 'Genres',
            'slug' => 'genres',
            'user_id' => 1,
            'config' => [
                'contentType' => 'listAll',
                'contentModel' => Genre::MODEL_TYPE,
                'contentOrder' => 'popularity:desc',
                'layout' => 'grid',
                'nestedLayout' => 'grid',
                'seoTitle' => 'Popular Genres',
                'seo_description' =>
                    'Browse popular genres to discover new music.',
            ],
        ]);

        if (settings('artist_provider') !== 'spotify') {
            $parentChannel = Channel::create([
                'name' => '{{channel.restriction.display_name}}',
                'slug' => 'genre',
                'user_id' => 1,
                'config' => [
                    'restriction' => 'genre',
                    'restrictionModelId' => 'urlParam',
                    'lockSlug' => true,
                    'preventDeletion' => true,
                    'contentType' => 'manual',
                    'contentModel' => Channel::MODEL_TYPE,
                    'contentOrder' => 'channelables.order:asc',
                    'seoTitle' =>
                        '{{channel.restriction.display_name}} - {{site_name}}',
                    'seoDescription' =>
                        'Popular {{channel.restriction.display_name}} artists, albums and tracks.',
                ],
            ]);

            $genreArtists = $this->createGenreChildChannel(
                Artist::MODEL_TYPE,
                carouselWhenNested: true,
            );
            $genreAlbums = $this->createGenreChildChannel(
                Album::MODEL_TYPE,
                carouselWhenNested: true,
            );
            $genreTracks = $this->createGenreChildChannel(Track::MODEL_TYPE);
            DB::table('channelables')->insert([
                [
                    'channel_id' => $parentChannel->id,
                    'channelable_type' => Channel::MODEL_TYPE,
                    'channelable_id' => $genreArtists->id,
                    'order' => 1,
                ],
                [
                    'channel_id' => $parentChannel->id,
                    'channelable_type' => Channel::MODEL_TYPE,
                    'channelable_id' => $genreTracks->id,
                    'order' => 2,
                ],
                [
                    'channel_id' => $parentChannel->id,
                    'channelable_type' => Channel::MODEL_TYPE,
                    'channelable_id' => $genreAlbums->id,
                    'order' => 3,
                ],
            ]);
        } else {
            $this->createGenreChildChannel(Artist::MODEL_TYPE, nested: false);
        }

        return $mainChannel;
    }

    protected function createGenreChildChannel(
        string $modelType,
        $carouselWhenNested = false,
        $nested = true,
    ): Channel {
        $plural = Str::plural($modelType);
        $uppercase = Str::ucfirst($plural);
        $layout = $modelType === Track::MODEL_TYPE ? 'trackTable' : 'grid';

        return Channel::create([
            'name' => "{{channel.restriction.display_name}} $uppercase",
            'slug' => $nested ? "genre-$plural" : 'genre',
            'user_id' => 1,
            'config' => [
                'restriction' => 'genre',
                'restrictionModelId' => 'urlParam',
                'lockSlug' => true,
                'preventDeletion' => true,
                'contentType' => 'listAll',
                'contentModel' => $modelType,
                'nestedLayout' => $carouselWhenNested ? 'carousel' : $layout,
                'contentOrder' => 'popularity:desc',
                'layout' => $layout,
                'seoTitle' =>
                    '{{channel.restriction.display_name}} - {{site_name}}',
                'seoDescription' => "Popular {{channel.restriction.display_name}} $plural.",
            ],
        ]);
    }
}
