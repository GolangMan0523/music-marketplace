<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->delete();
        DB::table('products')->insert([
            0 => array(
                'id' => 1,
                'name' => 'Basic',
                'description' => NULL,
                'uuid' => '0a49d770-afce-4fa4-bbde-489f6472904b',
                'feature_list' => '["3h upload time","Ad supported experience","Listen on browser, phone, tablet or TV","Stream unlimited music","Cancel anytime"]',
                'position' => 1,
                'recommended' => 0,
                'free' => 1,
                'hidden' => 0,
                'available_space' => NULL,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
            ),
            1 => array(
                'id' => 2,
                'name' => 'Pro Unlimited',
                'description' => NULL,
                'uuid' => '384eeac0-c070-402d-9060-5f81b0d858af',
                'feature_list' => '["Unlimited upload time","No advertisements","Download songs","Pro badge","Listen on browser, phone and tablet or TV","Stream unlimited amount of music","Cancel anytime"]',
                'position' => 2,
                'recommended' => 1,
                'free' => 0,
                'hidden' => 0,
                'available_space' => NULL,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
            ),
        ]);
    }
}