import {RouteObject, useRoutes} from 'react-router-dom';
import React from 'react';
import {UpdateTrackPage} from '@app/admin/tracks-datatable-page/crupdate/update-track-page';
import {UploadPage} from '@app/web-player/backstage/upload-page/upload-page';
import {AuthRoute} from '@common/auth/guards/auth-route';
import {CreateTrackPage} from '@app/admin/tracks-datatable-page/crupdate/create-track-page';
import {CreateAlbumPage} from '@app/admin/albums-datatable-page/create-album-page';
import {UpdateAlbumPage} from '@app/admin/albums-datatable-page/update-album-page';
import {BackstageTypeSelector} from '@app/web-player/backstage/backstage-type-selector';
import {BackstageRequestFormPage} from '@app/web-player/backstage/backstage-request-form/backstage-request-form-page';
import {BackstageRequestSubmittedPage} from '@app/web-player/backstage/backstage-request-submitted-page';
import {BackstageLayout} from '@app/web-player/backstage/backstage-layout';
import {UpdateArtistPage} from '@app/admin/artist-datatable-page/update-artist-page';
import {BackstageArtistInsights} from '@app/web-player/backstage/insights/backstage-artist-insights';
import {BackstageAlbumInsights} from '@app/web-player/backstage/insights/backstage-album-insights';
import {BackstageTrackInsights} from '@app/web-player/backstage/insights/backstage-track-insights';

const RouteConfig: RouteObject[] = [
  {
    path: 'upload',
    element: (
      <AuthRoute permission="music.create">
        <UploadPage />
      </AuthRoute>
    ),
  },

  // Backstage request form
  {
    path: 'requests',
    element: (
      <AuthRoute permission="backstageRequests.create">
        <BackstageTypeSelector />
      </AuthRoute>
    ),
  },
  {
    path: 'requests/verify-artist',
    element: (
      <AuthRoute permission="backstageRequests.create">
        <BackstageRequestFormPage />
      </AuthRoute>
    ),
  },
  {
    path: 'requests/become-artist',
    element: (
      <AuthRoute permission="backstageRequests.create">
        <BackstageRequestFormPage />
      </AuthRoute>
    ),
  },
  {
    path: 'requests/claim-artist',
    element: (
      <AuthRoute permission="backstageRequests.create">
        <BackstageRequestFormPage />
      </AuthRoute>
    ),
  },
  {
    path: 'requests/:requestId/request-submitted',
    element: (
      <AuthRoute permission="backstageRequests.create">
        <BackstageRequestSubmittedPage />
      </AuthRoute>
    ),
  },

  // Tracks
  {
    path: 'tracks/new',
    element: (
      <AuthRoute permission="music.create">
        <BackstageLayout>
          <CreateTrackPage />
        </BackstageLayout>
      </AuthRoute>
    ),
  },
  {
    path: 'tracks/:trackId/edit',
    element: (
      <BackstageLayout>
        <UpdateTrackPage />
      </BackstageLayout>
    ),
  },
  {
    path: 'tracks/:trackId/insights',
    element: <BackstageTrackInsights />,
  },

  // Albums
  {
    path: 'albums/new',
    element: (
      <AuthRoute permission="music.create">
        <BackstageLayout>
          <CreateAlbumPage wrapInContainer={false} />
        </BackstageLayout>
      </AuthRoute>
    ),
  },
  {
    path: 'albums/:albumId/edit',
    element: (
      <BackstageLayout>
        <UpdateAlbumPage wrapInContainer={false} />
      </BackstageLayout>
    ),
  },
  {
    path: 'albums/:albumId/insights',
    element: <BackstageAlbumInsights />,
  },

  // Artists
  {
    path: 'artists/:artistId/edit',
    element: (
      <BackstageLayout>
        <UpdateArtistPage wrapInContainer={false} showExternalFields={false} />
      </BackstageLayout>
    ),
  },
  {
    path: 'artists/:artistId/insights',
    element: <BackstageArtistInsights />,
  },
];

export default function BackstageRoutes() {
  return useRoutes(RouteConfig);
}
