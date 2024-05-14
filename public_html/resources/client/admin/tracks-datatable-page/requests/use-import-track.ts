import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Track, TRACK_MODEL} from '@app/web-player/tracks/track';

interface Response extends BackendResponse {
  track: Track;
}

export interface ImportTrackPayload {
  spotifyId: string;
  importLyrics: boolean;
}

export function useImportTrack() {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: ImportTrackPayload) => importTrack(props),
    onSuccess: () => {
      toast(trans(message('Track imported')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('tracks'),
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function importTrack(payload: ImportTrackPayload): Promise<Response> {
  return apiClient
    .post('import-media/single-item', {
      modelType: TRACK_MODEL,
      spotifyId: payload.spotifyId,
      importLyrics: payload.importLyrics,
    })
    .then(r => r.data);
}
