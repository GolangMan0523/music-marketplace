import React, {Fragment} from 'react';
import {ChannelContentProps} from '@app/web-player/channels/channel-content';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import {Track} from '@app/web-player/tracks/track';
import {VirtualTableBody} from '@app/web-player/playlists/virtual-table-body';
import {ChannelHeading} from '@app/web-player/channels/channel-heading';
import {usePaginatedChannelContent} from '@common/channels/requests/use-paginated-channel-content';
import {ChannelContentItem} from '@common/channels/channel';

export function ChannelTrackTable(
  props: ChannelContentProps<ChannelContentItem<Track>>,
) {
  return (
    <Fragment>
      <ChannelHeading {...props} />
      {props.isNested ? (
        <SimpleTable {...props} />
      ) : (
        <PaginatedTable {...props} />
      )}
    </Fragment>
  );
}

function SimpleTable({channel}: ChannelContentProps<Track>) {
  return (
    <TrackTable tracks={channel.content?.data || []} enableSorting={false} />
  );
}

function PaginatedTable({channel}: ChannelContentProps<Track>) {
  const query = usePaginatedChannelContent<ChannelContentItem<Track>>(channel);

  const totalItems =
    channel.content && 'total' in channel.content
      ? channel.content.total
      : undefined;

  return (
    <TrackTable
      enableSorting={false}
      tracks={query.items}
      tableBody={<VirtualTableBody query={query} totalItems={totalItems} />}
    />
  );
}
