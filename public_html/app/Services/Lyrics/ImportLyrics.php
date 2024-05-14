<?php

namespace App\Services\Lyrics;

use App\Models\Lyric;
use App\Models\Track;

class ImportLyrics
{
    public function execute(int $trackId, int $duration = null): ?Lyric
    {
        $track = Track::with('album.artists')->findOrFail($trackId);
        $trackName = $track->name;
        $artistName = $track->artists->first()['name'];
        $albumName = $track->album->name ?? null;

        // Peace Sells - 2011 Remastered => Peace Sells
        $trackName = preg_replace('/ - [0-9]{4} Remastered/', '', $trackName);

        // Zero - From the Original Motion Picture "Ralph Breaks The Internet" => Zero
        $trackName = preg_replace(
            '/- From the Original Motion Picture.*?$/',
            '',
            $trackName,
        );

        // South of the Border (feat. Camila Cabello & Cardi B) => South of the Border
        $trackName = trim(explode('(feat.', $trackName)[0]);

        $providers = [LrclibLyricsProvider::class, GoogleLyricsProvider::class];

        $result = null;
        foreach ($providers as $provider) {
            $data = app($provider)->getLyrics(
                $artistName,
                $trackName,
                $albumName,
                $duration ?? $track->duration,
            );
            if (!empty($data)) {
                $result = $data;
                break;
            }
        }

        if ($result) {
            return Lyric::create([
                'track_id' => $trackId,
                'text' => $result['syncedLyric'] ?? $result['plainLyric'],
                'is_synced' => isset($result['syncedLyric']),
                'duration' => $result['duration'] ?? null,
            ]);
        }

        return null;
    }
}
