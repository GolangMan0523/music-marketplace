<?php

namespace App\Services\Lyrics;

use Illuminate\Support\Facades\Http;
use Str;
use Symfony\Component\DomCrawler\Crawler;

class AzLyricsProvider implements LyricsProvider
{
    private $delimiter = '<!-- Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that. -->';

    public function getLyrics(
        string $artistName,
        string $trackName,
        string $albumName = null,
        int $durationInMs = null,
    ): ?array {
        $artistName = Str::slug($artistName, '');
        $trackName = Str::slug($trackName, '');

        $response = Http::withHeaders([
            'User-Agent' =>
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
            'Accept-Language' => 'en-US, en;q=0.5',
            'Content-Language' => 'en-us',
        ])->get("https://www.azlyrics.com/lyrics/$artistName/$trackName.html");

        $crawler = new Crawler($response->body());
        $result = null;
        $crawler
            ->filter('.main-page .row .text-center div')
            ->each(function (Crawler $node) use (&$result) {
                $text = $node->html();
                if (!$result && Str::contains($text, $this->delimiter)) {
                    $result = trim(str_replace($this->delimiter, '', $text));
                }
            });

        if ($result) {
            return ['plainLyric' => $result];
        }
    }
}
