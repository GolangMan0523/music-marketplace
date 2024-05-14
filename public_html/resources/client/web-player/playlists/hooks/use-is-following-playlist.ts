import {useAuthUserPlaylists} from '@app/web-player/playlists/requests/use-auth-user-playlists';
import {useAuth} from '@common/auth/use-auth';

export function useIsFollowingPlaylist(playlistId: number): boolean {
  const {data} = useAuthUserPlaylists();
  const {user} = useAuth();
  // if user is playlist creator, then he is not following it
  const playlist = data.playlists.find(p => p.id === +playlistId);
  if (playlist && user && user.id !== playlist.owner_id) {
    return true;
  }
  return false;
}
