import {Track} from '@app/web-player/tracks/track';
import {Album} from '@app/web-player/albums/album';
import {Artist} from '@app/web-player/artists/artist';
import {Playlist} from '@app/web-player/playlists/playlist';

export type PlayableModel = Track | Album | Artist | Playlist;
