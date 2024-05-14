<?php

namespace Common\Core\Bootstrap;

use App\Models\User;
use Common\Localizations\Localization;
use Illuminate\Support\Str;
use Spatie\Color\Hex;
use Spatie\Color\Rgb;

class MobileBootstrapData extends BaseBootstrapData
{
    public function init(): self
    {
        $cssThemes = $this->getThemes()['all'];
        $themes = [
            'light' => $cssThemes
                ->where('default_light', true)
                ->first()
                ->toArray(),
            'dark' => $cssThemes
                ->where('default_dark', true)
                ->first()
                ->toArray(),
        ];

        $themes['light']['values'] = $this->mapColorsToRgba(
            $themes['light']['values'],
        );
        $themes['dark']['values'] = $this->mapColorsToRgba(
            $themes['dark']['values'],
        );

        $this->data = [
            'themes' => $themes,
            'user' => $this->getCurrentUser(),
            'menus' => $this->getMobileMenus(),
            'settings' => [
                'social.google.enable' => (bool) $this->settings->get(
                    'social.google.enable',
                ),
            ],
            'locales' => Localization::get(),
        ];

        $this->logActiveSession();

        return $this;
    }

    public function refreshToken(string $deviceName): self
    {
        /* @var User $user */
        $user = $this->data['user'];
        if ($user) {
            $user['access_token'] = $user->refreshApiToken($deviceName);
            $this->loadFcmToken($user);
        }
        return $this;
    }

    public function getCurrentUser(): ?User
    {
        /* @var User $user */
        if ($user = $this->request->user()) {
            return $this->loadFcmToken($user);
        }
        return null;
    }

    private function getMobileMenus(): array
    {
        return array_values(
            array_filter(
                settings('menus'),
                fn($menu) => collect($menu['positions'])->some(
                    fn($position) => Str::startsWith($position, 'mobile-app'),
                ),
            ),
        );
    }

    private function mapColorsToRgba(array $colors): array
    {
        if (!class_exists(Hex::class)) {
            return $colors;
        }

        $valuesToSkip = [
            '--be-navbar-color',
            '--be-button-radius',
            '--be-input-radius',
            '--be-panel-radius',
        ];

        return collect($colors)
            ->map(function ($value, $name) use ($valuesToSkip) {
                if (in_array($name, $valuesToSkip)) {
                    return $value;
                } elseif (str_ends_with($value, '%')) {
                    return (int) str_replace('%', '', $value);
                } else {
                    $value = str_replace(' ', ',', $value);
                    $rgb = Rgb::fromString("rgb($value)");
                    return [$rgb->red(), $rgb->green(), $rgb->blue(), 1.0];
                }
            })
            ->toArray();
    }

    private function loadFcmToken(User $user): User
    {
        if (method_exists($user, 'loadFcmToken')) {
            $user->loadFcmToken();
        }
        return $user;
    }
}
