import {useMemo} from 'react';
import {useAuth} from '@common/auth/use-auth';
import {Track} from '@app/web-player/tracks/track';

export function useTrackPermissions(tracks: (Track | undefined)[]) {
  const {user, hasPermission} = useAuth();

  return useMemo(() => {
    const permissions = {
      canEdit: true,
      canDelete: true,
      managesTrack: true,
    };
    tracks.every(track => {
      if (!track) {
        permissions.canEdit = false;
        permissions.canDelete = false;
        permissions.managesTrack = false;
        return;
      }

      const trackArtistIds = track.artists?.map(a => a.id);
      const managesTrack =
        track.owner_id === user?.id ||
        !!user?.artists?.find(a => trackArtistIds?.includes(a.id as number));

      if (!managesTrack) {
        permissions.managesTrack = false;
      }

      if (
        !hasPermission('tracks.update') &&
        !hasPermission('music.update') &&
        !managesTrack
      ) {
        permissions.canEdit = false;
      }

      if (
        !hasPermission('tracks.delete') &&
        !hasPermission('music.delete') &&
        !managesTrack
      ) {
        permissions.canDelete = false;
      }
    });
    return permissions;
  }, [user, tracks, hasPermission]);
}
