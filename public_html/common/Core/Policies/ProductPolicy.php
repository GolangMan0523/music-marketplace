<?php

namespace Common\Core\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProductPolicy extends BasePolicy
{
    public function index(?User $user): bool|Response
    {
        return settings('billing.enable') || $user->hasPermission('plans.view');
    }

    public function show(?User $user): bool|Response
    {
        return settings('billing.enable') || $user->hasPermission('plans.view');
    }

    public function store(User $user): bool|Response
    {
        return $user->hasPermission('plans.create');
    }

    public function update(User $user): bool|Response
    {
        return $user->hasPermission('plans.update');
    }

    public function destroy(User $user): bool|Response
    {
        return $user->hasPermission('plans.delete');
    }
}
