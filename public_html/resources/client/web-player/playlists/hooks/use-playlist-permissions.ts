import {Playlist} from '@app/web-player/playlists/playlist';
import {useAuth} from '@common/auth/use-auth';

export function usePlaylistPermissions(playlist: Playlist) {
  const {user} = useAuth();
  const isCreator: boolean = !!(user?.id && user.id === playlist.owner_id);
  return {canEdit: isCreator, canDelete: isCreator, isCreator};
}
