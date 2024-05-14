import {Track} from '@app/web-player/tracks/track';

export function trackIsLocallyUploaded(track: Track): boolean {
  return (
    track?.src != null &&
    (track.src.startsWith('storage') ||
      track.src.includes('storage/track_media'))
  );
}
