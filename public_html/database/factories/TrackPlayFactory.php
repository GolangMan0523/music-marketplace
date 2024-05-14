<?php

namespace Database\Factories;

use App\Models\TrackPlay;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class TrackPlayFactory extends Factory
{
    protected $model = TrackPlay::class;

    public function definition(): array
    {
        $period = CarbonPeriod::create(now()->subMonths(3), now());

        return [
            'created_at' => Arr::random($period->toArray()),
            'platform' => Arr::random([
                'AndroidOS',
                'iOS',
                'Windows',
                'OS X',
                'Linux',
            ]),
            'device' => Arr::random(['mobile', 'tablet', 'desktop']),
            'browser' => Arr::random([
                'chrome',
                'firefox',
                'edge',
                'internet explorer',
                'safari',
            ]),
            'location' => Arr::random([
                'US',
                'DE',
                'FR',
                'GB',
                'CA',
                'AU',
                'JP',
                'CN',
                'IN',
                'RU',
            ]),
        ];
    }
}
