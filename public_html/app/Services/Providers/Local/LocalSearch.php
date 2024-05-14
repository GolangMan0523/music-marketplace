<?php namespace App\Services\Providers\Local;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Channel;
use App\Models\Genre;
use App\Models\Playlist;
use App\Models\Tag;
use App\Models\Track;
use App\Models\User;
use App\Services\Search\SearchInterface;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Collection;

class LocalSearch implements SearchInterface
{
    protected string $query;
    protected int $perPage;
    protected int $page;

    public function search(
        string $q,
        int $page,
        int $perPage,
        array $modelTypes,
    ): Collection {
        $this->query = urldecode($q);
        $this->perPage = $perPage ?: 10;
        $this->page = $page;

        $results = collect();

        foreach ($modelTypes as $modelType) {
            if ($modelType === Artist::MODEL_TYPE) {
                $results['artists'] = $this->artists();
            } elseif ($modelType === Album::MODEL_TYPE) {
                $results['albums'] = $this->albums();
            } elseif ($modelType === Track::MODEL_TYPE) {
                $results['tracks'] = $this->tracks();
            } elseif ($modelType === Playlist::MODEL_TYPE) {
                $results['playlists'] = $this->playlists();
            } elseif ($modelType === Channel::MODEL_TYPE) {
                $results['channels'] = $this->channels();
            } elseif ($modelType === Genre::MODEL_TYPE) {
                $results['genres'] = $this->genres();
            } elseif ($modelType === Tag::MODEL_TYPE) {
                $results['tags'] = $this->tags();
            } elseif ($modelType === User::MODEL_TYPE) {
                $results['users'] = $this->users();
            }
        }

        return $results;
    }

    public function artists(): Paginator
    {
        return Artist::search($this->query)->simplePaginate(
            $this->perPage,
            'page',
            $this->page,
        );
    }

    public function albums(): Paginator
    {
        return Album::search($this->query)
            ->simplePaginate($this->perPage, 'page', $this->page)
            ->tap(fn($p) => $p->load(['artists']));
    }

    public function tracks(): Paginator
    {
        return Track::search($this->query)
            ->simplePaginate($this->perPage, 'page', $this->page)
            ->tap(fn($p) => $p->load(['album', 'artists']));
    }

    public function playlists(): Paginator
    {
        return Playlist::search($this->query)
            ->simplePaginate($this->perPage, 'page', $this->page)
            ->tap(fn($p) => $p->load(['editors']));
    }

    public function channels(): Paginator
    {
        return app(Channel::class)
            ->search($this->query)
            ->simplePaginate($this->perPage, 'page', $this->page);
    }

    public function genres(): Paginator
    {
        return app(Genre::class)->simplePaginate(
            $this->perPage,
            'page',
            $this->page,
        );
    }

    public function tags(): Paginator
    {
        return app(Tag::class)
            ->search($this->query)
            ->simplePaginate($this->perPage, 'page', $this->page);
    }

    public function users(): Paginator
    {
        return app(User::class)
            ->search($this->query)
            ->simplePaginate($this->perPage, 'page', $this->page)
            ->tap(fn($p) => $p->loadCount('followers'));
    }
}
