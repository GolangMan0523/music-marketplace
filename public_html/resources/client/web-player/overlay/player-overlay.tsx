import React, {
  Fragment,
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {usePlayerStore} from '@common/player/hooks/use-player-store';
import clsx from 'clsx';
import {
  playerOverlayState,
  usePlayerOverlayStore,
} from '@app/web-player/state/player-overlay-store';
import {IconButton} from '@common/ui/buttons/icon-button';
import {KeyboardArrowDownIcon} from '@common/icons/material/KeyboardArrowDown';
import {PlaybackControls} from '@app/web-player/player-controls/playback-controls';
import {useCuedTrack} from '@app/web-player/player-controls/use-cued-track';
import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {LikeIconButton} from '@app/web-player/library/like-icon-button';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {TrackContextDialog} from '@app/web-player/tracks/context-dialog/track-context-dialog';
import {MoreVertIcon} from '@common/icons/material/MoreVert';
import fscreen from 'fscreen';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import {LyricsButton} from '@app/web-player/player-controls/lyrics-button';
import {useMediaQuery} from '@common/utils/hooks/use-media-query';
import {DownloadTrackButton} from '@app/web-player/player-controls/download-track-button';
import {TrackLink} from '@app/web-player/tracks/track-link';
import {useLocation} from 'react-router-dom';
import {usePrevious} from '@common/utils/hooks/use-previous';
import {PlayerOutlet} from '@common/player/ui/player-outlet';
import {PlayerPoster} from '@common/player/ui/controls/player-poster';
import {MediaFullscreenIcon} from '@common/icons/media/media-fullscreen';
import {MediaQueueListIcon} from '@common/icons/media/media-queue-list';
import {useMiniPlayerIsHidden} from '@app/web-player/overlay/use-mini-player-is-hidden';
import {usePlayerClickHandler} from '@common/player/hooks/use-player-click-handler';
import {QueueTrackContextDialog} from '@app/web-player/layout/queue/queue-track-context-dialog';
import {RowElementProps} from '@common/ui/tables/table-row';
import {Track} from '@app/web-player/tracks/track';
import {TableContext} from '@common/ui/tables/table-context';
import {MediaItem} from '@common/player/media-item';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';

export function PlayerOverlay() {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const isMaximized = usePlayerOverlayStore(s => s.isMaximized);
  const isQueueOpen = usePlayerOverlayStore(s => s.isQueueOpen);
  const isFullscreen = usePlayerStore(s => s.isFullscreen);
  const miniPlayerIsHidden = useMiniPlayerIsHidden();
  const overlayRef = useRef<HTMLDivElement>(null);
  const {pathname} = useLocation();
  const playerClickHandler = usePlayerClickHandler();
  const haveVideo = usePlayerStore(
    s => s.providerApi != null && s.providerName !== 'htmlAudio',
  );
  const previousPathname = usePrevious(pathname);
  const cuedTrack = useCuedTrack();

  // close overlay when route changes
  useEffect(() => {
    if (isMaximized && previousPathname && pathname !== previousPathname) {
      playerOverlayState.toggle();
    }
  }, [pathname, previousPathname, isMaximized]);

  useEffect(() => {
    if (!isMaximized) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playerOverlayState.toggle();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMaximized]);

  return (
    <div
      ref={overlayRef}
      className={clsx(
        'fixed right-0 bg outline-none transition-all',
        miniPlayerIsHidden && !isMaximized && 'hidden',
        isMaximized
          ? 'player-overlay-bg bottom-0 flex h-full w-full flex-col pb-50'
          : 'bottom-96 right-0 h-[213px] w-256',
      )}
    >
      {isMaximized && (
        <div className="mb-10 flex flex-shrink-0 items-center p-10">
          <IconButton
            iconSize="lg"
            className="mr-auto"
            onClick={() => playerOverlayState.toggle()}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
          {isMobile && <LyricsButton />}
          {isMobile && <DownloadTrackButton />}
          <IconButton
            onClick={() => playerOverlayState.toggleQueue()}
            color={isQueueOpen ? 'primary' : undefined}
          >
            <MediaQueueListIcon />
          </IconButton>
          <FullscreenButton overlayRef={overlayRef} />
        </div>
      )}
      <div
        onClick={() => {
          // native video will be put into fullscreen, it will already handle click and double click events
          if (!isFullscreen) {
            playerClickHandler();
          }
        }}
        className={clsx(
          'relative min-h-0 max-w-full flex-auto',
          isMaximized ? 'mx-auto mt-auto px-14' : 'h-full w-full',
          isMaximized && haveVideo ? 'aspect-video' : 'aspect-square max-h-400',
        )}
      >
        <PlayerPoster
          className="absolute inset-0"
          fallback={
            cuedTrack ? (
              <TrackImage
                className="h-full w-full"
                background="bg-[#f5f5f5] dark:bg-[#2c2c35]"
                track={cuedTrack}
              />
            ) : undefined
          }
        />
        <div
          className={haveVideo ? 'h-full w-full flex-auto bg-black' : undefined}
        >
          <PlayerOutlet className="h-full w-full" />
        </div>
      </div>
      {isMaximized && (
        <Fragment>
          <QueuedTrack />
          <PlaybackControls className="container mx-auto mb-auto flex-shrink-0 px-14" />
        </Fragment>
      )}
      {isMaximized && isQueueOpen && <PlayerQueue />}
    </div>
  );
}

interface FullscreenButtonProps {
  overlayRef: MutableRefObject<HTMLDivElement | null>;
}
function FullscreenButton({overlayRef}: FullscreenButtonProps) {
  const playerReady = usePlayerStore(s => s.providerReady);
  return (
    <IconButton
      className={clsx(
        'ml-12 flex-shrink-0 max-md:hidden',
        !fscreen.fullscreenEnabled && 'hidden',
      )}
      disabled={!playerReady}
      onClick={() => {
        if (!overlayRef.current) return;
        if (fscreen.fullscreenElement) {
          fscreen.exitFullscreen();
        } else {
          fscreen.requestFullscreen(overlayRef.current);
        }
      }}
    >
      <MediaFullscreenIcon />
    </IconButton>
  );
}

function QueuedTrack() {
  const track = useCuedTrack();

  if (!track) {
    return null;
  }

  return (
    <div className="container mx-auto my-40 flex flex-shrink-0 items-center justify-center gap-34 px-14 md:my-60">
      <LikeIconButton likeable={track} />
      <div className="min-w-0 text-center">
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base">
          <TrackLink track={track} />
        </div>
        <div className="text-sm text-muted">
          <ArtistLinks artists={track.artists} />
        </div>
      </div>
      <DialogTrigger type="popover" mobileType="tray">
        <IconButton>
          <MoreVertIcon />
        </IconButton>
        <TrackContextDialog tracks={[track]} />
      </DialogTrigger>
    </div>
  );
}

function PlayerQueue() {
  const queue = usePlayerStore(s => s.shuffledQueue);
  const tracks = queue.map(item => item.meta);
  return (
    <div className="fixed bottom-0 left-0 right-0 top-70 overflow-y-auto bg-inherit px-14 md:px-50">
      <TrackTable
        tracks={tracks}
        queueGroupId={queue[0]?.groupId}
        renderRowAs={PlayerQueueRow}
      />
    </div>
  );
}

function PlayerQueueRow({item, children, ...domProps}: RowElementProps<Track>) {
  const queue = usePlayerStore(s => s.shuffledQueue);
  const {selectedRows} = useContext(TableContext);
  const queueItems = useMemo(() => {
    return selectedRows
      .map(trackId => queue.find(item => item.meta.id === trackId))
      .filter(t => !!t) as MediaItem[];
  }, [queue, selectedRows]);

  const row = <div {...domProps}>{children}</div>;
  if (item.isPlaceholder) {
    return row;
  }

  return (
    <DialogTrigger
      type="popover"
      mobileType="tray"
      triggerOnContextMenu
      placement="bottom-start"
    >
      {row}
      <QueueTrackContextDialog queueItems={queueItems} />
    </DialogTrigger>
  );
}
