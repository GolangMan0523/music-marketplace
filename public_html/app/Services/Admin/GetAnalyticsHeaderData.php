<?php

namespace App\Services\Admin;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Like;
use App\Models\Track;
use App\Models\User;
use Common\Admin\Analytics\Actions\GetAnalyticsHeaderDataAction;
use Common\Database\Metrics\ValueMetric;

class GetAnalyticsHeaderData implements GetAnalyticsHeaderDataAction
{
    public function execute(array $params): array
    {
        return [
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z',
                            ],
                        ],
                    ],
                    'name' => __('New users'),
                ],
                (new ValueMetric(
                    User::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),

            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'M10 21q-1.65 0-2.825-1.175Q6 18.65 6 17q0-1.65 1.175-2.825Q8.35 13 10 13q.575 0 1.062.137.488.138.938.413V3h6v4h-4v10q0 1.65-1.175 2.825Q11.65 21 10 21Z',
                            ],
                        ],
                    ],
                    'name' => __('New songs'),
                ],
                (new ValueMetric(
                    Track::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),

            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14Zm0-6Zm-1 13v-3.075q-2.6-.35-4.3-2.325Q5 13.625 5 11h2q0 2.075 1.463 3.537Q9.925 16 12 16t3.538-1.463Q17 13.075 17 11h2q0 2.625-1.7 4.6-1.7 1.975-4.3 2.325V21Zm1-9q.425 0 .713-.288Q13 11.425 13 11V5q0-.425-.287-.713Q12.425 4 12 4t-.712.287Q11 4.575 11 5v6q0 .425.288.712.287.288.712.288Z',
                            ],
                        ],
                    ],
                    'name' => __('New artists'),
                ],
                (new ValueMetric(
                    Artist::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'm12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
                            ],
                        ],
                    ],
                    'name' => __('Likes'),
                ],
                (new ValueMetric(
                    Like::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),

            array_merge(
                [
                    'icon' => [
                        [
                            'tag' => 'path',
                            'attr' => [
                                'd' =>
                                    'M12 16.5q1.875 0 3.188-1.312Q16.5 13.875 16.5 12q0-1.875-1.312-3.188Q13.875 7.5 12 7.5q-1.875 0-3.188 1.312Q7.5 10.125 7.5 12q0 1.875 1.312 3.188Q10.125 16.5 12 16.5Zm0-3.5q-.425 0-.712-.288Q11 12.425 11 12t.288-.713Q11.575 11 12 11t.713.287Q13 11.575 13 12t-.287.712Q12.425 13 12 13Zm0 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',
                            ],
                        ],
                    ],
                    'name' => __('New albums'),
                ],
                (new ValueMetric(
                    Album::query(),
                    dateRange: $params['dateRange'],
                ))->count(),
            ),
        ];
    }
}
