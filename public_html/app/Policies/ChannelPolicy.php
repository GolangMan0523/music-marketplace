<?php namespace App\Policies;

use App\Models\Channel;
use App\Models\User;
use Common\Core\Policies\BasePolicy;

class ChannelPolicy extends BasePolicy
{
    public function index(?User $user, $userId = null)
    {
        return $user->hasPermission('channels.view') ||
            $user->id === (int) $userId;
    }

    public function show(?User $user, ?Channel $channel = null)
    {
        return $user->hasPermission('channels.view') ||
            $user->hasPermission('music.view') ||
            $channel?->user_id === $user->id;
    }

    public function store(User $user)
    {
        return $user->hasPermission('channels.create');
    }

    public function update(User $user, ?Channel $channel = null)
    {
        return $user->hasPermission('channels.update') ||
            $channel?->user_id === $user->id;
    }

    public function destroy(User $user, $channelIds = null)
    {
        if ($user->hasPermission('channels.delete')) {
            return true;
        } else {
            $dbCount = app(Channel::class)
                ->whereIn('id', $channelIds)
                ->where('user_id', $user->id)
                ->count();
            return $dbCount === count($channelIds);
        }
    }
}
