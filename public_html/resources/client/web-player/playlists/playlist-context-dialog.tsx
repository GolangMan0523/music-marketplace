import {Trans} from '@common/i18n/trans';
import {loadMediaItemTracks} from '@app/web-player/requests/load-media-item-tracks';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {Track} from '@app/web-player/tracks/track';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {
  ContextDialogLayout,
  ContextMenuButton,
} from '@app/web-player/context-dialog/context-dialog-layout';
import useCopyClipboard from 'react-use-clipboard';
import {Playlist} from '@app/web-player/playlists/playlist';
import {
  getPlaylistLink,
  PlaylistLink,
} from '@app/web-player/playlists/playlist-link';
import {usePlaylistPermissions} from '@app/web-player/playlists/hooks/use-playlist-permissions';
import {PlaylistImage} from '@app/web-player/playlists/playlist-image';
import React, {Fragment, useCallback} from 'react';
import {useIsFollowingPlaylist} from '@app/web-player/playlists/hooks/use-is-following-playlist';
import {openDialog} from '@common/ui/overlays/store/dialog-store';
import {UpdatePlaylistDialog} from '@app/web-player/playlists/crupdate-dialog/update-playlist-dialog';
import {useUpdatePlaylist} from '@app/web-player/playlists/requests/use-update-playlist';
import {CheckIcon} from '@common/icons/material/Check';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {useDeletePlaylist} from '@app/web-player/playlists/requests/use-delete-playlist';
import {useFollowPlaylist} from '@app/web-player/playlists/requests/use-follow-playlist';
import {useUnfollowPlaylist} from '@app/web-player/playlists/requests/use-unfollow-playlist';
import {AddToQueueButton} from '@app/web-player/context-dialog/add-to-queue-menu-button';
import {PlaylistOwnerName} from '@app/web-player/playlists/playlist-grid-item';
import {ShareMediaButton} from '@app/web-player/context-dialog/share-media-button';

interface PlaylistContextDialogProps {
  playlist: Playlist;
}
export function PlaylistContextDialog({playlist}: PlaylistContextDialogProps) {
  const {close: closeMenu} = useDialogContext();
  const [, copyAlbumLink] = useCopyClipboard(
    getPlaylistLink(playlist, {absolute: true}),
  );
  const {canEdit} = usePlaylistPermissions(playlist);

  const loadTracks = useCallback(() => {
    return loadPlaylistTracks(playlist);
  }, [playlist]);

  return (
    <ContextDialogLayout
      image={<PlaylistImage playlist={playlist} />}
      title={<PlaylistLink playlist={playlist} />}
      description={<PlaylistOwnerName playlist={playlist} />}
      loadTracks={loadTracks}
    >
      <AddToQueueButton item={playlist} loadTracks={loadTracks} />
      <TogglePublicButton playlist={playlist} />
      <ToggleCollaborativeButton playlist={playlist} />
      <FollowButtons playlist={playlist} />
      <ContextMenuButton
        onClick={() => {
          copyAlbumLink();
          closeMenu();
          toast(message('Copied link to clipboard'));
        }}
      >
        <Trans message="Copy playlist link" />
      </ContextMenuButton>
      {playlist.public && <ShareMediaButton item={playlist} />}
      {canEdit && (
        <ContextMenuButton
          onClick={() => {
            closeMenu();
            openDialog(UpdatePlaylistDialog, {playlist});
          }}
        >
          <Trans message="Edit" />
        </ContextMenuButton>
      )}
      <DeleteButton playlist={playlist} />
    </ContextDialogLayout>
  );
}

interface FollowButtonsProps {
  playlist: Playlist;
}
function FollowButtons({playlist}: FollowButtonsProps) {
  const isFollowing = useIsFollowingPlaylist(playlist.id);
  const {close: closeMenu} = useDialogContext();
  const followPlaylist = useFollowPlaylist(playlist);
  const unFollowPlaylist = useUnfollowPlaylist(playlist);
  const {isCreator} = usePlaylistPermissions(playlist);

  // if user has created this playlist, bail
  if (isCreator) {
    return null;
  }

  return (
    <Fragment>
      {!isFollowing ? (
        <ContextMenuButton
          onClick={() => {
            closeMenu();
            followPlaylist.mutate();
          }}
        >
          <Trans message="Follow" />
        </ContextMenuButton>
      ) : (
        <ContextMenuButton
          onClick={() => {
            closeMenu();
            unFollowPlaylist.mutate();
          }}
        >
          <Trans message="Unfollow" />
        </ContextMenuButton>
      )}
    </Fragment>
  );
}

function TogglePublicButton({playlist}: FollowButtonsProps) {
  const {close: closeMenu} = useDialogContext();
  const updatePlaylist = useUpdatePlaylist({playlistId: playlist.id});
  const {isCreator} = usePlaylistPermissions(playlist);

  if (!isCreator) {
    return null;
  }

  const togglePublic = () => {
    closeMenu();
    updatePlaylist.mutate({public: !playlist.public});
  };

  return (
    <ContextMenuButton
      disabled={updatePlaylist.isPending}
      onClick={() => togglePublic()}
    >
      {playlist.public ? (
        <Trans message="Make private" />
      ) : (
        <Trans message="Make public" />
      )}
    </ContextMenuButton>
  );
}

function ToggleCollaborativeButton({playlist}: FollowButtonsProps) {
  const {close: closeMenu} = useDialogContext();
  const updatePlaylist = useUpdatePlaylist({playlistId: playlist.id});
  const {isCreator} = usePlaylistPermissions(playlist);

  if (!isCreator) {
    return null;
  }

  const toggleCollaborative = () => {
    closeMenu();
    updatePlaylist.mutate({collaborative: !playlist.collaborative});
  };

  return (
    <ContextMenuButton
      disabled={updatePlaylist.isPending}
      startIcon={playlist.collaborative ? <CheckIcon /> : undefined}
      onClick={() => toggleCollaborative()}
    >
      <Trans message="Collaborative" />
    </ContextMenuButton>
  );
}

function DeleteButton({playlist}: FollowButtonsProps) {
  const {close: closeMenu} = useDialogContext();
  const deletePlaylist = useDeletePlaylist(playlist.id);
  const {canDelete} = usePlaylistPermissions(playlist);

  if (!canDelete) {
    return null;
  }

  return (
    <ContextMenuButton
      disabled={deletePlaylist.isPending}
      onClick={() => {
        closeMenu();
        openDialog(ConfirmationDialog, {
          isDanger: true,
          title: <Trans message="Delete playlist" />,
          body: (
            <Trans message="Are you sure you want to delete this playlist?" />
          ),
          confirm: <Trans message="Delete" />,
          onConfirm: () => {
            deletePlaylist.mutate();
          },
        });
      }}
    >
      <Trans message="Delete" />
    </ContextMenuButton>
  );
}

async function loadPlaylistTracks(playlist: Playlist): Promise<Track[]> {
  // load playlist tracks if not loaded already
  if (typeof playlist.tracks === 'undefined') {
    const tracks = await loadMediaItemTracks(queueGroupId(playlist));
    if (!tracks.length) {
      toast(message('This playlist has no tracks yet.'));
    }
    return tracks;
  }
  return playlist.tracks;
}
