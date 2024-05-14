<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();
        DB::table('roles')->insert([
            0 => array(
                'id' => 1,
                'name' => 'users',
                'legacy_permissions' => NULL,
                'default' => 1,
                'guests' => 0,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'description' => NULL,
                'type' => 'sitewide',
                'internal' => 1,
                'artists' => 0,
            ),
            1 => array(
                'id' => 2,
                'name' => 'guests',
                'legacy_permissions' => NULL,
                'default' => 0,
                'guests' => 1,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'description' => NULL,
                'type' => 'sitewide',
                'internal' => 1,
                'artists' => 0,
            ),
            2 => array(
                'id' => 3,
                'name' => 'artists',
                'legacy_permissions' => NULL,
                'default' => 0,
                'guests' => 0,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
                'description' => 'Role assigned to a user when their "become artist request" is approved.',
                'type' => 'sitewide',
                'internal' => 1,
                'artists' => 1,
            ),
        ]);
    }
}