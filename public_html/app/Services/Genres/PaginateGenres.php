<?php

namespace App\Services\Genres;

use App\Models\Genre;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;

class PaginateGenres
{
    public function execute(array $params, $builder = null): AbstractPaginator
    {
        if (!$builder) {
            $builder = Genre::query();
        }

        $datasource = new Datasource($builder, $params);

        return $datasource->paginate();
    }
}
