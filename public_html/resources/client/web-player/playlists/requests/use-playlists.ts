import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Playlist} from '@app/web-player/playlists/playlist';
import {useAuth} from '@common/auth/use-auth';

interface GetAuthUserPlaylistsResponse extends BackendResponse {
  playlists: Playlist[];
}

export function usePlaylists(userId: number) {
  const {isLoggedIn, user} = useAuth();
  return useQuery({
    queryKey: ['playlists', 'user', userId],
    queryFn: () => fetchPlaylists(),
  });
}

function fetchPlaylists(): Promise<GetAuthUserPlaylistsResponse> {
  return apiClient
    .get('users/me/playlists', {params: {perPage: 30}})
    .then(response => {
      return {playlists: response.data.pagination.data};
    });
}
