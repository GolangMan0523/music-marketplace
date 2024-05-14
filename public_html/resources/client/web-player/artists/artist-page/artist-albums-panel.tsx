import {Artist} from '@app/web-player/artists/artist';
import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {Album} from '@app/web-player/albums/album';
import {AlbumIcon} from '@common/icons/material/Album';
import {AlbumList} from '@app/web-player/albums/album-list/album-list';

interface Props {
  artist: Artist;
}
export function ArtistAlbumsPanel({artist}: Props) {
  const query = useInfiniteData<Album>({
    queryKey: ['albums', artist.id],
    endpoint: `artists/${artist.id}/albums`,
  });

  if (query.isInitialLoading) {
    return <FullPageLoader className="min-h-100" />;
  }

  if (!query.items.length) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<AlbumIcon size="lg" className="text-muted" />}
        title={<Trans message="No albums yet" />}
        description={
          <Trans
            message="Follow :artist for updates on their latest releases."
            values={{artist: artist.name}}
          />
        }
      />
    );
  }

  return <AlbumList query={query} />;
}
