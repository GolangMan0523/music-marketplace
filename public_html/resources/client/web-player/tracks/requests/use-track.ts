import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useParams} from 'react-router-dom';
import {Track} from '@app/web-player/tracks/track';
import {assignAlbumToTracks} from '@app/web-player/albums/assign-album-to-tracks';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

export interface getTrackResponse extends BackendResponse {
  track: Track;
  loader: Params['loader'];
}

interface Params {
  loader: 'track' | 'trackPage' | 'editTrackPage';
}

export function useTrack(params: Params) {
  const {trackId} = useParams();
  return useQuery({
    queryKey: ['tracks', +trackId!, params],
    queryFn: () => fetchTrack(trackId!, params),
    initialData: () => {
      const data = getBootstrapData().loaders?.[params.loader];
      if (data?.track?.id == trackId && data?.loader === params.loader) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchTrack(trackId: number | string, params: Params) {
  return apiClient
    .get<getTrackResponse>(`tracks/${trackId}`, {params})
    .then(response => {
      if (response.data.track.album) {
        response.data.track = {
          ...response.data.track,
          album: assignAlbumToTracks(response.data.track.album),
        };
      }
      return response.data;
    });
}
