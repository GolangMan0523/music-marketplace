import {Link, LinkProps} from 'react-router-dom';
import clsx from 'clsx';
import React, {useMemo} from 'react';
import {slugifyString} from '@common/utils/string/slugify-string';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {Genre} from '@app/web-player/genres/genre';

interface GenreLinkProps extends Omit<LinkProps, 'to'> {
  genre: Genre;
  className?: string;
}
export function GenreLink({genre, className, ...linkProps}: GenreLinkProps) {
  const uri = useMemo(() => {
    return getGenreLink(genre);
  }, [genre]);

  return (
    <Link
      {...linkProps}
      className={clsx(
        'block outline-none first-letter:capitalize hover:underline focus-visible:underline',
        className,
      )}
      to={uri}
    >
      {genre.display_name || genre.name}
    </Link>
  );
}

export function getGenreLink(
  genre: Genre,
  {absolute}: {absolute?: boolean} = {},
) {
  const genreName = slugifyString(genre.name);
  let link = `/genre/${genreName}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
