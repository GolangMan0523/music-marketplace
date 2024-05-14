import {Album} from '@app/web-player/albums/album';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {PlayableGridItem} from '@app/web-player/playable-item/playable-grid-item';
import {AlbumLink, getAlbumLink} from '@app/web-player/albums/album-link';
import {AlbumContextDialog} from '@app/web-player/albums/album-context-dialog';
import {LikeIconButton} from '@app/web-player/library/like-icon-button';

interface AlbumGridItemProps {
  album: Album;
}
export function AlbumGridItem({album}: AlbumGridItemProps) {
  return (
    <PlayableGridItem
      image={<AlbumImage album={album} />}
      title={<AlbumLink album={album} />}
      subtitle={<ArtistLinks artists={album.artists} />}
      link={getAlbumLink(album)}
      likeButton={<LikeIconButton likeable={album} />}
      model={album}
      contextDialog={<AlbumContextDialog album={album} />}
    />
  );
}
