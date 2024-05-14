import {useAuthUserPlaylists} from '@app/web-player/playlists/requests/use-auth-user-playlists';
import {m} from 'framer-motion';
import {Button} from '@common/ui/buttons/button';
import {KeyboardBackspaceIcon} from '@common/icons/material/KeyboardBackspace';
import {Trans} from '@common/i18n/trans';
import {
  ContextMenuButton,
  ContextMenuLayoutState,
} from '@app/web-player/context-dialog/context-dialog-layout';
import {AddIcon} from '@common/icons/material/Add';
import {KeyboardArrowRightIcon} from '@common/icons/material/KeyboardArrowRight';
import {useContext, useMemo} from 'react';
import {useAddTracksToPlaylist} from '@app/web-player/playlists/requests/use-add-tracks-to-playlist';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {openDialog} from '@common/ui/overlays/store/dialog-store';
import {CreatePlaylistDialog} from '@app/web-player/playlists/crupdate-dialog/create-playlist-dialog';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useAuth} from '@common/auth/use-auth';
import {useAuthClickCapture} from '@app/web-player/use-auth-click-capture';

export function PlaylistPanel() {
  const {data} = useAuthUserPlaylists();
  const {user} = useAuth();
  const {close: closeMenu} = useDialogContext();
  const {loadTracks, setPlaylistPanelIsActive} = useContext(
    ContextMenuLayoutState,
  );
  const addToPlaylist = useAddTracksToPlaylist();

  // only show playlists user created or ones that are collaborative
  const playlists = useMemo(() => {
    return data.playlists.filter(
      p => p.owner_id === user?.id || p.collaborative,
    );
  }, [data, user]);

  return (
    <m.div
      initial={{x: '100%', opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{x: '-100%', opacity: 0}}
      transition={{type: 'tween', duration: 0.14}}
    >
      <div className="border-b pb-10 my-10 px-10">
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => setPlaylistPanelIsActive(false)}
        >
          <Trans message="Back" />
        </Button>
      </div>
      <ul className="overflow-y-auto overflow-x-hidden max-h-350">
        <ContextMenuButton
          startIcon={<AddIcon />}
          onClick={async () => {
            closeMenu();
            const [playlist, tracks] = await Promise.all([
              openDialog(CreatePlaylistDialog),
              loadTracks(),
            ]);
            if (tracks.length && playlist) {
              addToPlaylist.mutate({
                playlistId: playlist.id,
                tracks,
              });
            }
          }}
          className="text-primary"
        >
          <Trans message="New playlist" />
        </ContextMenuButton>
        {playlists.map(playlist => (
          <ContextMenuButton
            key={playlist.id}
            onClick={async () => {
              closeMenu();
              const tracks = await loadTracks();
              if (tracks?.length && !addToPlaylist.isPending) {
                addToPlaylist.mutate({
                  playlistId: playlist.id,
                  tracks,
                });
              } else {
                toast(message('This item does not have tracks yet'));
              }
            }}
          >
            {playlist.name}
          </ContextMenuButton>
        ))}
      </ul>
    </m.div>
  );
}

export function PlaylistPanelButton() {
  const authHandler = useAuthClickCapture();
  const {playlistPanelIsActive, setPlaylistPanelIsActive} = useContext(
    ContextMenuLayoutState,
  );
  return (
    <ContextMenuButton
      endIcon={<KeyboardArrowRightIcon />}
      onClickCapture={authHandler}
      onClick={() => {
        setPlaylistPanelIsActive(!playlistPanelIsActive);
      }}
    >
      <Trans message="Add to playlist" />
    </ContextMenuButton>
  );
}
