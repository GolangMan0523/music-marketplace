import {ComponentPropsWithoutRef, useState} from 'react';
import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {usePlayerActions} from '@common/player/hooks/use-player-actions';
import {IconButton} from '@common/ui/buttons/icon-button';
import {loadMediaItemTracks} from '@app/web-player/requests/load-media-item-tracks';
import {trackToMediaItem} from '@app/web-player/tracks/utils/track-to-media-item';
import {PauseIcon} from '@common/icons/material/Pause';
import {EqualizerImage} from '@app/web-player/tracks/equalizer-image/equalizer-image';
import {PlayArrowFilledIcon} from '@app/web-player/tracks/play-arrow-filled';
import {
  ButtonColor,
  ButtonVariant,
} from '@common/ui/buttons/get-shared-button-style';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {Track} from '@app/web-player/tracks/track';
import {ButtonSize} from '@common/ui/buttons/button-size';

interface PlaybackToggleButtonProps {
  queueId?: string;
  // track that should be cued
  track?: Track;
  // queue should be overwritten with these tracks
  tracks?: Track[];
  radius?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
  buttonType: 'icon' | 'text';
  equalizerColor?: 'white' | 'black';
  size?: ButtonSize;
}
export function PlaybackToggleButton({
  queueId,
  track,
  tracks,
  radius,
  variant,
  color,
  disabled,
  className,
  buttonType,
  equalizerColor = buttonType === 'text' ? 'white' : 'black',
  size,
}: PlaybackToggleButtonProps) {
  const [isHover, setIsHover] = useState(false);
  const modelIsQueued = usePlayerStore(s => {
    // specified queue ID is cued
    if (s.cuedMedia && queueId && s.cuedMedia.groupId === queueId) {
      return true;
    }
    // specified track is cued
    if (s.cuedMedia && track && s.cuedMedia.meta.id === track.id) {
      return true;
    }
    return false;
  });
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const modelIsPlaying = isPlaying && modelIsQueued;
  const player = usePlayerActions();

  const statusIcon = modelIsPlaying ? (
    isHover ? (
      <PauseIcon />
    ) : (
      <EqualizerImage color={equalizerColor} />
    )
  ) : (
    <PlayArrowFilledIcon />
  );

  const sharedProps: ComponentPropsWithoutRef<'button'> = {
    disabled,
    onPointerEnter: () => {
      setIsHover(true);
    },
    onPointerLeave: () => {
      setIsHover(false);
    },
    onClick: async () => {
      if (modelIsPlaying) {
        player.pause();
      } else if (modelIsQueued) {
        await player.play();
      } else {
        let newQueue: Track[] = [];
        let newIndex: number = 0;
        if (tracks) {
          newQueue = [...tracks];
          newIndex = track ? tracks.findIndex(t => t.id === track.id) : 0;
        } else if (track) {
          newQueue = [track];
        } else {
          newQueue = await loadMediaItemTracks(queueId!);
        }
        if (newQueue.length) {
          await player.overrideQueueAndPlay(
            newQueue.map(t => trackToMediaItem(t, queueId)),
            newIndex
          );
        }
      }
    },
  };

  if (buttonType === 'icon') {
    return (
      <IconButton
        {...sharedProps}
        variant={variant}
        color={color}
        radius={radius}
        size={size}
        className={className}
      >
        {statusIcon}
      </IconButton>
    );
  }

  return (
    <Button
      {...sharedProps}
      variant={variant || 'flat'}
      color={color || 'primary'}
      radius={radius || 'rounded-full'}
      startIcon={statusIcon}
      size={size}
      className={className}
    >
      {modelIsPlaying ? <Trans message="Pause" /> : <Trans message="Play" />}
    </Button>
  );
}
