<?php

namespace App\Http\Controllers;

use App\Models\User;
use Common\Core\BaseController;

class MinutesLimitController extends BaseController
{
    public function __invoke(User $user)
    {
        $this->authorize('show', $user);

        $maxMinutes = $user->getRestrictionValue('music.create', 'minutes');
        $minutesLeft = null;
        if (!is_null($maxMinutes)) {
            $usedMS = $user->uploadedTracks()->sum('duration');
            $usedMinutes = floor($usedMS / 60000);

            $minutesLeft = $maxMinutes - $usedMinutes;
        }

        return $this->success(['minutesLeft' => $minutesLeft]);
    }
}
