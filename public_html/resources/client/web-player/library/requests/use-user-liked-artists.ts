import {
  useInfiniteData,
  UseInfiniteDataProps,
} from '@common/ui/infinite-scroll/use-infinite-data';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {Artist} from '@app/web-player/artists/artist';

export const libraryArtistsQueryKey = (userId: number | 'me') => {
  const user = getBootstrapData().user;
  // make sure we are using "me" as ID for current user
  // everywhere, so it's easier to invalidate queries
  if (userId === user?.id) {
    userId = 'me';
  }
  return ['artists', 'library', userId];
};

export function useUserLikedArtists(
  userId: number | 'me',
  options?: Partial<UseInfiniteDataProps<Artist>>
) {
  return useInfiniteData<Artist>({
    queryKey: libraryArtistsQueryKey(userId),
    endpoint: `users/${userId}/liked-artists`,
    defaultOrderBy: 'likes.created_at',
    defaultOrderDir: 'desc',
    ...options,
  });
}
