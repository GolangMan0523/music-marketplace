<?php namespace App\Http\Controllers;

use App\Models\Lyric;
use App\Models\Track;
use App\Services\Lyrics\ImportLyrics;
use App\Services\Lyrics\ParseLyric;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Http\Request;

class LyricsController extends BaseController
{
    public function __construct(
        protected Lyric $lyric,
        protected Track $track,
        protected Request $request,
    ) {
    }

    public function index()
    {
        $this->authorize('index', Lyric::class);

        $paginator = new Datasource($this->lyric, $this->request->all());
        return $this->success(['pagination' => $paginator->paginate()]);
    }

    public function show(int $trackId)
    {
        $this->authorize('show', Lyric::class);

        $lyric = Lyric::where('track_id', $trackId)->first();

        if (!$lyric && settings('player.lyrics_automate')) {
            $lyric = (new ImportLyrics())->execute(
                $trackId,
                // exact duration for the track that is currently playing, might differ from $track->duration
                request('duration'),
            );
        }

        if (!$lyric) {
            return $this->error(__('Could not find lyrics'), [], 404);
        }

        return $this->success((new ParseLyric())->execute($lyric));
    }

    public function store()
    {
        $this->authorize('store', Lyric::class);

        $data = $this->validate($this->request, [
            'text' => 'required|string',
            'track_id' => 'required|integer|exists:tracks,id',
            'is_synced' => 'boolean|nullable',
            'duration' => 'integer|nullable',
        ]);

        $lyric = $this->lyric->create($data);

        return $this->success(['lyric' => $lyric]);
    }

    public function update(int $id)
    {
        $this->authorize('update', Lyric::class);

        $data = $this->validate($this->request, [
            'text' => 'required|string',
            'track_id' => 'required|integer|exists:tracks,id',
            'is_synced' => 'boolean|nullable',
            'duration' => 'integer|nullable',
        ]);

        $lyric = $this->lyric->findOrFail($id);

        $lyric->update($data);

        return $this->success(['lyric' => $lyric]);
    }

    public function destroy(string $ids)
    {
        $lyricIds = explode(',', $ids);
        $this->authorize('destroy', [Lyric::class, $lyricIds]);

        $this->lyric->destroy($lyricIds);

        return $this->success();
    }
}
