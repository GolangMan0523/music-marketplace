import {StaticPageTitle} from '@common/seo/static-page-title';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {SearchIcon} from '@common/icons/material/Search';
import {message} from '@common/i18n/message';
import {useTrans} from '@common/i18n/use-trans';
import {PageErrorMessage} from '@common/errors/page-error-message';
import {ContentGrid} from '@app/web-player/playable-item/content-grid';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {MediaPageNoResultsMessage} from '@app/web-player/layout/media-page-no-results-message';
import {PlayableMediaGridSkeleton} from '@app/web-player/playable-item/player-media-grid-skeleton';
import {LibraryPageSortDropdown} from '@app/web-player/library/library-page-sort-dropdown';
import {useUserPlaylists} from '@app/web-player/library/requests/use-user-playlists';
import {PlaylistGridItem} from '@app/web-player/playlists/playlist-grid-item';
import {useAuthUserPlaylists} from '@app/web-player/playlists/requests/use-auth-user-playlists';
import {getPlaylistLink} from '@app/web-player/playlists/playlist-link';
import {IconButton} from '@common/ui/buttons/icon-button';
import {PlaylistAddIcon} from '@common/icons/material/PlaylistAdd';
import {CreatePlaylistDialog} from '@app/web-player/playlists/crupdate-dialog/create-playlist-dialog';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useAuthClickCapture} from '@app/web-player/use-auth-click-capture';
import {AdHost} from '@common/admin/ads/ad-host';

const sortItems = {
  'updated_at:desc': message('Recently updated'),
  'name:asc': message('A-Z'),
  'views:desc': message('Most viewed'),
  'plays:desc': message('Most played'),
};

export function LibraryPlaylistsPage() {
  const navigate = useNavigate();
  const authHandler = useAuthClickCapture();
  const {trans} = useTrans();
  const {data} = useAuthUserPlaylists();
  const totalItems = data.playlists.length;
  const query = useUserPlaylists('me', {willSortOrFilter: true});
  const {
    isInitialLoading,
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
        <Trans message="Your playlists" />
      </StaticPageTitle>
      <AdHost slot="general_top" className="mb-34" />
      <div className="flex items-center justify-between gap-24 mb-20">
        <h1 className="text-2xl font-semibold whitespace-nowrap">
          {totalItems ? (
            <Trans
              message="[one 1 playlist|other :count playlists]"
              values={{count: totalItems}}
            />
          ) : (
            <Trans message="My playlists" />
          )}
        </h1>
        <DialogTrigger
          type="modal"
          onClose={newPlaylist => {
            if (newPlaylist) {
              navigate(getPlaylistLink(newPlaylist));
            }
          }}
        >
          <IconButton className="flex-shrink-0" onClickCapture={authHandler}>
            <PlaylistAddIcon />
          </IconButton>
          <CreatePlaylistDialog />
        </DialogTrigger>
      </div>

      <div className="flex items-center gap-24 justify-between">
        <TextField
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-512 flex-auto"
          size="sm"
          startAdornment={<SearchIcon />}
          placeholder={trans(message('Search within playlists'))}
        />
        <LibraryPageSortDropdown
          items={sortItems}
          sortDescriptor={sortDescriptor}
          setSortDescriptor={setSortDescriptor}
        />
      </div>
      <div className="mt-34">
        <AnimatePresence initial={false} mode="wait">
          {isInitialLoading ? (
            <PlayableMediaGridSkeleton itemCount={totalItems} />
          ) : (
            <m.div key="media-grid" {...opacityAnimation}>
              <ContentGrid>
                {items.map(playlist => (
                  <PlaylistGridItem key={playlist.id} playlist={playlist} />
                ))}
                <InfiniteScrollSentinel query={query} />
              </ContentGrid>
            </m.div>
          )}
        </AnimatePresence>
      </div>
      {!items.length && !isInitialLoading && (
        <MediaPageNoResultsMessage
          className="mt-34"
          searchQuery={searchQuery}
          description={
            <Trans message="You have not added any playlists to your library yet." />
          }
        />
      )}
    </div>
  );
}
