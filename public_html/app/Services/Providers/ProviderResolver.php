<?php namespace App\Services\Providers;

use Illuminate\Support\Str;

class ProviderResolver
{
    protected array $defaults = [
        'artist' => 'local',
        'album' => 'local',
        'search' => 'local',
        'audio_search' => 'youtube',
        'genreArtists' => 'local',
        'radio' => 'spotify',
    ];

    public function get(string $contentType)
    {
        $preferredProvider = $this->resolvePreferredProviderFromSettings(
            $contentType,
        );

        // make fully qualified provider class name
        $namespace = $this->getNamespace($contentType, $preferredProvider);

        if (!$contentType || !class_exists($namespace)) {
            $namespace = $this->getNamespace(
                $contentType,
                $this->defaults[$contentType],
            );
        }
        return app($namespace);
    }

    public function resolvePreferredProviderFromSettings(string $type): string
    {
        return settings(
            Str::snake($type . '_provider'),
            $this->defaults[$type],
        );
    }

    private function getNamespace(string $type, string $provider): ?string
    {
        if (!$type || !$provider) {
            return null;
        }

        // audio_search => audioSearch
        $type = Str::camel($type);

        // track:top => TopTracks
        $words = array_map(function ($word) {
            return ucfirst($word);
        }, array_reverse(explode(':', $type)));
        $words = array_filter($words, function ($word) {
            return !Str::startsWith($word, '$');
        });
        $type = join('', $words);
        if (count($words) > 1) {
            $type = Str::plural($type);
        }

        $provider = ucfirst(Str::camel($provider));
        return 'App\Services\Providers\\' .
            $provider .
            '\\' .
            $provider .
            $type;
    }
}
