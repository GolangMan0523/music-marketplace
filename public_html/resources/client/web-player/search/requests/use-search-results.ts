import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Artist} from '@app/web-player/artists/artist';
import {Track} from '@app/web-player/tracks/track';
import {Playlist} from '@app/web-player/playlists/playlist';
import {User} from '@common/auth/user';
import {Genre} from '@app/web-player/genres/genre';
import {Tag} from '@common/tags/tag';
import {Album} from '@app/web-player/albums/album';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {SimplePaginationResponse} from '@common/http/backend-response/pagination-response';

interface SearchParams {
  query?: string;
  loader: 'search' | 'searchPage';
}

export interface SearchResponse extends BackendResponse {
  query: string;
  loader: SearchParams['loader'];
  results: {
    artists?: SimplePaginationResponse<Artist>;
    albums?: SimplePaginationResponse<Album>;
    tracks?: SimplePaginationResponse<Track>;
    playlists?: SimplePaginationResponse<Playlist>;
    users?: SimplePaginationResponse<User>;
    genres?: SimplePaginationResponse<Genre>;
    tags?: SimplePaginationResponse<Tag>;
  };
}

export function useSearchResults(params: SearchParams) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: ({signal}) => search(params, signal),
    enabled: !!params.query,
    placeholderData: !!params.query ? keepPreviousData : undefined,
    initialData: () => {
      const data = getBootstrapData().loaders?.[params.loader];
      if (data?.query == params.query && data?.loader === params.loader) {
        return data;
      }
      return undefined;
    },
  });
}

async function search(params: SearchParams, signal: AbortSignal) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return apiClient
    .get<SearchResponse>(`search`, {params, signal})
    .then(response => response.data);
}
