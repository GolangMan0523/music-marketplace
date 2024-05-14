import {useForm} from 'react-hook-form';
import React from 'react';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {Trans} from '@common/i18n/trans';
import {PageStatus} from '@common/http/page-status';
import {
  useArtist,
  UseArtistResponse,
} from '@app/web-player/artists/requests/use-artist';
import {
  UpdateArtistPayload,
  useUpdateArtist,
} from '@app/admin/artist-datatable-page/requests/use-update-artist';
import {CrupdateArtistForm} from '@app/admin/artist-datatable-page/artist-form/crupdate-artist-form';
import {useArtistPermissions} from '@app/web-player/artists/use-artist-permissions';
import {Navigate} from 'react-router-dom';

interface Props {
  wrapInContainer?: boolean;
  showExternalFields?: boolean;
}
export function UpdateArtistPage({wrapInContainer, showExternalFields}: Props) {
  const query = useArtist({
    loader: 'editArtistPage',
  });

  if (query.data) {
    return (
      <PageContent
        response={query.data}
        wrapInContainer={wrapInContainer}
        showExternalFields={showExternalFields}
      />
    );
  }

  return <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />;
}

interface PageContentProps {
  response: UseArtistResponse;
  wrapInContainer?: boolean;
  showExternalFields?: boolean;
}
function PageContent({
  response,
  wrapInContainer,
  showExternalFields,
}: PageContentProps) {
  const {canEdit} = useArtistPermissions(response.artist);
  const form = useForm<UpdateArtistPayload>({
    defaultValues: {
      id: response.artist.id,
      name: response.artist.name,
      verified: response.artist.verified,
      spotify_id: response.artist.spotify_id,
      genres: response.artist.genres,
      image_small: response.artist.image_small,
      links: response.artist.links,
      profile: response.artist.profile,
      profile_images: response.artist.profile_images,
    },
  });
  const updateArtist = useUpdateArtist(form);

  if (!canEdit) {
    return <Navigate to="/" replace />;
  }

  return (
    <CrupdateResourceLayout
      form={form}
      onSubmit={values => {
        updateArtist.mutate(values);
      }}
      title={
        <Trans
          message="Edit “:name“ artist"
          values={{name: response.artist.name}}
        />
      }
      isLoading={updateArtist.isPending}
      disableSaveWhenNotDirty
      wrapInContainer={wrapInContainer}
    >
      <CrupdateArtistForm
        albums={response.albums?.data}
        showExternalFields={showExternalFields}
      />
    </CrupdateResourceLayout>
  );
}
