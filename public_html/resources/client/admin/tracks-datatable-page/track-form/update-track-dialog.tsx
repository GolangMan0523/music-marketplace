import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {useUpdateTrackForm} from '@app/admin/tracks-datatable-page/crupdate/use-update-track-form';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {TrackForm} from '@app/admin/tracks-datatable-page/track-form/track-form';
import {Form} from '@common/ui/forms/form';
import {Button} from '@common/ui/buttons/button';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {UpdateTrackPayload} from '@app/admin/tracks-datatable-page/requests/use-update-track';
import {CreateTrackPayload} from '@app/admin/tracks-datatable-page/requests/use-create-track';

interface Props {
  track: UpdateTrackPayload | CreateTrackPayload;
  hideAlbumField?: boolean;
}
export function UpdateTrackDialog({track, hideAlbumField}: Props) {
  const {formId, close} = useDialogContext();
  const {form} = useUpdateTrackForm(track);
  return (
    <Dialog size="fullscreen">
      <DialogHeader>
        <Trans message="Edit “:name“ track" values={{name: track.name}} />
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
          <Trans message="Update" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
