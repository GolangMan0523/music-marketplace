<?php

namespace App\Services\Tracks;

use App\Models\Artist;
use Carbon\Carbon;
use Common\Files\Actions\CreateFileEntry;
use Common\Files\Actions\StoreFile;
use Common\Files\FileEntry;
use Common\Files\FileEntryPayload;
use Common\Files\Traits\GetsEntryTypeFromMime;
use Common\Settings\Settings;
use getID3;
use getid3_lib;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ExtractMetadataFromTrackFile
{
    use GetsEntryTypeFromMime;

    public function execute(FileEntry $fileEntry, array $params): array
    {
        $autoMatch =
            app(Settings::class)->get('uploads.autoMatch', true) &&
            (Auth::user()->hasPermission('music.update') ||
                Auth::user()->getRestrictionValue(
                    'music.create',
                    'artist_selection',
                ));

        $getID3 = new getID3();

        $metadata = $getID3->analyze(
            null,
            $fileEntry->file_size,
            $fileEntry->name,
            $fileEntry->getDisk()->readStream($fileEntry->getStoragePath()),
        );

        getid3_lib::CopyTagsToComments($metadata);

        $normalizedMetadata = array_map(function ($item) {
            return $item && is_array($item) ? Arr::first($item) : $item;
        }, Arr::except(Arr::get($metadata, 'comments', []), [
            'music_cd_identifier',
            'text',
        ]));

        // store thumbnail
        if (isset($normalizedMetadata['picture'])) {
            $normalizedMetadata = $this->storeMetadataPicture(
                $normalizedMetadata,
            );
        }

        if (isset($metadata['playtime_seconds'])) {
            $normalizedMetadata['duration'] =
                floor($metadata['playtime_seconds']) * 1000;
        }

        if (isset($normalizedMetadata['unsynchronised_lyric'])) {
            $lyric = preg_replace(
                '/[\n]/',
                '<br>',
                $normalizedMetadata['unsynchronised_lyric'],
            );
            $normalizedMetadata['lyrics'] = $lyric;
            unset($normalizedMetadata['unsynchronised_lyric']);
        }

        if (isset($normalizedMetadata['genre'])) {
            $normalizedMetadata['genres'] = explode(
                ',',
                $normalizedMetadata['genre'],
            );
            unset($normalizedMetadata['genre']);
        }

        if (isset($normalizedMetadata['artist'])) {
            $normalizedMetadata['artist_name'] = $normalizedMetadata['artist'];
            unset($normalizedMetadata['artist']);
            if ($autoMatch) {
                $normalizedMetadata['artist'] = Artist::firstOrCreate([
                    'name' => $normalizedMetadata['artist_name'],
                ]);
            }
        }

        if (isset($normalizedMetadata['album'])) {
            $normalizedMetadata['album_name'] = $normalizedMetadata['album'];
            unset($normalizedMetadata['album']);
            $autoMatchAlbum = filter_var(
                Arr::get($params, 'autoMatchAlbum'),
                FILTER_VALIDATE_BOOLEAN,
            );
            if (
                $autoMatch &&
                $autoMatchAlbum &&
                isset($normalizedMetadata['artist'])
            ) {
                $album = $normalizedMetadata['artist']
                    ->albums()
                    ->where('name', $normalizedMetadata['album_name'])
                    ->first();
                if (!$album) {
                    $album = $normalizedMetadata['artist']->albums()->create([
                        'name' => $normalizedMetadata['album_name'],
                        'release_date' => Carbon::now(),
                        'image' => $normalizedMetadata['image']['url'] ?? null,
                        'fully_scraped' => true,
                        'owner_id' => Auth::id(),
                    ]);
                }
                $normalizedMetadata['album'] = $album;
            }
        }

        if (isset($normalizedMetadata['date'])) {
            $normalizedMetadata['release_date'] = Carbon::parse(
                $normalizedMetadata['date'],
            )->toISOString();
            unset($normalizedMetadata['date']);
        }

        if (!isset($normalizedMetadata['title'])) {
            $name = pathinfo($fileEntry->name, PATHINFO_FILENAME);
            $normalizedMetadata['title'] = Str::title($name);
        }

        return $normalizedMetadata;
    }

    private function storeMetadataPicture(array $normalizedMetadata): array
    {
        $mime = $normalizedMetadata['picture']['image_mime'];
        $payload = new FileEntryPayload([
            'disk' => 'public',
            'diskPrefix' => 'track_image_media',
            'clientName' => 'thumbnail.png',
            'clientMime' => $mime,
            'clientSize' =>
                $normalizedMetadata['picture']['datalength'] ??
                strlen($normalizedMetadata['picture']['data']),
        ]);

        app(StoreFile::class)->execute($payload, [
            'contents' => $normalizedMetadata['picture']['data'],
        ]);
        $fileEntry = app(CreateFileEntry::class)->execute($payload);
        unset($normalizedMetadata['picture']);
        $normalizedMetadata['image'] = $fileEntry;
        return $normalizedMetadata;
    }
}
