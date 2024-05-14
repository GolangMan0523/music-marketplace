import React from 'react';
import {useOutletContext} from 'react-router-dom';
import {AdminReportOutletContext} from '@app/admin/reports/bemusic-admin-report-page';
import {InsightsReportCharts} from '@app/admin/reports/insights-report-charts';

export function AdminInsightsReport() {
  const {dateRange} = useOutletContext<AdminReportOutletContext>();
  return (
    <InsightsReportCharts
      dateRange={dateRange}
      model="track_play=0"
      showTracks
      showArtistsAndAlbums
    />
  );
}
