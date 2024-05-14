import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {CrupdatePlaylistFields} from '@app/web-player/playlists/crupdate-dialog/crupdate-playlist-fields';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {CreatePlaylistPayload} from '@app/web-player/playlists/requests/use-create-playlist';
import {useForm} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {useUpdatePlaylist} from '@app/web-player/playlists/requests/use-update-playlist';
import {Playlist} from '@app/web-player/playlists/playlist';

interface UpdatePlaylistDialogProps {
  playlist: Playlist;
}
export function UpdatePlaylistDialog({playlist}: UpdatePlaylistDialogProps) {
  const {close, formId} = useDialogContext();
  const form = useForm<CreatePlaylistPayload>({
    defaultValues: {
      name: playlist.name,
      public: playlist.public,
      collaborative: playlist.collaborative,
      image: playlist.image,
      description: playlist.description,
    },
  });
  const updatePlaylist = useUpdatePlaylist({form, playlistId: playlist.id});

  return (
    <Dialog size="xl">
      <DialogHeader>
        <Trans message="Update playlist" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            updatePlaylist.mutate(values, {
              onSuccess: response => {
                close(response.playlist);
              },
            });
          }}
        >
          <CrupdatePlaylistFields />
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          type="submit"
          variant="flat"
          color="primary"
          disabled={updatePlaylist.isPending}
        >
          <Trans message="Update" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
