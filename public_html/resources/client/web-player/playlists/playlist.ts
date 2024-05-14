import {User} from '@common/auth/user';
import {Track} from '@app/web-player/tracks/track';

export const PLAYLIST_MODEL = 'playlist';

export interface Playlist {
  id: number;
  name: string;
  public: boolean;
  collaborative: boolean;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
  owner_id: number;
  owner?: User;
  editors?: User[];
  tracks_count?: number;
  tracks?: Track[];
  model_type: typeof PLAYLIST_MODEL;
  views: number;
}
