import {Trans} from '@common/i18n/trans';
import React, {cloneElement, Fragment, ReactElement, useState} from 'react';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {DateRangePresets} from '@common/ui/forms/input-field/date/date-range-picker/dialog/date-range-presets';
import {ReportDateSelector} from '@common/admin/analytics/report-date-selector';
import {StaticPageTitle} from '@common/seo/static-page-title';
import {InsightsReportChartsProps} from '@app/admin/reports/insights-report-charts';
import {Footer} from '@common/ui/footer/footer';
import {Skeleton} from '@common/ui/skeleton/skeleton';

import {PlayerNavbarLayout} from '@app/web-player/layout/player-navbar-layout';
import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {SidedavFrontend} from '@app/web-player/layout/sidenav-frontend';
import {Sidenav} from '@app/web-player/layout/sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import {useSettings} from '@common/core/settings/use-settings';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

interface Props {
  children: ReactElement<InsightsReportChartsProps>;
  reportModel: string;
  title?: ReactElement;
  isNested?: boolean;
}
export function BackstageInsightsLayout({
  children,
  reportModel,
  title,
  isNested,
}: Props) {
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => {
    // This week
    return DateRangePresets[2].getRangeValue();
  });
  const {player} = useSettings();
  const isMobile = useIsMobileMediaQuery();
  
  return (
    <Fragment>
      <StaticPageTitle>
        <Trans message="Insights" />
      </StaticPageTitle>
      <div className="h-full flex flex-col">
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
        <div className="overflow-y-auto flex-auto bg-cover relative">
          <div className="min-h-full p-12 md:p-24 overflow-x-hidden max-w-[1600px] mx-auto flex flex-col">
            <div className="flex-auto">
              <div className="md:flex items-center justify-between gap-24 h-48 mt-14 mb-38">
                {title ? title : <Skeleton className="max-w-320" />}
                <div className="flex-shrink-0 flex items-center justify-between gap-10 md:gap-24">
                  <ReportDateSelector
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
              </div>
              {cloneElement(children, {dateRange, model: reportModel})}
            </div>
          </div>
        </div>
        </DashboardContent>
      </DashboardLayout>
      </div>
    </Fragment>
  );
}
