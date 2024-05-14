<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Common\Comments\Comment;
use Common\Core\BaseController;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class WaveController extends BaseController
{
    public function __construct(
        protected Request $request,
        protected Track $track,
    ) {
    }

    public function show(Track $track)
    {
        $this->authorize('show', $track);

        try {
            $isDemoSite = config('common.site.demo');
            if ($isDemoSite && Str::contains($track->src, 'storage/samples')) {
                preg_match_all('!\d+!', $track->src, $matches);
                $trackId = $matches[0][0];
                $waveData = json_decode(
                    Storage::disk('local')->get("waves/{$trackId}.json"),
                    true,
                );
            } else {
                $waveData = json_decode(
                    $this->track
                        ->getWaveStorageDisk()
                        ->get("waves/$track->id.json"),
                    true,
                );
            }
        } catch (FileNotFoundException $e) {
            $waveData = [];
        }

        $comments = app(Comment::class)
            ->where('commentable_id', $track->id)
            ->where('commentable_type', Track::MODEL_TYPE)
            ->rootOnly()
            ->with('user')
            ->limit(30)
            ->groupBy('position')
            ->orderBy('position', 'asc')
            ->get();

        return $this->success([
            'waveData' => $waveData,
            'comments' => $comments,
        ]);
    }
}
