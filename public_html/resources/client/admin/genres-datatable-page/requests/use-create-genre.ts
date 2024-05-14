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

export interface CreateGenrePayload {
  name: string;
  display_name: string;
  image: string;
}

export function useCreateGenre(form: UseFormReturn<CreateGenrePayload>) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: CreateGenrePayload) => createNewTag(props),
    onSuccess: () => {
      toast(trans(message('Genre created')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('genres'),
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createNewTag(payload: CreateGenrePayload): Promise<Response> {
  return apiClient.post('genres', payload).then(r => r.data);
}
