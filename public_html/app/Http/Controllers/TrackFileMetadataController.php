<?php

namespace App\Http\Controllers;

use App\Services\Tracks\ExtractMetadataFromTrackFile;
use Common\Core\BaseController;
use Common\Files\FileEntry;

class TrackFileMetadataController extends BaseController
{
    public function extract(FileEntry $fileEntry)
    {
        $this->authorize('show', $fileEntry);

        return $this->success([
            'metadata' => app(ExtractMetadataFromTrackFile::class)->execute(
                $fileEntry,
                request()->all(),
            ),
        ]);
    }
}
