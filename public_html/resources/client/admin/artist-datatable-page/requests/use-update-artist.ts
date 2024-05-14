import {useMutation} from '@tanstack/react-query';
import {useTrans} from '@common/i18n/use-trans';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Artist} from '@app/web-player/artists/artist';
import {CreateArtistPayload} from '@app/admin/artist-datatable-page/requests/use-create-artist';
import {useLocation} from 'react-router-dom';
import {getArtistLink} from '@app/web-player/artists/artist-link';

interface Response extends BackendResponse {
  artist: Artist;
}

export interface UpdateArtistPayload extends CreateArtistPayload {
  id: number;
}

const Endpoint = (id: number) => `artists/${id}`;

export function useUpdateArtist(form: UseFormReturn<UpdateArtistPayload>) {
  const {trans} = useTrans();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  return useMutation({
    mutationFn: (payload: UpdateArtistPayload) => updateAlbum(payload),
    onSuccess: response => {
      toast(trans(message('Artist updated')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('artists'),
      });
      if (pathname.includes('admin')) {
        navigate('/admin/artists');
      } else {
        navigate(getArtistLink(response.artist));
      }
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateAlbum({id, ...payload}: UpdateArtistPayload): Promise<Response> {
  return apiClient.put(Endpoint(id), payload).then(r => r.data);
}
