import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {Track} from '@app/web-player/tracks/track';

export function useCuedTrack(): Track | undefined {
  const media = usePlayerStore(s => s.cuedMedia);
  if (!media) return;
  return media.meta as Track;
}
