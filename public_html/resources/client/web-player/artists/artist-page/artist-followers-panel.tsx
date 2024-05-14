import {Artist} from '@app/web-player/artists/artist';
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
  artist: Artist;
}
export function ArtistFollowersPanel({artist}: Props) {
  const query = useInfiniteData<User>({
    queryKey: ['artists', artist.id, 'followers'],
    endpoint: `artists/${artist.id}/followers`,
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
            message="Seems like no one is following :name yet."
            values={{name: artist.name}}
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
