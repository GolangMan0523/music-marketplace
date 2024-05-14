import {RouteObject} from 'react-router-dom';
import {SearchSettings} from '@common/admin/settings/pages/search-settings/search-settings';
import {AutomationSettings} from '@app/admin/settings/automation-settings';
import {PlayerSettings} from '@app/admin/settings/interface-settings/player-settings';

export const AppSettingsRoutes: RouteObject[] = [
  {
    path: 'search',
    element: <SearchSettings />,
  },
  {
    path: 'providers',
    element: <AutomationSettings />,
  },
  {
    path: 'player',
    element: <PlayerSettings />,
  },
];
