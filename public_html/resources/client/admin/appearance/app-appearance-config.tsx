import {
  IAppearanceConfig,
  MenuSectionConfig,
  SeoSettingsSectionConfig,
} from '@common/admin/appearance/types/appearance-editor-config';
import {message} from '@common/i18n/message';
import {LandingPageSectionPrimaryFeatures} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-primary-features';
import {LandingPageSectionActionButtons} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-action-buttons';
import {AppearanceEditorBreadcrumbItem} from '@common/admin/appearance/types/appearance-editor-section';
import {LandingPageSectionGeneral} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-general';
import {LandingPageSecondaryFeatures} from '@app/admin/appearance/sections/landing-page-section/landing-page-section-secondary-features';

export const AppAppearanceConfig: IAppearanceConfig = {
  preview: {
    defaultRoute: 'dashboard',
    navigationRoutes: ['dashboard'],
  },
  sections: {
    'landing-page': {
      label: message('Landing Page'),
      position: 1,
      previewRoute: '/',
      routes: [
        {path: 'landing-page', element: <LandingPageSectionGeneral />},
        {
          path: 'landing-page/action-buttons',
          element: <LandingPageSectionActionButtons />,
        },
        {
          path: 'landing-page/primary-features',
          element: <LandingPageSectionPrimaryFeatures />,
        },
        {
          path: 'landing-page/secondary-features',
          element: <LandingPageSecondaryFeatures />,
        },
      ],
      buildBreadcrumb: pathname => {
        const parts = pathname.split('/').filter(p => !!p);
        const sectionName = parts.pop();
        // admin/appearance
        const breadcrumb: AppearanceEditorBreadcrumbItem[] = [
          {
            label: message('Landing page'),
            location: 'landing-page',
          },
        ];
        if (sectionName === 'action-buttons') {
          breadcrumb.push({
            label: message('Action buttons'),
            location: 'landing-page/action-buttons',
          });
        }

        if (sectionName === 'primary-features') {
          breadcrumb.push({
            label: message('Primary features'),
            location: 'landing-page/primary-features',
          });
        }

        if (sectionName === 'secondary-features') {
          breadcrumb.push({
            label: message('Secondary features'),
            location: 'landing-page/secondary-features',
          });
        }

        return breadcrumb;
      },
    },
    // missing label will get added by deepMerge from default config
    // @ts-ignore
    menus: {
      config: {
        positions: [
          'sidebar-primary',
          'sidebar-secondary',
          'mobile-bottom',
          'landing-page-navbar',
          'home-on-sidebar',
          'studio-on-sidebar',
          'account-on-sidebar',
          'settings-on-sidebar',
          'footer-on-sidebar',
          'footer',
          'footer-company',
          'footer-support',
          'footer-extra',
          'footer-media',
          'footer-terms',
          'footer-terms-two',
        ],
        availableRoutes: [
          '/upload',
          '/library/songs',
          '/library/albums',
          '/library/artists',
          '/library/history',
          '/admin/upload',
          '/admin/channels',
          '/admin/artists',
          '/admin/albums',
          '/admin/tracks',
          '/admin/genres',
          '/admin/lyrics',
          '/admin/playlists',
          '/admin/backstage-requests',
          '/admin/comments',
          '/backstage/requests',
        ],
      } as MenuSectionConfig,
    },
    // @ts-ignore
    'seo-settings': {
      config: {
        pages: [
          {
            key: 'artist-page',
            label: message('Artist page'),
          },
          {
            key: 'album-page',
            label: message('Album page'),
          },
          {
            key: 'track-page',
            label: message('Track page'),
          },
          {
            key: 'playlist-page',
            label: message('Playlist page'),
          },
          {
            key: 'landing-page',
            label: message('Landing page'),
          },
          {
            key: 'channel-page',
            label: message('Channel page'),
          },
          {
            key: 'user-profile-page',
            label: message('User profile page'),
          },
          {
            key: 'search-page',
            label: message('Search page'),
          },
        ],
      } as SeoSettingsSectionConfig,
    },
  },
};
