import {useParams} from 'react-router-dom';
import {useCustomPage} from './use-custom-page';
import {Footer} from '../ui/footer/footer';
import {CustomPageBody} from '@common/custom-page/custom-page-body';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {useEffect} from 'react';

import {PlayerNavbarLayout} from '@app/web-player/layout/player-navbar-layout';
import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {SidedavFrontend} from '@app/web-player/layout/sidenav-frontend';
import {Sidenav} from '@app/web-player/layout/sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import {useSettings} from '@common/core/settings/use-settings';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

interface Props {
  slug?: string;
}
export function CustomPageLayout({slug}: Props) {
  const {pageSlug} = useParams();
  const query = useCustomPage(slug || pageSlug!);
  const {player} = useSettings();
  const isMobile = useIsMobileMediaQuery();

  useEffect(() => {
    if (query.data?.page) {
      window.scrollTo(0, 0);
    }
  }, [query]);

  return (
    <DashboardLayout
      name="web-player"
      initialRightSidenavStatus={player?.hide_queue ? 'closed' : 'open'}
    >
      <PlayerNavbarLayout
        size="sm"
        menuPosition="custom-page-navbar"
        className="flex-shrink-0"
      />
      <SidedavFrontend position="left" display="block">
        <Sidenav />
      </SidedavFrontend>
      <DashboardContent>
        <div className="flex flex-col bg-alt">
          <PageMetaTags query={query} />
          {query.data ? (
            <CustomPageBody page={query.data.page} />
          ) : (
            <PageStatus query={query} loaderClassName="mt-80" />
          )}
          <Footer/>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
}
