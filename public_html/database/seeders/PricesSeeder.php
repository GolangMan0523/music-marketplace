<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PricesSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('prices')->delete();
        DB::table('prices')->insert([
            0 => array(
                'id' => 1,
                'amount' => '8.00',
                'currency' => 'USD',
                'currency_position' => true,
                'interval' => 'month',
                'interval_count' => 1,
                'product_id' => 2,
                'stripe_id' => NULL,
                'paypal_id' => NULL,
                'default' => 0,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
            ),
            1 => array(
                'id' => 2,
                'amount' => '43.00',
                'currency' => 'USD',
                'currency_position' => true,
                'interval' => 'month',
                'interval_count' => 6,
                'product_id' => 2,
                'stripe_id' => NULL,
                'paypal_id' => NULL,
                'default' => 0,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
            ),
            2 => array(
                'id' => 3,
                'amount' => '76.00',
                'currency' => 'USD',
                'currency_position' => true,
                'interval' => 'month',
                'interval_count' => 12,
                'product_id' => 2,
                'stripe_id' => NULL,
                'paypal_id' => NULL,
                'default' => 0,
                'created_at' => '2024-04-11 19:25:04',
                'updated_at' => '2024-04-11 19:25:04',
            ),
        ]);
    }
}