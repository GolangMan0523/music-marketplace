<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CssThemesSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('css_themes')->delete();
        DB::table('css_themes')->insert([
            0 => array(
                'id' => 1,
                'name' => 'Dark',
                'is_dark' => 1,
                'default_light' => 0,
                'default_dark' => 1,
                'user_id' => 1,
                'values' => '{"--be-foreground-base":"255 255 255","--be-primary-light":"180 207 156","--be-primary":"104 159 56","--be-primary-dark":"82 126 44","--be-on-primary":"255 255 255","--be-background":"35 35 44","--be-background-alt":"30 30 38","--be-background-chip":"66 68 74","--be-paper":"35 35 44","--be-disabled-bg-opacity":"12%","--be-disabled-fg-opacity":"30%","--be-hover-opacity":"8%","--be-focus-opacity":"12%","--be-selected-opacity":"16%","--be-text-main-opacity":"100%","--be-text-muted-opacity":"70%","--be-divider-opacity":"12%"}',
                'font' => NULL,
                'created_at' => '2024-04-11 19:25:03',
                'updated_at' => '2024-04-11 19:25:03',
            ),
            1 => array(
                'id' => 2,
                'name' => 'Light',
                'is_dark' => 0,
                'default_light' => 1,
                'default_dark' => 0,
                'user_id' => 1,
                'values' => '{"--be-foreground-base":"0 0 0","--be-primary-light":"180 207 156","--be-primary":"104 159 56","--be-primary-dark":"82 126 44","--be-on-primary":"255 255 255","--be-background":"255 255 255","--be-background-alt":"246 248 250","--be-background-chip":"233 236 239","--be-paper":"255 255 255","--be-disabled-bg-opacity":"12%","--be-disabled-fg-opacity":"26%","--be-hover-opacity":"4%","--be-focus-opacity":"12%","--be-selected-opacity":"8%","--be-text-main-opacity":"87%","--be-text-muted-opacity":"60%","--be-divider-opacity":"12%"}',
                'font' => NULL,
                'created_at' => '2024-04-11 19:25:03',
                'updated_at' => '2024-04-11 19:25:03',
            ),
        ]);
    }
}