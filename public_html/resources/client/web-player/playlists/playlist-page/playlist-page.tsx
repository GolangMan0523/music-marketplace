import {usePlaylist} from '@app/web-player/playlists/requests/use-playlist';
import {Trans} from '@common/i18n/trans';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';
import {Track} from '@app/web-player/tracks/track';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import React from 'react';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {SearchIcon} from '@common/icons/material/Search';
import {VirtualTableBody} from '@app/web-player/playlists/virtual-table-body';
import {PlaylistPageHeader} from '@app/web-player/playlists/playlist-page/playlist-page-header';
import {Playlist} from '@app/web-player/playlists/playlist';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {PlaylistTableRow} from '@app/web-player/playlists/playlist-page/playlist-table-row';
import {MediaPageNoResultsMessage} from '@app/web-player/layout/media-page-no-results-message';
import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {AdHost} from '@common/admin/ads/ad-host';

export function PlaylistPage() {
  const query = usePlaylist({loader: 'playlistPage'});

  if (query.data) {
    return (
      <div>
        <PageMetaTags query={query} />
        <PageContent
          initialTracks={query.data.tracks}
          playlist={query.data.playlist}
          totalDuration={query.data.totalDuration}
        />
      </div>
    );
  }

  return (
    <PageStatus
      query={query}
      loaderClassName="absolute inset-0 m-auto"
      loaderIsScreen={false}
    />
  );
}

interface PageContentProps {
  initialTracks: PaginationResponse<Track>;
  playlist: Playlist;
  totalDuration: number;
}
function PageContent({
  initialTracks,
  playlist,
  totalDuration,
}: PageContentProps) {
  const {trans} = useTrans();
  const query = useInfiniteData({
    initialPage: initialTracks,
    queryKey: ['tracks', 'playlist', playlist.id],
    endpoint: `playlists/${playlist.id}/tracks`,
    defaultOrderBy: 'position',
    defaultOrderDir: 'asc',
    paginate: 'simple',
    willSortOrFilter: true,
  });
  const {
    isLoading,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery,
    items,
  } = query;
  const totalItems = playlist.tracks_count || 0;
  const queueId = queueGroupId(playlist, '*', sortDescriptor);

  return (
    <div>
      <AdHost slot="general_top" className="mb-44" />
      <PlaylistPageHeader
        playlist={playlist}
        totalDuration={totalDuration}
        queueId={queueId}
      />
      <TextField
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="mb-44 mt-28 max-w-512 md:mb-24"
        size="sm"
        startAdornment={<SearchIcon />}
        placeholder={trans(message('Search within playlist'))}
      />
      <TrackTable
        queueGroupId={queueId}
        tracks={items}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        renderRowAs={PlaylistTableRow}
        playlist={playlist}
        tableBody={<VirtualTableBody query={query} totalItems={totalItems} />}
      />
      {!items.length && !isLoading && (
        <MediaPageNoResultsMessage
          className="mt-34"
          searchQuery={searchQuery}
          description={
            <Trans message="This playlist does not have any tracks yet" />
          }
        />
      )}
      <AdHost slot="general_bottom" className="mt-44" />
    </div>
  );
}
