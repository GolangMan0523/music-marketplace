import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {Trans} from '@common/i18n/trans';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import React from 'react';
import {ProfileContentProps} from '@app/web-player/user-profile/user-profile-page';
import {ContentGrid} from '@app/web-player/playable-item/content-grid';
import {useUserLikedArtists} from '@app/web-player/library/requests/use-user-liked-artists';
import {MicIcon} from '@common/icons/material/Mic';
import {ArtistGridItem} from '@app/web-player/artists/artist-grid-item';

export function ProfileArtistsPanel({user}: ProfileContentProps) {
  const query = useUserLikedArtists(user.id);

  if (query.isInitialLoading) {
    return <FullPageLoader className="min-h-100" />;
  }

  if (!query.items.length) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<MicIcon size="lg" className="text-muted" />}
        title={<Trans message="No artists yet" />}
        description={
          <Trans
            message="Follow :user for updates on artists they like in the future."
            values={{user: user.display_name}}
          />
        }
      />
    );
  }

  return (
    <div>
      <ContentGrid>
        {query.items.map(artist => (
          <ArtistGridItem key={artist.id} artist={artist} />
        ))}
      </ContentGrid>
      <InfiniteScrollSentinel query={query} />
    </div>
  );
}
