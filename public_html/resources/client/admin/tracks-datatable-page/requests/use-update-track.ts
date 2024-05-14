import {useMutation} from '@tanstack/react-query';
import {useTrans} from '@common/i18n/use-trans';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Track} from '@app/web-player/tracks/track';
import {
  CreateTrackPayload,
  prepareTrackPayload,
} from '@app/admin/tracks-datatable-page/requests/use-create-track';

export interface UpdateTrackResponse extends BackendResponse {
  track: Track;
}

export interface UpdateTrackPayload extends CreateTrackPayload {
  id: number;
}

const Endpoint = (id: number) => `tracks/${id}`;

interface Options {
  onSuccess?: (response: UpdateTrackResponse) => void;
}

export function useUpdateTrack(
  form: UseFormReturn<UpdateTrackPayload>,
  options: Options = {},
) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (payload: UpdateTrackPayload) => updateChannel(payload),
    onSuccess: response => {
      toast(trans(message('Track updated')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('tracks'),
      });
      options.onSuccess?.(response);
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateChannel({
  id,
  ...payload
}: UpdateTrackPayload): Promise<UpdateTrackResponse> {
  return apiClient
    .put(Endpoint(id), prepareTrackPayload(payload as CreateTrackPayload))
    .then(r => r.data);
}
