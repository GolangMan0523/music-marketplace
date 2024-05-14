<?php

namespace App\Notifications;

use App\Models\BackstageRequest;
use App\Services\UrlGenerator;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BackstageRequestWasHandled extends Notification
{
    use Queueable;

    public function __construct(
        protected BackstageRequest $backstageRequest,
        protected ?string $notes,
    ) {
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        $subject = $this->backstageRequest->status === 'approved'
            ? __(':siteName backstage request was approved', ['siteName' => config('app.name')])
            : __(':siteName backstage request was denied', ['siteName' => config('app.name')]);

        $message = (new MailMessage())
            ->greeting(
                __('Hi :name,', [
                    'name' => $this->backstageRequest->user->display_name,
                ]),
            )
            ->subject($subject)
            ->line($this->getStatusMessage());

        if ($this->notes) {
            $message->line($this->notes);
        }

        return $message->action(
            __('Open artist profile'),
            $this->getMainAction(),
        );
    }

    public function toArray(): array
    {
        return [
            'mainAction' => [
                'action' => $this->getMainAction(),
                'label' => __('Open artist profile'),
            ],
            'lines' => [
                [
                    'content' => $this->getStatusMessage(),
                    'type' => 'primary',
                ],
            ],
        ];
    }

    private function getMainAction(): string
    {
        return $this->backstageRequest->artist
            ? app(UrlGenerator::class)->artist($this->backstageRequest->artist)
            : app(UrlGenerator::class)->home();
    }

    private function getStatusMessage(): string
    {
       return match ($this->backstageRequest->status) {
            'approved' => __('Your backstage request was approved.'),
            'denied' => __('Your backstage request was denied.'),
        };
    }
}
