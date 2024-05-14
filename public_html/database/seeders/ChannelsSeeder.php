<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChannelsSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('channels')->delete();
        DB::table('channels')->insert([
            0 => array(
                'id' => 1,
                'name' => 'Popular Albums',
                'internal' => 0,
                'description' => NULL,
                'type' => 'channel',
                'slug' => 'popular-albums',
                'user_id' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'config' => '{"contentType":"listAll","contentModel":"album","contentOrder":"popularity:desc","layout":"grid","nestedLayout":"carousel","seoTitle":"Popular Albums","seoDescription":"Most popular albums from hottest artists today."}',
            ),
            1 => array(
                'id' => 2,
                'name' => 'New Releases',
                'internal' => 0,
                'description' => NULL,
                'type' => 'channel',
                'slug' => 'new-releases',
                'user_id' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'config' => '{"contentType":"listAll","contentModel":"album","contentOrder":"created_at:desc","layout":"grid","nestedLayout":"carousel","seoTitle":"Latest Releases","seoDescription":"Browse and listen to newest releases from popular artists."}',
            ),
            2 => array(
                'id' => 3,
                'name' => 'Popular Tracks',
                'internal' => 0,
                'description' => NULL,
                'type' => 'channel',
                'slug' => 'popular-tracks',
                'user_id' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'config' => '{"contentType":"listAll","contentModel":"track","contentOrder":"popularity:desc","layout":"trackTable","nestedLayout":"trackTable","seoTitle":"Popular Tracks","seoDescription":"Global Top 50 chart of most popular songs."}',
            ),
            3 => array(
                'id' => 4,
                'name' => 'Genres',
                'internal' => 0,
                'description' => NULL,
                'type' => 'channel',
                'slug' => 'genres',
                'user_id' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'config' => '{"contentType":"listAll","contentModel":"genre","contentOrder":"popularity:desc","layout":"grid","nestedLayout":"grid","seoTitle":"Popular Genres","seo_description":"Browse popular genres to discover new music."}',
            ),
            4 => array(
                'id' => 5,
                'name' => '{{channel.restriction.display_name}}',
                'internal' => 0,
                'description' => NULL,
                'type' => 'channel',
                'slug' => 'genre',
                'user_id' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'config' => '{"restriction":"genre","restrictionModelId":"urlParam","lockSlug":true,"preventDeletion":true,"contentType":"manual","contentModel":"channel","contentOrder":"channelables.order:asc","seoTitle":"{{channel.restriction.display_name}} - {{site_name}}","seoDescription":"Popular {{channel.restriction.display_name}} artists, albums and tracks."}',
            ),
            5 => array(
                'id' => 6,
                'name' => '{{channel.restriction.display_name}} Artists',
                'internal' => 0,
                'description' => NULL,
                'type' => 'channel',
                'slug' => 'genre-artists',
                'user_id' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'config' => '{"restriction":"genre","restrictionModelId":"urlParam","lockSlug":true,"preventDeletion":true,"contentType":"listAll","contentModel":"artist","nestedLayout":"carousel","contentOrder":"popularity:desc","layout":"grid","seoTitle":"{{channel.restriction.display_name}} - {{site_name}}","seoDescription":"Popular {{channel.restriction.display_name}} artists."}',
            ),
            6 => array(
                'id' => 7,
                'name' => '{{channel.restriction.display_name}} Albums',
                'internal' => 0,
                'description' => NULL,
                'type' => 'channel',
                'slug' => 'genre-albums',
                'user_id' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'config' => '{"restriction":"genre","restrictionModelId":"urlParam","lockSlug":true,"preventDeletion":true,"contentType":"listAll","contentModel":"album","nestedLayout":"carousel","contentOrder":"popularity:desc","layout":"grid","seoTitle":"{{channel.restriction.display_name}} - {{site_name}}","seoDescription":"Popular {{channel.restriction.display_name}} albums."}',
            ),
            7 => array(
                'id' => 8,
                'name' => '{{channel.restriction.display_name}} Tracks',
                'internal' => 0,
                'description' => NULL,
                'type' => 'channel',
                'slug' => 'genre-tracks',
                'user_id' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'config' => '{"restriction":"genre","restrictionModelId":"urlParam","lockSlug":true,"preventDeletion":true,"contentType":"listAll","contentModel":"track","nestedLayout":"trackTable","contentOrder":"popularity:desc","layout":"trackTable","seoTitle":"{{channel.restriction.display_name}} - {{site_name}}","seoDescription":"Popular {{channel.restriction.display_name}} tracks."}',
            ),
            8 => array(
                'id' => 9,
                'name' => 'Discover',
                'internal' => 0,
                'description' => NULL,
                'type' => 'channel',
                'slug' => 'discover',
                'user_id' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'config' => '{"contentType":"manual","contentModel":"channel","hideTitle":true,"contentOrder":"channelables.order:asc","layout":"list","nestedLayout":"list","seoTitle":"{{site_name}} - Listen to music for free","seoDescription":"Find and listen to millions of songs, albums and artists, all completely free on {{SITE_NAME}}."}',
            ),
        ]);
    }
}