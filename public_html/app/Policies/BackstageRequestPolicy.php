<?php

namespace App\Policies;

use App\Models\BackstageRequest;
use App\Models\User;
use Common\Core\Policies\BasePolicy;

class BackstageRequestPolicy extends BasePolicy
{
    public function index(User $user, $userId = null)
    {
        return $this->hasPermission($user, 'backstageRequests.view') ||
            $user->id === (int) $userId;
    }

    public function show(User $user, BackstageRequest $backstageRequest)
    {
        return $this->hasPermission($user, 'backstageRequests.view') ||
            $backstageRequest->user_id === $user->id;
    }

    public function store(User $user)
    {
        return $this->hasPermission($user, 'backstageRequests.create');
    }

    public function update(User $user, BackstageRequest $backstageRequest)
    {
        return $user->hasPermission('backstageRequests.update') ||
            $backstageRequest->user_id === $user->id;
    }

    public function destroy(User $user, $backstageRequestIds)
    {
        if ($user->hasPermission('backstageRequests.delete')) {
            return true;
        } else {
            $dbCount = app(BackstageRequest::class)
                ->whereIn('id', $backstageRequestIds)
                ->where('user_id', $user->id)
                ->count();
            return $dbCount === count($backstageRequestIds);
        }
    }

    public function handle(User $user)
    {
        return $user->hasPermission('backstageRequests.handle');
    }
}
