<?php

use App\Models\Channel;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        Channel::all()->each(function (Channel $channel) {
            $config = $channel->config;
            if (isset($config['connectToGenreViaUrl'])) {
                unset($config['connectToGenreViaUrl']);
                $config['restriction'] = 'genre';
                $config['restrictionModelId'] = 'urlParam';
            }

            if (isset($config['carouselWhenNested'])) {
                unset($config['carouselWhenNested']);
                $config['nestedLayout'] = 'carousel';
            }

            if (isset($config['seoTitle'])) {
                $config['seoTitle'] = str_replace(
                    '{{channel.genre.name}}',
                    '{{channel.restriction.display_name}}',
                    $config['seoTitle'],
                );
            }

            if (isset($config['seoDescription'])) {
                $config['seoDescription'] = str_replace(
                    '{{channel.genre.name}}',
                    '{{channel.restriction.display_name}}',
                    $config['seoDescription'],
                );
            }

            if (isset($config['layout']) && $config['layout'] === 'trackList') {
                $config['layout'] = 'list';
            }

            if (
                $config['contentOrder'] &&
                $config['contentOrder'] === 'channelables.order|asc'
            ) {
                $config['contentOrder'] = 'channelables.order:asc';
            }

            $channel->name = str_replace(
                '{{channel.genre.name}}',
                '{{channel.restriction.display_name}}',
                $channel->name,
            );
            $channel->config = $config;
            $channel->save();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
