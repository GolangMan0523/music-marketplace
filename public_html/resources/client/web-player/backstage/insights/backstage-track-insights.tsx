import {useParams} from 'react-router-dom';
import {BackstageInsightsLayout} from '@app/web-player/backstage/insights/backstage-insights-layout';
import {InsightsReportCharts} from '@app/admin/reports/insights-report-charts';
import React from 'react';
import {useTrack} from '@app/web-player/tracks/requests/use-track';
import {BackstageInsightsTitle} from '@app/web-player/backstage/insights/backstage-insights-title';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {TrackLink} from '@app/web-player/tracks/track-link';
import {ArtistLinks} from '@app/web-player/artists/artist-links';

interface Props {
  isNested?: boolean;
}
export function BackstageTrackInsights({isNested}: Props) {
  const {trackId} = useParams();
  const {data} = useTrack({loader: 'track'});
  return (
    <BackstageInsightsLayout
      reportModel={`track=${trackId}`}
      title={
        data?.track && (
          <BackstageInsightsTitle
            image={<TrackImage track={data.track} />}
            name={<TrackLink track={data.track} />}
            description={<ArtistLinks artists={data.track.artists} />}
          />
        )
      }
      isNested={isNested}
    >
      <InsightsReportCharts />
    </BackstageInsightsLayout>
  );
}
