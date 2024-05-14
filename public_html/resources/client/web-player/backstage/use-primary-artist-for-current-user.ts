import {useAuth} from '@common/auth/use-auth';
import {UserArtist} from '@app/web-player/user-profile/user-artist';

export function usePrimaryArtistForCurrentUser(): UserArtist | undefined {
  const {user} = useAuth();
  return user?.artists?.find(a => a.role === 'artist');
}
