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
import {CreateGenrePayload} from '@app/admin/genres-datatable-page/requests/use-create-genre';

interface Response extends BackendResponse {
  genre: Genre;
}

export interface UpdateGenrePayload extends CreateGenrePayload {
  id: number;
}

export function useUpdateGenre(form: UseFormReturn<UpdateGenrePayload>) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: UpdateGenrePayload) => updateGenre(props),
    onSuccess: () => {
      toast(trans(message('Genre updated')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('genres'),
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateGenre({id, ...payload}: UpdateGenrePayload): Promise<Response> {
  return apiClient.put(`genres/${id}`, payload).then(r => r.data);
}
