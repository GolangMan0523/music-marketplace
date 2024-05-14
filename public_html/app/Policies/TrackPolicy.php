<?php

namespace App\Policies;

use App\Models\Track;
use App\Models\User;
use Common\Core\Policies\BasePolicy;
use Common\Settings\Settings;
use Illuminate\Database\Eloquent\Builder;

class TrackPolicy extends BasePolicy
{
    public function index(?User $user)
    {
        return $this->hasPermission($user, 'tracks.view') ||
            $this->hasPermission($user, 'music.view');
    }

    public function show(?User $user, Track $track)
    {
        if ($track->owner_id === $user->id) {
            return true;
        } elseif (
            $this->hasPermission($user, 'tracks.view') ||
            $this->hasPermission($user, 'music.view')
        ) {
            return true;
        } elseif ($user) {
            $managedArtists = $user->artists()->pluck('artists.id');
            $trackArtists = $track->artists->pluck('pivot.artist_id');
            return $trackArtists->intersect($managedArtists)->isNotEmpty();
        }
        return false;
    }

    public function store(User $user)
    {
        // user can't create tracks at all
        if (
            !$this->hasPermission($user, 'tracks.create') &&
            !$this->hasPermission($user, 'music.create')
        ) {
            return false;
        }

        // user is admin, can ignore count restriction
        if ($this->hasPermission($user, 'admin')) {
            return true;
        }

        // user does not have any restriction on track minutes
        $maxMinutes = $user->getRestrictionValue('music.create', 'minutes');
        if (is_null($maxMinutes)) {
            return true;
        }

        $usedMS = $user->uploadedTracks()->sum('duration');
        $usedMinutes = floor($usedMS / 60000);

        // check if user did not go over their max quota
        if ($usedMinutes >= $maxMinutes) {
            $this->deny(__('policies.minutes_exceeded'), [
                'showUpgradeButton' => true,
            ]);
        }

        return true;
    }

    public function update(User $user, Track $track)
    {
        if ($track->owner_id === $user->id) {
            return true;
        } elseif (
            $this->hasPermission($user, 'tracks.update') ||
            $this->hasPermission($user, 'music.update')
        ) {
            return true;
        } elseif ($user) {
            $managedArtists = $user->artists()->pluck('artists.id');
            $trackArtists = $track->artists->pluck('pivot.artist_id');
            return $trackArtists->intersect($managedArtists)->isNotEmpty();
        }
        return false;
    }

    public function destroy(User $user, $trackIds)
    {
        if (
            $this->hasPermission($user, 'tracks.delete') ||
            $this->hasPermission($user, 'music.delete')
        ) {
            return true;
        } else {
            $managedArtists = $user->artists()->pluck('artists.id');
            $dbCount = Track::whereIn('tracks.id', $trackIds)
                ->where(function (Builder $builder) use (
                    $user,
                    $managedArtists,
                    $trackIds,
                ) {
                    $builder->where('owner_id', $user->id)->orWhereHas(
                        'artists',
                        function (Builder $builder) use ($managedArtists) {
                            $builder->whereIn('artists.id', $managedArtists);
                        },
                        '=',
                        count($trackIds),
                    );
                })
                ->count();
            return $dbCount === count($trackIds);
        }
    }

    public function download(?User $user, Track $track)
    {
        return app(Settings::class)->get('player.enable_download') &&
            $this->hasPermission($user, 'music.download');
    }
}
