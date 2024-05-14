import {Album} from '@app/web-player/albums/album';
import {useMemo} from 'react';
import {useAuth} from '@common/auth/use-auth';

export function useAlbumPermissions(album?: Album) {
  const {user, hasPermission} = useAuth();
  return useMemo(() => {
    const permissions = {
      canEdit: false,
      canDelete: false,
      managesAlbum: false,
    };
    if (user?.id && album) {
      const albumArtistIds = album.artists?.map(a => a.id);
      const managesAlbum =
        album.owner_id === user.id ||
        !!user.artists?.find(a => albumArtistIds?.includes(a.id as number));

      permissions.canEdit =
        hasPermission('albums.update') ||
        hasPermission('music.update') ||
        managesAlbum;

      permissions.canDelete =
        hasPermission('albums.delete') ||
        hasPermission('music.delete') ||
        managesAlbum;

      permissions.managesAlbum = managesAlbum;
    }
    return permissions;
  }, [user, album, hasPermission]);
}
