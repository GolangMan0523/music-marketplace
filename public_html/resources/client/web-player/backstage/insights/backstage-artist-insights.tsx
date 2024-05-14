import {useParams} from 'react-router-dom';
import {BackstageInsightsLayout} from '@app/web-player/backstage/insights/backstage-insights-layout';
import {InsightsReportCharts} from '@app/admin/reports/insights-report-charts';
import React from 'react';
import {useArtist} from '@app/web-player/artists/requests/use-artist';
import {BackstageInsightsTitle} from '@app/web-player/backstage/insights/backstage-insights-title';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {ArtistLink} from '@app/web-player/artists/artist-link';

interface Props {
  isNested?: boolean;
}
export function BackstageArtistInsights({isNested}: Props) {
  const {artistId} = useParams();
  const {data} = useArtist({loader: 'artist'});
  return (
    <BackstageInsightsLayout
      reportModel={`artist=${artistId}`}
      title={
        data?.artist && (
          <BackstageInsightsTitle
            image={<SmallArtistImage artist={data.artist} />}
            name={<ArtistLink artist={data.artist} />}
          />
        )
      }
      isNested={isNested}
    >
      <InsightsReportCharts showTracks />
    </BackstageInsightsLayout>
  );
}
