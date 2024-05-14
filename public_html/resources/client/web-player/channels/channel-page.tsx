import React from 'react';
import {ChannelContent} from '@app/web-player/channels/channel-content';
import {PageStatus} from '@common/http/page-status';
import {AdHost} from '@common/admin/ads/ad-host';
import {useChannel} from '@common/channels/requests/use-channel';
import {PageMetaTags} from '@common/http/page-meta-tags';

interface ChannelPageProps {
  slugOrId?: string | number;
}
export function ChannelPage({slugOrId}: ChannelPageProps) {
  const query = useChannel(slugOrId, 'channelPage');

  if (query.data) {
    return (
      <div>
        <PageMetaTags query={query} />
        <div className="pb-24">
          <AdHost slot="general_top" className="mb-34" />
          <ChannelContent
            channel={query.data.channel}
            // set key to force re-render when channel changes
            key={query.data.channel.id}
          />
          <AdHost slot="general_bottom" className="mt-34" />
        </div>
      </div>
    );
  }

  return (
    <PageStatus
      query={query}
      loaderClassName="absolute inset-0 m-auto"
      loaderIsScreen={false}
    />
  );
}
