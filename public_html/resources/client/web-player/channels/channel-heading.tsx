import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {KeyboardArrowRightIcon} from '@common/icons/material/KeyboardArrowRight';
import clsx from 'clsx';
import {IconButton} from '@common/ui/buttons/icon-button';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';
import {AntennaIcon} from '@app/web-player/channels/antenna-icon';
import {useShouldShowRadioButton} from '@app/web-player/tracks/context-dialog/use-should-show-radio-button';
import {getRadioLink} from '@app/web-player/radio/get-radio-link';
import {Channel} from '@common/channels/channel';

interface ChannelHeadingProps {
  channel: Channel;
  margin?: string;
  isNested?: boolean;
}
export function ChannelHeading({
  channel,
  isNested,
  margin = isNested ? 'mb-16 md:mb-20' : 'mb-20 md:mb-40',
}: ChannelHeadingProps) {
  const shouldShowRadio = useShouldShowRadioButton();
  if (channel.config.hideTitle) {
    return null;
  }
  if (!isNested) {
    if (shouldShowRadio && channel.restriction?.model_type === 'genre') {
      return (
        <div
          className={clsx('flex items-center justify-between gap-24', margin)}
        >
          <h1 className="flex-auto text-3xl">
            <Trans message={channel.name} />
          </h1>
          <Tooltip label={<Trans message="Genre radio" />}>
            <IconButton
              className="flex-shrink-0"
              elementType={Link}
              to={getRadioLink(channel.restriction)}
            >
              <AntennaIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
    return (
      <h1 className={clsx('text-3xl', margin)}>
        <Trans message={channel.name} />
      </h1>
    );
  }

  return (
    <div className={clsx('flex items-center gap-4 text-xl', margin)}>
      <NestedChannelLink channel={channel} />
      <KeyboardArrowRightIcon className="mt-4" />
    </div>
  );
}

interface ChannelLinkProps {
  channel: Channel;
}
function NestedChannelLink({channel}: ChannelLinkProps) {
  const {restriction: genreName} = useParams();
  return (
    <Link
      className="outline-none hover:underline focus-visible:underline"
      to={
        channel.config.restriction === 'genre' && genreName
          ? `/${channel.slug}/${genreName}`
          : `/${channel.slug}`
      }
    >
      <Trans message={channel.name} />
    </Link>
  );
}
