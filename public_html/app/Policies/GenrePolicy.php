<?php

namespace App\Policies;

use App\Models\User;
use Common\Core\Policies\BasePolicy;

class GenrePolicy extends BasePolicy
{
    public function index(?User $user)
    {
        return $this->hasPermission($user, 'genres.view') ||
            $this->hasPermission($user, 'music.view');
    }

    public function show(?User $user)
    {
        return $this->hasPermission($user, 'genres.view') ||
            $this->hasPermission($user, 'music.view');
    }

    public function store(User $user)
    {
        return $user->hasPermission('genres.create') ||
            $user->hasPermission('music.create');
    }

    public function update(User $user)
    {
        return $user->hasPermission('genres.update') ||
            $user->hasPermission('music.update');
    }

    public function destroy(User $user)
    {
        return $user->hasPermission('genres.delete') ||
            $user->hasPermission('music.delete');
    }
}
