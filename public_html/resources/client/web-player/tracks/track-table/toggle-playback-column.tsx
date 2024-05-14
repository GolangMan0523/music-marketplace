import {Track} from '@app/web-player/tracks/track';
import {useTrans} from '@common/i18n/use-trans';
import React, {useContext, useState} from 'react';
import {TableContext} from '@common/ui/tables/table-context';
import {trackToMediaItem} from '@app/web-player/tracks/utils/track-to-media-item';
import {message} from '@common/i18n/message';
import {PauseIcon} from '@common/icons/material/Pause';
import {PlayArrowFilledIcon} from '@app/web-player/tracks/play-arrow-filled';
import clsx from 'clsx';
import {usePlayerActions} from '@common/player/hooks/use-player-actions';
import {useTrackTableMeta} from '@app/web-player/tracks/track-table/use-track-table-meta';
import {EqualizerImage} from '@app/web-player/tracks/equalizer-image/equalizer-image';
import {useIsTrackPlaying} from '@app/web-player/tracks/hooks/use-is-track-playing';
import {useIsTrackCued} from '@app/web-player/tracks/hooks/use-is-track-cued';

interface TogglePlaybackColumnProps {
  track: Track;
  rowIndex: number;
  isHovered: boolean;
}
export function TogglePlaybackColumn({
  track,
  rowIndex,
  isHovered,
}: TogglePlaybackColumnProps) {
  const {queueGroupId} = useTrackTableMeta();
  const isPlaying = useIsTrackPlaying(track.id, queueGroupId);
  const isCued = useIsTrackCued(track.id, queueGroupId);

  return (
    <div className="w-24 h-24 text-center">
      {isHovered || isPlaying ? (
        <TogglePlaybackButton
          track={track}
          trackIndex={rowIndex}
          isPlaying={isPlaying}
        />
      ) : (
        <span className={clsx(isCued ? 'text-primary' : 'text-muted')}>
          {rowIndex + 1}
        </span>
      )}
    </div>
  );
}

interface TogglePlaybackButtonProps {
  track: Track;
  trackIndex: number;
  isPlaying: boolean;
}
function TogglePlaybackButton({
  track,
  trackIndex,
  isPlaying,
}: TogglePlaybackButtonProps) {
  const {trans} = useTrans();
  const player = usePlayerActions();
  const {data} = useContext(TableContext);
  const {queueGroupId} = useTrackTableMeta();
  const [isHover, setHover] = useState(false);

  if (isPlaying) {
    return (
      <button
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        aria-label={trans(message('Pause :name', {values: {name: track.name}}))}
        tabIndex={0}
        onClick={e => {
          e.stopPropagation();
          player.pause();
        }}
      >
        {isHover ? <PauseIcon /> : <EqualizerImage />}
      </button>
    );
  }

  return (
    <button
      aria-label={trans(message('Play :name', {values: {name: track.name}}))}
      tabIndex={0}
      onClick={async e => {
        e.stopPropagation();
        const newQueue = data.map(d =>
          trackToMediaItem(d as Track, queueGroupId)
        );
        player.overrideQueueAndPlay(newQueue, trackIndex);
      }}
    >
      <PlayArrowFilledIcon />
    </button>
  );
}
