import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Playlist} from '@app/web-player/playlists/playlist';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {useAuth} from '@common/auth/use-auth';

interface GetAuthUserPlaylistsResponse extends BackendResponse {
  playlists: Playlist[];
}

export function useAuthUserPlaylists() {
  const {isLoggedIn, user} = useAuth();
  return useQuery({
    queryKey: ['playlists', 'library', user?.id, 'compact'],
    queryFn: () => fetchPlaylists(),
    enabled: isLoggedIn,
    initialData: () => {
      return {
        playlists: getBootstrapData().playlists || [],
      };
    },
  });
}

function fetchPlaylists(): Promise<GetAuthUserPlaylistsResponse> {
  return apiClient
    .get('users/me/playlists', {
      params: {perPage: 30, orderBy: 'updated_at', orderDir: 'desc'},
    })
    .then(response => {
      return {playlists: response.data.pagination.data};
    });
}
