import {Link, LinkProps} from 'react-router-dom';
import clsx from 'clsx';
import React, {useMemo} from 'react';
import {Artist} from '@app/web-player/artists/artist';
import {slugifyString} from '@common/utils/string/slugify-string';
import {UserArtist} from '@app/web-player/user-profile/user-artist';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

interface AlbumLinkProps extends Omit<LinkProps, 'to'> {
  artist: Artist | UserArtist;
  className?: string;
}
export function ArtistLink({artist, className, ...linkProps}: AlbumLinkProps) {
  const finalUri = useMemo(() => {
    return getArtistLink(artist);
  }, [artist]);

  return (
    <Link
      {...linkProps}
      className={clsx(
        'overflow-x-hidden overflow-ellipsis outline-none hover:underline focus-visible:underline',
        className,
      )}
      to={finalUri}
    >
      {artist.name}
    </Link>
  );
}

export function getArtistLink(
  artist: Artist | UserArtist,
  {absolute}: {absolute?: boolean} = {},
): string {
  let link = `/artist/${artist.id}/${slugifyString(artist.name)}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
