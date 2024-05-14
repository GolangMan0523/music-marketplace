import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {Track} from '@app/web-player/tracks/track';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {useParams} from 'react-router-dom';
import {moveMultipleItemsInArray} from '@common/utils/array/move-multiple-items-in-array';

interface Response extends BackendResponse {
  //
}

interface Payload {
  tracks: Track[];
  oldIndexes: number | number[];
  newIndex: number;
}

export function useReorderPlaylistTracks() {
  const {playlistId} = useParams();
  return useMutation({
    mutationFn: (payload: Payload) => reorderTracks(playlistId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tracks', 'playlist', +playlistId!],
      });
    },
    onError: err => showHttpErrorToast(err),
  });
}

function reorderTracks(
  playlistId: number | string,
  {tracks, oldIndexes, newIndex}: Payload,
): Promise<Response> {
  const ids = tracks.map(t => t.id);
  moveMultipleItemsInArray(ids, oldIndexes, newIndex);
  return apiClient
    .post(`playlists/${playlistId}/tracks/order`, {ids})
    .then(r => r.data);
}
