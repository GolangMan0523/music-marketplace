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

export interface ApproveBackstageRequestPayload {
  markArtistAsVerified?: boolean;
  notes?: string;
  requestId: number;
}

export function useApproveBackstageRequest() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: ApproveBackstageRequestPayload) =>
      approveRequest(payload),
    onSuccess: () => {
      toast(message('Request approved'));
      navigate('/admin/backstage-requests');
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('backstage-request'),
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function approveRequest({
  requestId,
  ...payload
}: ApproveBackstageRequestPayload) {
  return apiClient
    .post<Response>(`backstage-request/${requestId}/approve`, payload)
    .then(r => r.data);
}
