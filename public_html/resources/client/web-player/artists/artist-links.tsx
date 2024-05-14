import {Artist} from '@app/web-player/artists/artist';
import {ArtistLink} from '@app/web-player/artists/artist-link';
import {Fragment, HTMLAttributeAnchorTarget} from 'react';
import {Trans} from '@common/i18n/trans';
import clsx from 'clsx';

interface ArtistLinksProps {
  artists?: Artist[];
  className?: string;
  linkClassName?: string;
  target?: HTMLAttributeAnchorTarget;
  onLinkClick?: () => void;
}
export function ArtistLinks({
  artists,
  className,
  target,
  linkClassName,
  onLinkClick,
}: ArtistLinksProps) {
  if (!artists?.length) {
    return (
      <div className={className}>
        <Trans message="Various artists" />
      </div>
    );
  }
  return (
    <div className={clsx(className, 'overflow-x-hidden overflow-ellipsis')}>
      {artists.map((artist, i) => (
        <Fragment key={artist.id}>
          {i > 0 && ', '}
          <ArtistLink
            artist={artist}
            target={target}
            className={linkClassName}
            onClick={onLinkClick}
          />
        </Fragment>
      ))}
    </div>
  );
}
