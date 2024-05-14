import {UseFormReturn} from 'react-hook-form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {Form} from '@common/ui/forms/form';
import {UpdateGenrePayload} from '@app/admin/genres-datatable-page/requests/use-update-genre';
import {FormImageSelector} from '@common/ui/images/image-selector';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';

interface Props {
  onSubmit: (values: UpdateGenrePayload) => void;
  formId: string;
  form: UseFormReturn<UpdateGenrePayload>;
}
export function CrupdateGenreFrom({form, onSubmit, formId}: Props) {
  return (
    <Form id={formId} form={form} onSubmit={onSubmit}>
      <FileUploadProvider>
        <FormImageSelector
          name="image"
          diskPrefix="genre_media"
          variant="input"
          label={<Trans message="Image" />}
          className="mb-24"
        />
      </FileUploadProvider>
      <FormTextField
        name="name"
        label={<Trans message="Name" />}
        description={<Trans message="Unique genre identifier." />}
        className="mb-24"
        required
        autoFocus
      />
      <FormTextField
        name="display_name"
        label={<Trans message="Display name" />}
        description={<Trans message="User friendly genre name." />}
      />
    </Form>
  );
}
