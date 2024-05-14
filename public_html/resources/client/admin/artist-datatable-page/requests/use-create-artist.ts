import {useMutation} from '@tanstack/react-query';
import {UseFormReturn} from 'react-hook-form';
import {apiClient, queryClient} from '@common/http/query-client';
import {toast} from '@common/ui/toast/toast';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {useTrans} from '@common/i18n/use-trans';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {message} from '@common/i18n/message';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Artist} from '@app/web-player/artists/artist';

const endpoint = 'artists';

interface Response extends BackendResponse {
  artist: Artist;
}

export interface CreateArtistPayload {
  name?: string;
  image_small?: string;
  verified?: boolean;
  spotify_id?: string;
  genres?: Artist['genres'];
  links?: Artist['links'];
  profile?: Artist['profile'];
  profile_images?: Artist['profile_images'];
}

export function useCreateArtist(form: UseFormReturn<CreateArtistPayload>) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (payload: CreateArtistPayload) => createAlbum(payload),
    onSuccess: () => {
      toast(trans(message('Artist created')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint),
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createAlbum(payload: CreateArtistPayload) {
  return apiClient.post<Response>(endpoint, payload).then(r => r.data);
}
