import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {Artist} from '@app/web-player/artists/artist';
import {Trans} from '@common/i18n/trans';
import {CheckIcon} from '@common/icons/material/Check';
import clsx from 'clsx';
import {MicIcon} from '@common/icons/material/Mic';

interface SmallArtistImageProps {
  artist: Artist;
  className?: string;
  wrapperClassName?: string;
  size?: string;
  showVerifiedBadge?: boolean;
}
export function SmallArtistImage({
  artist,
  className,
  wrapperClassName,
  size,
  showVerifiedBadge = false,
}: SmallArtistImageProps) {
  const {trans} = useTrans();
  const src = getSmallArtistImage(artist);
  const imgClassName = clsx(
    size,
    className,
    'bg-fg-base/4 object-cover',
    !src ? 'flex items-center justify-center' : 'block',
  );

  const image = src ? (
    <img
      className={imgClassName}
      draggable={false}
      loading="lazy"
      src={src}
      alt={trans(message('Image for :name', {values: {name: artist.name}}))}
    />
  ) : (
    <span className={clsx(imgClassName, 'overflow-hidden')}>
      <MicIcon className="max-w-[60%] text-divider" size="text-9xl" />
    </span>
  );

  return (
    <div
      className={clsx('relative isolate flex-shrink-0', size, wrapperClassName)}
    >
      {image}
      {showVerifiedBadge && artist.verified && (
        <div
          className="absolute bottom-24 left-0 right-0 mx-auto flex w-max max-w-full items-center gap-6 rounded-full bg-black/60 px-8 py-4 text-sm text-white"
          color="positive"
        >
          <div className="rounded-full bg-primary p-1">
            <CheckIcon className="text-white" size="sm" />
          </div>
          <Trans message="Verified artist" />
        </div>
      )}
    </div>
  );
}

export function getSmallArtistImage(artist: Artist) {
  return artist.image_small || artist.albums?.[0]?.image;
}
