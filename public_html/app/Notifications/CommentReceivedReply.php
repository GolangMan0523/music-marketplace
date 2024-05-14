<?php

namespace App\Notifications;

use App\Models\Track;
use App\Services\UrlGenerator;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Str;

class CommentReceivedReply extends Notification
{
    use Queueable;

    public array $newComment;
    private array $originalComment;
    private array $track;
    private UrlGenerator $urlGenerator;

    public function __construct($newComment, $originalComment)
    {
        $this->newComment = $newComment;
        $this->originalComment = $originalComment;
        $track = app(Track::class)
            ->select(['name', 'id'])
            ->find($newComment['commentable_id']);
        $this->track = ['name' => $track->name, 'id' => $track->id];
        $this->urlGenerator = app(UrlGenerator::class);
    }

    public function via(): array
    {
        return ['database'];
    }

    public function toArray(): array
    {
        $username = $this->newComment['user']['display_name'];

        return [
            'image' => $this->originalComment['user']['avatar'],
            'mainAction' => [
                'action' => $this->urlGenerator->track($this->track),
            ],
            'lines' => [
                [
                    'content' => __(':username replied to your comment:', [
                        'username' => $username,
                    ]),
                    'action' => [
                        'action' => $this->urlGenerator->user(
                            $this->newComment['user'],
                        ),
                        'label' => __('View user'),
                    ],
                    'type' => 'secondary',
                ],
                [
                    'content' =>
                        '"' .
                        Str::limit($this->newComment['content'], 180) .
                        '"',
                    'type' => 'primary',
                ],
                [
                    'content' => __('on') . " {$this->track['name']}",
                    'type' => 'secondary',
                ],
            ],
        ];
    }
}
