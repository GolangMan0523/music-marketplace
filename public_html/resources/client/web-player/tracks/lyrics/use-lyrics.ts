import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';

export interface SyncedLyricResponse {
  is_synced: true;
  lines: {time: number; text: string}[];
  duration: number | null;
}

export interface PlainLyricResponse {
  is_synced: false;
  lines: {text: string}[];
}

export interface UseLyricsResponse extends BackendResponse {
  is_synced: true;
  lines: {time?: number; text: string}[];
  duration: number | null;
}

interface UseLyricsQueryParams {
  duration: number;
}

export function useLyrics(
  trackId: number | string,
  queryParams: UseLyricsQueryParams,
) {
  return useQuery({
    queryKey: ['lyrics', trackId],
    queryFn: () => fetchLyrics(trackId, queryParams),
  });
}

function fetchLyrics(
  trackId: number | string,
  queryParams: UseLyricsQueryParams,
) {
  return apiClient
    .get<UseLyricsResponse>(`tracks/${trackId}/lyrics`, {params: queryParams})
    .then(response => response.data);
}
