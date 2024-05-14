<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        DB::table('users')->insert([
            0 => array(
                'id' => 1,
                'username' => 'admin',
                'first_name' => NULL,
                'last_name' => NULL,
                'avatar_url' => NULL,
                'gender' => NULL,
                'legacy_permissions' => NULL,
                'email' => 'admin@example.com',
                'password' => '$2y$10$v/wFArDlJ./jjFbbkdB7PuhqXF1oO0r7v2Pk63jX3LPVlnRQiHuym',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'two_factor_confirmed_at' => NULL,
                'card_brand' => NULL,
                'card_last_four' => NULL,
                'remember_token' => 'KLv7gNdcSedDhI7mhxIl8B0taQ00fa3lmNVyROFn7uPDJO2XFgiPFddhEoka',
                'created_at' => '2024-04-11 19:25:03',
                'updated_at' => '2024-04-11 19:25:03',
                'language' => NULL,
                'country' => NULL,
                'timezone' => NULL,
                'avatar' => NULL,
                'stripe_id' => NULL,
                'available_space' => NULL,
                'email_verified_at' => '2024-04-11 19:25:03',
                'card_expires' => NULL,
                'banned_at' => NULL,
            ),
        ]);
    }
}