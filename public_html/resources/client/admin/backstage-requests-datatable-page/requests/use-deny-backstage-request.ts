import {apiClient, queryClient} from '@common/http/query-client';
import {toast} from '@common/ui/toast/toast';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {useMutation} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {message} from '@common/i18n/message';
import {useNavigate} from 'react-router-dom';

interface Response extends BackendResponse {
  //
}

export interface DenyBackstageRequestPayload {
  notes?: string;
  requestId: number;
}

export function useDenyBackstageRequest() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: DenyBackstageRequestPayload) => denyRequest(payload),
    onSuccess: () => {
      toast(message('Request denied'));
      navigate('/admin/backstage-requests');
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('backstage-request'),
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function denyRequest({requestId, ...payload}: DenyBackstageRequestPayload) {
  return apiClient
    .post<Response>(`backstage-request/${requestId}/deny`, payload)
    .then(r => r.data);
}
