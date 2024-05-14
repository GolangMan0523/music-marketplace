import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useParams} from 'react-router-dom';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';
import {Track} from '@app/web-player/tracks/track';
import {Playlist} from '@app/web-player/playlists/playlist';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

export interface GetPlaylistResponse extends BackendResponse {
  playlist: Playlist;
  tracks: PaginationResponse<Track>;
  totalDuration: number;
  loader: Params['loader'];
}

interface Params {
  loader: 'playlistPage' | 'playlist';
}

export function usePlaylist(params: Params) {
  const {playlistId} = useParams();
  return useQuery({
    queryKey: ['playlists', +playlistId!],
    queryFn: () => fetchPlaylist(playlistId!),
    initialData: () => {
      const data = getBootstrapData().loaders?.[params.loader];
      if (data?.playlist?.id == playlistId && data?.loader === params.loader) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchPlaylist(
  playlistId: number | string,
): Promise<GetPlaylistResponse> {
  return apiClient
    .get(`playlists/${playlistId}`)
    .then(response => response.data);
}
