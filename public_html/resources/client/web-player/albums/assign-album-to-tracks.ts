import {Album} from '@app/web-player/albums/album';

export function assignAlbumToTracks(album: Album): Album {
  album.tracks = album.tracks?.map(track => {
    if (!track.album) {
      track.album = {...album, tracks: undefined};
    }
    return track;
  });
  return album;
}
