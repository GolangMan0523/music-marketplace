import {useUser} from '../../auth/ui/use-user';
import {ProgressCircle} from '../../ui/progress/progress-circle';
import {useAuth} from '../../auth/use-auth';
import {Outlet} from 'react-router-dom';
import {Footer} from '../../ui/footer/footer';
import {StaticPageTitle} from '../../seo/static-page-title';
import {Trans} from '../../i18n/trans';
import {Fragment} from 'react';

import {PlayerNavbarLayout} from '@app/web-player/layout/player-navbar-layout';
import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {SidedavFrontend} from '@app/web-player/layout/sidenav-frontend';
import {Sidenav} from '@app/web-player/layout/sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import {useSettings} from '@common/core/settings/use-settings';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

export function BillingPageLayout() {
  const {user} = useAuth();
  const {player} = useSettings();
  const isMobile = useIsMobileMediaQuery();
  const query = useUser(user!.id, {
    with: ['subscriptions.product', 'subscriptions.price'],
  });

  return (
    <Fragment>
      <StaticPageTitle>
        <Trans message="Billing" />
      </StaticPageTitle>
      <DashboardLayout
        name="web-player"
        initialRightSidenavStatus={player?.hide_queue ? 'closed' : 'open'}
      >
        <PlayerNavbarLayout
          size="sm"
          menuPosition="billing-page"
          className="flex-shrink-0"
        />
        <SidedavFrontend position="left" display="block">
          <Sidenav />
        </SidedavFrontend>
        <DashboardContent>
          <div className="flex flex-col">
            <div className="container mx-auto my-24 flex-auto px-24">
              {query.isLoading ? (
                <ProgressCircle
                  className="my-80"
                  aria-label="Loading user.."
                  isIndeterminate
                />
              ) : (
                <Outlet />
              )}
            </div>
            <Footer />
          </div>
        </DashboardContent>
      </DashboardLayout>
    </Fragment>
  );
}
