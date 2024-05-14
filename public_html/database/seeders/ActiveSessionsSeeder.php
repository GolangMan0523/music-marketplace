<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActiveSessionsSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('active_sessions')->delete();
        DB::table('active_sessions')->insert([
            0 => array(
                'id' => 1,
                'session_id' => 'GxokOGkUiM42rQOLgrACH43IODleHlStfoVMuRiE',
                'token' => NULL,
                'user_id' => 1,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
                'created_at' => '2024-04-11 22:27:12',
                'updated_at' => '2024-04-11 22:27:12',
            ),
            1 => array(
                'id' => 2,
                'session_id' => 'sQQ9DrhQR6a7Pw3xqPsKgBlCKceEEuchmF5XHciu',
                'token' => NULL,
                'user_id' => 1,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
                'created_at' => '2024-04-11 22:40:53',
                'updated_at' => '2024-04-11 22:40:53',
            ),
        ]);
    }
}