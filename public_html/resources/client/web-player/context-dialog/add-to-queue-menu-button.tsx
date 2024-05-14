import {ContextMenuButton} from '@app/web-player/context-dialog/context-dialog-layout';
import {Trans} from '@common/i18n/trans';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {tracksToMediaItems} from '@app/web-player/tracks/utils/track-to-media-item';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {Track} from '@app/web-player/tracks/track';
import {Artist} from '@app/web-player/artists/artist';
import {Playlist} from '@app/web-player/playlists/playlist';
import {usePlayerActions} from '@common/player/hooks/use-player-actions';
import {Album} from '@app/web-player/albums/album';

type MediaItem = Track[] | Album | Artist | Playlist;

interface AddToQueueButtonProps {
  item: MediaItem;
  loadTracks: () => Promise<Track[]>;
}
export function AddToQueueButton({item, loadTracks}: AddToQueueButtonProps) {
  const {close: closeMenu} = useDialogContext();
  const player = usePlayerActions();

  return (
    <ContextMenuButton
      onClick={async () => {
        closeMenu();
        const tracks = await loadTracks();
        player.appendToQueue(
          tracksToMediaItems(
            tracks,
            Array.isArray(item) ? undefined : queueGroupId(item)
          )
        );
      }}
    >
      <Trans message="Add to queue" />
    </ContextMenuButton>
  );
}
