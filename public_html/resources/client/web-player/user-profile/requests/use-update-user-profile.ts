import {useMutation} from '@tanstack/react-query';
import {useTrans} from '@common/i18n/use-trans';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Album} from '@app/web-player/albums/album';
import {useAuth} from '@common/auth/use-auth';
import {UserLink} from '@app/web-player/user-profile/user-link';
import {userProfileQueryKey} from '@app/web-player/user-profile/requests/use-user-profile';

interface Response extends BackendResponse {
  album: Album;
}

export interface UpdateProfilePayload {
  user: {
    avatar?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
  };
  profile: {
    city?: string;
    country?: string;
    description?: string;
  };
  links: UserLink[];
}

export function useUpdateUserProfile(
  form: UseFormReturn<UpdateProfilePayload>,
) {
  const {user} = useAuth();
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: () => {
      toast(trans(message('Profile updated')));
      if (user) {
        queryClient.invalidateQueries({queryKey: userProfileQueryKey(user.id)});
      }
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateProfile(payload: UpdateProfilePayload): Promise<Response> {
  return apiClient.put('users/profile/update', payload).then(r => r.data);
}
