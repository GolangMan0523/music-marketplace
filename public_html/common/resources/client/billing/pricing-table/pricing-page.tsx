import {useProducts} from './use-products';
import {Button} from '../../ui/buttons/button';
import {Trans} from '../../i18n/trans';
import {ForumIcon} from '../../icons/material/Forum';
import {Link} from 'react-router-dom';
import {Footer} from '../../ui/footer/footer';
import {useState} from 'react';
import {UpsellBillingCycle} from './find-best-price';
import {BillingCycleRadio} from './billing-cycle-radio';
import {StaticPageTitle} from '../../seo/static-page-title';
import {PricingTable} from '@common/billing/pricing-table/pricing-table';

import {PlayerNavbarLayout} from '@app/web-player/layout/player-navbar-layout';
import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {SidedavFrontend} from '@app/web-player/layout/sidenav-frontend';
import {Sidenav} from '@app/web-player/layout/sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import {useSettings} from '@common/core/settings/use-settings';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

export function PricingPage() {
  const query = useProducts('pricingPage');
  const {player} = useSettings();
  const isMobile = useIsMobileMediaQuery();
  const [selectedCycle, setSelectedCycle] =
    useState<UpsellBillingCycle>('yearly');

  return (
    <DashboardLayout
      name="web-player"
      initialRightSidenavStatus={player?.hide_queue ? 'closed' : 'open'}
    >
      <PlayerNavbarLayout
        size="sm"
        menuPosition="pricing-table-page"
        className="flex-shrink-0"
      />
      <SidedavFrontend position="left" display="block">
        <Sidenav />
      </SidedavFrontend>
      <DashboardContent>
        <div>
          <div className="container mx-auto px-24">
            <StaticPageTitle>
              <Trans message="Pricing" />
            </StaticPageTitle>
            <h1 className="mb-30 mt-30 text-center text-3xl font-normal md:mt-60 md:text-4xl md:font-medium">
              <Trans message="Choose the right plan for you" />
            </h1>

            <BillingCycleRadio
              products={query.data?.products}
              selectedCycle={selectedCycle}
              onChange={setSelectedCycle}
              className="mb-40 flex justify-center md:mb-70"
              size="lg"
            />

            <PricingTable
              selectedCycle={selectedCycle}
              productLoader="pricingPage"
            />
            <ContactSection />
          </div>
          <Footer />
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
}

function ContactSection() {
  return (
    <div className="my-20 p-24 text-center md:my-80">
      <ForumIcon size="xl" className="text-muted" />
      <div className="my-8 md:text-lg">
        <Trans message="Do you have any questions about PRO accounts?" />
      </div>
      <div className="mb-24 mt-20 text-sm md:mt-0 md:text-base">
        <Trans message="Our support team will be happy to assist you." />
      </div>
      <Button variant="flat" color="primary" elementType={Link} to="/contact">
        <Trans message="Contact us" />
      </Button>
    </div>
  );
}
