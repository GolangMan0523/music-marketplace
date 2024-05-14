import {Album} from '@app/web-player/albums/album';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {AlbumLink, getAlbumLink} from '@app/web-player/albums/album-link';
import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {Trans} from '@common/i18n/trans';
import {loadMediaItemTracks} from '@app/web-player/requests/load-media-item-tracks';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {Track} from '@app/web-player/tracks/track';
import {
  ContextDialogLayout,
  ContextMenuButton,
} from '@app/web-player/context-dialog/context-dialog-layout';
import {PlaylistPanelButton} from '@app/web-player/context-dialog/playlist-panel';
import {useAlbumPermissions} from '@app/web-player/albums/use-album-permissions';
import React, {useCallback} from 'react';
import {AddToQueueButton} from '@app/web-player/context-dialog/add-to-queue-menu-button';
import {ToggleInLibraryMenuButton} from '@app/web-player/context-dialog/toggle-in-library-menu-button';
import {CopyLinkMenuButton} from '@app/web-player/context-dialog/copy-link-menu-button';
import {useDeleteAlbum} from '@app/web-player/albums/requests/use-delete-album';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {openDialog} from '@common/ui/overlays/store/dialog-store';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {ToggleRepostMenuButton} from '@app/web-player/context-dialog/toggle-repost-menu-button';
import {getArtistLink} from '@app/web-player/artists/artist-link';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {ShareMediaButton} from '@app/web-player/context-dialog/share-media-button';

interface AlbumContextMenuProps {
  album: Album;
}
export function AlbumContextDialog({album}: AlbumContextMenuProps) {
  const {canEdit} = useAlbumPermissions(album);
  const isMobile = useIsMobileMediaQuery();

  const loadTracks = useCallback(() => {
    return loadAlbumTracks(album);
  }, [album]);

  return (
    <ContextDialogLayout
      image={<AlbumImage album={album} />}
      title={<AlbumLink album={album} />}
      description={<ArtistLinks artists={album.artists} />}
      loadTracks={loadTracks}
    >
      <AddToQueueButton item={album} loadTracks={loadTracks} />
      <PlaylistPanelButton />
      <ToggleInLibraryMenuButton items={[album]} />
      {album.artists?.[0] && (
        <ContextMenuButton
          type="link"
          to={getArtistLink(album.artists[0])}
          className="md:hidden"
        >
          <Trans message="Go to artist" />
        </ContextMenuButton>
      )}
      {!isMobile && (
        <CopyLinkMenuButton link={getAlbumLink(album, {absolute: true})}>
          <Trans message="Copy album link" />
        </CopyLinkMenuButton>
      )}
      <ShareMediaButton item={album} />
      <ToggleRepostMenuButton item={album} />
      {canEdit && (
        <ContextMenuButton
          type="link"
          to={`/backstage/albums/${album.id}/insights`}
        >
          <Trans message="Insights" />
        </ContextMenuButton>
      )}
      {canEdit && (
        <ContextMenuButton
          type="link"
          to={`/backstage/albums/${album.id}/edit`}
        >
          <Trans message="Edit" />
        </ContextMenuButton>
      )}
      <DeleteButton album={album} />
    </ContextDialogLayout>
  );
}

function DeleteButton({album}: AlbumContextMenuProps) {
  const {close: closeMenu} = useDialogContext();
  const deleteAlbum = useDeleteAlbum();
  const {canDelete} = useAlbumPermissions(album);

  if (!canDelete) {
    return null;
  }

  return (
    <ContextMenuButton
      disabled={deleteAlbum.isPending}
      onClick={() => {
        closeMenu();
        openDialog(ConfirmationDialog, {
          isDanger: true,
          title: <Trans message="Delete album" />,
          body: <Trans message="Are you sure you want to delete this album?" />,
          confirm: <Trans message="Delete" />,
          onConfirm: () => {
            deleteAlbum.mutate({albumId: album.id});
          },
        });
      }}
    >
      <Trans message="Delete" />
    </ContextMenuButton>
  );
}

async function loadAlbumTracks(album: Album): Promise<Track[]> {
  // load album tracks if not loaded already
  if (typeof album.tracks === 'undefined') {
    const tracks = await loadMediaItemTracks(queueGroupId(album));
    if (!tracks.length) {
      toast(message('This album has no tracks yet.'));
    }
    return tracks;
  }
  return album.tracks;
}
