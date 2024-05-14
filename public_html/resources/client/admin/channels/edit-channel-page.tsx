import {CrupdateChannelForm} from './crupdate-channel-form';
import React from 'react';
import {EditChannelPageLayout} from '@common/admin/channels/channel-editor/edit-channel-page-layout';

export function EditChannelPage() {
  return (
    <EditChannelPageLayout>
      <CrupdateChannelForm />
    </EditChannelPageLayout>
  );
}
