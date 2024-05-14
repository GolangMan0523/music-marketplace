import React from 'react';
import clsx from 'clsx';
import {Track} from '@app/web-player/tracks/track';
import {PlayArrowFilledIcon} from '@app/web-player/tracks/play-arrow-filled';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';
import {FavoriteIcon} from '@common/icons/material/Favorite';
import {RepeatIcon} from '@common/icons/material/Repeat';
import {Album} from '@app/web-player/albums/album';
import {Artist} from '@app/web-player/artists/artist';

interface Props {
  item: Track | Album | Artist;
  className?: string;
  showPlays?: boolean;
}
export function MediaItemStats({item, className, showPlays = true}: Props) {
  return (
    <div
      className={clsx('flex items-center gap-20 text-sm text-muted', className)}
    >
      {showPlays && <PlayCount item={item} />}
      <LikesCount item={item} />
      {item.model_type !== 'artist' && <RepostsCount item={item} />}
    </div>
  );
}

interface PlayCountProps {
  item: Track | Album | Artist;
}
function PlayCount({item}: PlayCountProps) {
  if (!item.plays) return null;

  const count = (
    <FormattedNumber
      compactDisplay="short"
      notation="compact"
      value={item.plays}
    />
  );

  return (
    <Tooltip label={<Trans message=":count plays" values={{count}} />}>
      <div>
        <PlayArrowFilledIcon size="xs" className="mr-4" />
        {count}
      </div>
    </Tooltip>
  );
}

interface LikesCountProps {
  item: Track | Album | Artist;
}
function LikesCount({item}: LikesCountProps) {
  if (!item.likes_count) return null;

  const count = <FormattedNumber value={item.likes_count} />;

  return (
    <Tooltip label={<Trans message=":count likes" values={{count}} />}>
      <div>
        <FavoriteIcon size="xs" className="mr-4" />
        {count}
      </div>
    </Tooltip>
  );
}

interface RepostsCountProps {
  item: Track | Album;
}
function RepostsCount({item}: RepostsCountProps) {
  if (!item.reposts_count) return null;

  const count = <FormattedNumber value={item.reposts_count} />;

  return (
    <Tooltip label={<Trans message=":count reposts" values={{count}} />}>
      <div className="hidden @[566px]:block">
        <RepeatIcon size="xs" className="mr-4" />
        {count}
      </div>
    </Tooltip>
  );
}
