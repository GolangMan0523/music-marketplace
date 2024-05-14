import {ContentGrid} from '@app/web-player/playable-item/content-grid';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import React, {Fragment} from 'react';
import {ChannelContentProps} from '@app/web-player/channels/channel-content';
import {ChannelContentGridItem} from '@app/web-player/channels/channel-content-grid-item';
import {ChannelHeading} from '@app/web-player/channels/channel-heading';
import {usePaginatedChannelContent} from '@common/channels/requests/use-paginated-channel-content';
import {useChannelContent} from '@common/channels/requests/use-channel-content';
import {ChannelContentModel} from '@app/admin/channels/channel-content-config';

export function ChannelContentGrid(props: ChannelContentProps) {
  return (
    <Fragment>
      <ChannelHeading {...props} />
      {props.isNested ? (
        <SimpleGrid {...props} />
      ) : (
        <PaginatedGrid {...props} />
      )}
    </Fragment>
  );
}

function SimpleGrid({channel}: ChannelContentProps) {
  const {data} = useChannelContent(channel);
  return (
    <ContentGrid>
      {data?.map(item => (
        <ChannelContentGridItem
          key={`${item.id}-${item.model_type}`}
          item={item}
          items={data}
        />
      ))}
    </ContentGrid>
  );
}

function PaginatedGrid({channel}: ChannelContentProps) {
  const query = usePaginatedChannelContent<ChannelContentModel>(channel);
  return (
    <div>
      <ContentGrid>
        {query.items.map(item => (
          <ChannelContentGridItem
            key={`${item.id}-${item.model_type}`}
            item={item}
            items={query.items}
          />
        ))}
      </ContentGrid>
      <InfiniteScrollSentinel query={query} />
    </div>
  );
}
