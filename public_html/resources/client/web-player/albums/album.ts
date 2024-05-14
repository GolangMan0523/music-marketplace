import {Genre} from '../genres/genre';
import {Artist} from '../artists/artist';
import {Tag} from '@common/tags/tag';
import {Track} from '@app/web-player/tracks/track';

export const ALBUM_MODEL = 'album';

export interface Album {
  id: number;
  name: string;
  model_type: typeof ALBUM_MODEL;
  release_date?: string;
  spotify_id?: string;
  image?: string;
  artists?: Omit<Artist, 'albums'>[];
  reposts_count?: number;
  likes_count?: number;
  plays?: number;
  views: number;
  description?: string;
  tracks?: Track[];
  tags?: Tag[];
  genres?: Genre[];
  created_at?: string;
  owner_id?: number;
  comments_count?: number;
  tracks_count?: number;
  updated_at: string;
}
