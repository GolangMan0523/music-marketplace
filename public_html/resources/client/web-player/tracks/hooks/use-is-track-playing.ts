import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {useIsTrackCued} from '@app/web-player/tracks/hooks/use-is-track-cued';

export function useIsTrackPlaying(
  trackId: number,
  groupId?: string | number
): boolean {
  const isCued = useIsTrackCued(trackId, groupId);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  return isCued && isPlaying;
}
