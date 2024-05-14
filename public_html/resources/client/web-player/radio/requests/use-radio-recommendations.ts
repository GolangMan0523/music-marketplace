import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useParams} from 'react-router-dom';
import {Track} from '@app/web-player/tracks/track';
import {Artist} from '@app/web-player/artists/artist';
import {Genre} from '@app/web-player/genres/genre';

export type RadioSeed = Artist | Track | Genre;

interface Response extends BackendResponse {
  type: 'artist' | 'genre' | 'track';
  seed: RadioSeed;
  recommendations: Track[];
}

export function useRadioRecommendations() {
  const {seedType, seedId} = useParams();
  return useQuery({
    queryKey: ['radio', seedType, +seedId!],
    queryFn: () => fetchRecommendations(seedType!, seedId!),
    // different suggestions are returned every time, don't reload in background
    staleTime: Infinity,
  });
}

function fetchRecommendations(seedType: string, seedId: string | number) {
  return apiClient
    .get<Response>(`radio/${seedType}/${seedId}`)
    .then(response => response.data);
}
