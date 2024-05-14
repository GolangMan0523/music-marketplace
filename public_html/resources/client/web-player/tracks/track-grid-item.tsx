import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {PlayableGridItem} from '@app/web-player/playable-item/playable-grid-item';
import {Track} from '@app/web-player/tracks/track';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {getTrackLink, TrackLink} from '@app/web-player/tracks/track-link';
import {TrackContextDialog} from '@app/web-player/tracks/context-dialog/track-context-dialog';
import {LikeIconButton} from '@app/web-player/library/like-icon-button';

interface TrackGridItemProps {
  track: Track;
  newQueue?: Track[];
}
export function TrackGridItem({track, newQueue}: TrackGridItemProps) {
  return (
    <PlayableGridItem
      image={<TrackImage track={track} />}
      title={<TrackLink track={track} />}
      subtitle={<ArtistLinks artists={track.artists} />}
      link={getTrackLink(track)}
      likeButton={<LikeIconButton likeable={track} />}
      model={track}
      newQueue={newQueue}
      contextDialog={<TrackContextDialog tracks={[track]} />}
    />
  );
}
