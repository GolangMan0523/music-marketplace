import {useAuth} from '@common/auth/use-auth';
import {usePrimaryArtistForCurrentUser} from '@app/web-player/backstage/use-primary-artist-for-current-user';
import {useForm} from 'react-hook-form';
import {CreateBackstageRequestPayload} from '@app/web-player/backstage/requests/use-create-backstage-request';

export function useBackstageRequestForm(
  requestType: CreateBackstageRequestPayload['type']
) {
  const {user} = useAuth();
  const primaryArtist = usePrimaryArtistForCurrentUser();

  let artistId: number | 'CURRENT_USER' | undefined;
  if (requestType === 'verify-artist') {
    artistId = primaryArtist?.id as number;
  } else if (requestType === 'become-artist') {
    artistId = 'CURRENT_USER';
  }

  return useForm<CreateBackstageRequestPayload>({
    defaultValues: {
      artist_id: artistId,
      artist_name: user?.display_name,
      first_name: user?.first_name,
      last_name: user?.last_name,
      image: primaryArtist?.image || user?.avatar,
      type: requestType,
      role: requestType === 'claim-artist' ? 'artist' : undefined,
    },
  });
}
