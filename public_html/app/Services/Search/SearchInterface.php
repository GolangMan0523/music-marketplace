<?php namespace App\Services\Search;

use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Collection;

interface SearchInterface
{
    public function search(
        string $q,
        int $page,
        int $perPage,
        array $modelTypes,
    ): Collection;
    public function artists(): Paginator;
    public function albums(): Paginator;
    public function tracks(): Paginator;
    public function playlists(): Paginator;
    public function users(): Paginator;
    public function channels(): Paginator;
    public function genres(): Paginator;
    public function tags(): Paginator;
}
