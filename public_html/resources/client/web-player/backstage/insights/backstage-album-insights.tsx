import {useParams} from 'react-router-dom';
import {BackstageInsightsLayout} from '@app/web-player/backstage/insights/backstage-insights-layout';
import {InsightsReportCharts} from '@app/admin/reports/insights-report-charts';
import React from 'react';
import {useAlbum} from '@app/web-player/albums/requests/use-album';
import {BackstageInsightsTitle} from '@app/web-player/backstage/insights/backstage-insights-title';
import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {AlbumLink} from '@app/web-player/albums/album-link';

interface Props {
  isNested?: boolean;
}
export function BackstageAlbumInsights({isNested}: Props) {
  const {albumId} = useParams();
  const {data} = useAlbum({loader: 'album'});
  return (
    <BackstageInsightsLayout
      reportModel={`album=${albumId}`}
      title={
        data?.album && (
          <BackstageInsightsTitle
            image={<AlbumImage album={data.album} />}
            name={<AlbumLink album={data.album} />}
            description={<ArtistLinks artists={data.album.artists} />}
          />
        )
      }
      isNested={isNested}
    >
      <InsightsReportCharts showTracks />
    </BackstageInsightsLayout>
  );
}
