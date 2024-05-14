import {Artist} from '@app/web-player/artists/artist';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';
import {Album} from '@app/web-player/albums/album';
import {AlbumGridItem} from '@app/web-player/albums/album-grid-item';
import {useArtistAlbums} from '@app/web-player/artists/requests/use-artist-albums';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {NoDiscographyMessage} from '@app/web-player/artists/artist-page/discography-panel/no-discography-message';
import {ContentGrid} from '@app/web-player/playable-item/content-grid';

interface ArtistAlbumsGridProps {
  artist: Artist;
  initialAlbums: PaginationResponse<Album> | null;
}
export function ArtistAlbumsGrid({initialAlbums}: ArtistAlbumsGridProps) {
  const query = useArtistAlbums(initialAlbums, 'grid');

  if (!query.isLoading && !query.items.length) {
    return <NoDiscographyMessage />;
  }

  return (
    <ContentGrid>
      {query.items.map(album => (
        <AlbumGridItem key={album.id} album={album} />
      ))}
      <InfiniteScrollSentinel query={query} />
    </ContentGrid>
  );
}
