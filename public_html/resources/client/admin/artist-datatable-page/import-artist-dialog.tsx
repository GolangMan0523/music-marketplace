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
import {
  ImportArtistPayload,
  useImportArtist,
} from '@app/admin/artist-datatable-page/requests/use-import-artist';
import {FormSwitch} from '@common/ui/forms/toggle/switch';

export function ImportArtistDialog() {
  const form = useForm<ImportArtistPayload>({
    defaultValues: {
      importAlbums: true,
      importSimilarArtists: true,
    },
  });
  const {formId, close} = useDialogContext();
  const importArtist = useImportArtist();
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Import artist" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            importArtist.mutate(values, {
              onSuccess: response => {
                close(response.artist);
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
          />
          <FormSwitch name="importAlbums" className="mb-24">
            <Trans message="Import albums" />
          </FormSwitch>
          <FormSwitch name="importSimilarArtists">
            <Trans message="Import similar artists" />
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
          disabled={importArtist.isPending}
        >
          <Trans message="Import" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
