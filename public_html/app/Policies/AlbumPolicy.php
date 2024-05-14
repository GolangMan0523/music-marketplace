<?php

namespace App\Policies;

use App\Models\Album;
use App\Models\User;
use Common\Core\Policies\BasePolicy;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Builder;

class AlbumPolicy extends BasePolicy
{
    use HandlesAuthorization;

    public function index(?User $user)
    {
        return $this->hasPermission($user, 'albums.view') ||
            $this->hasPermission($user, 'music.view');
    }

    public function show(?User $user, Album $album)
    {
        if ($album->owner_id === $user->id) {
            return true;
        } elseif (
            $this->hasPermission($user, 'albums.view') ||
            $this->hasPermission($user, 'music.view')
        ) {
            return true;
        } else {
            $managedArtists = $user->artists()->pluck('artists.id');
            $albumArtists = $album->artists->pluck('pivot.artist_id');
            return $albumArtists->intersect($managedArtists)->isNotEmpty();
        }
    }

    public function store(User $user)
    {
        return $this->hasPermission($user, 'albums.create') ||
            $this->hasPermission($user, 'music.create');
    }

    public function update(User $user, Album $album)
    {
        if ($album->owner_id === $user->id) {
            return true;
        } elseif (
            $this->hasPermission($user, 'albums.update') ||
            $this->hasPermission($user, 'music.update')
        ) {
            return true;
        } else {
            $managedArtists = $user->artists()->pluck('artists.id');
            $albumArtists = $album->artists->pluck('pivot.artist_id');
            return $albumArtists->intersect($managedArtists)->isNotEmpty();
        }
    }

    public function destroy(User $user, $albumIds)
    {
        if (
            $this->hasPermission($user, 'albums.delete') ||
            $this->hasPermission($user, 'music.delete')
        ) {
            return true;
        } else {
            $managedArtists = $user->artists()->pluck('artists.id');
            $dbCount = Album::whereIn('albums.id', $albumIds)
                ->where(function (Builder $builder) use (
                    $user,
                    $managedArtists,
                    $albumIds,
                ) {
                    $builder->where('owner_id', $user->id)->orWhereHas(
                        'artists',
                        function (Builder $builder) use ($managedArtists) {
                            $builder->whereIn('artists.id', $managedArtists);
                        },
                        '=',
                        count($albumIds),
                    );
                })
                ->count();
            return $dbCount === count($albumIds);
        }
    }
}
