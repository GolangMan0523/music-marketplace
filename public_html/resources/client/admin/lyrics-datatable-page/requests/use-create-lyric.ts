import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {Genre} from '@app/web-player/genres/genre';

interface Response extends BackendResponse {
  genre: Genre;
}

export interface CreateLyricPayload {
  track_id: number;
  text: string;
  is_synced: boolean;
  duration: number | null;
}

export function useCreateLyric(form: UseFormReturn<CreateLyricPayload>) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: CreateLyricPayload) => createNewTag(props),
    onSuccess: () => {
      toast(trans(message('Lyric created')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('lyrics'),
      });
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('tracks'),
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createNewTag(payload: CreateLyricPayload) {
  return apiClient.post<Response>('lyrics', payload).then(r => r.data);
}
