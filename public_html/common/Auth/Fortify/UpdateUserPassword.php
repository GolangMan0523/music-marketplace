<?php

namespace Common\Auth\Fortify;

use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\UpdatesUserPasswords;

class UpdateUserPassword implements UpdatesUserPasswords
{
    use PasswordValidationRules;

    public function update($user, array $input)
    {
        Validator::make(
            $input,
            [
                'current_password' => [
                    'required',
                    'string',
                    'current_password:web',
                ],
                'password' => $this->passwordRules(),
            ],
            [
                'current_password.current_password' => __(
                    'The provided password does not match your current password.',
                ),
            ],
        )->validateWithBag('updatePassword');

        $user
            ->forceFill([
                'password' => $input['password'],
            ])
            ->save();
    }
}
