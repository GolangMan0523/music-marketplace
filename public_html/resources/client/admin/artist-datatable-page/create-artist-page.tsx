import {useForm} from 'react-hook-form';
import React from 'react';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {Trans} from '@common/i18n/trans';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {
  CreateArtistPayload,
  useCreateArtist,
} from '@app/admin/artist-datatable-page/requests/use-create-artist';
import {CrupdateArtistForm} from '@app/admin/artist-datatable-page/artist-form/crupdate-artist-form';

interface Props {
  wrapInContainer?: boolean;
  showExternalFields?: boolean;
}
export function CreateArtistPage({wrapInContainer, showExternalFields}: Props) {
  const navigate = useNavigate();
  const form = useForm<CreateArtistPayload>();
  const createArtist = useCreateArtist(form);

  return (
    <CrupdateResourceLayout
      form={form}
      onSubmit={values => {
        createArtist.mutate(values, {
          onSuccess: response => {
            navigate(`../${response.artist.id}/edit`, {
              relative: 'path',
              replace: true,
            });
          },
        });
      }}
      title={<Trans message="Add new artist" />}
      isLoading={createArtist.isPending}
      disableSaveWhenNotDirty
      wrapInContainer={wrapInContainer}
    >
      <CrupdateArtistForm showExternalFields={showExternalFields} />
    </CrupdateResourceLayout>
  );
}
