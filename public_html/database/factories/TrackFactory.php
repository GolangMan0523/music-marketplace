<?php

namespace Database\Factories;

use App\Models\Track;
use Illuminate\Database\Eloquent\Factories\Factory;

class TrackFactory extends Factory
{
    protected $model = Track::class;

    public function definition(): array
    {
        $sampleNumber = rand(1, 10);
        $durations = json_decode(
            file_get_contents(base_path('samples/tracks/durations.json')),
            true,
        );
        return [
            'name' => $this->faker->words(rand(2, 5), true),
            'number' => rand(1, 10),
            'duration' => $durations[$sampleNumber],
            'image' => $this->faker->imageUrl(240, 240),
            'src' => "storage/samples/{$sampleNumber}.mp3",
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'plays' => $this->faker->numberBetween(865, 596545),
            'description' =>
                $this->faker->text(750) .
                "\n\n Visit: demo-url.com
Visit my bandcamp: demo.bandcamp.com
See me on instagram: www.instagram.com/demo
Read me on twitter: www.twitter.com/demo",
        ];
    }
}
