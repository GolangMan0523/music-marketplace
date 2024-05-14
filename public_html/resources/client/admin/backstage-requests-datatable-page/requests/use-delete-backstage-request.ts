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

interface Payload {
  requestId: number;
}

export function useDeleteBackstageRequest() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({requestId}: Payload) => deleteRequest(requestId),
    onSuccess: () => {
      toast(message('Request deleted'));
      navigate('/admin/backstage-requests');
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('backstage-request'),
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function deleteRequest(requestId: number) {
  return apiClient
    .delete<Response>(`backstage-request/${requestId}`)
    .then(r => r.data);
}
