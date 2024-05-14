import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Artist, ARTIST_MODEL} from '@app/web-player/artists/artist';

interface Response extends BackendResponse {
  artist: Artist;
}

export interface ImportArtistPayload {
  spotifyId: string;
  importSimilarArtists: boolean;
  importAlbums: boolean;
}

export function useImportArtist() {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: ImportArtistPayload) => importArtists(props),
    onSuccess: () => {
      toast(trans(message('Artist imported')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('artists'),
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function importArtists(payload: ImportArtistPayload): Promise<Response> {
  return apiClient
    .post('import-media/single-item', {
      modelType: ARTIST_MODEL,
      spotifyId: payload.spotifyId,
      importSimilarArtists: payload.importSimilarArtists,
      importAlbums: payload.importAlbums,
    })
    .then(r => r.data);
}
