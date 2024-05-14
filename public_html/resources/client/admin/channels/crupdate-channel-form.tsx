import React, {Fragment} from 'react';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {useFormContext} from 'react-hook-form';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {ChannelEditorTabs} from '@common/admin/channels/channel-editor/channel-editor-tabs';
import {ChannelNameField} from '@common/admin/channels/channel-editor/controls/channel-name-field';
import {ContentTypeField} from '@common/admin/channels/channel-editor/controls/content-type-field';
import {ContentModelField} from '@common/admin/channels/channel-editor/controls/content-model-field';
import {ContentOrderField} from '@common/admin/channels/channel-editor/controls/content-order-field';
import {ContentLayoutFields} from '@common/admin/channels/channel-editor/controls/content-layout-fields';
import {channelContentConfig} from '@app/admin/channels/channel-content-config';
import {
  ChannelContentSearchField,
  ChannelContentSearchFieldProps,
} from '@common/admin/channels/channel-editor/channel-content-search-field';
import {ChannelContentItemImage} from '@app/admin/channels/channel-content-item-image';
import {ChannelContentEditor} from '@common/admin/channels/channel-editor/channel-content-editor';
import {ContentAutoUpdateField} from '@common/admin/channels/channel-editor/controls/content-auto-update-field';
import {UpdateChannelPayload} from '@common/admin/channels/requests/use-update-channel';

export function CrupdateChannelForm() {
  return (
    <Fragment>
      <ChannelEditorTabs>
        <ChannelNameField />
        <FormTextField
          name="description"
          label={<Trans message="Description" />}
          inputElementType="textarea"
          rows={2}
          className="my-24"
        />
        <ContentTypeField config={channelContentConfig} />
        <AutoUpdateField />
        <ContentModelField config={channelContentConfig} className="my-24" />
        <ContentOrderField config={channelContentConfig} />
        <ContentLayoutFields config={channelContentConfig} />
        <FormSwitch
          className="mb-24"
          name="config.hideTitle"
          description={
            <Trans message="Whether title should be shown when displaying this channel on the site." />
          }
        >
          <Trans message="Hide title" />
        </FormSwitch>
        <GenreSwitch />
      </ChannelEditorTabs>
      <ChannelContentEditor searchField={<SearchField />} />
    </Fragment>
  );
}

function SearchField(props: ChannelContentSearchFieldProps) {
  return (
    <ChannelContentSearchField
      {...props}
      imgRenderer={item => <ChannelContentItemImage item={item} />}
    />
  );
}

function AutoUpdateField() {
  return <ContentAutoUpdateField config={channelContentConfig} />;
}

function GenreSwitch() {
  const {watch, setValue} = useFormContext<UpdateChannelPayload>();
  if (watch('config.contentType') === 'autoUpdate') {
    return null;
  }
  return (
    <FormSwitch
      className="mt-24"
      name="config.restriction"
      value="genre"
      onChange={e => {
        if (e.target.checked) {
          (setValue as any)('config.restrictionModelId', 'urlParam');
        }
      }}
      description={
        <Trans message="Filter this channel contents by genre specified in the url." />
      }
    >
      <Trans message="Filter by genre" />
    </FormSwitch>
  );
}
