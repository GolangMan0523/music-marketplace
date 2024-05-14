import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useParams} from 'react-router-dom';
import {Album} from '@app/web-player/albums/album';
import {assignAlbumToTracks} from '@app/web-player/albums/assign-album-to-tracks';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

export interface GetAlbumResponse extends BackendResponse {
  album: Album;
  loader: Params['loader'];
}

interface Params {
  loader: 'albumPage' | 'editAlbumPage' | 'album' | 'albumEmbed';
}

export function useAlbum(params: Params) {
  const {albumId} = useParams();
  return useQuery({
    queryKey: ['albums', +albumId!],
    queryFn: () => fetchAlbum(albumId!, params),
    initialData: () => {
      const data = getBootstrapData().loaders?.[params.loader];
      if (data?.album?.id == albumId && data?.loader === params.loader) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchAlbum(albumId: number | string, params: Params) {
  return apiClient
    .get<GetAlbumResponse>(`albums/${albumId}`, {
      params,
    })
    .then(response => {
      response.data.album = assignAlbumToTracks(response.data.album);
      return response.data;
    });
}
