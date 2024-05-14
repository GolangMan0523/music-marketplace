import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Track} from '@app/web-player/tracks/track';
import {CancelTokenSource} from 'axios';

interface Response extends BackendResponse {
  results: {title: string; id: string}[];
}

const endpoint = (track: Track) => {
  const artistName =
    track.artists?.[0]?.name || track.album?.artists?.[0]?.name;
  return `search/audio/${track.id}/${doubleEncode(artistName!)}/${doubleEncode(
    track.name
  )}`;
};

export let isSearchingForYoutubeVideo = false;

export async function findYoutubeVideosForTrack(
  track: Track,
  cancelToken?: CancelTokenSource
): Promise<Response['results']> {
  const query = {
    queryKey: [endpoint(track)],
    queryFn: async () => findMatch(track, cancelToken),
    staleTime: Infinity,
  };

  const response =
    queryClient.getQueryData<Response>(query.queryKey) ??
    (await queryClient.fetchQuery(query));

  isSearchingForYoutubeVideo = false;

  return response?.results || [];
}

function findMatch(
  track: Track,
  cancelToken?: CancelTokenSource
): Promise<Response> {
  isSearchingForYoutubeVideo = true;
  return apiClient
    .get(endpoint(track), {cancelToken: cancelToken?.token})
    .then(response => response.data);
}

function doubleEncode(value: string) {
  return encodeURIComponent(encodeURIComponent(value));
}
