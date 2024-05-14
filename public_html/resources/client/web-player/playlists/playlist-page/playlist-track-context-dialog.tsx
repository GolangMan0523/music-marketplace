import {Playlist} from '@app/web-player/playlists/playlist';
import {Trans} from '@common/i18n/trans';
import {ContextMenuButton} from '@app/web-player/context-dialog/context-dialog-layout';
import {useRemoveTracksFromPlaylist} from '@app/web-player/playlists/requests/use-remove-tracks-from-playlist';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {TableTrackContextDialog} from '@app/web-player/tracks/context-dialog/table-track-context-dialog';
import {useAuth} from '@common/auth/use-auth';
import {Track} from '@app/web-player/tracks/track';

interface PlaylistTrackContextDialogProps {
  playlist: Playlist;
}
export function PlaylistTrackContextDialog({
  playlist,
  ...props
}: PlaylistTrackContextDialogProps) {
  return (
    <TableTrackContextDialog {...props}>
      {tracks => (
        <RemoveFromPlaylistMenuItem playlist={playlist} tracks={tracks} />
      )}
    </TableTrackContextDialog>
  );
}

interface RemoveFromPlaylistMenuItemProps {
  playlist: Playlist;
  tracks: Track[];
}
export function RemoveFromPlaylistMenuItem({
  playlist,
  tracks,
}: RemoveFromPlaylistMenuItemProps) {
  const {user} = useAuth();
  const removeTracks = useRemoveTracksFromPlaylist();
  const {close: closeMenu} = useDialogContext();
  const canRemove = playlist.owner_id === user?.id || playlist.collaborative;

  if (!canRemove) {
    return null;
  }

  return (
    <ContextMenuButton
      onClick={() => {
        if (!removeTracks.isPending) {
          removeTracks.mutate({playlistId: playlist.id, tracks});
          closeMenu();
        }
      }}
    >
      <Trans message="Remove from this playlist" />
    </ContextMenuButton>
  );
}
