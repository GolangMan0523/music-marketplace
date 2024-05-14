import {SettingsNavItem} from '@common/admin/settings/settings-nav-config';
import {message} from '@common/i18n/message';

export const AppSettingsNavConfig: SettingsNavItem[] = [
  {
    label: message('Local search'),
    to: 'search',
  },
  {
    label: message('Automation'),
    to: 'providers',
  },
  {
    label: message('Player'),
    to: 'player',
  },
];
