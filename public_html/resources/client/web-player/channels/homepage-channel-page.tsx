import {useSettings} from '@common/core/settings/use-settings';
import {ChannelPage} from '@app/web-player/channels/channel-page';
import React from 'react';

export function HomepageChannelPage() {
  const {homepage} = useSettings();
  let slugOrId = 'discover';
  if (homepage.type.startsWith('channel') && homepage.value) {
    slugOrId = homepage.value;
  }
  return <ChannelPage slugOrId={slugOrId} />;
}
