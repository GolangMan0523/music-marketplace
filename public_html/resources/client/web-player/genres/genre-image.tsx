import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import clsx from 'clsx';
import {Genre} from '@app/web-player/genres/genre';
import {LabelIcon} from '@common/icons/material/Label';

interface GenreImageProps {
  genre: Genre;
  className?: string;
  size?: string;
}
export function GenreImage({genre, className, size}: GenreImageProps) {
  const {trans} = useTrans();
  const src = genre.image;
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
      alt={trans(message('Image for :name', {values: {name: genre.name}}))}
    />
  ) : (
    <span className={clsx(imgClassName, 'overflow-hidden')}>
      <LabelIcon className="max-w-[60%] text-divider" size="text-9xl" />
    </span>
  );
}
