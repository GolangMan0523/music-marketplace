import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useParams} from 'react-router-dom';
import {BackstageRequest} from '@app/web-player/backstage/backstage-request';

interface Response extends BackendResponse {
  request: BackstageRequest;
}

export function useBackstageRequest() {
  const {requestId} = useParams();
  return useQuery({
    queryKey: ['backstage-request', +requestId!],
    queryFn: () => fetchBackstageRequest(requestId!),
  });
}

function fetchBackstageRequest(trackId: number | string) {
  return apiClient
    .get<Response>(`backstage-request/${trackId}`)
    .then(response => response.data);
}
