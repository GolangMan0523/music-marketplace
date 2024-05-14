<?php

use Common\Channels\LoadChannelMenuItems;

return [
    [
        'name' => 'Channel',
        'type' => 'channels',
        'itemsLoader' => LoadChannelMenuItems::class,
    ],
];
