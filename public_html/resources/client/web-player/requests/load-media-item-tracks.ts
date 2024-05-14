import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Track} from '@app/web-player/tracks/track';

interface Response extends BackendResponse {
  tracks: Track[];
}

export async function loadMediaItemTracks(
  queueId: string,
  lastTrack?: Track
): Promise<Response['tracks']> {
  const query = {
    queryKey: ['player/tracks', {queueId, trackId: lastTrack?.id}],
    queryFn: async () => loadTracks(queueId, lastTrack),
    staleTime: Infinity,
  };

  try {
    const response =
      queryClient.getQueryData<Response>(query.queryKey) ??
      (await queryClient.fetchQuery(query));
    return response?.tracks || [];
  } catch (e) {
    return [];
  }
}

function loadTracks(queueId: string, lastTrack?: Track): Promise<Response> {
  return apiClient
    .post('player/tracks', {queueId, lastTrack})
    .then(response => response.data);
}
