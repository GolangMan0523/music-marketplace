import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {CreateLyricPayload} from '@app/admin/lyrics-datatable-page/requests/use-create-lyric';
import {Lyric} from '@app/web-player/tracks/lyrics/lyric';

interface Response extends BackendResponse {
  lyric: Lyric;
}

export interface UpdateLyricPayload extends CreateLyricPayload {
  id: number;
}

export function useUpdateLyric(form: UseFormReturn<UpdateLyricPayload>) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: UpdateLyricPayload) => updateGenre(props),
    onSuccess: () => {
      toast(trans(message('Lyric updated')));
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

function updateGenre({id, ...payload}: UpdateLyricPayload): Promise<Response> {
  return apiClient.put(`lyrics/${id}`, payload).then(r => r.data);
}
