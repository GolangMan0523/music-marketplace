<?php

namespace App\Services\Tracks;

use App\Models\Track;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Str;

class PaginateTracks
{
    public function execute(array $params, $builder = null): AbstractPaginator
    {
        if (!$builder) {
            $builder = Track::query();
        }

        $builder
            ->with('album.artists')
            ->with(['artists', 'genres'])
            ->withCount('plays');

        $datasource = new Datasource($builder, $params);
        $order = $datasource->getOrder();

        if (Str::endsWith($order['col'], 'popularity')) {
            $datasource->order = false;
            $builder->orderByPopularity($order['dir']);
        }

        return $datasource->paginate();
    }
}
