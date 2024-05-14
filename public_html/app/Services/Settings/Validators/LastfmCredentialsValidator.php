<?php

namespace App\Services\Settings\Validators;

use Common\Settings\Validators\SettingsValidator;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class LastfmCredentialsValidator implements SettingsValidator
{
    const KEYS = ['lastfm_api_key'];

    public function fails($values)
    {
        $apiKey = Arr::get($values, 'lastfm_api_key');

        try {
            $response = Http::get(
                "https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=$apiKey&format=json",
            );
            if ($response->status() !== 200) {
                $response->throw();
            }
        } catch (RequestException $e) {
            $errResponse = $e->response->json();
            return $this->getMessage($errResponse);
        }
    }

    private function getMessage(array $errResponse): array
    {
        if (Str::contains($errResponse['message'], 'Invalid API key')) {
            return [
                'server.lastfm_api_key' => 'This Last.FM API key is not valid.',
            ];
        } else {
            return [
                'server.lastfm_api_key' =>
                    'Could not validate this Last.FM API key, please try again later.',
            ];
        }
    }
}
