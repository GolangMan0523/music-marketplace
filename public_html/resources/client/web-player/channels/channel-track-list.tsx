import React, {Fragment} from 'react';
import {ChannelContentProps} from '@app/web-player/channels/channel-content';
import {Track} from '@app/web-player/tracks/track';
import {ChannelHeading} from '@app/web-player/channels/channel-heading';
import {TrackList} from '@app/web-player/tracks/track-list/track-list';
import {usePaginatedChannelContent} from '@common/channels/requests/use-paginated-channel-content';
import {ChannelContentItem} from '@common/channels/channel';

export function ChannelTrackList(
  props: ChannelContentProps<ChannelContentItem<Track>>,
) {
  return (
    <Fragment>
      <ChannelHeading {...props} />
      {props.isNested ? (
        <TrackList tracks={props.channel.content?.data} />
      ) : (
        <PaginatedList {...props} />
      )}
    </Fragment>
  );
}

function PaginatedList({channel}: ChannelContentProps<Track>) {
  const query = usePaginatedChannelContent<ChannelContentItem<Track>>(channel);
  return <TrackList query={query} />;
}
