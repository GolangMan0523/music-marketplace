<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocalizationsSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('localizations')->delete();
        DB::table('localizations')->insert([
            0 => array(
                'id' => 1,
                'name' => 'English',
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'language' => 'en',
            ),
        ]);
    }
}