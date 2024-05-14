import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import {TrackListItem} from '@app/web-player/tracks/track-list/track-list-item';
import React from 'react';
import {Track} from '@app/web-player/tracks/track';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {VirtualTableBody} from '@app/web-player/playlists/virtual-table-body';
import {UseInfiniteDataResult} from '@common/ui/infinite-scroll/use-infinite-data';

interface Props {
  tracks?: Track[];
  query?: UseInfiniteDataResult<Track>;
}
export function TrackList({tracks, query}: Props) {
  const isMobile = useIsMobileMediaQuery();

  if (!tracks) {
    tracks = query ? query.items : [];
  }

  if (isMobile) {
    if (!query) {
      return <TrackTable tracks={tracks} />;
    }
    return (
      <TrackTable
        tracks={tracks}
        tableBody={<VirtualTableBody query={query} />}
      />
    );
  }

  return (
    <div>
      {tracks.map(track => (
        <TrackListItem
          queue={tracks}
          key={track.id}
          track={track}
          className="mb-40"
        />
      ))}
      {query && <InfiniteScrollSentinel query={query} />}
    </div>
  );
}
