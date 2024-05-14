import {useMutation} from '@tanstack/react-query';
import {UseFormReturn} from 'react-hook-form';
import {apiClient, queryClient} from '@common/http/query-client';
import {toast} from '@common/ui/toast/toast';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {useTrans} from '@common/i18n/use-trans';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {message} from '@common/i18n/message';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {NormalizedModel} from '@common/datatable/filters/normalized-model';
import {Album} from '@app/web-player/albums/album';
import {
  CreateTrackPayload,
  prepareTrackPayload,
} from '@app/admin/tracks-datatable-page/requests/use-create-track';

const endpoint = 'albums';

interface Response extends BackendResponse {
  album: Album;
}

export type CreateAlbumPayloadTrack = Omit<
  CreateTrackPayload,
  'album' | 'artists' | 'lyric'
> & {
  uploadId: string;
};

export interface CreateAlbumPayload
  extends Omit<Album, 'genres' | 'tags' | 'tracks' | 'artists'> {
  artists: NormalizedModel[];
  genres?: NormalizedModel[] | string[];
  tags?: NormalizedModel[];
  tracks: CreateAlbumPayloadTrack[];
}

export function useCreateAlbum(form: UseFormReturn<CreateAlbumPayload>) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (payload: CreateAlbumPayload) => createAlbum(payload),
    onSuccess: () => {
      toast(trans(message('Album created')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint),
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createAlbum(payload: CreateAlbumPayload) {
  return apiClient
    .post<Response>(endpoint, prepareAlbumPayload(payload))
    .then(r => r.data);
}

export function prepareAlbumPayload(payload: CreateAlbumPayload) {
  return {
    ...payload,
    artists: payload.artists?.map(artist => artist.id),
    tracks: payload.tracks?.map(track => prepareTrackPayload(track)),
  };
}
