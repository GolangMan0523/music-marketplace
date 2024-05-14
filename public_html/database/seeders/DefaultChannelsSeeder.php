<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Services\GenerateDefaultChannels;
use Illuminate\Database\Seeder;

class DefaultChannelsSeeder extends Seeder
{
    public function run()
    {
        if (Channel::count() === 0) {
            (new GenerateDefaultChannels())->execute();
        } else {
            // fix an issue with bad seeding in previous versions
            if (
                Channel::where('slug', 'genre-artists')->first() &&
                !Channel::where('slug', 'genre-tracks')->first()
            ) {
                Channel::where('slug', 'genre-artists')->update([
                    'slug' => 'genre',
                ]);
            }
        }
    }
}
