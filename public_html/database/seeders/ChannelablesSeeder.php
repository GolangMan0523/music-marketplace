<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChannelablesSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('channelables')->delete();
        DB::table('channelables')->insert([
            0 => array(
                'id' => 1,
                'channel_id' => 5,
                'channelable_type' => 'channel',
                'channelable_id' => 6,
                'order' => 1,
                'created_at' => NULL,
            ),
            1 => array(
                'id' => 2,
                'channel_id' => 5,
                'channelable_type' => 'channel',
                'channelable_id' => 8,
                'order' => 2,
                'created_at' => NULL,
            ),
            2 => array(
                'id' => 3,
                'channel_id' => 5,
                'channelable_type' => 'channel',
                'channelable_id' => 7,
                'order' => 3,
                'created_at' => NULL,
            ),
            3 => array(
                'id' => 4,
                'channel_id' => 9,
                'channelable_type' => 'channel',
                'channelable_id' => 1,
                'order' => 1,
                'created_at' => NULL,
            ),
            4 => array(
                'id' => 5,
                'channel_id' => 9,
                'channelable_type' => 'channel',
                'channelable_id' => 3,
                'order' => 2,
                'created_at' => NULL,
            ),
            5 => array(
                'id' => 6,
                'channel_id' => 9,
                'channelable_type' => 'channel',
                'channelable_id' => 2,
                'order' => 3,
                'created_at' => NULL,
            ),
            6 => array(
                'id' => 7,
                'channel_id' => 9,
                'channelable_type' => 'channel',
                'channelable_id' => 4,
                'order' => 4,
                'created_at' => NULL,
            ),
        ]);
    }
}