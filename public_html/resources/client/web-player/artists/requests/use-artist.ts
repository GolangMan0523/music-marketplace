import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useParams} from 'react-router-dom';
import {Artist} from '@app/web-player/artists/artist';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';
import {Album} from '@app/web-player/albums/album';
import {assignAlbumToTracks} from '@app/web-player/albums/assign-album-to-tracks';
import {Track} from '@app/web-player/tracks/track';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

export const albumLayoutKey = 'artistPage-albumLayout';

export interface UseArtistResponse extends BackendResponse {
  artist: Artist;
  albums?: PaginationResponse<Album>;
  tracks?: PaginationResponse<Track>;
  loader?: UseArtistParams['loader'];
  selectedAlbumLayout?: string;
}

export interface UseArtistParams {
  loader: 'artistPage' | 'editArtistPage' | 'artist';
}

export function useArtist(params: UseArtistParams) {
  const {artistId} = useParams();
  return useQuery({
    queryKey: ['artists', artistId, params],
    queryFn: () => fetchArtist(artistId!, params),
    initialData: () => {
      const data = getBootstrapData().loaders?.[params.loader];
      if (data?.artist?.id == artistId && data?.loader === params.loader) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchArtist(
  artistId: number | string,
  params: object,
): Promise<UseArtistResponse> {
  return apiClient
    .get<UseArtistResponse>(`artists/${artistId}`, {params})
    .then(response => {
      if (response.data.albums) {
        response.data.albums.data = response.data.albums.data.map(album =>
          assignAlbumToTracks(album),
        );
      }
      return response.data;
    });
}
