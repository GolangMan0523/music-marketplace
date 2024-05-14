<?php

return [
    //backstage
    ['method' => 'POST', 'name' => 'backstage-request/{backstageRequest}/approve'],
    ['method' => 'POST', 'name' => 'backstage-request/{backstageRequest}/deny'],

    //artists
    ['method' => 'DELETE', 'name' => 'artists/{ids}'],
    ['method' => 'PUT', 'name' => 'artists/{artist}'],
    ['method' => 'POST', 'name' => 'artists'],

    //albums
    ['method' => 'DELETE', 'name' => 'albums/{ids}'],
    ['method' => 'PUT', 'name' => 'albums/{album}'],
    ['method' => 'POST', 'name' => 'albums'],

    //tracks
    ['method' => 'DELETE', 'name' => 'tracks/{ids}'],
    ['method' => 'PUT', 'name' => 'tracks/{id}'],
    ['method' => 'POST', 'name' => 'tracks'],

    //lyrics
    ['method' => 'DELETE', 'name' => 'lyrics/{ids}'],
    ['method' => 'PUT', 'name' => 'lyrics/{id}'],
    ['method' => 'POST', 'name' => 'lyrics'],

    //comments
    ['method' => 'DELETE', 'name' => 'comment/{ids}'],
    ['method' => 'PUT', 'name' => 'comment/{comment}'],
    ['method' => 'POST', 'name' => 'comments'],

    //playlists
    ['method' => 'DELETE', 'name' => 'playlists/{ids}'],

    //sitemap
    ['method' => 'POST', 'name' => 'admin/sitemap/generate'],

    // Genres
    ['method' => 'DELETE', 'name' => 'genres/{ids}'],
    ['method' => 'PUT', 'name' => 'genres/{id}'],
    ['method' => 'POST', 'name' => 'genres'],

    // Channels
    ['method' => 'POST', 'name' => 'channel/{channel}/detach-item'],
    ['method' => 'POST', 'name' => 'channel/{channel}/attach-item'],
    ['method' => 'POST', 'name' => 'channel/{channel}/change-order'],
    ['method' => 'POST', 'name' => 'channel'],
    ['method' => 'PUT', 'name' => 'channel/{channel}'],
    ['method' => 'DELETE', 'name' => 'channel/{channel}'],
];
