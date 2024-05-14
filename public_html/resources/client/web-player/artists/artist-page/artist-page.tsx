import {useArtist} from '@app/web-player/artists/requests/use-artist';
import {ArtistPageHeader} from '@app/web-player/artists/artist-page/artist-page-header';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import React from 'react';
import {ArtistPageTabs} from '@app/web-player/artists/artist-page/artist-page-tabs';
import {AdHost} from '@common/admin/ads/ad-host';

export function ArtistPage() {
  const query = useArtist({
    loader: 'artistPage',
  });

  if (query.data) {
    return (
      <div>
        <PageMetaTags query={query} />
        <AdHost slot="general_top" className="mb-34" />
        <ArtistPageHeader artist={query.data.artist} />
        <AdHost slot="artist_top" className="mt-14" />
        <ArtistPageTabs data={query.data} />
        <AdHost slot="general_bottom" className="mt-34" />
      </div>
    );
  }

  return (
    <PageStatus
      query={query}
      loaderClassName="absolute inset-0 m-auto"
      loaderIsScreen={false}
    />
  );
}
