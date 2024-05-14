import {SiteConfigContextValue} from '@common/core/settings/site-config-context';
import {message} from '@common/i18n/message';
import {getUserProfileLink} from '@app/web-player/users/user-profile-link';
import generalTopImage from '@app/admin/verts/general_top.jpg';
import generalBottomImage from '@app/admin/verts/general_bottom.jpg';
import artistTopImage from '@app/admin/verts/artist_top.jpg';
import artistBottomImage from '@app/admin/verts/artist_bottom.jpg';
import albumAboveImage from '@app/admin/verts/album_above.jpg';

export const SiteConfig: Partial<SiteConfigContextValue> = {
  homepage: {
    options: [{label: message('Landing page'), value: 'landingPage'}],
  },
  auth: {
    redirectUri: '/',
    adminRedirectUri: '/admin',
    getUserProfileLink: getUserProfileLink,
  },
  admin: {
    ads: [
      {
        image: generalTopImage,
        slot: 'ads.general_top',
        description: message(
          'Appears at the top of most pages. Best size <= 150px height or responsive.'
        ),
      },
      {
        image: generalBottomImage,
        slot: 'ads.general_bottom',
        description: message(
          'Appears at the bottom of most pages. Best size <= 150px height or responsive.'
        ),
      },
      {
        image: artistTopImage,
        slot: 'ads.artist_top',
        description: message(
          'Appears in artist page only (below page header). Best size <= 1000px width or responsive.'
        ),
      },
      {
        image: artistBottomImage,
        slot: 'ads.artist_bottom',
        description: message(
          'Appears in artist page only (below similar artists). Best size <= 430px width or responsive.'
        ),
      },
      {
        image: albumAboveImage,
        slot: 'ads.album_above',
        description: message(
          'Appears in album page only (above album tracks). Best size is as wide as possible or responsive.'
        ),
      },
    ],
  },
};
