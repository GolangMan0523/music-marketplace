import {TrackContextDialog} from '@app/web-player/tracks/context-dialog/track-context-dialog';
import React from 'react';
import {MediaItem} from '@common/player/media-item';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {usePlayerActions} from '@common/player/hooks/use-player-actions';
import {ContextMenuButton} from '@app/web-player/context-dialog/context-dialog-layout';
import {Trans} from '@common/i18n/trans';

interface Props {
  queueItems: MediaItem[];
}
export function QueueTrackContextDialog({queueItems}: Props) {
  return (
    <TrackContextDialog
      tracks={queueItems.map(item => item.meta)}
      showAddToQueueButton={false}
    >
      {() => <RemoveFromQueueContextButton queueItems={queueItems} />}
    </TrackContextDialog>
  );
}

interface RemoveFromQueueContextButton {
  queueItems: MediaItem[];
}
function RemoveFromQueueContextButton({
  queueItems,
}: RemoveFromQueueContextButton) {
  const {close: closeMenu} = useDialogContext();
  const player = usePlayerActions();

  return (
    <ContextMenuButton
      onClick={async () => {
        closeMenu();
        player.removeFromQueue(queueItems);
      }}
    >
      <Trans message="Remove from queue" />
    </ContextMenuButton>
  );
}
