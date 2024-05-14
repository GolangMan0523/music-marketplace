import {CrupdateChannelForm} from './crupdate-channel-form';
import React from 'react';
import {TRACK_MODEL} from '@app/web-player/tracks/track';
import {CreateChannelPageLayout} from '@common/admin/channels/channel-editor/create-channel-page-layout';

export function CreateChannelPage() {
  return (
    <CreateChannelPageLayout
      defaultValues={{
        contentType: 'listAll',
        contentModel: TRACK_MODEL,
        contentOrder: 'created_at:desc',
        layout: 'trackTable',
        nestedLayout: 'carousel',
      }}
    >
      <CrupdateChannelForm />
    </CreateChannelPageLayout>
  );
}
