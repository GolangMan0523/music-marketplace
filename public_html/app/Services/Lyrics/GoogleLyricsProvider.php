<?php

namespace App\Services\Lyrics;

use Exception;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class GoogleLyricsProvider implements LyricsProvider
{
    public function getLyrics(
        string $artistName,
        string $trackName,
        string $albumName = null,
        int $durationInMs = null,
    ): ?array {
        try {
            $response = Http::withCookies(['CONSENT' => 'YES+'], '.google.com')
                ->withHeaders([
                    'User-Agent' =>
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
                    'Accept-Language' => 'en-US, en;q=0.5',
                    'Content-Language' => 'en-us',
                ])
                ->get(
                    "https://www.google.com/search?q=$artistName+$trackName+lyrics",
                );
            $crawler = new Crawler($response->body());

            $html = $crawler
                ->filter('[data-lyricid] > div > div')
                ->eq(1)
                ->html();

            if ($html) {
                return [
                    'plainLyric' => strip_tags($html, '<br>'),
                ];
            }
        } catch (Exception $e) {
            //
        }

        return null;
    }
}
