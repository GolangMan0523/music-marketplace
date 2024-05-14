<?php namespace App\Services\Providers\Youtube;

use App\Models\Track;
use App\Services\HttpClient;
use Common\Settings\Settings;
use GuzzleHttp\Exception\ConnectException;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;

class YoutubeAudioSearch
{
    public function __construct(protected Settings $settings)
    {
    }

    public function search(
        int $trackId,
        string $artistName,
        string $trackName,
    ): array {
        // track and artist name is double encoded on the frontend
        // as laravel does not support encoded forward slashes in url
        $artistName = urldecode($artistName);
        $trackName = urldecode($trackName);

        if ($this->settings->get('youtube.search_method') === 'site') {
            $results = $this->viaScraping($artistName, $trackName);
        } else {
            $results = $this->viaApi($artistName, $trackName);
        }

        if ($this->settings->get('youtube.store_id') && count($results)) {
            app(Track::class)
                ->where('id', $trackId)
                ->whereNull('src')
                ->update(['src' => $results[0]['id']]);
        }

        return $results;
    }

    private function viaScraping(string $artistName, string $trackName): array
    {
        $query = $this->buildYoutubeSearchQuery($artistName, $trackName, true);
        $client = new HttpClient([
            'exceptions' => true,
            'User-Agent' =>
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
            'Accept-Language' => 'en-US, en;q=0.5',
            'Content-Language' => 'en-us',
        ]);
        $youtubeUrl = "https://www.youtube.com/results?search_query=$query";

        $html = $client->get($youtubeUrl);

        // YouTube search results page was not rendered yet, need to extract json
        if (Str::contains($html, 'ytInitialData')) {
            $crawler = new Crawler($html);
            foreach ($crawler->filter('script')->getIterator() as $node) {
                $html = $node->textContent;
                if (Str::contains($html, 'ytInitialData')) {
                    //remove whitespace
                    $html = preg_replace('/\s+/', '', $html);
                    $html = Str::after($html, 'ytInitialData=');
                    $html = trim($html, ';');
                    $json = json_decode($html, true);
                    $contents = Arr::first(
                        $json['contents']['twoColumnSearchResultsRenderer'][
                            'primaryContents'
                        ],
                    )['contents'];
                    $results = Arr::first($contents, function ($content) {
                        return !array_key_exists(
                            'carouselAdRenderer',
                            Arr::first(Arr::first(Arr::first($content))),
                        );
                    });
                    $results = Arr::first(Arr::first($results));

                    $results = array_filter($results, function ($result) {
                        return isset($result['videoRenderer']);
                    });
                    $results = array_slice($results, 0, 3);
                    $results = array_map(function ($result) use ($json) {
                        $result = $result['videoRenderer'];
                        return [
                            'title' => $result['title']['runs'][0]['text'],
                            'id' => $result['videoId'],
                        ];
                    }, $results);
                    break;
                }
            }

            // YouTube search results page was rendered, can crawl html
        } else {
            $results = [];
            $crawler = new Crawler($html);
            $crawler
                ->filter('#results [data-context-item-id]')
                ->slice(0, 3)
                ->each(function (Crawler $node) use (&$results) {
                    $videoId = head($node->extract(['data-context-item-id']));
                    $title = head(
                        $node->filter('a[title]')->extract(['_text']),
                    );
                    $results[] = ['title' => $title, 'id' => $videoId];
                });
        }

        // sort the array so that videos that are likely for full album or playlist are at the end
        $barWords = ['full album', 'album playlist'];
        usort($results, function ($a, $b) use ($barWords) {
            $aContainsFullAlbum = Str::contains($a['title'], $barWords, true);
            $bContainsFullAlbum = Str::contains($b['title'], $barWords, true);
            return $aContainsFullAlbum <=> $bContainsFullAlbum;
        });

        return $results;
    }

    /**
     * Use YouTube data api to find a video for specified track.
     */
    private function viaApi(string $artistName, string $trackName)
    {
        $params = $this->getParams($artistName, $trackName);
        $client = new HttpClient([
            'headers' => ['Referer' => url('')],
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
            'exceptions' => true,
        ]);

        try {
            $response = $client->get('search', ['query' => $params]);
        } catch (ConnectException $e) {
            // connection timeouts happen sometimes,
            // there's no need to do anything extra
            return [];
        }

        return array_map(function ($item) {
            return [
                'title' => $item['snippet']['title'],
                'id' => $item['id']['videoId'],
            ];
        }, Arr::get($response, 'items'));
    }

    private function getParams($artist, $track)
    {
        $params = [
            'q' => $this->buildYoutubeSearchQuery($artist, $track),
            'key' => $this->settings->getRandom('youtube_api_key'),
            'part' => 'snippet',
            'fields' => 'items(id(videoId), snippet(title))',
            'maxResults' => 3,
            'type' => 'video',
            'videoEmbeddable' => 'true',
            'videoCategoryId' => 10, //music
            'topicId' => '/m/04rlf', //music (all genres)
        ];

        if ($regionCode = $this->settings->get('youtube.region_code')) {
            $params['regionCode'] = strtoupper($regionCode);
        }

        return $params;
    }

    private function buildYoutubeSearchQuery(
        string $artist,
        string $track,
        bool $encode = false,
    ): string {
        $append = '';

        //if "live" track is not being requested, append "video" to search
        //query to prefer music videos over lyrics and live videos.
        if (!Str::contains(strtolower($track), '- live')) {
            //$append = 'video';
        }

        $artist = $encode ? urlencode($artist) : $artist;
        $track = $encode ? urlencode($track) : $track;
        return trim("$artist+$track+$append");
    }
}
