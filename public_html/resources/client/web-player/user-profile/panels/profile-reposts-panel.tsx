import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {Repost} from '@app/web-player/reposts/repost';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {AudiotrackIcon} from '@common/icons/material/Audiotrack';
import {Trans} from '@common/i18n/trans';
import {TrackListItem} from '@app/web-player/tracks/track-list/track-list-item';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import React from 'react';
import {ProfileContentProps} from '@app/web-player/user-profile/user-profile-page';
import {AlbumListItem} from '@app/web-player/albums/album-list/album-list-item';
import {ContentGrid} from '@app/web-player/playable-item/content-grid';
import {TrackGridItem} from '@app/web-player/tracks/track-grid-item';
import {AlbumGridItem} from '@app/web-player/albums/album-grid-item';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

export function ProfileRepostsPanel({user}: ProfileContentProps) {
  const isMobile = useIsMobileMediaQuery();
  const query = useInfiniteData<Repost>({
    queryKey: ['reposts', user.id],
    endpoint: `users/${user.id}/reposts`,
  });

  if (query.isLoading) {
    return <FullPageLoader className="min-h-100" />;
  }

  if (!query.items.length) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<AudiotrackIcon size="lg" className="text-muted" />}
        title={<Trans message="No reposts yet" />}
        description={
          <Trans
            message="Follow :user for updates on tracks and albums they repost in the future."
            values={{user: user.display_name}}
          />
        }
      />
    );
  }

  if (isMobile) {
    return (
      <div>
        <ContentGrid>
          {query.items.map(repost => {
            if (repost.repostable?.model_type === 'track') {
              return (
                <TrackGridItem track={repost.repostable} key={repost.id} />
              );
            } else if (repost.repostable?.model_type === 'album') {
              return (
                <AlbumGridItem album={repost.repostable} key={repost.id} />
              );
            }
            return null;
          })}
        </ContentGrid>
        <InfiniteScrollSentinel query={query} />
      </div>
    );
  }

  return (
    <div>
      {query.items.map(repost => {
        if (repost.repostable?.model_type === 'track') {
          return (
            <TrackListItem
              className="mb-40"
              key={repost.id}
              track={repost.repostable}
              reposter={user}
            />
          );
        } else if (repost.repostable?.model_type === 'album') {
          return (
            <AlbumListItem
              key={repost.id}
              album={repost.repostable}
              className="mb-40"
            />
          );
        }
        return null;
      })}
      <InfiniteScrollSentinel query={query} />
    </div>
  );
}
