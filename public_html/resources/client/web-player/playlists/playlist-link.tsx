import {Link} from 'react-router-dom';
import clsx from 'clsx';
import React, {useMemo} from 'react';
import {slugifyString} from '@common/utils/string/slugify-string';
import {Playlist} from '@app/web-player/playlists/playlist';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

interface AlbumLinkProps {
  playlist: Playlist;
  className?: string;
}
export function PlaylistLink({playlist, className}: AlbumLinkProps) {
  const uri = useMemo(() => {
    return getPlaylistLink(playlist);
  }, [playlist.id]);

  return (
    <Link className={clsx('capitalize hover:underline', className)} to={uri}>
      {playlist.name}
    </Link>
  );
}

export function getPlaylistLink(
  playlist: Playlist,
  {absolute}: {absolute?: boolean} = {}
) {
  const playlistName = slugifyString(playlist.name);
  let link = `/playlist/${playlist.id}/${playlistName}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
