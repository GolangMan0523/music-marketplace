<?php

namespace App\Services\Artists;

use App\Models\Artist;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Str;

class PaginateArtists
{
    public function execute(array $params, $builder = null): AbstractPaginator
    {
        if (!$builder) {
            $builder = Artist::query();
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
