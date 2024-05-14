import React, {
  cloneElement,
  Fragment,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';
import {LineChart} from '@common/charts/line-chart';
import {Trans} from '@common/i18n/trans';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {PolarAreaChart} from '@common/charts/polar-area-chart';
import {GeoChart} from '@common/admin/analytics/geo-chart/geo-chart';
import {BaseChartProps} from '@common/charts/base-chart';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {UseQueryResult} from '@tanstack/react-query';
import {
  FetchInsightsReportResponse,
  InsightsReportMetric,
  useInsightsReport,
} from '@app/admin/reports/requests/use-insights-report';
import {TopModelsChartLayout} from '@app/admin/reports/top-models-chart-layout';

export interface InsightsReportChartsProps {
  showTracks?: boolean;
  showArtistsAndAlbums?: boolean;
  dateRange?: DateRangeValue;
  model?: string;
}
export function InsightsReportCharts(props: InsightsReportChartsProps) {
  const colGap = 'gap-12 md:gap-24 mb-12 md:mb-24';
  const rowClassName = `flex flex-col lg:flex-row lg:items-center overflow-x-auto ${colGap}`;

  // will be set via "cloneElement"
  const model = props.model as string;
  const dateRange = props.dateRange as DateRangeValue;

  return (
    <Fragment>
      <div className={rowClassName}>
        <AsyncChart metric="plays" model={model} dateRange={dateRange}>
          {({data}) => (
            <LineChart
              className="flex-auto"
              title={<Trans message="Plays" />}
              hideLegend
              description={
                <Trans
                  message=":count total plays"
                  values={{
                    count: (
                      <FormattedNumber value={data?.report.plays.total || 0} />
                    ),
                  }}
                />
              }
            />
          )}
        </AsyncChart>
        <AsyncChart metric="devices" model={model} dateRange={dateRange}>
          <PolarAreaChart title={<Trans message="Top devices" />} />
        </AsyncChart>
      </div>
      <div className={rowClassName}>
        {props.showTracks && (
          <AsyncChart metric="tracks" model={model} dateRange={dateRange}>
            <TopModelsChartLayout
              title={<Trans message="Most played tracks" />}
            />
          </AsyncChart>
        )}
        <AsyncChart metric="users" model={model} dateRange={dateRange}>
          <TopModelsChartLayout title={<Trans message="Top listeners" />} />
        </AsyncChart>
      </div>
      {props.showArtistsAndAlbums && (
        <div className={rowClassName}>
          <AsyncChart metric="artists" model={model} dateRange={dateRange}>
            <TopModelsChartLayout
              title={<Trans message="Most played artists" />}
            />
          </AsyncChart>
          <AsyncChart metric="albums" model={model} dateRange={dateRange}>
            <TopModelsChartLayout
              title={<Trans message="Most played albums" />}
            />
          </AsyncChart>
        </div>
      )}
      <div className={rowClassName}>
        <AsyncChart metric="locations" model={model} dateRange={dateRange}>
          <GeoChart className="flex-auto w-1/2 lg:max-w-[740px]" />
        </AsyncChart>
        <AsyncChart metric="platforms" model={model} dateRange={dateRange}>
          <PolarAreaChart
            className="max-w-500"
            title={<Trans message="Top platforms" />}
          />
        </AsyncChart>
      </div>
    </Fragment>
  );
}

interface AsyncChartProps {
  children:
    | ReactElement<BaseChartProps>
    | ((
        query: UseQueryResult<FetchInsightsReportResponse>
      ) => ReactElement<BaseChartProps>);
  metric: InsightsReportMetric;
  model: string;
  dateRange: DateRangeValue;
}
function AsyncChart({children, metric, model, dateRange}: AsyncChartProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const query = useInsightsReport(
    {metrics: [metric], model, dateRange},
    {isEnabled}
  );
  const chart = typeof children === 'function' ? children(query) : children;
  const observerRef = useRef<IntersectionObserver>();

  const contentRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setIsEnabled(true);
            observerRef.current?.disconnect();
            observerRef.current = undefined;
          }
        },
        {threshold: 0.1} // if only header is visible, don't load
      );
      observerRef.current = observer;
      observer.observe(el);
    } else if (observerRef.current) {
      observerRef.current?.disconnect();
    }
  }, []);

  return cloneElement<BaseChartProps>(chart, {
    data: query.data?.report?.[metric],
    isLoading: query.isLoading,
    contentRef,
  });
}
