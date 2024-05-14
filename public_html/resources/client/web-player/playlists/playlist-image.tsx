import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {Playlist} from '@app/web-player/playlists/playlist';
import {getTrackImageSrc} from '@app/web-player/tracks/track-image/track-image';
import clsx from 'clsx';
import {PlaylistPlayIcon} from '@common/icons/material/PlaylistPlay';

interface PlaylistImageProps {
  playlist: Playlist;
  className?: string;
  size?: string;
}
export function PlaylistImage({playlist, className, size}: PlaylistImageProps) {
  const {trans} = useTrans();
  const src = getPlaylistImageSrc(playlist);
  const imgClassName = clsx(
    className,
    size,
    'object-cover bg-fg-base/4',
    !src ? 'flex items-center justify-center' : 'block',
  );

  return src ? (
    <img
      className={clsx(imgClassName, size, 'bg-fg-base/4 object-cover')}
      draggable={false}
      loading="lazy"
      src={src}
      alt={trans(message('Image for :name', {values: {name: playlist.name}}))}
    />
  ) : (
    <span className={clsx(imgClassName, 'overflow-hidden')}>
      <PlaylistPlayIcon className="max-w-[60%] text-divider" size="text-9xl" />
    </span>
  );
}

export function getPlaylistImageSrc(playlist: Playlist) {
  if (playlist.image) {
    return playlist.image;
  }
  const firstTrackImage = playlist.tracks?.[0]
    ? getTrackImageSrc(playlist.tracks[0])
    : null;
  if (firstTrackImage) {
    return firstTrackImage;
  }
}
