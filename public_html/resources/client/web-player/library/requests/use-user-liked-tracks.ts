import {
  useInfiniteData,
  UseInfiniteDataProps,
} from '@common/ui/infinite-scroll/use-infinite-data';
import {Track} from '@app/web-player/tracks/track';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

export const libraryTracksQueryKey = (userId: number | 'me') => {
  const user = getBootstrapData().user;
  // make sure we are using "me" as ID for current user
  // everywhere, so it's easier to invalidate queries
  if (userId === user?.id) {
    userId = 'me';
  }
  return ['tracks', 'library', userId];
};

export function useUserLikedTracks(
  userId: number | 'me',
  options?: Partial<UseInfiniteDataProps<Track>>
) {
  return useInfiniteData<Track>({
    queryKey: libraryTracksQueryKey(userId),
    endpoint: `users/${userId}/liked-tracks`,
    defaultOrderBy: 'likes.created_at',
    defaultOrderDir: 'desc',
    ...options,
  });
}
