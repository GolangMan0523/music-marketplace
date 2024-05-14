import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Playlist} from '@app/web-player/playlists/playlist';
import {UseFormReturn} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {CreatePlaylistPayload} from '@app/web-player/playlists/requests/use-create-playlist';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {useParams} from 'react-router-dom';

interface Response extends BackendResponse {
  playlist: Playlist;
}

interface UseUpdatePlaylistProps {
  form?: UseFormReturn<CreatePlaylistPayload>;
  playlistId?: number | string;
}
export function useUpdatePlaylist({
  form,
  playlistId,
}: UseUpdatePlaylistProps = {}) {
  const params = useParams();
  if (params.playlistId && !playlistId) {
    playlistId = params.playlistId;
  }
  return useMutation({
    mutationFn: (props: Partial<CreatePlaylistPayload>) =>
      updatePlaylist(playlistId!, props),
    onSuccess: () => {
      toast(message('Playlist updated'));
      queryClient.invalidateQueries({queryKey: ['playlists']});
    },
    onError: r => (form ? onFormQueryError(r, form) : showHttpErrorToast(r)),
  });
}

function updatePlaylist(
  playlistId: number | string,
  payload: Partial<CreatePlaylistPayload>,
): Promise<Response> {
  return apiClient.put(`playlists/${playlistId}`, payload).then(r => r.data);
}
