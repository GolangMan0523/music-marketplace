import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Playlist, PLAYLIST_MODEL} from '@app/web-player/playlists/playlist';

interface Response extends BackendResponse {
  playlist: Playlist;
}

export interface ImportPlaylistPayload {
  spotifyId: string;
}

export function useImportPlaylist() {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: ImportPlaylistPayload) => importArtists(props),
    onSuccess: () => {
      toast(trans(message('Playlist imported')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('playlists'),
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function importArtists(payload: ImportPlaylistPayload): Promise<Response> {
  return apiClient
    .post('import-media/single-item', {
      modelType: PLAYLIST_MODEL,
      spotifyId: payload.spotifyId,
    })
    .then(r => r.data);
}
