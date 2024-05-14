import {ARTIST_MODEL} from '@app/web-player/artists/artist';
import {ArtistGridItem} from '@app/web-player/artists/artist-grid-item';
import {ALBUM_MODEL} from '@app/web-player/albums/album';
import {AlbumGridItem} from '@app/web-player/albums/album-grid-item';
import {GENRE_MODEL} from '@app/web-player/genres/genre';
import {GenreGridItem} from '@app/web-player/genres/genre-grid-item';
import React from 'react';
import {Track, TRACK_MODEL} from '@app/web-player/tracks/track';
import {TrackGridItem} from '@app/web-player/tracks/track-grid-item';
import {PLAYLIST_MODEL} from '@app/web-player/playlists/playlist';
import {PlaylistGridItem} from '@app/web-player/playlists/playlist-grid-item';
import {USER_MODEL} from '@common/auth/user';
import {UserGridItem} from '@app/web-player/users/user-grid-item';
import {ChannelContentModel} from '@app/admin/channels/channel-content-config';

interface Props {
  item: ChannelContentModel;
  items?: ChannelContentModel[];
}
export function ChannelContentGridItem({item, items}: Props) {
  switch (item.model_type) {
    case ARTIST_MODEL:
      return <ArtistGridItem artist={item} />;
    case ALBUM_MODEL:
      return <AlbumGridItem album={item} />;
    case GENRE_MODEL:
      return <GenreGridItem genre={item} />;
    case TRACK_MODEL:
      return <TrackGridItem track={item} newQueue={items as Track[]} />;
    case PLAYLIST_MODEL:
      return <PlaylistGridItem playlist={item} />;
    case USER_MODEL:
      return <UserGridItem user={item} />;
    default:
      return null;
  }
}
