<?php namespace App\Services;

use App\Models\Artist;
use Common\Core\Bootstrap\BaseBootstrapData;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AppBootstrapData extends BaseBootstrapData
{
    public function init(): self
    {
        parent::init();

        if (isset($this->data['user'])) {
            $this->getUserLikes();
            $this->loadUserPlaylists();
            $this->loadManagedArtists();
            $this->loadUserReposts();
        }

        $this->data['settings']['spotify_is_setup'] =
            config('common.site.spotify.id') &&
            config('common.site.spotify.secret');
        $this->data['settings']['lastfm_is_setup'] = !!config(
            'common.site.lastfm.key',
        );

        return $this;
    }

    /**
     * Get ids of all tracks in current user's library.
     */
    private function getUserLikes(): void
    {
        $this->data['likes'] = DB::table('likes')
            ->where('user_id', $this->data['user']['id'])
            ->get(['likeable_id', 'likeable_type'])
            ->groupBy(fn($likeable) => $likeable->likeable_type)
            ->map(function (Collection $likeableGroup) {
                return $likeableGroup->mapWithKeys(function ($likeable) {
                    return [$likeable->likeable_id => true];
                });
            });
    }

    private function loadUserPlaylists(): void
    {
        $this->data['playlists'] = $this->data['user']
            ->playlists()
            ->compact()
            ->limit(30)
            ->orderBy('playlists.updated_at', 'desc')
            ->get()
            ->toArray();
    }

    private function loadManagedArtists(): void
    {
        $this->data['user']['artists'] = $this->data['user']
            ->artists()
            ->get(['artists.id', 'name', 'image_small'])
            ->map(function (Artist $artist) {
                $normalizedModel = $artist->toNormalizedArray();
                $normalizedModel['role'] = $artist->pivot->role;
                return $normalizedModel;
            });
    }

    private function loadUserReposts(): void
    {
        $this->data['reposts'] = DB::table('reposts')
            ->where('user_id', $this->data['user']['id'])
            ->get(['repostable_id', 'repostable_type'])
            ->groupBy(fn($item) => $item->repostable_type)
            ->map(function (Collection $likeableGroup) {
                return $likeableGroup->mapWithKeys(
                    fn($item) => [$item->repostable_id => true],
                );
            });
    }
}
