<?php

namespace App\Services\Settings\Validators;

use Common\Settings\Validators\SettingsValidator;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class WikipediaCredentialsValidator implements SettingsValidator
{
    const KEYS = ['wikipedia_language'];

    public function fails($values)
    {
        $lang = Arr::get($values, 'wikipedia_language', 'en');

        try {
            $response = Http::get(
                "https://$lang.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=foo-bar&redirects=1&exlimit=4",
            );
            if ($response->status() !== 200) {
                $response->throw();
            }
        } catch (RequestException $e) {
            return $this->getMessage($e);
        }
    }

    private function getMessage(RequestException $e): array
    {
        return [
            'client.wikipedia_language' =>
                'This wikipedia language is not valid.',
        ];
    }
}
