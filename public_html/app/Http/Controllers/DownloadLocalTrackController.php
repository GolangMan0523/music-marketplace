<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Common\Core\BaseController;
use Common\Files\FileEntry;
use Common\Files\Response\FileResponseFactory;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class DownloadLocalTrackController extends BaseController
{
    public function __construct(
        protected Track $track,
        protected FileEntry $fileEntry,
    ) {
    }

    public function download($id)
    {
        $track = $this->track->findOrFail($id)->makeVisible('src');

        $this->authorize('download', $track);

        if (!$track->src) {
            abort(404);
        }

        // track is local
        if ($track->srcIsLocal()) {
            $entry = $this->fileEntry
                ->where('file_name', $track->getSourceFileEntryId())
                ->firstOrFail();

            $ext = pathinfo($track->src, PATHINFO_EXTENSION);
            $trackName =
                str_replace('%', '', Str::ascii($track->name)) . ".$ext";
            $entry->name = $trackName;

            return app(FileResponseFactory::class)->create(
                $entry,
                'attachment',
            );

            // track is remote
        } else {
            $response = response()->stream(function () use ($track) {
                echo file_get_contents($track->src);
            });

            $path = parse_url($track->src, PHP_URL_PATH);
            $extension = pathinfo($path, PATHINFO_EXTENSION) ?: 'mp3';

            $disposition = $response->headers->makeDisposition(
                ResponseHeaderBag::DISPOSITION_ATTACHMENT,
                "$track->name.$extension",
                str_replace('%', '', Str::ascii("$track->name.$extension")),
            );

            $response->headers->replace([
                'Content-Type' => 'audio/mpeg',
                'Content-Disposition' => $disposition,
            ]);

            return $response;
        }
    }
}
