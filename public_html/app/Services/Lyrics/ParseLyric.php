<?php

namespace App\Services\Lyrics;

use App\Models\Lyric;

class ParseLyric
{
    public function execute(Lyric $lyric): array
    {
        $lines = explode("\n", $lyric->text);
        $response = [
            'is_synced' => $lyric->is_synced,
            'duration' => $lyric->duration,
        ];

        if ($lyric->is_synced) {
            $pattern = '/\[(\d{2}):(\d{2})\.(\d{2})\](.+)/';
            $syncedLines = [];

            foreach ($lines as $line) {
                if (preg_match($pattern, $line, $matches)) {
                    $minutes = intval($matches[1]);
                    $seconds = intval($matches[2]);
                    $milliseconds = intval($matches[3]);
                    $text = $matches[4];

                    $timeInSeconds =
                        $minutes * 60 + $seconds + $milliseconds / 100;

                    $syncedLines[] = [
                        'time' => $timeInSeconds,
                        'text' => trim($text),
                    ];
                }
            }

            $response['lines'] = $syncedLines;
        } else {
            $response['lines'] = array_map(
                fn($line) => ['text' => trim($line)],
                $lines,
            );
        }

        return $response;
    }
}
