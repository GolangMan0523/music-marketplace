<?php

namespace Common\Notifications;

use App\Models\User;
use NotificationChannels\Fcm\FcmChannel;

trait GetsUserPreferredChannels
{
    /**
     * @param  User  $notifiable
     * @return array
     */
    public function via($notifiable): array
    {
        if (!config('common.site.notif_subs_integrated')) {
            return ['database', 'mail'];
        }

        $channels = [];
        if (
            $sub = $notifiable->notificationSubscriptions
                ->where('notif_id', static::NOTIF_ID)
                ->first()
        ) {
            foreach (array_filter($sub->channels) as $channel => $isSelected) {
                if ($channel === 'browser') {
                    $channels = array_merge($channels, [
                        'database',
                        'broadcast',
                    ]);
                } elseif ($channel === 'email') {
                    $channels[] = 'mail';
                } elseif ($channel === 'mobile') {
                    $channels[] = FcmChannel::class;
                } else {
                    $channels[] = $channel;
                }
            }
        }

        return $channels;
    }
}
