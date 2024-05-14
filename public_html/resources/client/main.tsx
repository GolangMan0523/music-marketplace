import './app.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {CommonProvider} from '../../common/resources/client/core/common-provider';
import * as Sentry from '@sentry/react';
import {rootEl} from '../../common/resources/client/core/root-el';
import {getBootstrapData} from '../../common/resources/client/core/bootstrap-data/use-backend-bootstrap-data';
import {Playlist} from '@app/web-player/playlists/playlist';
import {Track, TRACK_MODEL} from '@app/web-player/tracks/track';
import {ALBUM_MODEL} from '@app/web-player/albums/album';
import {Artist, ARTIST_MODEL} from '@app/web-player/artists/artist';
import {Repost} from '@app/web-player/reposts/repost';
import {UserProfile} from '@app/web-player/user-profile/user-profile';
import {UserLink} from '@app/web-player/user-profile/user-link';
import {UserArtist} from '@app/web-player/user-profile/user-artist';
import {LandingPageContent} from '@app/landing-page/landing-page-content';
import {ignoredSentryErrors} from '../../common/resources/client/errors/ignored-sentry-errors';
import {FetchCustomPageResponse} from '@common/custom-page/use-custom-page';
import {AppRoutes} from '../../resources/client/app-routes';
import {UseArtistResponse} from '@app/web-player/artists/requests/use-artist';
import {GetAlbumResponse} from '@app/web-player/albums/requests/use-album';
import {getTrackResponse} from '@app/web-player/tracks/requests/use-track';
import {Product} from '@common/billing/product';
import {GetPlaylistResponse} from '@app/web-player/playlists/requests/use-playlist';
import {GetUserProfileResponse} from '@app/web-player/user-profile/requests/use-user-profile';
import {SearchResponse} from '@app/web-player/search/requests/use-search-results';
import {GlobalContextProvider} from './GlobalContext';

declare module '@common/core/settings/settings' {
  interface Settings {
    spotify_is_setup?: boolean;
    lastfm_is_setup?: boolean;
    artist_provider?: string;
    album_provider?: string;
    search_provider?: string;
    artist_bio_provider?: string;
    player?: {
      show_upload_btn?: boolean;
      default_volume?: number;
      hide_video_button?: boolean;
      hide_radio_button?: boolean;
      track_comments?: boolean;
      seekbar_type?: 'waveform' | 'bar';
      enable_repost?: boolean;
      hide_queue?: boolean;
      hide_video?: boolean;
      hide_lyrics?: boolean;
      enable_download?: boolean;
      show_become_artist_btn?: boolean;
      default_artist_view?: 'list' | 'grid';
      mobile?: {
        auto_open_overlay?: boolean;
      };
    };
    artistPage: {
      tabs: {id: number; active: boolean}[];
      showDescription?: boolean;
    };
    youtube?: {
      suggested_quality?: string;
      search_method?: string;
    };
    homepage: {
      type: string;
      value?: string;
      pricing?: boolean;
      appearance: LandingPageContent;
      trending?: boolean;
    };
    ads?: {
      general_top?: string;
      general_bottom?: string;
      artist_top?: string;
      artist_bottom?: string;
      album_above?: string;
      disable?: boolean;
    };
  }
}

declare module '@common/auth/user' {
  interface User {
    uploaded_tracks: Track[];
    playlists: Playlist[];
    reposts?: Repost[];
    profile?: UserProfile;
    links?: UserLink[];
    artists?: UserArtist[];
  }
}

declare module '@common/core/bootstrap-data/bootstrap-data' {
  interface BootstrapData {
    loaders?: {
      artist?: UseArtistResponse;
      artistPage?: UseArtistResponse;
      editArtistPage?: UseArtistResponse;
      album?: GetAlbumResponse;
      albumEmbed?: GetAlbumResponse;
      albumPage?: GetAlbumResponse;
      editAlbumPage?: GetAlbumResponse;
      track?: getTrackResponse;
      trackPage?: getTrackResponse;
      editTrackPage?: getTrackResponse;
      playlistPage?: GetPlaylistResponse;
      playlist?: GetPlaylistResponse;
      userProfilePage?: GetUserProfileResponse;
      searchPage?: SearchResponse;
      search?: SearchResponse;
      customPage?: FetchCustomPageResponse;
      landingPage?: {
        products: Product[];
        trendingArtists: Artist[];
      };
    };
    playlists?: Playlist[];
    artists: {
      id: number;
      name: string;
      image_small?: string;
      role: string;
    }[];
    likes?: {
      [TRACK_MODEL]: Record<number, boolean>;
      [ALBUM_MODEL]: Record<number, boolean>;
      [ARTIST_MODEL]: Record<number, boolean>;
    };
    reposts?: {
      [TRACK_MODEL]: Record<number, boolean>;
      [ALBUM_MODEL]: Record<number, boolean>;
    };
  }
}

const data = getBootstrapData();
const sentryDsn = data.settings.logging.sentry_public;
if (sentryDsn && import.meta.env.PROD) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 0.2,
    ignoreErrors: ignoredSentryErrors,
    release: data.sentry_release,
  });
}

const app = (
  <BrowserRouter basename={data.settings.html_base_uri}>
    <GlobalContextProvider>
      <CommonProvider>
        <AppRoutes />
      </CommonProvider>
    </GlobalContextProvider>
  </BrowserRouter>
);

if (data.rendered_ssr) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
