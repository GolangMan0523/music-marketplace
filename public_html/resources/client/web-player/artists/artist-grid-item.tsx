import {Artist} from '@app/web-player/artists/artist';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {PlayableGridItem} from '@app/web-player/playable-item/playable-grid-item';
import {ArtistContextDialog} from '@app/web-player/artists/artist-context-dialog';
import {ArtistLink, getArtistLink} from '@app/web-player/artists/artist-link';
import {LikeIconButton} from '@app/web-player/library/like-icon-button';

interface ArtistGridItemProps {
  artist: Artist;
  radius?: string;
}
export function ArtistGridItem({
  artist,
  radius = 'rounded-full',
}: ArtistGridItemProps) {
  return (
    <PlayableGridItem
      image={<SmallArtistImage artist={artist} />}
      title={<ArtistLink artist={artist} />}
      model={artist}
      link={getArtistLink(artist)}
      likeButton={<LikeIconButton likeable={artist} />}
      contextDialog={<ArtistContextDialog artist={artist} />}
      radius={radius}
    />
  );
}
