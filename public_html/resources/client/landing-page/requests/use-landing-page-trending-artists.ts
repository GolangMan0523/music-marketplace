import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Artist} from '@app/web-player/artists/artist';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

interface Response extends BackendResponse {
  artists: Artist[];
}

export function useLandingPageTrendingArtists() {
  return useQuery({
    queryKey: ['landing', 'trending-artists'],
    queryFn: () => fetchArtists(),
    initialData: () => {
      const data = getBootstrapData().loaders?.landingPage;
      if (data?.trendingArtists) {
        return {artists: data.trendingArtists};
      }
      return undefined;
    },
  });
}

function fetchArtists() {
  return apiClient
    .get<Response>('landing/artists')
    .then(response => response.data);
}
