<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Playlist;
use App\Models\User;
use App\Services\Tracks\Queries\AlbumTrackQuery;
use App\Services\Tracks\Queries\ArtistTrackQuery;
use App\Services\Tracks\Queries\BaseTrackQuery;
use App\Services\Tracks\Queries\HistoryTrackQuery;
use App\Services\Tracks\Queries\LibraryTracksQuery;
use App\Services\Tracks\Queries\PlaylistTrackQuery;
use Common\Core\BaseController;
use Illuminate\Database\Eloquent\Builder;

class PlayerTracksController extends BaseController
{
    private array $queryMap = [
        Playlist::MODEL_TYPE => PlaylistTrackQuery::class,
        Artist::MODEL_TYPE => ArtistTrackQuery::class,
        User::MODEL_TYPE => LibraryTracksQuery::class,
        Album::MODEL_TYPE => AlbumTrackQuery::class,
    ];

    public function index()
    {
        $queueId = request()->get('queueId');
        $perPage = (int) request()->get('perPage', 30);

        $this->validate(request(), [
            'queueId' => 'required|string',
            'perPage' => 'integer|min:1|max:100',
        ]);

        [$modelType, $modelId, $queueType, $queueOrder] = array_pad(
            explode('.', $queueId),
            4,
            null,
        );
        // dot will be replaced with ^ in to avoid parsing issues (e.g. track_plays^created instead of track_plays.created)
        $queueOrder = str_replace('^', '.', $queueOrder);

        $trackQuery = $this->getTrackQuery($modelType, $queueOrder, $queueType);

        if (!$trackQuery) {
            return $this->success(['tracks' => []]);
        }

        $dbQuery = $trackQuery->get($modelId);
        $order = $trackQuery->getOrder();

        if ($lastTrack = request()->get('lastTrack')) {
            $whereCol =
                $order['col'] === 'added_at'
                    ? 'likes.created_at'
                    : $order['col'];
            $this->applyCursor(
                $dbQuery,
                [$whereCol => $order['dir'], 'tracks.id' => 'desc'],
                [$lastTrack[$order['col']], $lastTrack['id']],
            );
        }

        return $this->success(['tracks' => $dbQuery->limit($perPage)->get()]);
    }

    private function getTrackQuery(
        string $modelType,
        ?string $order,
        string $queueType,
    ): ?BaseTrackQuery {
        $params = [];
        if ($order) {
            $parts = explode('|', $order);
            $params['orderBy'] = $parts[0];
            $params['orderDir'] = $parts[1];
        }

        if ($modelType === User::MODEL_TYPE) {
            return $queueType === 'playHistory'
                ? new HistoryTrackQuery($params)
                : new LibraryTracksQuery($params);
        }

        if (isset($this->queryMap[$modelType])) {
            return new $this->queryMap[$modelType]($params);
        }

        return null;
    }

    private function applyCursor(Builder $query, $columns, $cursor)
    {
        $query->where(function (Builder $query) use ($columns, $cursor) {
            $column = key($columns);
            $direction = array_shift($columns);
            $value = array_shift($cursor);

            $query->where(
                $column,
                $direction === 'asc' ? '>' : '<',
                is_null($value) ? 0 : $value,
            );

            if (!empty($columns)) {
                $query->orWhere($column, is_null($value) ? 0 : $value);
                $this->applyCursor($query, $columns, $cursor);
            }
        });
    }
}
