import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {useForm} from 'react-hook-form';
import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {CrupdateLyricForm} from '@app/admin/lyrics-datatable-page/crupdate-lyric-form';
import {
  CreateLyricPayload,
  useCreateLyric,
} from '@app/admin/lyrics-datatable-page/requests/use-create-lyric';

interface Props {
  trackId?: number;
}
export function CreateLyricDialog({trackId}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<CreateLyricPayload>({
    defaultValues: {
      track_id: trackId,
      is_synced: false,
    },
  });
  const createLyric = useCreateLyric(form);

  return (
    <Dialog size="xl">
      <DialogHeader>
        <Trans message="Create new lyric" />
      </DialogHeader>
      <DialogBody>
        <CrupdateLyricForm
          formId={formId}
          form={form as any}
          onSubmit={values => {
            createLyric.mutate(values, {
              onSuccess: () => close(),
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
          disabled={createLyric.isPending}
          variant="flat"
          color="primary"
          type="submit"
        >
          <Trans message="Create" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
