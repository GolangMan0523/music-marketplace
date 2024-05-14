import clsx from 'clsx';
import {LandingPageContent} from '@app/landing-page/landing-page-content';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {Footer} from '@common/ui/footer/footer';
import {Trans} from '@common/i18n/trans';
import {Fragment} from 'react';
import {DefaultMetaTags} from '@common/seo/default-meta-tags';
import {useLightThemeVariables} from '@common/ui/themes/use-light-theme-variables';
import {Button} from '@common/ui/buttons/button';
import {Link} from 'react-router-dom';
import {ButtonColor} from '@common/ui/buttons/get-shared-button-style';

import {PlayerNavbarLayout} from '@app/web-player/layout/player-navbar-layout';
import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {SidedavFrontend} from '@app/web-player/layout/sidenav-frontend';
import {Sidenav} from '@app/web-player/layout/sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import {useSettings} from '@common/core/settings/use-settings';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

interface ContentProps {
  content: LandingPageContent;
  primaryButtonColor?: ButtonColor;
}
export function MaintenancePage() {
  const settings = useSettings();
  const appearance = settings.homepage.appearance;
  const showPricing = settings.homepage?.pricing && settings.billing.enable;
  const showTrending = settings.homepage?.trending;
  const {player} = useSettings();
  const isMobile = useIsMobileMediaQuery();

  return (
    <Fragment>
      <DefaultMetaTags />
      <div>
        <DashboardLayout
          name="web-player"
          initialRightSidenavStatus={player?.hide_queue ? 'closed' : 'open'}
        >
          <PlayerNavbarLayout
            size="sm"
            menuPosition="landing-page-navbar"
            className="flex-shrink-0"
          />
          <SidedavFrontend position="left" display="block">
            <Sidenav />
          </SidedavFrontend>
          <DashboardContent>
            <div className="relative h-screen overflow-auto">
              <HeroHeader content={appearance} />
              <Footer />
            </div>
          </DashboardContent>
        </DashboardLayout>
      </div>
    </Fragment>
  );
}

function HeroHeader({content, primaryButtonColor}: ContentProps) {
  const lightThemeVars = useLightThemeVariables();
  const {
    headerTitle,
    headerSubtitle,
    headerImage,
    headerImageOpacity,
    actions,
    headerOverlayColor1,
    headerOverlayColor2,
  } = content;
  let overlayBackground = undefined;

  if (headerOverlayColor1 && headerOverlayColor2) {
    overlayBackground = `linear-gradient(45deg, ${headerOverlayColor1} 0%, ${headerOverlayColor2} 100%)`;
  } else if (headerOverlayColor1) {
    overlayBackground = headerOverlayColor1;
  } else if (headerOverlayColor2) {
    overlayBackground = headerOverlayColor2;
  }

  return (
    <header className="relative mb-14 md:mb-20 overflow-hidden isolate">
      <img
        data-testid="headerImage"
        src={headerImage}
        style={{
          opacity: headerImageOpacity,
        }}
        alt=""
        width="2347"
        height="1244"
        decoding="async"
        loading="lazy"
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 z-20"
      />
      <div
        className="absolute w-full h-full z-10 bg-[rgb(37,99,235)]"
        style={{background: overlayBackground}}
      />
      <div className="flex flex-col relative h-full z-30">
        <div className="flex-auto flex flex-col items-center justify-center text-white max-w-850 mx-auto text-center px-14 lg:py-70">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-normal">
              <Trans message="Maintenance Mode" />
            </h1>
            <br/>
            <p className="text-lg mb-8">
              <Trans message="Our site is currently under maintenance. Please check back later." />
              <br/>
              <Trans message="If you have any question, let us know." />
              <br/>
              <Trans message="Thanks for understanding." />
            </p>
          </div>
        </div>
        <div className="flex gap-20 pt-70 md:pt-90 pb-30 md:pb-50 min-h-50 empty:min-h-0">
          <Button
            elementType={Link}
            to="/contact"
            variant="raised"
            color={primaryButtonColor}
          >
            <Trans message="Contact" />
          </Button>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-0 transform translate-y-1/2 -skew-y-3 h-[6vw] z-20 bg"></div>
    </header>
  );
}
