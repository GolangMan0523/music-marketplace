import {StaticPageTitle} from '@common/seo/static-page-title';
import {Trans} from '@common/i18n/trans';
import {useLibraryStore} from '@app/web-player/library/state/likes-store';
import React from 'react';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {SearchIcon} from '@common/icons/material/Search';
import {message} from '@common/i18n/message';
import {useTrans} from '@common/i18n/use-trans';
import {PageErrorMessage} from '@common/errors/page-error-message';
import {AlbumGridItem} from '@app/web-player/albums/album-grid-item';
import {ContentGrid} from '@app/web-player/playable-item/content-grid';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {MediaPageNoResultsMessage} from '@app/web-player/layout/media-page-no-results-message';
import {PlayableMediaGridSkeleton} from '@app/web-player/playable-item/player-media-grid-skeleton';
import {LibraryPageSortDropdown} from '@app/web-player/library/library-page-sort-dropdown';
import {useUserLikedAlbums} from '@app/web-player/library/requests/use-user-liked-albums';
import {AdHost} from '@common/admin/ads/ad-host';

const sortItems = {
  'likes.created_at:desc': message('Recently added'),
  'name:asc': message('A-Z'),
  'release_date:desc': message('Release date'),
};

export function LibraryAlbumsPage() {
  const {trans} = useTrans();
  const totalItems = useLibraryStore(s => Object.keys(s.album).length);
  const query = useUserLikedAlbums('me', {willSortOrFilter: true});
  const {
    isLoading,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery,
    items,
    isError,
  } = query;

  if (isError) {
    return <PageErrorMessage />;
  }

  return (
    <div>
      <StaticPageTitle>
        <Trans message="Your albums" />
      </StaticPageTitle>
      <AdHost slot="general_top" className="mb-34" />
      <h1 className="mb-20 text-2xl font-semibold">
        {totalItems ? (
          <Trans
            message="[one 1 liked album|other :count liked albums]"
            values={{count: totalItems}}
          />
        ) : (
          <Trans message="My albums" />
        )}
      </h1>
      <div className="flex items-center justify-between gap-24">
        <TextField
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-512 flex-auto"
          size="sm"
          startAdornment={<SearchIcon />}
          placeholder={trans(message('Search within albums'))}
        />
        <LibraryPageSortDropdown
          items={sortItems}
          sortDescriptor={sortDescriptor}
          setSortDescriptor={setSortDescriptor}
        />
      </div>
      <div className="mt-34">
        <AnimatePresence initial={false} mode="wait">
          {isLoading ? (
            <PlayableMediaGridSkeleton itemCount={totalItems} />
          ) : (
            <m.div key="media-grid" {...opacityAnimation}>
              <ContentGrid>
                {items.map(album => (
                  <AlbumGridItem key={album.id} album={album} />
                ))}
                <InfiniteScrollSentinel query={query} />
              </ContentGrid>
            </m.div>
          )}
        </AnimatePresence>
      </div>
      {!items.length && !isLoading && (
        <MediaPageNoResultsMessage
          className="mt-34"
          searchQuery={searchQuery}
          description={
            <Trans message="You have not added any albums to your library yet." />
          }
        />
      )}
      <AdHost slot="general_bottom" className="mt-34" />
    </div>
  );
}
