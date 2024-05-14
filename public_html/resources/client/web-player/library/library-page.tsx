import {Trans} from '@common/i18n/trans';
import {AudiotrackIcon} from '@common/icons/material/Audiotrack';
import {StaticPageTitle} from '@common/seo/static-page-title';
import React, {ReactElement, ReactNode} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {AlbumIcon} from '@common/icons/material/Album';
import {MicIcon} from '@common/icons/material/Mic';
import {PlaylistPlayIcon} from '@common/icons/material/PlaylistPlay';
import {HistoryIcon} from '@common/icons/material/History';
import {SvgIconProps} from '@common/icons/svg-icon';
import {getPlaylistLink} from '@app/web-player/playlists/playlist-link';
import {IconButton} from '@common/ui/buttons/icon-button';
import {PlaylistAddIcon} from '@common/icons/material/PlaylistAdd';
import {CreatePlaylistDialog} from '@app/web-player/playlists/crupdate-dialog/create-playlist-dialog';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useAuthClickCapture} from '@app/web-player/use-auth-click-capture';
import {useUserPlaylists} from '@app/web-player/library/requests/use-user-playlists';
import {PlaylistImage} from '@app/web-player/playlists/playlist-image';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {AdHost} from '@common/admin/ads/ad-host';
import {useIsTabletMediaQuery} from '@common/utils/hooks/is-tablet-media-query';

export function LibraryPage() {
  const navigate = useNavigate();
  const authHandler = useAuthClickCapture();
  const query = useUserPlaylists('me');
  const isSmallScreen = useIsTabletMediaQuery();

  if (!isSmallScreen) {
    return <Navigate to="/library/songs" replace />;
  }

  return (
    <div>
      <StaticPageTitle>
        <Trans message="Your tracks" />
      </StaticPageTitle>
      <AdHost slot="general_top" className="mb-34" />
      <div className="flex items-center justify-between gap-24 mb-20">
        <h1 className="text-2xl font-semibold whitespace-nowrap">
          <Trans message="Your library" />
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
      <div>
        <MenuItem
          icon={<AudiotrackIcon className="text-main" />}
          to="/library/songs"
        >
          <Trans message="Songs" />
        </MenuItem>
        <MenuItem icon={<PlaylistPlayIcon />} to="/library/playlists">
          <Trans message="Playlists" />
        </MenuItem>
        <MenuItem icon={<AlbumIcon />} to="/library/albums">
          <Trans message="Albums" />
        </MenuItem>
        <MenuItem icon={<MicIcon />} to="/library/artists">
          <Trans message="Artists" />
        </MenuItem>
        <MenuItem icon={<HistoryIcon />} to="/library/history">
          <Trans message="Play history" />
        </MenuItem>
        {query.items.map(playlist => (
          <MenuItem
            key={playlist.id}
            wrapIcon={false}
            icon={
              <PlaylistImage
                size="w-42 h-42"
                className="rounded"
                playlist={playlist}
              />
            }
            to={getPlaylistLink(playlist)}
          >
            {playlist.name}
          </MenuItem>
        ))}
        <InfiniteScrollSentinel query={query} />
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: ReactElement<SvgIconProps>;
  children: ReactNode;
  to: string;
  wrapIcon?: boolean;
}
function MenuItem({icon, children, to, wrapIcon = true}: MenuItemProps) {
  return (
    <Link className="flex items-center gap-14 mb-18 text-sm" to={to}>
      {wrapIcon ? (
        <div className="rounded bg-chip p-8 w-42 h-42">{icon}</div>
      ) : (
        icon
      )}
      {children}
    </Link>
  );
}
