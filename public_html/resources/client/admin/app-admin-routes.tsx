import {RouteObject} from 'react-router-dom';
import React from 'react';
import {TracksDatatablePage} from '@app/admin/tracks-datatable-page/tracks-datatable-page';
import {CreateTrackPage} from '@app/admin/tracks-datatable-page/crupdate/create-track-page';
import {UpdateTrackPage} from '@app/admin/tracks-datatable-page/crupdate/update-track-page';
import {AlbumsDatatablePage} from '@app/admin/albums-datatable-page/albums-datatable-page';
import {UpdateAlbumPage} from '@app/admin/albums-datatable-page/update-album-page';
import {UploadPage} from '@app/web-player/backstage/upload-page/upload-page';
import {CreateAlbumPage} from '@app/admin/albums-datatable-page/create-album-page';
import {BackstageRequestsDatatablePage} from '@app/admin/backstage-requests-datatable-page/backstage-requests-datatable-page';
import {ViewBackstageRequestPage} from '@app/admin/backstage-requests-datatable-page/viewer/view-backstage-request-page';
import {GenresDatatablePage} from '@app/admin/genres-datatable-page/genres-datatable-page';
import {PlaylistDatatablePage} from '@app/admin/playlist-datatable-page/playlist-datatable-page';
import {LyricsDatatablePage} from '@app/admin/lyrics-datatable-page/lyrics-datatable-page';
import {ArtistDatatablePage} from '@app/admin/artist-datatable-page/artist-datatable-page';
import {CreateArtistPage} from '@app/admin/artist-datatable-page/create-artist-page';
import {UpdateArtistPage} from '@app/admin/artist-datatable-page/update-artist-page';
import {CommentsDatatablePage} from '@common/comments/comments-datatable-page/comments-datatable-page';
import {BemusicAdminReportPage} from '@app/admin/reports/bemusic-admin-report-page';
import {AdminInsightsReport} from '@app/admin/reports/admin-insights-report';
import {AdminVisitorsReport} from '@app/admin/reports/admin-visitors-report';
import {BackstageArtistInsights} from '@app/web-player/backstage/insights/backstage-artist-insights';
import {BackstageAlbumInsights} from '@app/web-player/backstage/insights/backstage-album-insights';
import {BackstageTrackInsights} from '@app/web-player/backstage/insights/backstage-track-insights';
import {CreateChannelPage} from '@app/admin/channels/create-channel-page';
import {EditChannelPage} from '@app/admin/channels/edit-channel-page';
import {ChannelsDatatablePage} from '@common/admin/channels/channels-datatable-page';

export const AppAdminRoutes: RouteObject[] = [
  // Reports
  {
    path: '/',
    element: <BemusicAdminReportPage />,
    children: [
      {index: true, element: <AdminInsightsReport />},
      {path: 'plays', element: <AdminInsightsReport />},
      {path: 'visitors', element: <AdminVisitorsReport />},
    ],
  },
  // Channels
  {
    path: 'channels',
    element: <ChannelsDatatablePage />,
  },
  {
    path: 'channels/new',
    element: <CreateChannelPage />,
  },
  {
    path: 'channels/:slugOrId/edit',
    element: <EditChannelPage />,
  },
  // Tracks
  {
    path: 'tracks',
    element: <TracksDatatablePage />,
  },
  {
    path: 'tracks/new',
    element: <CreateTrackPage />,
  },
  {
    path: 'tracks/:trackId/edit',
    element: <UpdateTrackPage />,
  },
  {
    path: 'tracks/:trackId/insights',
    element: <BackstageTrackInsights isNested />,
  },
  // Albums
  {
    path: 'albums',
    element: <AlbumsDatatablePage />,
  },
  {
    path: 'albums/new',
    element: <CreateAlbumPage />,
  },
  {
    path: 'albums/:albumId/edit',
    element: <UpdateAlbumPage />,
  },
  {
    path: 'albums/:albumId/insights',
    element: <BackstageAlbumInsights isNested />,
  },
  // Artists
  {
    path: 'artists',
    element: <ArtistDatatablePage />,
  },
  {
    path: 'artists/new',
    element: <CreateArtistPage showExternalFields />,
  },
  {
    path: 'artists/:artistId/edit',
    element: <UpdateArtistPage showExternalFields />,
  },
  {
    path: 'artists/:artistId/insights',
    element: <BackstageArtistInsights isNested />,
  },
  // Upload
  {
    path: 'upload',
    element: <UploadPage backstageLayout={false} />,
  },
  // Backstage requests
  {
    path: 'backstage-requests',
    element: <BackstageRequestsDatatablePage />,
  },
  {
    path: 'backstage-requests/:requestId',
    element: <ViewBackstageRequestPage />,
  },
  // Genres
  {
    path: 'genres',
    element: <GenresDatatablePage />,
  },
  // Playlists
  {
    path: 'playlists',
    element: <PlaylistDatatablePage />,
  },
  // Lyrics
  {
    path: 'lyrics',
    element: <LyricsDatatablePage />,
  },
  // Comments
  {
    path: 'comments',
    element: <CommentsDatatablePage />,
  },
];
