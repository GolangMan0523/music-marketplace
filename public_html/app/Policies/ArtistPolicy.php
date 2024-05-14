<?php

namespace App\Policies;

use App\Models\Artist;
use App\Models\User;
use Common\Core\Policies\BasePolicy;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArtistPolicy extends BasePolicy
{
    use HandlesAuthorization;

    public function index(?User $user)
    {
        return $this->hasPermission($user, 'artists.view') ||
            $this->hasPermission($user, 'music.view');
    }

    public function show(?User $user, Artist $artist)
    {
        return $this->hasPermission($user, 'artists.view') ||
            $this->hasPermission($user, 'music.view') ||
            $user
                ->artists()
                ->pluck('artists.id')
                ->contains($artist->id);
    }

    public function store(User $user)
    {
        return $this->hasPermission($user, 'artists.create') ||
            $this->hasPermission($user, 'music.create');
    }

    public function update(User $user, Artist $artist)
    {
        return $this->hasPermission($user, 'artists.update') ||
            $this->hasPermission($user, 'music.update') ||
            $user
                ->artists()
                ->pluck('artists.id')
                ->contains($artist->id);
    }

    public function destroy(User $user, array $artistIds)
    {
        if (
            $this->hasPermission($user, 'artists.delete') ||
            $this->hasPermission($user, 'music.delete')
        ) {
            return true;
        } else {
            $managedArtists = $user->artists()->pluck('artists.id');
            $dbArtists = Artist::whereIn('artists.id', $artistIds)->pluck(
                'artists.id',
            );
            return $dbArtists->intersect($managedArtists)->count() ===
                count($artistIds);
        }
    }
}
