import {Link} from 'react-router-dom';
import clsx from 'clsx';
import React, {useMemo} from 'react';
import {Album} from '@app/web-player/albums/album';
import {Artist} from '@app/web-player/artists/artist';
import {slugifyString} from '@common/utils/string/slugify-string';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

interface AlbumLinkProps {
  album: Album;
  artist?: Artist;
  className?: string;
  target?: string;
}
export function AlbumLink({album, artist, className, target}: AlbumLinkProps) {
  if (!artist && album.artists) {
    artist = album.artists[0];
  }
  const uri = useMemo(() => {
    return getAlbumLink(album, {artist});
  }, [artist, album]);

  return (
    <Link
      target={target}
      className={clsx(
        'hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis',
        className
      )}
      to={uri}
    >
      {album.name}
    </Link>
  );
}

export function getAlbumLink(
  album: Album,
  options: {artist?: Artist; absolute?: boolean} = {}
) {
  const artist = options.artist || album.artists?.[0];
  const artistName = slugifyString(artist?.name || 'Various Artists');
  const albumName = slugifyString(album.name);
  let link = `/album/${album.id}/${artistName}/${albumName}`;
  if (options.absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
