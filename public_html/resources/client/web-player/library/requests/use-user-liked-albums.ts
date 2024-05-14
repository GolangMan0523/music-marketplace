import {
  useInfiniteData,
  UseInfiniteDataProps,
} from '@common/ui/infinite-scroll/use-infinite-data';
import {Album} from '@app/web-player/albums/album';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

export const libraryAlbumsQueryKey = (
  userId: number | 'me',
  queryParams?: Record<string, string | number>
) => {
  const user = getBootstrapData().user;
  // make sure we are using "me" as ID for current user
  // everywhere, so it's easier to invalidate queries
  if (userId === user?.id) {
    userId = 'me';
  }
  const key: any[] = ['albums', 'library', userId];
  if (queryParams) {
    key.push(queryParams);
  }
  return key;
};

export function useUserLikedAlbums(
  userId: number | 'me',
  options?: Partial<UseInfiniteDataProps<Album>>
) {
  return useInfiniteData<Album>({
    queryKey: libraryAlbumsQueryKey(userId),
    endpoint: `users/${userId}/liked-albums`,
    defaultOrderBy: 'likes.created_at',
    defaultOrderDir: 'desc',
    ...options,
  });
}
