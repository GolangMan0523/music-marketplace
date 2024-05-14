import {UseFormReturn} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {FormNormalizedModelField} from '@common/ui/forms/normalized-model-field';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {UpdateLyricPayload} from '@app/admin/lyrics-datatable-page/requests/use-update-lyric';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {FormSwitch} from '@common/ui/forms/toggle/switch';

interface Props {
  onSubmit: (values: UpdateLyricPayload) => void;
  formId: string;
  form: UseFormReturn<UpdateLyricPayload>;
}
export function CrupdateLyricForm({form, onSubmit, formId}: Props) {
  return (
    <Form id={formId} form={form} onSubmit={values => onSubmit(values)}>
      <FormNormalizedModelField
        className="mb-24"
        label={<Trans message="Track" />}
        name="track_id"
        endpoint="normalized-models/track"
        queryParams={{
          with: 'artists,album',
        }}
      />
      <FormSwitch
        className="mb-24"
        name="is_synced"
        description={<Trans message="Whether lyric contains timestmaps" />}
      >
        <Trans message="Synced" />
      </FormSwitch>
      {form.watch('is_synced') ? (
        <FormTextField
          name="duration"
          type="number"
          label={<Trans message="duration" />}
          className="mb-24"
          required
          description={
            <Trans message="Lyric duration in seconds. If this duration does not match the duration of track that is being played, lyric sync will be disabled and plain lyrics will be shown instead." />
          }
        />
      ) : null}
      <FormTextField
        name="text"
        label={<Trans message="Text" />}
        inputElementType="textarea"
        rows={30}
      />
    </Form>
  );
}
