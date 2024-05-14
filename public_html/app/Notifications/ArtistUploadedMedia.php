<?php

namespace App\Notifications;

use App\Models\Track;
use App\Services\UrlGenerator;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Arr;

class ArtistUploadedMedia extends Notification
{
    use Queueable;

    private UrlGenerator $urlGenerator;

    public function __construct(public $media)
    {
        $this->urlGenerator = app(UrlGenerator::class);
    }

    public function via(): array
    {
        return ['database', 'mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage())
            ->subject(
                __('New upload on :siteName', [
                    'siteName' => config('app.name'),
                ]),
            )
            ->line($this->getFirstLine())
            ->line($this->media['name'])
            ->action(__('View Now'), $this->getMainAction());
    }

    public function toArray(): array
    {
        return [
            'image' => $this->getImage(),
            'mainAction' => [
                'action' => $this->getMainAction(),
                'label' => is_a($this->media, Track::class)
                    ? 'View Track'
                    : 'View Album',
            ],
            'lines' => [
                [
                    'content' => $this->getFirstLine(),
                    'type' => 'secondary',
                ],
                [
                    'content' => $this->media['name'],
                    'icon' => 'play-arrow',
                    'type' => 'primary',
                ],
            ],
        ];
    }

    public function getFirstLine()
    {
        $artistName = $this->getArtist()['name'];
        $type = is_a($this->media, Track::class) ? 'track' : 'album';
        return __(":artistName uploaded a new $type", [
            'artistName' => $artistName,
        ]);
    }

    public function getImage()
    {
        if (is_a($this->media, Track::class)) {
            return $this->media['image'] ?:
                Arr::get($this->media, 'album.image');
        } else {
            return $this->media['image'];
        }
    }

    public function getArtist()
    {
        return $this->media['artists'][0];
    }

    public function getMainAction()
    {
        if (is_a($this->media, Track::class)) {
            return $this->urlGenerator->track($this->media);
        } else {
            return $this->urlGenerator->album($this->media);
        }
    }
}
