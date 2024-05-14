import {useMutation} from '@tanstack/react-query';
import {UseFormReturn} from 'react-hook-form';
import {apiClient, queryClient} from '@common/http/query-client';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {FileEntry} from '@common/uploads/file-entry';
import {BackstageRequest} from '@app/web-player/backstage/backstage-request';

const endpoint = 'backstage-request';

interface Response extends BackendResponse {
  request: BackstageRequest;
}

export interface CreateBackstageRequestPayload {
  type: 'verify-artist' | 'become-artist' | 'claim-artist';
  artist_id: number | 'CURRENT_USER';
  artist_name: string;
  first_name: string;
  last_name: string;
  image: string;
  role: string;
  company: string;
  passportScan?: Omit<FileEntry, 'parent' | 'children'>;
}

export function useCreateBackstageRequest(
  form: UseFormReturn<CreateBackstageRequestPayload>,
) {
  return useMutation({
    mutationFn: (payload: CreateBackstageRequestPayload) =>
      createRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint),
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createRequest(payload: CreateBackstageRequestPayload) {
  return apiClient
    .post<Response>(endpoint, {
      artist_name: payload.artist_name,
      artist_id: payload.artist_id,
      type: payload.type,
      data: {
        first_name: payload.first_name,
        last_name: payload.last_name,
        image: payload.image,
        role: payload.role,
        company: payload.company,
        passport_scan_id: payload.passportScan?.id,
      },
    })
    .then(r => r.data);
}
