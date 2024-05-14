import React, {useMemo} from 'react';
import {playerStoreOptions} from '@app/web-player/state/player-store-options';
import {PlayerContext} from '@common/player/player-context';
import {TrackListItem} from '@app/web-player/tracks/track-list/track-list-item';
import {useTrack} from '@app/web-player/tracks/requests/use-track';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {Track} from '@app/web-player/tracks/track';
import {trackToMediaItem} from '@app/web-player/tracks/utils/track-to-media-item';
import {PlayerStoreOptions} from '@common/player/state/player-store-options';
import {PlayerOutlet} from '@common/player/ui/player-outlet';
import {PlayerPoster} from '@common/player/ui/controls/player-poster';

export function TrackEmbed() {
  const {data} = useTrack({loader: 'trackPage'});
  return (
    <div className="h-[174px] rounded border bg-alt p-14">
      {!data?.track ? (
        <FullPageLoader screen={false} />
      ) : (
        <EmbedContent track={data.track} />
      )}
    </div>
  );
}

interface EmbedContentProps {
  track: Track;
}
function EmbedContent({track}: EmbedContentProps) {
  const options: PlayerStoreOptions = useMemo(() => {
    const mediaItem = trackToMediaItem(track);
    return {
      ...playerStoreOptions,
      initialData: {
        queue: [mediaItem],
        cuedMediaId: mediaItem.id,
        state: {
          repeat: false,
        },
      },
    };
  }, [track]);
  return (
    <PlayerContext id="web-player" options={options}>
      <div className="flex gap-24">
        <div className="relative h-144 w-144 flex-shrink-0 overflow-hidden rounded bg-black">
          <PlayerPoster className="absolute inset-0" />
          <PlayerOutlet className="h-full w-full" />
        </div>
        <TrackListItem
          track={track}
          hideArtwork
          hideActions
          linksInNewTab
          className="flex-auto"
        />
      </div>
    </PlayerContext>
  );
}
