import {Trans} from '@common/i18n/trans';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {FormImageSelector} from '@common/ui/images/image-selector';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {FormNormalizedModelField} from '@common/ui/forms/normalized-model-field';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Button} from '@common/ui/buttons/button';
import {
  CreateBackstageRequestPayload,
  useCreateBackstageRequest,
} from '@app/web-player/backstage/requests/use-create-backstage-request';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useBackstageRequestForm} from '@app/web-player/backstage/backstage-request-form/use-backstage-request-form';
import {BackstageRoleSelect} from '@app/web-player/backstage/backstage-request-form/backstage-role-select';
import {BackstageFormAttachments} from '@app/web-player/backstage/backstage-request-form/backstage-form-attachments';
import {BackstageLayout} from '@app/web-player/backstage/backstage-layout';

export function BackstageRequestFormPage() {
  const {pathname} = useLocation();
  const requestType = pathname
    .split('/')
    .pop() as CreateBackstageRequestPayload['type'];
  return (
    <BackstageLayout>
      <div className="mx-auto my-40 max-w-780">
        <h1 className="text-center text-3xl font-medium md:text-5xl">
          <Trans message="Tell us about yourself" />
        </h1>
        <ClaimForm requestType={requestType} />
      </div>
    </BackstageLayout>
  );
}

interface ClaimFormProps {
  requestType: CreateBackstageRequestPayload['type'];
}
function ClaimForm({requestType}: ClaimFormProps) {
  const navigate = useNavigate();
  const form = useBackstageRequestForm(requestType);
  const submitRequest = useCreateBackstageRequest(form);

  return (
    <FileUploadProvider>
      <Form
        form={form}
        onSubmit={values => {
          submitRequest.mutate(values, {
            onSuccess: response => {
              navigate(
                `/backstage/requests/${response.request.id}/request-submitted`,
                {replace: true},
              );
            },
          });
        }}
      >
        <FormImageSelector
          name="image"
          diskPrefix="artist_media"
          variant="avatar"
          previewSize="w-160 h-160"
          className="mx-auto my-30 max-w-max"
          disabled={requestType === 'become-artist'}
        />
        {requestType !== 'become-artist' && (
          <FormNormalizedModelField
            className="mb-24"
            label={<Trans message="Select artist" />}
            name="artist_id"
            endpoint="search/suggestions/artist"
            queryParams={{
              listAll: 'true',
              excludeSelf: 'true',
            }}
            disabled={requestType === 'verify-artist'}
          />
        )}
        {requestType === 'become-artist' && (
          <FormTextField
            required
            name="artist_name"
            label={<Trans message="Your artist name" />}
            className="mb-24"
          />
        )}
        <div className="mb-24 items-center gap-24 md:flex">
          <FormTextField
            required
            name="first_name"
            label={<Trans message="First name" />}
            className="mb-24 flex-auto md:mb-0"
          />
          <FormTextField
            required
            name="last_name"
            label={<Trans message="Last name" />}
            className="flex-auto"
          />
        </div>
        {requestType === 'claim-artist' && <BackstageRoleSelect />}
        <FormTextField
          name="company"
          label={<Trans message="Company (optional)" />}
          className="mb-24"
        />
        <BackstageFormAttachments />
        <div className="flex justify-between gap-24 border-t pt-34">
          <Button
            variant="raised"
            color="white"
            elementType={Link}
            to=".."
            relative="path"
            className="min-w-140"
            radius="rounded-full"
          >
            <Trans message="Go back" />
          </Button>
          <Button
            variant="raised"
            color="primary"
            type="submit"
            className="min-w-140"
            radius="rounded-full"
            disabled={submitRequest.isPending}
          >
            <Trans message="Submit request" />
          </Button>
        </div>
      </Form>
    </FileUploadProvider>
  );
}
