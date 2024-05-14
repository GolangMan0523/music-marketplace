import {useParams} from 'react-router-dom';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';
import {Album} from '@app/web-player/albums/album';
import {assignAlbumToTracks} from '@app/web-player/albums/assign-album-to-tracks';
import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';

export type AlbumViewMode = 'list' | 'grid';

export const albumListViewPerPage = 5;
export const albumGridViewPerPage = 25;

export function useArtistAlbums(
  initialPage: PaginationResponse<Album> | null,
  viewMode: AlbumViewMode
) {
  const {artistId} = useParams();

  return useInfiniteData<Album>({
    endpoint: `artists/${artistId}/albums`,
    queryKey: ['artists', +artistId!, 'albums', viewMode],
    paginate: 'simple',
    initialPage,
    transformResponse: response => {
      response.pagination.data = response.pagination.data.map(album =>
        assignAlbumToTracks(album)
      );
      return response;
    },
  });
}
