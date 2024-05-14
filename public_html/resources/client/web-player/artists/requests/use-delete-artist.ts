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

export function useDeleteArtist(artistId: number | string) {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {getRedirectUri} = useAuth();

  return useMutation({
    mutationFn: () => deleteArtist(artistId),
    onSuccess: () => {
      toast(message('Artist deleted'));
      // navigate to homepage if we are on this artist page currently
      if (pathname.startsWith(`/artist/${artistId}`)) {
        navigate(getRedirectUri());
      }
      queryClient.invalidateQueries({queryKey: ['tracks']});
      queryClient.invalidateQueries({queryKey: ['albums']});
      queryClient.invalidateQueries({queryKey: ['artists']});
    },
    onError: r => showHttpErrorToast(r),
  });
}

function deleteArtist(artistId: number | string): Promise<Response> {
  return apiClient.delete(`artists/${artistId}`).then(r => r.data);
}
