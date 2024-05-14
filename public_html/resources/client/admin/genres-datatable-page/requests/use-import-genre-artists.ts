import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {Genre, GENRE_MODEL} from '@app/web-player/genres/genre';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';

interface Response extends BackendResponse {
  //
}

interface Payload {
  genre: Genre;
}

export function useImportGenreArtists() {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: Payload) => importArtists(props),
    onSuccess: () => {
      toast(trans(message('Artists imported')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('genres'),
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function importArtists(payload: Payload): Promise<Response> {
  return apiClient
    .post('import-media/single-item', {
      modelType: GENRE_MODEL,
      genreId: payload.genre.id,
    })
    .then(r => r.data);
}
