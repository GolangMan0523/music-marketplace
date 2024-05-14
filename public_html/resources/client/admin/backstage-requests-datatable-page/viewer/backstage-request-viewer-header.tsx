import {Button} from '@common/ui/buttons/button';
import {Link} from 'react-router-dom';
import {Trans} from '@common/i18n/trans';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ApproveBackstageRequestDialog} from '@app/admin/backstage-requests-datatable-page/viewer/approve-backstage-request-dialog';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import React, {Fragment} from 'react';
import {useDeleteBackstageRequest} from '@app/admin/backstage-requests-datatable-page/requests/use-delete-backstage-request';
import {BackstageRequest} from '@app/web-player/backstage/backstage-request';
import {DenyBackstageRequestDialog} from '@app/admin/backstage-requests-datatable-page/viewer/deny-backstage-request-dialog';

interface Props {
  request: BackstageRequest;
}
export function BackstageRequestViewerHeader({request}: Props) {
  return (
    <div className="flex items-center gap-14">
      <Button
        elementType={Link}
        to=".."
        relative="path"
        variant="outline"
        className="mr-auto hidden md:inline-flex"
      >
        <Trans message="Go back" />
      </Button>
      {request.status === 'pending' && (
        <Fragment>
          <DialogTrigger type="modal">
            <Button variant="flat" color="primary">
              <Trans message="Approve" />
            </Button>
            <ApproveBackstageRequestDialog request={request} />
          </DialogTrigger>
          <DialogTrigger type="modal">
            <Button variant="outline">
              <Trans message="Deny" />
            </Button>
            <DenyBackstageRequestDialog request={request} />
          </DialogTrigger>
        </Fragment>
      )}
      <DeleteButton request={request} />
    </div>
  );
}

function DeleteButton({request}: Props) {
  const deleteRequest = useDeleteBackstageRequest();
  return (
    <DialogTrigger
      type="modal"
      onClose={isConfirmed => {
        if (isConfirmed) {
          deleteRequest.mutate({requestId: request.id});
        }
      }}
    >
      <Button disabled={deleteRequest.isPending} variant="outline">
        <Trans message="Delete" />
      </Button>
      <ConfirmationDialog
        isDanger
        title={<Trans message="Delete request" />}
        body={<Trans message="Are you sure you want to delete this request?" />}
        confirm={<Trans message="Delete" />}
      />
    </DialogTrigger>
  );
}
