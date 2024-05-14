import {Artist} from '@app/web-player/artists/artist';
import {ArtistGridItem} from '@app/web-player/artists/artist-grid-item';
import {ContentGrid} from '@app/web-player/playable-item/content-grid';

interface SimilarArtistsTabProps {
  artist: Artist;
}
export function SimilarArtistsPanel({artist}: SimilarArtistsTabProps) {
  return (
    <ContentGrid>
      {artist.similar?.map(similar => (
        <ArtistGridItem key={similar.id} artist={similar} />
      ))}
    </ContentGrid>
  );
}
