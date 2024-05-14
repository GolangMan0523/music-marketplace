import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import React from 'react';
import {Track} from '@app/web-player/tracks/track';
import clsx from 'clsx';
import {useTrackTableMeta} from '@app/web-player/tracks/track-table/use-track-table-meta';
import {getTrackImageSrc} from '@app/web-player/tracks/track-image/track-image';
import {useIsTrackCued} from '@app/web-player/tracks/hooks/use-is-track-cued';

interface TrackNameColumnProps {
  track: Track;
}
export function TrackNameColumn({track}: TrackNameColumnProps) {
  const {hideTrackImage, queueGroupId} = useTrackTableMeta();
  const isCued = useIsTrackCued(track.id, queueGroupId);

  return (
    <NameWithAvatar
      image={!hideTrackImage ? getTrackImageSrc(track) : undefined}
      label={track.name}
      avatarSize="w-40 h-40 md:w-32 md:h-32"
      description={
        <span className="md:hidden">
          {track.artists?.map(a => a.name).join(', ')}
        </span>
      }
      labelClassName={clsx(
        isCued && 'text-primary',
        'max-md:text-[15px] max-md:leading-6',
      )}
    />
  );
}
