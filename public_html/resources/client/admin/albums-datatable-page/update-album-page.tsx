import {useForm} from 'react-hook-form';
import React from 'react';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {Trans} from '@common/i18n/trans';
import {useAlbum} from '@app/web-player/albums/requests/use-album';
import {Album} from '@app/web-player/albums/album';
import {
  UpdateAlbumPayload,
  useUpdateAlbum,
} from '@app/admin/albums-datatable-page/requests/use-update-album';
import {AlbumForm} from '@app/admin/albums-datatable-page/album-form/album-form';
import {PageStatus} from '@common/http/page-status';
import {
  FileUploadProvider,
  useFileUploadStore,
} from '@common/uploads/uploader/file-upload-provider';
import {Navigate} from 'react-router-dom';
import {useAlbumPermissions} from '@app/web-player/albums/use-album-permissions';

interface Props {
  wrapInContainer?: boolean;
}
export function UpdateAlbumPage({wrapInContainer}: Props) {
  const query = useAlbum({loader: 'editAlbumPage'});

  if (query.data) {
    return (
      <FileUploadProvider>
        <PageContent
          album={query.data.album}
          wrapInContainer={wrapInContainer}
        />
      </FileUploadProvider>
    );
  }

  return (
    <PageStatus
      query={query}
      loaderIsScreen={false}
      loaderClassName="absolute inset-0 m-auto"
    />
  );
}

interface PageContentProps {
  album: Album;
  wrapInContainer?: boolean;
}
function PageContent({album, wrapInContainer}: PageContentProps) {
  const {canEdit} = useAlbumPermissions(album);
  const uploadIsInProgress = !!useFileUploadStore(s => s.activeUploadsCount);
  const form = useForm<UpdateAlbumPayload>({
    defaultValues: {
      image: album.image,
      name: album.name,
      release_date: album.release_date,
      artists: album.artists,
      genres: album.genres,
      tags: album.tags,
      description: album.description,
      spotify_id: album.spotify_id,
      tracks: album.tracks,
    },
  });
  const updateAlbum = useUpdateAlbum(form, album.id);

  if (!canEdit) {
    return <Navigate to="/" replace />;
  }

  return (
    <CrupdateResourceLayout
      form={form}
      onSubmit={values => {
        updateAlbum.mutate(values);
      }}
      title={<Trans message="Edit “:name“ album" values={{name: album.name}} />}
      isLoading={updateAlbum.isPending || uploadIsInProgress}
      disableSaveWhenNotDirty
      wrapInContainer={wrapInContainer}
    >
      <AlbumForm showExternalIdFields />
    </CrupdateResourceLayout>
  );
}
