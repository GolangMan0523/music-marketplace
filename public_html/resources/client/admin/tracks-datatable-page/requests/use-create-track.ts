import {useMutation} from '@tanstack/react-query';
import {UseFormReturn} from 'react-hook-form';
import {apiClient, queryClient} from '@common/http/query-client';
import {toast} from '@common/ui/toast/toast';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {useTrans} from '@common/i18n/use-trans';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {message} from '@common/i18n/message';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Track} from '@app/web-player/tracks/track';
import {NormalizedModel} from '@common/datatable/filters/normalized-model';
import {TrackUploadPayload} from '@app/web-player/backstage/upload-page/use-track-uploader';

const endpoint = 'tracks';

export interface CreateTrackResponse extends BackendResponse {
  track: Track;
}

export interface CreateTrackPayload
  extends Omit<
    Track,
    'genres' | 'artists' | 'tags' | 'id' | 'model_type' | 'album' | 'lyric'
  > {
  album_id?: number;
  artists?: NormalizedModel[];
  waveData?: number[][];
  genres?: NormalizedModel[] | string[];
  tags?: NormalizedModel[];
  lyric?: string;
}

interface Options {
  onSuccess?: (response: CreateTrackResponse) => void;
}

export function useCreateTrack(
  form: UseFormReturn<CreateTrackPayload> | UseFormReturn<TrackUploadPayload>,
  {onSuccess}: Options = {},
) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (payload: CreateTrackPayload) => createTrack(payload),
    onSuccess: response => {
      toast(trans(message('Track created')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint),
      });
      onSuccess?.(response);
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createTrack(payload: CreateTrackPayload) {
  return apiClient
    .post<CreateTrackResponse>(endpoint, prepareTrackPayload(payload))
    .then(r => r.data);
}

export function prepareTrackPayload(payload: CreateTrackPayload) {
  return {
    ...payload,
    album_id: payload.album_id ? payload.album_id : null,
    artists: payload.artists?.map(artist => artist.id),
  };
}
