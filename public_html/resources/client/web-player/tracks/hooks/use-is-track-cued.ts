import {usePlayerStore} from '@common/player/hooks/use-player-store';

export function useIsTrackCued(
  trackId: number,
  groupId?: string | number
): boolean {
  return usePlayerStore(s => {
    if (!s.cuedMedia?.meta.id || s.cuedMedia.meta.id !== trackId) {
      return false;
    }

    if (!s.cuedMedia?.groupId && !groupId) {
      return true;
    }

    if (groupId && s.cuedMedia.groupId === groupId) {
      return true;
    }

    return false;
  });
}
