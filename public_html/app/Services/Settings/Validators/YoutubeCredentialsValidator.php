<?php

namespace App\Services\Settings\Validators;

use App\Services\HttpClient;
use Common\Settings\Settings;
use Common\Settings\Validators\SettingsValidator;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class YoutubeCredentialsValidator implements SettingsValidator
{
    const KEYS = ['youtube_api_key', 'youtube.region_code'];

    /**
     * @var Settings
     */
    private $settings;

    /**
     * @var HttpClient
     */
    private $httpClient;

    public function __construct(Settings $settings)
    {
        $this->settings = $settings;
        $this->httpClient = new HttpClient([
            'headers' => ['Referer' => url('')],
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
            'exceptions' => true,
        ]);
    }

    public function fails($settings)
    {
        try {
            $response = Http::withHeaders(['Referer' => url('')])->get(
                'https://www.googleapis.com/youtube/v3/search',
                $this->getApiParams($settings),
            );
            if ($response->status() !== 200) {
                $response->throw();
            }
        } catch (RequestException $e) {
            return $this->getMessage($e);
        }
    }

    private function getApiParams($settings): array
    {
        $apiKey = Arr::get(
            $settings,
            'youtube_api_key',
            $this->settings->getRandom('youtube_api_key', ''),
        );
        $regionCode = Arr::get(
            $settings,
            'youtube.region_code',
            $this->settings->get('youtube.region_code', ''),
        );

        $apiKey = head(explode("\n", $apiKey));

        $params = [
            'q' => 'coldplay',
            'key' => $apiKey,
            'part' => 'snippet',
            'maxResults' => 1,
            'type' => 'video',
            'videoEmbeddable' => 'true',
            'videoCategoryId' => 10, //music
            'topicId' => '/m/04rlf', //music (all genres)
        ];

        if ($regionCode && $regionCode !== 'none') {
            $params['regionCode'] = strtoupper($regionCode);
        }

        return $params;
    }

    private function getMessage(RequestException $e): array
    {
        $errResponse = json_decode($e->response->body(), true);
        $reason = Arr::get($errResponse, 'error.errors.0.reason');
        $message = Arr::get($errResponse, 'error.errors.0.message');
        $defaultMsg =
            'Could not validate youtube API credentials. Please double check them.';
        if (
            $reason === 'accessNotConfigured' ||
            $reason === 'ipRefererBlocked'
        ) {
            return ['client.youtube_api_key' => $message ?: $defaultMsg];
        } elseif ($reason === 'keyInvalid') {
            return [
                'client.youtube_api_key' =>
                    'This youtube API key is not valid.',
            ];
        } elseif ($reason === 'invalidRegionCode') {
            return [
                'client.youtube.region_code' =>
                    'This youtube region code is not valid.',
            ];
        }

        return ['youtube_group' => $defaultMsg];
    }
}
