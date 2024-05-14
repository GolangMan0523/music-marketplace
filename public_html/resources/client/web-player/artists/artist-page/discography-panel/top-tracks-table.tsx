import {useMemo, useState} from 'react';
import {Trans} from '@common/i18n/trans';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import {Button} from '@common/ui/buttons/button';
import {Track} from '@app/web-player/tracks/track';

interface TopTracksTableProps {
  tracks?: Track[];
}
export function TopTracksTable({tracks: initialTracks}: TopTracksTableProps) {
  const [showingAll, setShowingAll] = useState(false);

  const topTracks = useMemo(() => {
    return {
      all: initialTracks || [],
      sliced: initialTracks?.slice(0, 5) || [],
    };
  }, [initialTracks]);

  return (
    <div className="flex-auto">
      <h2 className="text-muted text-base my-16">
        <Trans message="Popular songs" />
      </h2>
      <TrackTable
        tracks={showingAll ? topTracks.all : topTracks.sliced}
        hideArtist
        hideAlbum
        hideHeaderRow
      />
      <Button
        radius="rounded-full"
        className="mt-20"
        variant="outline"
        onClick={() => {
          setShowingAll(!showingAll);
        }}
      >
        {showingAll ? (
          <Trans message="Show less" />
        ) : (
          <Trans message="Show more" />
        )}
      </Button>
    </div>
  );
}
