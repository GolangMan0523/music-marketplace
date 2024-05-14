<?php namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class IncrementModelViews
{
    public function execute(int $modelId, string $type): void
    {
        if (!$this->shouldIncrement($modelId, $type)) {
            return;
        }

        session()->put("{$type}-views.$modelId", Carbon::now()->timestamp);

        $this->incrementViews($modelId, $type);
    }

    private function shouldIncrement(int $modelId, string $type): bool
    {
        $views = session()->get("{$type}-views");

        // user has not viewed this model yet
        if (!$views || !isset($views[$modelId])) {
            return true;
        }

        // see if user last viewed this model over 10 hours ago
        $time = Carbon::createFromTimestamp($views[$modelId]);

        return Carbon::now()->diffInHours($time) > 10;
    }

    private function incrementViews(int $modelId, string $type): void
    {
        // use "DB" query builder so "updated_at" column is not updated
        switch ($type) {
            case 'artist':
                DB::table('artists')
                    ->where('id', $modelId)
                    ->increment('views');
                return;
            case 'album':
                DB::table('albums')
                    ->where('id', $modelId)
                    ->increment('views');
                return;
            case 'playlist':
                DB::table('playlists')
                    ->where('id', $modelId)
                    ->increment('views');
                return;
        }
    }
}
