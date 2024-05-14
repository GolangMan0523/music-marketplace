<?php

return [
    // logos
    [
        'name' => 'branding.logo_dark',
        'value' => 'images/logo-dark.svg',
    ],
    [
        'name' => 'branding.logo_light',
        'value' => 'images/logo-light.svg',
    ],

    //homepage
    ['name' => 'homepage.type', 'value' => 'channel'],
    ['name' => 'homepage.value', 'value' => 5],

    //cache
    ['name' => 'cache.report_minutes', 'value' => 60],
    ['name' => 'cache.homepage_days', 'value' => 1],
    ['name' => 'automation.artist_interval', 'value' => 7],

    //providers
    ['name' => 'artist_bio_provider', 'value' => 'wikipedia'],
    ['name' => 'wikipedia_language', 'value' => 'en'],

    //player
    ['name' => 'youtube.suggested_quality', 'value' => 'default'],
    ['name' => 'youtube.region_code', 'value' => 'us'],
    ['name' => 'youtube.search_method', 'value' => 'site'],
    ['name' => 'youtube.store_id', 'value' => false],
    ['name' => 'player.default_volume', 'value' => 30],
    ['name' => 'player.hide_queue', 'value' => 0],
    ['name' => 'player.hide_video', 'value' => 0],
    ['name' => 'player.hide_video_button', 'value' => 0],
    ['name' => 'player.hide_lyrics', 'value' => 0],
    ['name' => 'player.lyrics_automate', 'value' => 0],
    ['name' => 'player.mobile.auto_open_overlay', 'value' => 1],
    ['name' => 'player.enable_download', 'value' => 0],
    ['name' => 'player.sort_method', 'value' => 'external'],
    ['name' => 'player.seekbar_type', 'value' => 'line'],
    ['name' => 'player.track_comments', 'value' => false],
    ['name' => 'player.show_upload_btn', 'value' => false],
    ['name' => 'uploads.autoMatch', 'value' => true],
    ['name' => 'player.default_artist_view', 'value' => 'list'],
    ['name' => 'player.enable_repost', 'value' => false],
    [
        'name' => 'artistPage.tabs',
        'value' => json_encode([
            ['id' => 1, 'active' => true],
            ['id' => 2, 'active' => true],
            ['id' => 3, 'active' => true],
            ['id' => 4, 'active' => false],
            ['id' => 5, 'active' => false],
            ['id' => 6, 'active' => false],
        ]),
    ],

    //menus
    [
        'name' => 'menus',
        'value' => json_encode([
            [
                'name' => 'Primary',
                'id' => 'wGixKn',
                'positions' => ['sidebar-primary'],
                'items' => [
                    [
                        'type' => 'route',
                        'label' => 'Popular Albums',
                        'action' => '/popular-albums',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M12 16.5q1.875 0 3.188-1.312Q16.5 13.875 16.5 12q0-1.875-1.312-3.188Q13.875 7.5 12 7.5q-1.875 0-3.188 1.312Q7.5 10.125 7.5 12q0 1.875 1.312 3.188Q10.125 16.5 12 16.5Zm0-3.5q-.425 0-.712-.288Q11 12.425 11 12t.288-.713Q11.575 11 12 11t.713.287Q13 11.575 13 12t-.287.712Q12.425 13 12 13Zm0 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',
                                ],
                            ],
                        ],
                        'id' => 168,
                    ],
                    [
                        'type' => 'route',
                        'label' => 'Genres',
                        'action' => '/genres',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M14.25 21.4q-.575.575-1.425.575-.85 0-1.425-.575l-8.8-8.8q-.275-.275-.437-.65Q2 11.575 2 11.15V4q0-.825.588-1.413Q3.175 2 4 2h7.15q.425 0 .8.162.375.163.65.438l8.8 8.825q.575.575.575 1.412 0 .838-.575 1.413ZM12.825 20l7.15-7.15L11.15 4H4v7.15ZM6.5 8q.625 0 1.062-.438Q8 7.125 8 6.5t-.438-1.062Q7.125 5 6.5 5t-1.062.438Q5 5.875 5 6.5t.438 1.062Q5.875 8 6.5 8ZM4 4Z',
                                ],
                            ],
                        ],
                        'id' => 134,
                    ],
                    [
                        'type' => 'route',
                        'label' => 'Popular songs',
                        'action' => '/popular-tracks',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M3.4 18 2 16.6l7.4-7.45 4 4L18.6 8H16V6h6v6h-2V9.4L13.4 16l-4-4Z',
                                ],
                            ],
                        ],
                        'id' => 833,
                    ],
                    [
                        'type' => 'route',
                        'label' => 'New releases',
                        'action' => '/new-releases',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'm8.6 22.5-1.9-3.2-3.6-.8.35-3.7L1 12l2.45-2.8-.35-3.7 3.6-.8 1.9-3.2L12 2.95l3.4-1.45 1.9 3.2 3.6.8-.35 3.7L23 12l-2.45 2.8.35 3.7-3.6.8-1.9 3.2-3.4-1.45Zm.85-2.55 2.55-1.1 2.6 1.1 1.4-2.4 2.75-.65-.25-2.8 1.85-2.1-1.85-2.15.25-2.8-2.75-.6-1.45-2.4L12 5.15l-2.6-1.1L8 6.45l-2.75.6.25 2.8L3.65 12l1.85 2.1-.25 2.85 2.75.6ZM12 12Zm-1.05 3.55L16.6 9.9l-1.4-1.45-4.25 4.25-2.15-2.1L7.4 12Z',
                                ],
                            ],
                        ],
                        'id' => 566,
                    ],
                ],
            ],

            [
                'name' => 'Secondary',
                'id' => 'NODtKW',
                'positions' => ['sidebar-secondary'],
                'items' => [
                    [
                        'id' => 878,
                        'type' => 'route',
                        'label' => 'Songs',
                        'action' => '/library/songs',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M10 21q-1.65 0-2.825-1.175Q6 18.65 6 17q0-1.65 1.175-2.825Q8.35 13 10 13q.575 0 1.062.137.488.138.938.413V3h6v4h-4v10q0 1.65-1.175 2.825Q11.65 21 10 21Z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 574,
                        'type' => 'route',
                        'label' => 'Albums',
                        'action' => '/library/albums',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M12 16.5q1.875 0 3.188-1.312Q16.5 13.875 16.5 12q0-1.875-1.312-3.188Q13.875 7.5 12 7.5q-1.875 0-3.188 1.312Q7.5 10.125 7.5 12q0 1.875 1.312 3.188Q10.125 16.5 12 16.5Zm0-3.5q-.425 0-.712-.288Q11 12.425 11 12t.288-.713Q11.575 11 12 11t.713.287Q13 11.575 13 12t-.287.712Q12.425 13 12 13Zm0 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 933,
                        'type' => 'route',
                        'label' => 'Artists',
                        'action' => '/library/artists',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14Zm0-6Zm-1 13v-3.075q-2.6-.35-4.3-2.325Q5 13.625 5 11h2q0 2.075 1.463 3.537Q9.925 16 12 16t3.538-1.463Q17 13.075 17 11h2q0 2.625-1.7 4.6-1.7 1.975-4.3 2.325V21Zm1-9q.425 0 .713-.288Q13 11.425 13 11V5q0-.425-.287-.713Q12.425 4 12 4t-.712.287Q11 4.575 11 5v6q0 .425.288.712.287.288.712.288Z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 775,
                        'type' => 'route',
                        'label' => 'History',
                        'action' => '/library/history',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M12 21q-3.45 0-6.012-2.288Q3.425 16.425 3.05 13H5.1q.35 2.6 2.312 4.3Q9.375 19 12 19q2.925 0 4.962-2.038Q19 14.925 19 12t-2.038-4.963Q14.925 5 12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475Q9.95 3 12 3q1.875 0 3.513.712 1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21Zm2.8-4.8L11 12.4V7h2v4.6l3.2 3.2Z',
                                ],
                            ],
                        ],
                    ],
                ],
            ],

            [
                'name' => 'Mobile',
                'id' => 'nKRHXG',
                'positions' => ['mobile-bottom'],
                'items' => [
                    [
                        'type' => 'route',
                        'label' => 'Discover',
                        'action' => '/',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'm12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3z',
                                ],
                            ],
                        ],
                        'id' => 554,
                    ],
                    [
                        'type' => 'route',
                        'label' => 'Search',
                        'action' => '/search',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'm19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z',
                                ],
                            ],
                        ],
                        'id' => 849,
                    ],
                    [
                        'type' => 'route',
                        'label' => 'Your Music',
                        'action' => '/library',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M12.5 15q1.05 0 1.775-.725Q15 13.55 15 12.5V7h3V5h-4v5.5q-.325-.25-.7-.375-.375-.125-.8-.125-1.05 0-1.775.725Q10 11.45 10 12.5q0 1.05.725 1.775Q11.45 15 12.5 15ZM8 18q-.825 0-1.412-.587Q6 16.825 6 16V4q0-.825.588-1.413Q7.175 2 8 2h12q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.412-.587Q2 20.825 2 20V6h2v14h14v2ZM8 4v12V4Z',
                                ],
                            ],
                        ],
                        'id' => 669,
                    ],
                ],
            ],

            [
                'name' => 'Auth Dropdown',
                'id' => 'h8r6vg',
                'items' => [
                    [
                        'label' => 'Admin area',
                        'id' => 'upm1rv',
                        'action' => '/admin',
                        'type' => 'route',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z',
                                ],
                            ],
                        ],
                        'permissions' => ['admin.access'],
                    ],
                    [
                        'label' => 'Web player',
                        'id' => 'ehj0uk',
                        'action' => '/',
                        'type' => 'route',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M10 21q-1.65 0-2.825-1.175Q6 18.65 6 17q0-1.65 1.175-2.825Q8.35 13 10 13q.575 0 1.062.137.488.138.938.413V3h6v4h-4v10q0 1.65-1.175 2.825Q11.65 21 10 21Z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'label' => 'Account settings',
                        'id' => '6a89z5',
                        'action' => '/account-settings',
                        'type' => 'route',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
                                ],
                            ],
                        ],
                    ],
                ],
                'positions' => ['auth-dropdown'],
            ],
            [
                'name' => 'Admin Sidebar',
                'id' => '2d43u1',
                'items' => [
                    [
                        'label' => 'Analytics',
                        'id' => '886nz4',
                        'action' => '/admin',
                        'type' => 'route',
                        'condition' => 'admin',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
                                ],
                            ],

                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M7 12h2v5H7zm8-5h2v10h-2zm-4 7h2v3h-2zm0-4h2v2h-2z',
                                ],
                            ],
                        ],
                        'role' => 1,
                        'permissions' => ['admin.access'],
                        'roles' => [],
                    ],
                    [
                        'label' => 'Appearance',
                        'id' => 'slcqm0',
                        'action' => '/admin/appearance',
                        'type' => 'route',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'm2.53 19.65 1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zm-9.2 3.8L7.87 7.79l7.35-3.04h.01l4.95 11.95-7.35 3.05z',
                                ],
                            ],
                            [
                                'tag' => 'circle',
                                'attr' => [
                                    'cx' => '11',
                                    'cy' => '9',
                                    'r' => '1',
                                ],
                            ],
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M5.88 19.75c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z',
                                ],
                            ],
                        ],
                        'permissions' => ['appearance.update'],
                    ],
                    [
                        'label' => 'Settings',
                        'id' => 'x5k484',
                        'action' => '/admin/settings',
                        'type' => 'route',

                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
                                ],
                            ],
                        ],
                        'permissions' => ['settings.update'],
                    ],
                    [
                        'label' => 'Plans',
                        'id' => '7o42rt',
                        'action' => '/admin/plans',
                        'type' => 'route',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z',
                                ],
                            ],
                        ],
                        'permissions' => ['plans.update'],
                    ],
                    [
                        'label' => 'Subscriptions',
                        'action' => '/admin/subscriptions',
                        'type' => 'route',
                        'id' => 'sdcb5a',
                        'condition' => 'admin',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z',
                                ],
                            ],
                        ],
                        'permissions' => ['subscriptions.update'],
                    ],
                    [
                        'label' => 'Users',
                        'action' => '/admin/users',
                        'type' => 'route',
                        'id' => 'fzfb45',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
                                ],
                            ],
                        ],
                        'permissions' => ['users.update'],
                    ],
                    [
                        'label' => 'Roles',
                        'action' => '/admin/roles',
                        'type' => 'route',
                        'id' => 'mwdkf0',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z',
                                ],
                            ],
                        ],
                        'permissions' => ['roles.update'],
                    ],
                    [
                        'id' => 'O3I9eJ',
                        'label' => 'Upload',
                        'action' => '/admin/upload',
                        'type' => 'route',
                        'target' => '_self',
                        'permissions' => ['music.create'],
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => '303113a',
                        'type' => 'route',
                        'label' => 'Channels',
                        'action' => '/admin/channels',
                        'permissions' => ['channels.update'],
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M22 6h-5v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6zm-7 0H3v2h12V6zm0 4H3v2h12v-2zm-4 4H3v2h8v-2z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 'nVKg0I',
                        'label' => 'Artists',
                        'action' => '/admin/artists',
                        'permissions' => ['artists.update'],
                        'type' => 'route',
                        'target' => '_self',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z',
                                ],
                            ],
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 'Qq7wh9',
                        'label' => 'Albums',
                        'action' => '/admin/albums',
                        'permissions' => ['albums.update'],
                        'type' => 'route',
                        'target' => '_self',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => '9_7Uip',
                        'label' => 'Tracks',
                        'permissions' => ['tracks.update'],
                        'action' => '/admin/tracks',
                        'type' => 'route',
                        'target' => '_self',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'm12 3 .01 10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4.01 4S14 19.21 14 17V7h4V3h-6zm-1.99 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => '57IFvN',
                        'label' => 'Genres',
                        'permissions' => ['genres.update'],
                        'action' => '/admin/genres',
                        'type' => 'route',
                        'target' => '_self',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'm21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01 4 11V4h7v-.01l9 9-7 7.02z',
                                ],
                            ],
                            [
                                'tag' => 'circle',
                                'attr' => [
                                    'cx' => '6.5',
                                    'cy' => '6.5',
                                    'r' => '1.5',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => '5eGJwT',
                        'label' => 'Lyrics',
                        'permissions' => ['lyrics.update'],
                        'action' => '/admin/lyrics',
                        'type' => 'route',
                        'target' => '_self',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 'zl5XVb',
                        'label' => 'Playlists',
                        'permissions' => ['playlists.update'],
                        'action' => '/admin/playlists',
                        'type' => 'route',
                        'target' => '_self',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M3 10h11v2H3zm0-4h11v2H3zm0 8h7v2H3zm13-1v8l6-4z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 'UXtCU9',
                        'label' => 'Requests',
                        'action' => '/admin/backstage-requests',
                        'permissions' => ['requests.update'],
                        'type' => 'route',
                        'target' => '_self',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-9.18-6.95L7.4 14.46 10.94 18l5.66-5.66-1.41-1.41-4.24 4.24-2.13-2.12z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => '31pLaw',
                        'label' => 'Comments',
                        'action' => '/admin/comments',
                        'permissions' => ['comments.update'],
                        'type' => 'route',
                        'target' => '_self',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM20 4v13.17L18.83 16H4V4h16zM6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z',
                                ],
                            ],
                        ],
                    ],
                    [
                        'label' => 'Pages',
                        'action' => '/admin/custom-pages',
                        'type' => 'route',
                        'id' => '63bwv9',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
                                ],
                            ],

                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
                                ],
                            ],
                        ],
                        'permissions' => ['custom_pages.update'],
                    ],
                    [
                        'label' => 'Tags',
                        'action' => '/admin/tags',
                        'type' => 'route',
                        'id' => '2x0pzq',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z',
                                ],
                            ],
                        ],
                        'permissions' => ['tags.update'],
                    ],
                    [
                        'label' => 'Files',
                        'action' => '/admin/files',
                        'type' => 'route',
                        'id' => 'vguvti',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z',
                                ],
                            ],
                        ],
                        'permissions' => ['files.update'],
                    ],

                    [
                        'label' => 'Localizations',
                        'action' => '/admin/localizations',
                        'type' => 'route',
                        'id' => 'w91yql',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'm12.87 15.07-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z',
                                ],
                            ],
                        ],
                        'permissions' => ['localizations.update'],
                    ],

                    [
                        'label' => 'Ads',
                        'action' => '/admin/ads',
                        'type' => 'route',
                        'id' => 'ohj4qk',
                        'icon' => [
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' =>
                                        'M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 4V3h10v1H7zm0 14V6h10v12H7zm0 3v-1h10v1H7z',
                                ],
                            ],
                            [
                                'tag' => 'path',
                                'attr' => [
                                    'd' => 'M16 7H8v2h8V7z',
                                ],
                            ],
                        ],
                        'permissions' => ['settings.update'],
                    ],
                ],
                'positions' => ['admin-sidebar'],
            ],
        ]),
    ],

    // LANDING PAGE
    ['name' => 'homepage.trending', 'value' => true],
    [
        'name' => 'homepage.appearance',
        'value' => json_encode([
            'headerTitle' => 'Connect on BeMusic',
            'headerSubtitle' =>
                'Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.',
            'headerImage' => 'images/landing/landing-header-bg.jpg',
            'headerOverlayColor1' => 'rgba(16,119,34,0.56)',
            'headerOverlayColor2' => 'rgba(42,148,71,1)',
            'headerImageOpacity' => '0.2',
            'footerTitle' => 'Make music? Create audio?',
            'footerSubtitle' =>
                'Get on BeMusic to help you connect with fans and grow your audience.',
            'footerImage' => 'images/landing/landing-footer-bg.jpg',
            'actions' => [
                'inputText' => 'Search for artists, albums and tracks...',
                'inputButton' => 'Search',
                'cta1' => [
                    'label' => 'Signup Now',
                    'type' => 'route',
                    'action' => '/register',
                ],
                'cta2' => [
                    'label' => 'Explore',
                    'type' => 'route',
                    'action' => '/discover',
                ],
                'cta3' => [
                    'label' => 'Sign up for free',
                    'type' => 'route',
                    'action' => '/register',
                ],
            ],
            'primaryFeatures' => [],
            'secondaryFeatures' => [
                [
                    'title' => 'Stream Anytime, Anywhere. From Any Device.',
                    'subtitle' => 'Complete Freedom',
                    'image' => 'images/landing/landing-feature-1.jpg',
                    'description' =>
                        'Stream music in the browser, on Phone, Tablet, Smart TVs, Consoles, Chromecast, Apple TV and more.',
                ],
                [
                    'title' => 'Get More From Bemusic With Pro',
                    'subtitle' => 'BeMusic Pro',
                    'image' => 'images/landing/landing-feature-2.jpg',
                    'description' =>
                        'Subscribe to BeMusic pro to hide ads, increase upload time and get access to other exclusive features.',
                ],
            ],
            'pricingTitle' => 'Simple pricing, for everyone.',
            'pricingSubtitle' =>
                'Choose the plan that works for you. No commitments, cancel anytime.',
            'channelIds' => [1],
        ]),
    ],
];
