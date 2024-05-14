<?php

namespace App\Services\Playlists;

use App\Models\Playlist;
use Arr;
use Common\Database\Datasource\Datasource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Str;

class PaginatePlaylists
{
    public function execute(
        array $params,
        Builder|Relation $builder = null,
    ): AbstractPaginator {
        $builder = $builder ?? Playlist::query();

        if (Arr::get($params, 'editors')) {
            $builder->with([
                'editors' => fn(BelongsToMany $q) => $q->compact(),
            ]);
        }

        if (Arr::get($params, 'compact')) {
            $builder->compact();
        }

        $datasource = new Datasource($builder, $params);
        $order = $datasource->getOrder();

        if (Str::endsWith($order['col'], 'popularity')) {
            $datasource->order = false;
            $builder->orderByPopularity($order['dir']);
        }

        return $datasource->paginate();
    }
}
