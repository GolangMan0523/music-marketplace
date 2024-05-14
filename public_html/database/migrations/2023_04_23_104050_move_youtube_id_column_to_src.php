<?php

use App\Models\Track;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        $tracks = Track::whereNotNull('youtube_id')
            ->whereNull('src')
            ->cursor();

        foreach ($tracks as $track) {
            $track->src = $track->youtube_id;
            $track->youtube_id = null;
            $track->save();
        }
    }

    public function down()
    {
        //
    }
};
