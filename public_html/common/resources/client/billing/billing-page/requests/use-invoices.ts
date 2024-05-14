import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {Invoice} from '@common/billing/invoice';
import {BackendResponse} from '@common/http/backend-response/backend-response';

const Endpoint = 'billing/invoices';

export interface FetchInvoicesResponse extends BackendResponse {
  invoices: Invoice[];
}

export function useInvoices(userId: number) {
  return useQuery({
    queryKey: [Endpoint],
    queryFn: () => fetchInvoices(userId),
  });
}

function fetchInvoices(userId: number): Promise<FetchInvoicesResponse> {
  return apiClient
    .get(Endpoint, {params: {userId}})
    .then(response => response.data);
}
