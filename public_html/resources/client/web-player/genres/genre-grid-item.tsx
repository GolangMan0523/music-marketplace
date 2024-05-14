import {Genre} from '@app/web-player/genres/genre';
import {GenreImage} from '@app/web-player/genres/genre-image';
import {Link} from 'react-router-dom';
import {getGenreLink} from '@app/web-player/genres/genre-link';
import {Trans} from '@common/i18n/trans';

interface GenreGridItemProps {
  genre: Genre;
}
export function GenreGridItem({genre}: GenreGridItemProps) {
  return (
    <Link
      to={getGenreLink(genre)}
      className="relative isolate block h-max cursor-pointer overflow-hidden rounded-panel after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-black/50"
    >
      <GenreImage genre={genre} className="aspect-square w-full shadow-md" />
      <div className="absolute left-1/2 top-1/2 z-20 max-w-[86%] -translate-x-1/2 -translate-y-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-semibold capitalize text-white">
        <Trans message={genre.display_name || genre.name} />
      </div>
    </Link>
  );
}
