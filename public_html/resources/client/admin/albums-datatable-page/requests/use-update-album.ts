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
import {
  CreateAlbumPayload,
  prepareAlbumPayload,
} from '@app/admin/albums-datatable-page/requests/use-create-album';
import {Album} from '@app/web-player/albums/album';
import {useLocation} from 'react-router-dom';
import {getAlbumLink} from '@app/web-player/albums/album-link';

interface Response extends BackendResponse {
  album: Album;
}

export interface UpdateAlbumPayload extends CreateAlbumPayload {
  id: number;
}

const Endpoint = (id: number) => `albums/${id}`;

export function useUpdateAlbum(
  form: UseFormReturn<UpdateAlbumPayload>,
  albumId: number,
) {
  const {trans} = useTrans();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  return useMutation({
    mutationFn: (payload: UpdateAlbumPayload) => updateAlbum(albumId, payload),
    onSuccess: response => {
      toast(trans(message('Album updated')));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('albums'),
      });
      if (pathname.includes('admin')) {
        navigate('/admin/albums');
      } else {
        navigate(getAlbumLink(response.album));
      }
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateAlbum(
  id: number,
  payload: UpdateAlbumPayload,
): Promise<Response> {
  return apiClient
    .put(Endpoint(id), prepareAlbumPayload(payload))
    .then(r => r.data);
}
