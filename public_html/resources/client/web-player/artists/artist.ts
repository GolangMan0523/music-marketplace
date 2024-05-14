import {Genre} from '../genres/genre';
import {Track} from '../tracks/track';
import {UserProfile} from '../user-profile/user-profile';
import {UserLink} from '../user-profile/user-link';
import {User} from '@common/auth/user';
import {Album} from '@app/web-player/albums/album';

export const ARTIST_MODEL = 'artist';

export interface Artist {
  id: number;
  name: string;
  model_type: 'artist';
  verified?: boolean;
  spotify_id?: string;
  followers_count?: number;
  followers?: User[];
  spotify_popularity?: boolean;
  likes_count?: number;
  albums_count?: number;
  image_small?: string;
  updated_at?: string;
  top_tracks?: Track[];
  albums?: Album[];
  similar?: Omit<Artist, 'similar' | 'top_tracks' | 'albums'>[];
  genres?: Genre[];
  views: number;
  plays: number;
  profile?: UserProfile;
  profile_images?: {url: string}[];
  links?: UserLink[];
}
