import {Artist} from '@app/web-player/artists/artist';
import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {Track} from '@app/web-player/tracks/track';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {AudiotrackIcon} from '@common/icons/material/Audiotrack';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';
import {TrackList} from '@app/web-player/tracks/track-list/track-list';

interface Props {
  artist: Artist;
  initialTracks?: PaginationResponse<Track>;
}
export function ArtistTracksPanel({artist, initialTracks}: Props) {
  const query = useInfiniteData<Track>({
    queryKey: ['tracks', artist.id],
    endpoint: `artists/${artist.id}/tracks`,
    initialPage: initialTracks,
  });

  if (query.isLoading) {
    return <FullPageLoader className="min-h-100" screen={false} />;
  }

  if (!query.items.length) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<AudiotrackIcon size="lg" className="text-muted" />}
        title={<Trans message="No tracks yet" />}
        description={
          <Trans
            message="Follow :artist for updates on their latest releases."
            values={{artist: artist.name}}
          />
        }
      />
    );
  }

  return <TrackList query={query} />;
}
