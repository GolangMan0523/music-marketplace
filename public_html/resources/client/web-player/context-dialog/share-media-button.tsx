import {ContextMenuButton} from '@app/web-player/context-dialog/context-dialog-layout';
import {Trans} from '@common/i18n/trans';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Track} from '@app/web-player/tracks/track';
import {Artist} from '@app/web-player/artists/artist';
import {Album} from '@app/web-player/albums/album';
import {openDialog} from '@common/ui/overlays/store/dialog-store';
import React from 'react';
import {ShareMediaDialog} from '@app/web-player/sharing/share-media-dialog';
import {Playlist} from '@app/web-player/playlists/playlist';

interface Props {
  item: Track | Album | Artist | Playlist;
}
export function ShareMediaButton({item}: Props) {
  const {close: closeMenu} = useDialogContext();
  return (
    <ContextMenuButton
      onClick={() => {
        closeMenu();
        openDialog(ShareMediaDialog, {
          item,
        });
      }}
    >
      <Trans message="Share" />
    </ContextMenuButton>
  );
}
