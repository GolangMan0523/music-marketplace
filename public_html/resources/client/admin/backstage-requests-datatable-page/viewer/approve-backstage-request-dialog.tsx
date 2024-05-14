import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {useForm} from 'react-hook-form';
import {
  ApproveBackstageRequestPayload,
  useApproveBackstageRequest,
} from '@app/admin/backstage-requests-datatable-page/requests/use-approve-backstage-request';
import {Form} from '@common/ui/forms/form';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Button} from '@common/ui/buttons/button';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {BackstageRequest} from '@app/web-player/backstage/backstage-request';

interface Props {
  request: BackstageRequest;
}
export function ApproveBackstageRequestDialog({request}: Props) {
  const {trans} = useTrans();
  const {close, formId} = useDialogContext();
  const form = useForm<Omit<ApproveBackstageRequestPayload, 'requestId'>>();
  const approveRequest = useApproveBackstageRequest();
  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="Approve request" />
      </DialogHeader>
      <DialogBody>
        <Form
          form={form}
          id={formId}
          onSubmit={values => {
            approveRequest.mutate({
              ...values,
              requestId: request.id,
            });
          }}
        >
          <div className="mb-14">
            <Trans message="Are you sure you want to approve this request?" />
          </div>
          <div className="font-bold">
            <Trans
              message="This will create a new artist profile and assign it to ':user', as well as give them artist role on the site."
              values={{user: request.user.display_name}}
            />
          </div>
          <FormSwitch name="markArtistAsVerified" className="my-24">
            <Trans message="Also mark this artist as verified" />
          </FormSwitch>
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
          color="primary"
          type="submit"
          form={formId}
          disabled={approveRequest.isPending}
        >
          <Trans message="Approve" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
