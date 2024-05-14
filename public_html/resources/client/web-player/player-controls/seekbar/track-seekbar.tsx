import {Slider} from '@common/ui/forms/slider/slider';
import {FormattedDuration} from '@common/i18n/formatted-duration';
import {useTrackSeekbar} from '@app/web-player/player-controls/seekbar/use-track-seekbar';
import {Track} from '@app/web-player/tracks/track';
import clsx from 'clsx';

interface TrackSeekbarProps {
  track: Track;
  queue?: Track[];
  className?: string;
}
export function TrackSeekbar({track, queue, className}: TrackSeekbarProps) {
  const {duration, ...sliderProps} = useTrackSeekbar(track, queue);

  return (
    <div className={clsx('flex items-center gap-12', className)}>
      <div className="text-xs text-muted flex-shrink-0 min-w-40 text-right">
        {sliderProps.value ? (
          <FormattedDuration seconds={sliderProps.value} />
        ) : (
          '0:00'
        )}
      </div>
      <Slider
        trackColor="neutral"
        thumbSize="w-14 h-14"
        showThumbOnHoverOnly={true}
        className="flex-auto"
        width="w-auto"
        {...sliderProps}
      />
      <div className="text-xs text-muted flex-shrink-0 min-w-40">
        <FormattedDuration seconds={duration} />
      </div>
    </div>
  );
}
