import {useMemo} from 'react';
import {useAuth} from '@common/auth/use-auth';
import {Artist} from '@app/web-player/artists/artist';

export function useArtistPermissions(artist: Artist) {
  const {user, hasPermission} = useAuth();
  return useMemo(() => {
    const permissions = {
      canEdit: false,
      canDelete: false,
    };
    if (user?.id) {
      const managesArtist = !!user.artists?.find(a => a.id === artist.id);

      permissions.canEdit =
        hasPermission('artists.update') ||
        hasPermission('music.update') ||
        managesArtist;

      permissions.canDelete =
        hasPermission('artists.delete') ||
        hasPermission('music.delete') ||
        managesArtist;
    }
    return permissions;
  }, [user, artist, hasPermission]);
}
