import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Album, ALBUM_MODEL} from '@app/web-player/albums/album';

interface Response extends BackendResponse {
  album: Album;
}

export interface ImportAlbumPayload {
  spotifyId: string;
}

export function useImportAlbum() {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: ImportAlbumPayload) => importAlbum(props),
    onSuccess: () => {
      toast(trans(message('Album imported')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('albums'),
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function importAlbum(payload: ImportAlbumPayload): Promise<Response> {
  return apiClient
    .post('import-media/single-item', {
      modelType: ALBUM_MODEL,
      spotifyId: payload.spotifyId,
    })
    .then(r => r.data);
}
