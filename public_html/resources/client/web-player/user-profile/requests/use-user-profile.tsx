import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useParams} from 'react-router-dom';
import {User} from '@common/auth/user';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

export interface GetUserProfileResponse extends BackendResponse {
  user: User;
  loader: Params['loader'];
}

interface Params {
  loader: 'userProfilePage';
}

export function useUserProfile(params: Params) {
  const {userId} = useParams();
  return useQuery({
    queryKey: userProfileQueryKey(userId!),
    queryFn: () => fetchUser(userId!, params),
    initialData: () => {
      const data = getBootstrapData().loaders?.[params.loader];
      if (data?.user?.id == userId && data?.loader === params.loader) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchUser(userId: number | string, params: Params) {
  return apiClient
    .get<GetUserProfileResponse>(`user-profile/${userId}`, {params})
    .then(response => response.data);
}

export function userProfileQueryKey(userId: number | string) {
  return ['users', +userId, 'profile'];
}
