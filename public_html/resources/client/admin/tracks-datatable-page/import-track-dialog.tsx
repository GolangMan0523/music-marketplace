import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {useForm} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {
  ImportTrackPayload,
  useImportTrack,
} from '@app/admin/tracks-datatable-page/requests/use-import-track';

export function ImportTrackDialog() {
  const form = useForm<ImportTrackPayload>({
    defaultValues: {
      importLyrics: true,
    },
  });
  const {formId, close} = useDialogContext();
  const importTrack = useImportTrack();
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Import track" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            importTrack.mutate(values, {
              onSuccess: response => {
                close(response.track);
              },
            });
          }}
        >
          <FormTextField
            autoFocus
            required
            name="spotifyId"
            minLength={22}
            maxLength={22}
            label={<Trans message="Spotify ID" />}
            className="mb-24"
            description={
              <Trans message="This will also import all artists that collaborated on this track and album this track belongs to." />
            }
          />
          <FormSwitch name="importLyrics" className="mb-24">
            <Trans message="Import lyrics" />
          </FormSwitch>
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          variant="flat"
          color="primary"
          type="submit"
          disabled={importTrack.isPending}
        >
          <Trans message="Import" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
