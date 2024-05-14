import {Track} from '@app/web-player/tracks/track';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import clsx from 'clsx';
import {MusicNoteIcon} from '@common/icons/material/MusicNote';

interface TrackImageProps {
  track: Track;
  className?: string;
  size?: string;
  background?: string;
}
export function TrackImage({
  track,
  className,
  size,
  background = 'bg-fg-base/4',
}: TrackImageProps) {
  const {trans} = useTrans();
  const src = getTrackImageSrc(track);
  const imgClassName = clsx(
    className,
    size,
    background,
    'object-cover',
    !src ? 'flex items-center justify-center' : 'block',
  );
  return src ? (
    <img
      className={imgClassName}
      draggable={false}
      loading="lazy"
      src={src}
      alt={trans(message('Image for :name', {values: {name: track.name}}))}
    />
  ) : (
    <span className={clsx(imgClassName, 'overflow-hidden')}>
      <MusicNoteIcon className="max-w-[60%] text-divider" size="text-9xl" />
    </span>
  );
}

export function getTrackImageSrc(track: Track) {
  if (track.image) {
    return track.image;
  } else if (track.album?.image) {
    return track.album.image;
  }
}
