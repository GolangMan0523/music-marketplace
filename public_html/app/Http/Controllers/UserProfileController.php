<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserProfile;
use Common\Auth\Events\UserAvatarChanged;
use Common\Core\BaseController;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends BaseController
{
    public function show(User $user)
    {
        $this->authorize('show', $user);

        $user
            ->load(['profile', 'links'])
            ->loadCount(['followers', 'followedUsers'])
            ->setGravatarSize(220);

        if (!$user->getRelation('profile')) {
            $user->setRelation('profile', new UserProfile());
        }

        $loader = request('loader', 'userProfilePage');

        return $this->renderClientOrApi([
            'pageName' =>
                $loader === 'userProfilePage' ? 'user-profile-page' : null,
            'data' => [
                'user' => $user,
                'loader' => $loader,
            ],
        ]);
    }

    public function update()
    {
        $user = Auth::user();
        $this->authorize('update', $user);

        $userData = request('user');

        $profileData = request('profile');

        User::unguard(true);
        $oldAvatar = $user->avatar;
        $user->fill($userData)->save();

        if (isset($userData['avatar']) && $oldAvatar !== $userData['avatar']) {
            event(new UserAvatarChanged($user));
        }

        $profile = $user
            ->profile()
            ->updateOrCreate(['user_id' => $user->id], $profileData);

        $user->links()->delete();
        $links = $user->links()->createMany(request('links'));

        $user->setRelation('profile', $profile);
        $user->setRelation('links', $links);

        return $this->success(['user' => $user]);
    }
}
