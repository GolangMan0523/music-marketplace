import React, {Fragment, useContext} from 'react';
import {Track} from '@app/web-player/tracks/track';
import clsx from 'clsx';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {MoreHorizIcon} from '@common/icons/material/MoreHoriz';
import {TrackContextDialog} from '@app/web-player/tracks/context-dialog/track-context-dialog';
import {LikeIconButton} from '@app/web-player/library/like-icon-button';
import {MoreVertIcon} from '@common/icons/material/MoreVert';
import {TableContext} from '@common/ui/tables/table-context';
import {RemoveFromPlaylistMenuItem} from '@app/web-player/playlists/playlist-page/playlist-track-context-dialog';

interface Props {
  track: Track;
  isHovered: boolean;
}
export function TrackOptionsColumn({track, isHovered}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const {meta} = useContext(TableContext);
  return (
    <Fragment>
      <DialogTrigger type="popover" mobileType="tray">
        <IconButton
          size={isMobile ? 'sm' : 'md'}
          className={clsx(
            isMobile ? 'text-muted' : 'mr-8',
            !isMobile && !isHovered && 'invisible',
          )}
        >
          {isMobile ? <MoreVertIcon /> : <MoreHorizIcon />}
        </IconButton>
        <TrackContextDialog tracks={[track]}>
          {tracks =>
            meta.playlist ? (
              <RemoveFromPlaylistMenuItem
                playlist={meta.playlist}
                tracks={tracks}
              />
            ) : null
          }
        </TrackContextDialog>
      </DialogTrigger>
      {!isMobile && <LikeIconButton size="xs" likeable={track} />}
    </Fragment>
  );
}
