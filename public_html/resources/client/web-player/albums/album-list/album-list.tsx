import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import React from 'react';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {UseInfiniteDataResult} from '@common/ui/infinite-scroll/use-infinite-data';
import {Album} from '@app/web-player/albums/album';
import {ContentGrid} from '@app/web-player/playable-item/content-grid';
import {AlbumGridItem} from '@app/web-player/albums/album-grid-item';
import {AlbumListItem} from '@app/web-player/albums/album-list/album-list-item';

interface Props {
  albums?: Album[];
  query?: UseInfiniteDataResult<Album>;
}
export function AlbumList({albums, query}: Props) {
  const isMobile = useIsMobileMediaQuery();
  if (!albums && query) {
    albums = query.items;
  } else {
    albums = [];
  }

  if (isMobile) {
    return (
      <div>
        <ContentGrid>
          {albums.map(album => (
            <AlbumGridItem album={album} key={album.id} />
          ))}
        </ContentGrid>
        {query && <InfiniteScrollSentinel query={query} />}
      </div>
    );
  }

  return (
    <div>
      {albums.map(album => (
        <AlbumListItem key={album.id} album={album} className="mb-40" />
      ))}
      {query && <InfiniteScrollSentinel query={query} />}
    </div>
  );
}
