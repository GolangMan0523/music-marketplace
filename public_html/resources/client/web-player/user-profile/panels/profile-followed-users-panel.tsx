import {Trans} from '@common/i18n/trans';
import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {User} from '@common/auth/user';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import React from 'react';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {BookmarkBorderIcon} from '@common/icons/material/BookmarkBorder';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {FollowerListItem} from '@app/web-player/artists/artist-page/followers-panel/follower-list-item';

interface Props {
  user: User;
}
export function ProfileFollowedUsersPanel({user}: Props) {
  const query = useInfiniteData<User>({
    queryKey: ['users', user.id, 'followed-users'],
    endpoint: `users/${user.id}/followed-users`,
  });

  if (query.isInitialLoading) {
    return <FullPageLoader className="min-h-100" />;
  }

  if (!query.items.length) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<BookmarkBorderIcon size="lg" className="text-muted" />}
        description={
          <Trans
            message="Seems like :name is not following anyone yet."
            values={{name: user.display_name}}
          />
        }
      />
    );
  }

  return (
    <div>
      {query.items.map(follower => (
        <FollowerListItem key={follower.id} follower={follower} />
      ))}
      <InfiniteScrollSentinel query={query} />
    </div>
  );
}
