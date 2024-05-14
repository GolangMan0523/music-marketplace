import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {useForm} from 'react-hook-form';
import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {
  UpdateLyricPayload,
  useUpdateLyric,
} from '@app/admin/lyrics-datatable-page/requests/use-update-lyric';
import {Lyric} from '@app/web-player/tracks/lyrics/lyric';
import {CrupdateLyricForm} from '@app/admin/lyrics-datatable-page/crupdate-lyric-form';

interface Props {
  lyric: Lyric;
}
export function UpdateLyricDialog({lyric}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<UpdateLyricPayload>({
    defaultValues: {
      id: lyric.id,
      track_id: lyric.track_id,
      text: lyric.text,
      is_synced: lyric.is_synced,
      duration: lyric.duration,
    },
  });
  const updateLyric = useUpdateLyric(form);

  return (
    <Dialog size="xl">
      <DialogHeader>
        <Trans message="Update lyric" />
      </DialogHeader>
      <DialogBody>
        <CrupdateLyricForm
          formId={formId}
          form={form}
          onSubmit={values => {
            updateLyric.mutate(values, {
              onSuccess: () => {
                close();
              },
            });
          }}
        />
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          disabled={updateLyric.isPending}
          variant="flat"
          color="primary"
          type="submit"
        >
          <Trans message="Update" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
