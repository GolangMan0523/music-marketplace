import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {TrackForm} from '@app/admin/tracks-datatable-page/track-form/track-form';
import {Form} from '@common/ui/forms/form';
import {Button} from '@common/ui/buttons/button';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useCreateTrackForm} from '@app/admin/tracks-datatable-page/crupdate/use-create-track-form';
import {CreateTrackPayload} from '@app/admin/tracks-datatable-page/requests/use-create-track';

interface Props {
  defaultValues?: Partial<CreateTrackPayload>;
  hideAlbumField?: boolean;
}
export function CreateTrackDialog({defaultValues, hideAlbumField}: Props) {
  const {formId, close} = useDialogContext();
  const {form} = useCreateTrackForm({defaultValues});
  return (
    <Dialog size="fullscreen">
      <DialogHeader>
        <Trans message="Add new track" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            close(values);
          }}
          onBeforeSubmit={() => {
            form.clearErrors();
          }}
        >
          <TrackForm showExternalIdFields showAlbumField={!hideAlbumField} />
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button form={formId} variant="flat" color="primary" type="submit">
          <Trans message="Create" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
