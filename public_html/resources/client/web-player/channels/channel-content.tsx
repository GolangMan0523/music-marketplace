import {Track, TRACK_MODEL} from '@app/web-player/tracks/track';
import React, {Fragment} from 'react';
import {ChannelContentGrid} from '@app/web-player/channels/channel-content-grid';
import {ChannelTrackTable} from '@app/web-player/channels/channel-track-table';
import {ChannelTrackList} from '@app/web-player/channels/channel-track-list';
import {ChannelContentCarousel} from '@app/web-player/channels/channel-content-carousel';
import {ChannelHeading} from '@app/web-player/channels/channel-heading';
import {ChannelContentModel} from '@app/admin/channels/channel-content-config';
import {Channel, CHANNEL_MODEL} from '@common/channels/channel';

export interface ChannelContentProps<
  T extends ChannelContentModel = ChannelContentModel,
> {
  channel: Channel<T>;
  isNested?: boolean;
}
export function ChannelContent(props: ChannelContentProps) {
  const {channel, isNested} = props;
  const contentModel = channel.config.contentModel;
  const layout = isNested ? channel.config.nestedLayout : channel.config.layout;
  if (!channel.content) {
    return null;
  }

  if (contentModel === TRACK_MODEL && layout === 'list') {
    return <ChannelTrackList {...(props as ChannelContentProps<Track>)} />;
  } else if (contentModel === TRACK_MODEL && layout === 'trackTable') {
    return <ChannelTrackTable {...(props as ChannelContentProps<Track>)} />;
  } else if (contentModel === CHANNEL_MODEL) {
    return <NestedChannels {...(props as ChannelContentProps<Channel>)} />;
  } else if (layout === 'carousel') {
    return <ChannelContentCarousel {...props} />;
  } else {
    return <ChannelContentGrid {...props} />;
  }
}

function NestedChannels({channel}: ChannelContentProps) {
  return (
    <Fragment>
      <ChannelHeading channel={channel} />
      {channel.content?.data.map(nestedChannel => (
        <div key={nestedChannel.id} className="mb-50">
          <ChannelContent
            channel={nestedChannel as Channel<Channel>}
            isNested
          />
        </div>
      ))}
    </Fragment>
  );
}
