import {Track} from '../tracks/track';
import {Album} from '../albums/album';

export interface Repost {
  id: number;
  track_id: number;
  user_id: number;
  created_at: string;
  repostable?: Track | Album;
}
