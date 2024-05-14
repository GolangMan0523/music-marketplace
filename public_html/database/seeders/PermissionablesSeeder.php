<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionablesSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissionables')->delete();
        DB::table('permissionables')->insert([
            0 => array(
                'id' => 1,
                'permission_id' => 3,
                'permissionable_id' => 1,
                'permissionable_type' => 'user',
                'restrictions' => NULL,
            ),
            1 => array(
                'id' => 2,
                'permission_id' => 9,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            2 => array(
                'id' => 3,
                'permission_id' => 18,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            3 => array(
                'id' => 4,
                'permission_id' => 22,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            4 => array(
                'id' => 5,
                'permission_id' => 26,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            5 => array(
                'id' => 6,
                'permission_id' => 32,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            6 => array(
                'id' => 7,
                'permission_id' => 37,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            7 => array(
                'id' => 8,
                'permission_id' => 48,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            8 => array(
                'id' => 9,
                'permission_id' => 49,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            9 => array(
                'id' => 10,
                'permission_id' => 51,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            10 => array(
                'id' => 11,
                'permission_id' => 55,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            11 => array(
                'id' => 12,
                'permission_id' => 56,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            12 => array(
                'id' => 13,
                'permission_id' => 59,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            13 => array(
                'id' => 14,
                'permission_id' => 60,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            14 => array(
                'id' => 15,
                'permission_id' => 79,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            15 => array(
                'id' => 16,
                'permission_id' => 88,
                'permissionable_id' => 1,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            16 => array(
                'id' => 17,
                'permission_id' => 9,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            17 => array(
                'id' => 18,
                'permission_id' => 22,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            18 => array(
                'id' => 19,
                'permission_id' => 26,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            19 => array(
                'id' => 20,
                'permission_id' => 32,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            20 => array(
                'id' => 21,
                'permission_id' => 37,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            21 => array(
                'id' => 22,
                'permission_id' => 48,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            22 => array(
                'id' => 23,
                'permission_id' => 49,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            23 => array(
                'id' => 24,
                'permission_id' => 51,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            24 => array(
                'id' => 25,
                'permission_id' => 55,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            25 => array(
                'id' => 26,
                'permission_id' => 59,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            26 => array(
                'id' => 27,
                'permission_id' => 79,
                'permissionable_id' => 2,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            27 => array(
                'id' => 28,
                'permission_id' => 52,
                'permissionable_id' => 3,
                'permissionable_type' => 'role',
                'restrictions' => '[]',
            ),
            28 => array(
                'id' => 29,
                'permission_id' => 18,
                'permissionable_id' => 1,
                'permissionable_type' => 'product',
                'restrictions' => '[]',
            ),
            29 => array(
                'id' => 30,
                'permission_id' => 52,
                'permissionable_id' => 1,
                'permissionable_type' => 'product',
                'restrictions' => '[]',
            ),
            30 => array(
                'id' => 31,
                'permission_id' => 18,
                'permissionable_id' => 2,
                'permissionable_type' => 'product',
                'restrictions' => '[]',
            ),
            31 => array(
                'id' => 32,
                'permission_id' => 52,
                'permissionable_id' => 2,
                'permissionable_type' => 'product',
                'restrictions' => '[]',
            ),
        ]);
    }
}