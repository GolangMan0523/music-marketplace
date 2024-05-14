<?php

namespace App\Services\Albums;

use App\Models\Album;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Str;

class PaginateAlbums
{
    public function execute(array $params, $builder = null): AbstractPaginator
    {
        if (!$builder) {
            $builder = Album::query();
        }

        $builder->with(['artists']);

        $datasource = new Datasource($builder, $params);
        $order = $datasource->getOrder();

        if (Str::endsWith($order['col'], 'popularity')) {
            $datasource->order = false;
            $builder->orderByPopularity($order['dir']);
        }

        return $datasource->paginate();
    }
}
