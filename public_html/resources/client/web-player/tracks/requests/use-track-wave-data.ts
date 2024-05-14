import {useQuery} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Comment} from '@common/comments/comment';

interface WaveDataResponse extends BackendResponse {
  waveData: number[][];
  comments: Comment[];
}

function queryKey(trackId: number | string) {
  return ['tracks', +trackId, 'wave-data'];
}

export function invalidateWaveData(trackId: number | string) {
  queryClient.invalidateQueries({queryKey: queryKey(trackId)});
}

export function useTrackWaveData(
  trackId: number | string,
  {enabled}: {enabled?: boolean} = {},
) {
  return useQuery({
    queryKey: queryKey(trackId),
    queryFn: () => fetchWaveData(trackId),
    enabled,
  });
}

function fetchWaveData(trackId: number | string) {
  return apiClient
    .get<WaveDataResponse>(`tracks/${trackId}/wave`)
    .then(response => response.data);
}
