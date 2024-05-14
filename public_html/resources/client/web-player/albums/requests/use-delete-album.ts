import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {useLocation} from 'react-router-dom';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useAuth} from '@common/auth/use-auth';

interface Response extends BackendResponse {}

interface Payload {
  albumId: number;
}

export function useDeleteAlbum() {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {getRedirectUri} = useAuth();

  return useMutation({
    mutationFn: (payload: Payload) => deleteAlbum(payload),
    onSuccess: (response, {albumId}) => {
      toast(message('Album deleted'));
      // navigate to homepage if we are on this album page currently
      if (pathname.startsWith(`/album/${albumId}`)) {
        navigate(getRedirectUri());
      }
      queryClient.invalidateQueries({queryKey: ['tracks']});
      queryClient.invalidateQueries({queryKey: ['albums']});
      queryClient.invalidateQueries({queryKey: ['artists']});
    },
    onError: r => showHttpErrorToast(r),
  });
}

function deleteAlbum({albumId}: Payload): Promise<Response> {
  return apiClient.delete(`albums/${albumId}`).then(r => r.data);
}
