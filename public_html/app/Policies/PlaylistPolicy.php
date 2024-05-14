<?php

namespace App\Policies;

use App\Models\Playlist;
use App\Models\User;
use Common\Core\Policies\BasePolicy;
use Illuminate\Database\Eloquent\Collection;

class PlaylistPolicy extends BasePolicy
{
    public function index(?User $user, $userId = null)
    {
        return $this->hasPermission($user, 'playlists.view') ||
            ($user && $user->id === (int) $userId);
    }

    public function show(?User $user, Playlist $playlist)
    {
        return ($playlist->public && $this->hasPermission($user, 'playlists.view')) ||
            $playlist->editors->contains('id', $user->id);
    }

    public function store(User $user)
    {
        return $this->hasPermission($user, 'playlists.create');
    }

    public function update(User $user, Playlist $playlist)
    {
        return $this->hasPermission($user, 'playlists.update') ||
            $playlist->owner_id === $user->id ||
            $playlist->editors->contains('id', $user->id);
    }

    public function modifyTracks(User $user, Playlist $playlist)
    {
        return $playlist->collaborative ||
            $playlist->editors->contains('id', $user->id);
    }

    public function destroy(User $user, Collection $playlists)
    {
        if ($user->hasPermission('playlists.delete')) {
            return true;
        }

        return $playlists
            ->filter(function (Playlist $playlist) use ($user) {
                return !$playlist->editors->contains('id', $user->id);
            })
            ->count() === 0;
    }
}
