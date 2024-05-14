import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {useForm} from 'react-hook-form';
import {
  ImportPlaylistPayload,
  useImportPlaylist,
} from '@app/admin/playlist-datatable-page/requests/use-import-playlist';
import {Form} from '@common/ui/forms/form';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';

export function ImportPlaylistDialog() {
  const form = useForm<ImportPlaylistPayload>();
  const {formId, close} = useDialogContext();
  const importPlaylist = useImportPlaylist();
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Import playlist" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            importPlaylist.mutate(values, {
              onSuccess: response => {
                close(response.playlist);
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
            description={
              <Trans message="Only public playlists can be imported." />
            }
          />
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
          disabled={importPlaylist.isPending}
        >
          <Trans message="Import" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
