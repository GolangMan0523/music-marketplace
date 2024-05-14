import {Track} from '../track';

export interface Lyric {
  id: number;
  text: string;
  track_id: number;
  track?: Track;
  is_synced: boolean;
  duration: number | null;
  updated_at: string;
}
