import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Playlist} from '@app/web-player/playlists/playlist';
import {useMutation} from '@tanstack/react-query';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';

interface Response extends BackendResponse {
  playlist: Playlist;
}

export function useUnfollowPlaylist(playlist: Playlist) {
  return useMutation({
    mutationFn: () => unfollowPlaylist(playlist.id),
    onSuccess: () => {
      toast(
        message('Stopped following :name', {values: {name: playlist.name}}),
      );
      queryClient.invalidateQueries({queryKey: ['playlists']});
    },
    onError: r => showHttpErrorToast(r),
  });
}

function unfollowPlaylist(playlistId: number | string): Promise<Response> {
  return apiClient.post(`playlists/${playlistId}/unfollow`).then(r => r.data);
}
