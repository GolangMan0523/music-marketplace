import React from 'react';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {Trans} from '@common/i18n/trans';
import {TrackForm} from '@app/admin/tracks-datatable-page/track-form/track-form';
import {useTrack} from '@app/web-player/tracks/requests/use-track';
import {Track} from '@app/web-player/tracks/track';
import {useUpdateTrackForm} from '@app/admin/tracks-datatable-page/crupdate/use-update-track-form';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {PageStatus} from '@common/http/page-status';
import {Navigate, useLocation} from 'react-router-dom';
import {getTrackLink} from '@app/web-player/tracks/track-link';
import {useTrackPermissions} from '@app/web-player/tracks/hooks/use-track-permissions';

interface Props {
  wrapInContainer?: boolean;
}
export function UpdateTrackPage({wrapInContainer}: Props) {
  const query = useTrack({loader: 'editTrackPage'});
  if (query.data) {
    return (
      <PageContent track={query.data.track} wrapInContainer={wrapInContainer} />
    );
  }
  return (
    <PageStatus
      query={query}
      loaderClassName="absolute inset-0 m-auto"
      loaderIsScreen={false}
    />
  );
}

interface PageContentProps {
  track: Track;
  wrapInContainer?: boolean;
}
function PageContent({track, wrapInContainer}: PageContentProps) {
  const {canEdit} = useTrackPermissions([track]);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {form, updateTrack} = useUpdateTrackForm(track, {
    onTrackUpdated: response => {
      if (pathname.includes('admin')) {
        navigate('/admin/tracks');
      } else {
        navigate(getTrackLink(response.track));
      }
    },
  });

  if (!canEdit) {
    return <Navigate to="/" replace />;
  }

  return (
    <CrupdateResourceLayout
      form={form}
      onSubmit={values => {
        updateTrack.mutate(values);
      }}
      title={<Trans message="Edit “:name“ track" values={{name: track.name}} />}
      isLoading={updateTrack.isPending}
      disableSaveWhenNotDirty
      wrapInContainer={wrapInContainer}
    >
      <FileUploadProvider>
        <TrackForm showExternalIdFields />
      </FileUploadProvider>
    </CrupdateResourceLayout>
  );
}
