import React, {useMemo} from 'react';
import {playerStoreOptions} from '@app/web-player/state/player-store-options';
import {PlayerContext} from '@common/player/player-context';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {
  tracksToMediaItems,
  trackToMediaItem,
} from '@app/web-player/tracks/utils/track-to-media-item';
import {useAlbum} from '@app/web-player/albums/requests/use-album';
import {Album} from '@app/web-player/albums/album';
import {AlbumListItem} from '@app/web-player/albums/album-list/album-list-item';
import {PlayerStoreOptions} from '@common/player/state/player-store-options';
import {PlayerOutlet} from '@common/player/ui/player-outlet';
import {PlayerPoster} from '@common/player/ui/controls/player-poster';

export function AlbumEmbed() {
  const {data} = useAlbum({loader: 'albumEmbed'});
  return (
    <div className="h-384 rounded border bg-alt p-14">
      {!data?.album ? (
        <FullPageLoader screen={false} />
      ) : (
        <EmbedContent album={data.album} />
      )}
    </div>
  );
}

interface EmbedContentProps {
  album: Album;
}
function EmbedContent({album}: EmbedContentProps) {
  const options: PlayerStoreOptions = useMemo(() => {
    return {
      ...playerStoreOptions,
      initialData: {
        queue: album.tracks?.length ? tracksToMediaItems(album.tracks) : [],
        cuedMediaId: album.tracks?.length
          ? trackToMediaItem(album.tracks[0]).id
          : undefined,
        state: {
          repeat: false,
        },
      },
    };
  }, [album]);
  return (
    <PlayerContext id="web-player" options={options}>
      <div className="flex h-full items-start gap-24">
        <div className="relative h-144 w-144 flex-shrink-0 overflow-hidden rounded bg-black">
          <PlayerPoster className="absolute inset-0" />
          <PlayerOutlet className="h-full w-full" />
        </div>
        <AlbumListItem
          album={album}
          maxHeight="h-full"
          className="flex-auto"
          hideArtwork
          hideActions
          linksInNewTab
        />
      </div>
    </PlayerContext>
  );
}
