<?php

namespace App\Services;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Track;
use App\Models\TrackPlay;
use App\Models\User;
use Common\Core\Values\ValueLists;
use Common\Database\Metrics\MetricDateRange;
use Common\Database\Metrics\Partition;
use Common\Database\Metrics\Trend;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;

class BuildInsightsReport
{
    protected Builder $builder;
    protected array $params = [];
    protected MetricDateRange $dateRange;

    public function execute(array $params): array
    {
        $this->params = $params;
        $this->builder = $this->createBuilder();

        $this->dateRange = new MetricDateRange(
            start: $this->params['startDate'] ?? null,
            end: $this->params['endDate'] ?? null,
            timezone: $this->params['timezone'] ?? null,
        );

        $metrics = explode(',', Arr::get($params, 'metrics', 'plays'));

        return collect($metrics)
            ->mapWithKeys(function ($metric) {
                $method = sprintf('get%sMetric', ucfirst($metric));
                if (method_exists($this, $method)) {
                    return [$metric => $this->$method()];
                }
                return [$metric => []];
            })
            ->toArray();
    }

    protected function createBuilder(): Builder
    {
        $model = Arr::get($this->params, 'model', '');
        $parts = explode('=', $model);

        // might send track_play=0, check if variable is set, instead of being truthy
        if (!isset($parts[0]) || !isset($parts[1])) {
            $parts = ['track_play', 0];
        }

        $model = modelTypeToNamespace($parts[0]);
        $modelId = (int) $parts[1];

        switch ($model) {
            case TrackPlay::class:
                // all plays, not scoped to any resource (for admin area)
                Gate::authorize('admin.access');
                $builder = TrackPlay::query();
                break;
            case Track::class:
                $track = Track::findOrFail($modelId);
                Gate::authorize('update', $track);
                $builder = $track->plays()->getQuery();
                break;
            case Artist::class:
                $artist = Artist::findOrFail($modelId);
                Gate::authorize('update', $artist);
                $builder = $this->artistPlaysQuery($artist);
                break;
            case Album::class:
                $album = Album::findOrFail($modelId);
                Gate::authorize('update', $album);
                $builder = $this->albumPlaysQuery($album);
                break;
            default:
                throw new Exception();
        }

        return $builder;
    }

    protected function getPlaysMetric(): array
    {
        $trend = new Trend($this->builder, dateRange: $this->dateRange);
        $data = $trend->count();

        return [
            'granularity' => $this->dateRange->granularity,
            'total' => array_sum(Arr::pluck($data, 'value')),
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getDevicesMetric(): array
    {
        return $this->getPartitionMetric('device', 5);
    }

    protected function getBrowsersMetric(): array
    {
        return $this->getPartitionMetric('browser', 8);
    }

    protected function getPlatformsMetric(): array
    {
        return $this->getPartitionMetric('platform', 5);
    }

    protected function getTracksMetric(): array
    {
        $data = (new Partition(
            // sort by most played
            $this->builder->orderBy('aggregate', 'desc'),
            groupBy: 'track_id',
            dateRange: $this->dateRange,
            limit: 30,
        ))->count();

        $tracks = Track::with('album', 'artists')
            ->whereIn('id', Arr::pluck($data, 'label'))
            ->get();

        $data = array_map(function ($item) use ($tracks) {
            $track = $tracks->firstWhere('id', $item['label']);
            $item['model'] = $track;
            $item['label'] = $track->name;
            return $item;
        }, $data);

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getArtistsMetric(): array
    {
        $data = (new Partition(
            $this->builder
                ->join(
                    'artist_track',
                    'track_plays.track_id',
                    '=',
                    'artist_track.track_id',
                )
                ->orderBy('aggregate', 'desc'),
            groupBy: 'artist_id',
            dateRange: $this->dateRange,
            limit: 30,
        ))->count();

        $artists = Artist::whereIn('id', Arr::pluck($data, 'label'))->get();

        $data = array_map(function ($item) use ($artists) {
            $artist = $artists->firstWhere('id', $item['label']);
            if (!$artist) {
                return null;
            }
            $item['model'] = $artist;
            $item['label'] = $artist->name;
            return $item;
        }, $data);

        $data = array_values(array_filter($data));

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getAlbumsMetric(): array
    {
        $data = (new Partition(
            $this->builder
                ->join('tracks', 'track_plays.track_id', '=', 'tracks.id')
                ->orderBy('aggregate', 'desc'),
            groupBy: 'album_id',
            dateRange: $this->dateRange,
            limit: 30,
        ))->count();

        $albums = Album::with('artists')
            ->whereIn('id', Arr::pluck($data, 'label'))
            ->get();

        $data = collect($data)
            ->map(function ($item) use ($albums) {
                $album = $albums->firstWhere('id', $item['label']);
                if ($album) {
                    $item['model'] = $album;
                    $item['label'] = $album->name;
                    return $item;
                }
                return null;
            })
            ->filter()
            ->values()
            ->toArray();

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getUsersMetric(): array
    {
        $data = (new Partition(
            $this->builder->orderBy('aggregate', 'desc'),
            groupBy: 'user_id',
            dateRange: $this->dateRange,
            limit: 30,
        ))->count();

        $userIds = collect($data)
            ->pluck('label')
            ->filter()
            ->unique();
        $users = User::whereIn('id', $userIds)->get();

        $data = array_map(function ($item) use ($users) {
            $user =
                $users->firstWhere('id', $item['label']) ??
                new User(['first_name' => __('Guest user')]);
            $item['model'] = $user;
            $item['label'] = $user->display_name;
            return $item;
        }, $data);

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getLocationsMetric(): array
    {
        $metric = $this->getPartitionMetric('location');

        $countries = app(ValueLists::class)->countries();
        $metric['datasets'][0]['data'] = array_map(function ($location) use (
            $countries,
            $metric,
        ) {
            // only short country code is stored in DB, get and return full country name as well
            $location['code'] = strtolower($location['label']);
            $location['label'] = Arr::first(
                $countries,
                fn($country) => $country['code'] === $location['code'],
            )['name'];
            return $location;
        }, $metric['datasets'][0]['data']);

        return $metric;
    }

    protected function getPartitionMetric(
        string $groupBy,
        int $limit = 10,
    ): array {
        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => (new Partition(
                        $this->builder,
                        groupBy: $groupBy,
                        dateRange: $this->dateRange,
                        limit: $limit,
                    ))->count(),
                ],
            ],
        ];
    }

    protected function artistPlaysQuery(Artist $artist): Builder
    {
        return TrackPlay::query()->whereIn(
            'track_id',
            fn($q) => $q
                ->select('artist_track.track_id')
                ->from('artist_track')
                ->where('artist_track.artist_id', $artist->id),
        );
    }

    protected function albumPlaysQuery(Album $album): Builder
    {
        return TrackPlay::query()->whereIn(
            'track_id',
            fn($q) => $q
                ->select('tracks.id')
                ->from('tracks')
                ->where('tracks.album_id', $album->id),
        );
    }
}
