import {RouteObject, useRoutes} from 'react-router-dom';
import {ChannelPage} from '@app/web-player/channels/channel-page';
import React from 'react';
import {WebPlayerLayout} from '@app/web-player/layout/web-player-layout';
import {ArtistPage} from '@app/web-player/artists/artist-page/artist-page';
import {PlaylistPage} from '@app/web-player/playlists/playlist-page/playlist-page';
import {AlbumPage} from '@app/web-player/albums/album-page';
import {LibraryTracksPage} from '@app/web-player/library/library-tracks-page';
import {AuthRoute} from '@common/auth/guards/auth-route';
import {LibraryAlbumsPage} from '@app/web-player/library/library-albums-page';
import {LibraryArtistsPage} from '@app/web-player/library/library-artists-page';
import {LibraryHistoryPage} from '@app/web-player/library/library-history-page';
import {TrackPage} from '@app/web-player/tracks/track-page';
import {UserProfilePage} from '@app/web-player/user-profile/user-profile-page';
import {TagMediaPage} from '@app/web-player/genres/tag-media-page';
import {RadioPage} from '@app/web-player/radio/radio-page';
import {SearchResultsPage} from '@app/web-player/search/search-results-page';
import {LibraryPage} from '@app/web-player/library/library-page';
import {LibraryPlaylistsPage} from '@app/web-player/library/library-playlists-page';
import {TrackEmbed} from '@app/web-player/tracks/track-embed';
import {AlbumEmbed} from '@app/web-player/albums/album-embed';
import {HomepageChannelPage} from '@app/web-player/channels/homepage-channel-page';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import {LyricsPage} from '@app/web-player/tracks/lyrics/lyrics-page';

const RouteConfig: RouteObject[] = [
  {
    path: 'track/:trackId/:trackName/embed',
    element: <TrackEmbed />,
  },
  {
    path: 'album/:albumId/:artistName/:albumName/embed',
    element: <AlbumEmbed />,
  },
  {
    path: '/',
    element: <WebPlayerLayout />,
    children: [
      {
        index: true,
        element: <HomepageChannelPage />,
      },
      {
        path: 'lyrics',
        element: <LyricsPage />,
      },
      // artists
      {
        path: 'artist/:artistId/:artistName',
        element: <ArtistPage />,
      },
      {
        path: 'artist/:artistId',
        element: <ArtistPage />,
      },
      // playlists
      {
        path: 'playlist/:playlistId/:playlistName',
        element: <PlaylistPage />,
      },
      // albums
      {
        path: 'album/:albumId/:artistName/:albumName',
        element: <AlbumPage />,
      },
      // tracks
      {
        path: 'track/:trackId/:trackName',
        element: <TrackPage />,
      },
      // tags
      {
        path: 'tag/:tagName',
        element: <TagMediaPage />,
      },
      {
        path: 'tag/:tagName/tracks',
        element: <TagMediaPage />,
      },
      {
        path: 'tag/:tagName/albums',
        element: <TagMediaPage />,
      },
      // user profile
      {
        path: 'user/:userId/:userName',
        element: <UserProfilePage />,
      },
      {
        path: 'user/:userId/:userName/:tabName',
        element: <UserProfilePage />,
      },
      // radio
      {
        path: 'radio/:seedType/:seedId/:seeName',
        element: <RadioPage />,
      },
      // search
      {
        path: 'search',
        element: <SearchResultsPage />,
      },
      {
        path: 'search/:searchQuery',
        element: <SearchResultsPage />,
      },
      {
        path: 'search/:searchQuery/:tabName',
        element: <SearchResultsPage />,
      },
      // library
      {
        path: '/library',
        element: (
          <AuthRoute>
            <LibraryPage />
          </AuthRoute>
        ),
      },
      {
        path: '/library/songs',
        element: (
          <AuthRoute>
            <LibraryTracksPage />
          </AuthRoute>
        ),
      },
      {
        path: '/library/playlists',
        element: (
          <AuthRoute>
            <LibraryPlaylistsPage />
          </AuthRoute>
        ),
      },
      {
        path: '/library/albums',
        element: (
          <AuthRoute>
            <LibraryAlbumsPage />
          </AuthRoute>
        ),
      },
      {
        path: '/library/artists',
        element: (
          <AuthRoute>
            <LibraryArtistsPage />
          </AuthRoute>
        ),
      },
      {
        path: '/library/history',
        element: (
          <AuthRoute>
            <LibraryHistoryPage />
          </AuthRoute>
        ),
      },
      // Channels
      {
        path: ':slugOrId',
        element: <ChannelPage />,
      },
      {
        path: 'channel/:slugOrId',
        element: <ChannelPage />,
      },
      {
        path: ':slugOrId/:restriction',
        element: <ChannelPage />,
      },
      {
        path: 'channel/:slugOrId/:restriction',
        element: <ChannelPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export default function WebPlayerRoutes() {
  return useRoutes(RouteConfig);
}
