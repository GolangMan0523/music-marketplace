import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { Settings } from '../core/settings/settings';
import { useMemo } from 'react';
import { DashboardLayout } from '@common/ui/layout/dashboard-layout';
import { SidedavFrontend } from '@app/web-player/layout/sidenav-frontend';
import { Sidenav } from '@app/web-player/layout/sidenav';
import { DashboardContent } from '@common/ui/layout/dashboard-content';
import { useSettings } from '@common/core/settings/use-settings';
import { useIsMobileMediaQuery } from '@common/utils/hooks/is-mobile-media-query';
import { PlayerNavbarLayout } from '@app/web-player/layout/player-navbar-layout'; // Updated import

export default function SwaggerApiDocsPage() {
  const settings = useSettings();
  const { player } = useSettings();
  const isMobile = useIsMobileMediaQuery();

  const plugins = useMemo(() => {
    return getPluginsConfig(settings);
  }, [settings]);

  return (
    <div className="h-full overflow-y-auto bg-alt">
      <DashboardLayout
        name="web-player"
        initialRightSidenavStatus={player?.hide_queue ? 'closed' : 'open'}
      >
        {/* Replace the old Navbar with PlayerNavbarLayout */}
        <PlayerNavbarLayout
          size="sm"
          menuPosition="landing-page-navbar"
          className="flex-shrink-0"
        />
        <SidedavFrontend position="left" display="block">
          <Sidenav />
        </SidedavFrontend>
        <DashboardContent>
          <div className="relative">
            <div className="container mx-auto">
              <SwaggerUI
                url={`${settings.base_url}/swagger.yaml`}
                plugins={plugins}
                onComplete={system => {
                  //scroll to Tickets/incomingEmail
                  const hash = location.hash.slice(1);
                  if (hash) {
                    const el = document.querySelector(
                      `#operations-${hash.replace(/\//g, '-')}`,
                    );
                    if (el) {
                      el.scrollIntoView();
                      el.querySelector('button')?.click();
                    }
                  }
                }}
              />
            </div>
          </div>
        </DashboardContent>
      </DashboardLayout>
    </div>
  );
}

function getPluginsConfig(settings: Settings) {
  return [
    {
      statePlugins: {
        spec: {
          wrapActions: {
            updateSpec: (oriAction: any) => {
              return (spec: any) => {
                // Replace site name
                spec = spec.replaceAll(
                  'SITE_NAME',
                  settings.branding.site_name.replace(':', ''),
                );
                // Replace site url
                spec = spec.replaceAll('SITE_URL', settings.base_url);
                return oriAction(spec);
              };
            },
            // Add current server url to docs
            updateJsonSpec: (oriAction: any) => {
              return (spec: any) => {
                spec.servers = [{ url: `${settings.base_url}/api/v1` }];
                return oriAction(spec);
              };
            },
          },
        },
      },
    },
  ];
}
