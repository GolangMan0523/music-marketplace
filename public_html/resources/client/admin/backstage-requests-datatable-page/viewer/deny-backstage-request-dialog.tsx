import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {useForm} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Button} from '@common/ui/buttons/button';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {BackstageRequest} from '@app/web-player/backstage/backstage-request';
import {
  DenyBackstageRequestPayload,
  useDenyBackstageRequest,
} from '@app/admin/backstage-requests-datatable-page/requests/use-deny-backstage-request';

interface Props {
  request: BackstageRequest;
}
export function DenyBackstageRequestDialog({request}: Props) {
  const {trans} = useTrans();
  const {close, formId} = useDialogContext();
  const form = useForm<Omit<DenyBackstageRequestPayload, 'requestId'>>();
  const denyRequest = useDenyBackstageRequest();
  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="Deny request" />
      </DialogHeader>
      <DialogBody>
        <Form
          form={form}
          id={formId}
          onSubmit={values => {
            denyRequest.mutate({
              ...values,
              requestId: request.id,
            });
          }}
        >
          <div className="mb-14">
            <Trans message="Are you sure you want to deny this request?" />
          </div>
          <div className="font-bold mb-24">
            <Trans
              message="This will mark request as denied and notify ':user'."
              values={{user: request.user.display_name}}
            />
          </div>
          <FormTextField
            label={<Trans message="Notes (optional)" />}
            name="notes"
            placeholder={trans(
              message(
                'Add any extra notes that should be sent to use via notification email',
              ),
            )}
            inputElementType="textarea"
            rows={6}
          />
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          variant="flat"
          color="danger"
          type="submit"
          form={formId}
          disabled={denyRequest.isPending}
        >
          <Trans message="Deny" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
