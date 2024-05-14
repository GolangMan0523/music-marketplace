import {StaticPageTitle} from '@common/seo/static-page-title';
import {Trans} from '@common/i18n/trans';
import {useLibraryStore} from '@app/web-player/library/state/likes-store';
import React from 'react';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import {VirtualTableBody} from '@app/web-player/playlists/virtual-table-body';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {useAuth} from '@common/auth/use-auth';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {SearchIcon} from '@common/icons/material/Search';
import {message} from '@common/i18n/message';
import {useTrans} from '@common/i18n/use-trans';
import {PlaybackToggleButton} from '@app/web-player/playable-item/playback-toggle-button';
import {PageErrorMessage} from '@common/errors/page-error-message';
import {TableDataItem} from '@common/ui/tables/types/table-data-item';
import {MediaPageNoResultsMessage} from '@app/web-player/layout/media-page-no-results-message';
import {useUserLikedTracks} from '@app/web-player/library/requests/use-user-liked-tracks';
import {AdHost} from '@common/admin/ads/ad-host';

export function LibraryTracksPage() {
  const trackCount = useLibraryStore(s => Object.keys(s.track).length);

  const query = useUserLikedTracks('me', {willSortOrFilter: true});
  const {
    isInitialLoading,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery,
    items,
    isError,
  } = query;

  const {user} = useAuth();
  const {trans} = useTrans();
  const queueId = queueGroupId(user!, 'libraryTracks', sortDescriptor);

  if (isError) {
    return <PageErrorMessage />;
  }

  return (
    <div>
      <StaticPageTitle>
        <Trans message="Your tracks" />
      </StaticPageTitle>
      <AdHost slot="general_top" className="mb-34" />
      <div className="flex flex-wrap items-center gap-24 justify-between mb-34">
        <h1 className="text-2xl font-semibold w-max md:w-full whitespace-nowrap">
          {trackCount ? (
            <Trans
              message="[one 1 liked song|other :count liked songs]"
              values={{count: trackCount}}
            />
          ) : (
            <Trans message="My songs" />
          )}
        </h1>
        <PlaybackToggleButton
          queueId={queueId}
          buttonType="text"
          className="min-w-128 flex-shrink-0"
        />
        <TextField
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-512 flex-auto"
          size="sm"
          startAdornment={<SearchIcon />}
          placeholder={trans(message('Search within tracks'))}
        />
      </div>
      <TrackTable
        queueGroupId={queueId}
        tracks={isInitialLoading ? getPlaceholderItems(trackCount) : items}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        hideAddedAtColumn={false}
        tableBody={<VirtualTableBody query={query} totalItems={trackCount} />}
      />
      {!items.length && !isInitialLoading && (
        <MediaPageNoResultsMessage
          className="mt-34"
          searchQuery={searchQuery}
          description={
            <Trans message="You have not added any songs to your library yet." />
          }
        />
      )}
      <AdHost slot="general_bottom" className="mt-34" />
    </div>
  );
}

function getPlaceholderItems(totalTracks: number): TableDataItem[] {
  // 30 tracks per page by default
  return [...new Array(Math.min(totalTracks, 30)).keys()].map((key, index) => {
    return {
      isPlaceholder: true,
      id: `placeholder-${key}`,
    };
  });
}
