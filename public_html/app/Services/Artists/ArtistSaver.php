<?php namespace App\Services\Artists;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Genre;
use App\Services\Providers\SaveOrUpdate;
use App\Services\Providers\Spotify\SpotifyTrackSaver;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class ArtistSaver
{
    use SaveOrUpdate;

    public function save(array $data): Artist
    {
        $data['mainInfo']['updated_at'] = Carbon::now();
        $this->saveOrUpdate([$data['mainInfo']], 'artists');
        $artist = app(Artist::class)
            ->where('spotify_id', $data['mainInfo']['spotify_id'])
            ->first();

        if (isset($data['albums'])) {
            $this->saveOrUpdate($data['albums'], 'albums');
            $albums = Album::whereIn(
                'spotify_id',
                $data['albums']->pluck('spotify_id'),
            )->get();
            $artist->albums()->syncWithoutDetaching($albums->pluck('id'));
            $artist->setRelation('albums', $albums);
            app(SpotifyTrackSaver::class)->save($data['albums'], $albums);
        }

        if (isset($data['similar'])) {
            $this->saveSimilar($data['similar'], $artist);
        }

        if (!empty($data['genres'])) {
            $this->saveGenres($data['genres'], $artist);
        }

        return $artist;
    }

    public function saveGenres(array $genres, Artist $artist): void
    {
        $dbGenres = app(Genre::class)->insertOrRetrieve($genres);
        $artist->genres()->sync($dbGenres->pluck('id'), false);
    }

    public function saveSimilar(Collection $similar, Artist $artist): void
    {
        $spotifyIds = $similar->pluck('spotify_id');

        // insert similar artists that don't exist in db yet
        $this->saveOrUpdate($similar, 'artists', true);

        // get ids in database for artist we just inserted
        $ids = Artist::whereIn('spotify_id', $spotifyIds)->pluck('id');

        // attach ids to given artist
        $artist->similar()->sync($ids);
    }
}
