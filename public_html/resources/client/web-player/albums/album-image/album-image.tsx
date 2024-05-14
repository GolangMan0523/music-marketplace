import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {Album} from '@app/web-player/albums/album';
import clsx from 'clsx';
import {AlbumIcon} from '@common/icons/material/Album';

interface AlbumImageProps {
  album: Album;
  className?: string;
  size?: string;
}
export function AlbumImage({album, className, size}: AlbumImageProps) {
  const {trans} = useTrans();
  const src = album?.image;
  const imgClassName = clsx(
    className,
    size,
    'object-cover bg-fg-base/4',
    !src ? 'flex items-center justify-center' : 'block',
  );

  return src ? (
    <img
      className={imgClassName}
      draggable={false}
      loading="lazy"
      src={src}
      alt={trans(message('Image for :name', {values: {name: album.name}}))}
    />
  ) : (
    <span className={clsx(imgClassName, 'overflow-hidden')}>
      <AlbumIcon className="max-w-[60%] text-divider" size="text-9xl" />
    </span>
  );
}
