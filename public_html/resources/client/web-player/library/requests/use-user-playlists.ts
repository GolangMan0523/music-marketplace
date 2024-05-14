import {
  useInfiniteData,
  UseInfiniteDataProps,
} from '@common/ui/infinite-scroll/use-infinite-data';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {Playlist} from '@app/web-player/playlists/playlist';

export const libraryPlaylistsQueryKey = (
  userId: number | 'me',
  queryParams?: Record<string, string | number>
) => {
  const user = getBootstrapData().user;
  // make sure we are using "me" as ID for current user
  // everywhere, so it's easier to invalidate queries
  if (userId === user?.id) {
    userId = 'me';
  }
  const key: any[] = ['playlists', 'library', userId];
  if (queryParams) {
    key.push(queryParams);
  }
  return key;
};

export function useUserPlaylists(
  userId: number | 'me',
  options?: Partial<UseInfiniteDataProps<Playlist>>
) {
  return useInfiniteData<Playlist>({
    queryKey: libraryPlaylistsQueryKey(userId),
    endpoint: `users/${userId}/playlists`,
    defaultOrderBy: 'updated_at',
    defaultOrderDir: 'desc',
    ...options,
  });
}
