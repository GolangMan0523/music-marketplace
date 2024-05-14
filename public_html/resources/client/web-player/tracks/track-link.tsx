import {Link, LinkProps} from 'react-router-dom';
import clsx from 'clsx';
import React, {useMemo} from 'react';
import {slugifyString} from '@common/utils/string/slugify-string';
import {Track} from '@app/web-player/tracks/track';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

interface TrackLinkProps extends Omit<LinkProps, 'to'> {
  track: Track;
  className?: string;
}
export function TrackLink({track, className, ...linkProps}: TrackLinkProps) {
  const finalUri = useMemo(() => {
    return getTrackLink(track);
  }, [track]);

  return (
    <Link
      {...linkProps}
      className={clsx(
        'hover:underline overflow-x-hidden overflow-ellipsis',
        className
      )}
      to={finalUri}
    >
      {track.name}
    </Link>
  );
}

export function getTrackLink(
  track: Track,
  {absolute}: {absolute?: boolean} = {}
): string {
  let link = `/track/${track.id}/${slugifyString(track.name)}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
