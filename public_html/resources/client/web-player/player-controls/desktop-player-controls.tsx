import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {ReactNode, useContext} from 'react';
import {useCuedTrack} from '@app/web-player/player-controls/use-cued-track';
import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {PlaybackControls} from '@app/web-player/player-controls/playback-controls';
import {IconButton} from '@common/ui/buttons/icon-button';
import {LikeIconButton} from '@app/web-player/library/like-icon-button';
import {DashboardLayoutContext} from '@common/ui/layout/dashboard-layout-context';
import {
  playerOverlayState,
  usePlayerOverlayStore,
} from '@app/web-player/state/player-overlay-store';
import {KeyboardArrowDownIcon} from '@common/icons/material/KeyboardArrowDown';
import {KeyboardArrowUpIcon} from '@common/icons/material/KeyboardArrowUp';
import {LyricsButton} from '@app/web-player/player-controls/lyrics-button';
import {DownloadTrackButton} from '@app/web-player/player-controls/download-track-button';
import {useSettings} from '@common/core/settings/use-settings';
import {getTrackLink, TrackLink} from '@app/web-player/tracks/track-link';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {TrackContextDialog} from '@app/web-player/tracks/context-dialog/track-context-dialog';
import {Link} from 'react-router-dom';
import {ArtistContextDialog} from '@app/web-player/artists/artist-context-dialog';
import {MediaQueueListIcon} from '@common/icons/media/media-queue-list';
import {VolumeControls} from '@common/player/ui/controls/volume-controls';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';

export function DesktopPlayerControls() {
  const mediaIsCued = usePlayerStore(s => s.cuedMedia != null);
  if (!mediaIsCued) return null;

  return (
    <div className="dashboard-grid-footer z-30 flex h-96 items-center justify-between border-t bg px-16">
      <QueuedTrack />
      <PlaybackControls className="w-2/5 max-w-[722px]" />
      <SecondaryControls />
    </div>
  );
}

function QueuedTrack() {
  const track = useCuedTrack();
  let content: ReactNode;

  if (track) {
    content = (
      <div className="flex items-center gap-14">
        <DialogTrigger type="popover" triggerOnContextMenu placement="top">
          <Link to={getTrackLink(track)} className="flex-shrink-0">
            <TrackImage
              className="h-56 w-56 rounded object-cover"
              track={track}
            />
          </Link>
          <TrackContextDialog tracks={[track]} />
        </DialogTrigger>
        <div className="min-w-0 overflow-hidden overflow-ellipsis">
          <DialogTrigger type="popover" triggerOnContextMenu placement="top">
            <TrackLink
              track={track}
              className="min-w-0 max-w-full whitespace-nowrap text-sm"
            />
            <TrackContextDialog tracks={[track]} />
          </DialogTrigger>
          {track.artists?.length ? (
            <DialogTrigger type="popover" triggerOnContextMenu placement="top">
              <div className="text-xs text-muted">
                <ArtistLinks
                  artists={track.artists}
                  className="whitespace-nowrap"
                />
              </div>
              <ArtistContextDialog artist={track.artists[0]} />
            </DialogTrigger>
          ) : null}
        </div>
        <LikeIconButton likeable={track} />
      </div>
    );
  } else {
    content = null;
  }

  return <div className="w-[30%] min-w-180">{content}</div>;
}

function SecondaryControls() {
  const {rightSidenavStatus, setRightSidenavStatus} = useContext(
    DashboardLayoutContext,
  );
  return (
    <div className="flex w-[30%] min-w-180 items-center justify-end">
      <LyricsButton />
      <DownloadTrackButton />
      <Tooltip label={<Trans message="Queue" />}>
        <IconButton
          className="flex-shrink-0"
          onClick={() => {
            setRightSidenavStatus(
              rightSidenavStatus === 'closed' ? 'open' : 'closed',
            );
          }}
        >
          <MediaQueueListIcon />
        </IconButton>
      </Tooltip>
      <VolumeControls trackColor="neutral" />
      <OverlayButton />
    </div>
  );
}

function OverlayButton() {
  const isActive = usePlayerOverlayStore(s => s.isMaximized);
  const playerReady = usePlayerStore(s => s.providerReady);
  const {player} = useSettings();

  if (player?.hide_video_button) {
    return null;
  }

  return (
    <Tooltip label={<Trans message="Expand" />}>
      <IconButton
        className="ml-26 flex-shrink-0"
        color="chip"
        variant="flat"
        size="xs"
        iconSize="sm"
        disabled={!playerReady}
        onClick={() => {
          playerOverlayState.toggle();
        }}
      >
        {isActive ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </IconButton>
    </Tooltip>
  );
}
