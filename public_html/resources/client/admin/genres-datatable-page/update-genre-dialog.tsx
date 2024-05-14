import {Genre} from '@app/web-player/genres/genre';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {useForm} from 'react-hook-form';
import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {
  UpdateGenrePayload,
  useUpdateGenre,
} from '@app/admin/genres-datatable-page/requests/use-update-genre';
import {CrupdateGenreFrom} from '@app/admin/genres-datatable-page/crupdate-genre-form';
import {useSettings} from '@common/core/settings/use-settings';
import {useImportGenreArtists} from '@app/admin/genres-datatable-page/requests/use-import-genre-artists';

interface Props {
  genre: Genre;
}
export function UpdateGenreDialog({genre}: Props) {
  const {spotify_is_setup} = useSettings();
  const {close, formId} = useDialogContext();
  const form = useForm<UpdateGenrePayload>({
    defaultValues: {
      id: genre.id,
      name: genre.name,
      display_name: genre.display_name,
      image: genre.image,
    },
  });
  const updateGenre = useUpdateGenre(form);
  const importArtists = useImportGenreArtists();

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Update “:name“ genre" values={{name: genre.name}} />
      </DialogHeader>
      <DialogBody>
        <CrupdateGenreFrom
          formId={formId}
          form={form}
          onSubmit={values => {
            updateGenre.mutate(values, {
              onSuccess: () => {
                close();
              },
            });
          }}
        />
      </DialogBody>
      <DialogFooter
        startAction={
          spotify_is_setup && (
            <Button
              variant="outline"
              onClick={() =>
                importArtists.mutate({genre}, {onSuccess: () => close()})
              }
              disabled={importArtists.isPending}
            >
              <Trans message="Import artists" />
            </Button>
          )
        }
      >
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          disabled={updateGenre.isPending}
          variant="flat"
          color="primary"
          type="submit"
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
