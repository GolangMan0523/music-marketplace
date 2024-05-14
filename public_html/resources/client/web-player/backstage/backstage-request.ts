import {Artist} from '../artists/artist';
import {User} from '@common/auth/user';
import {FileEntry} from '@common/uploads/file-entry';

interface ExternalSocialProfile {
  id: number | string;
  email: string;
  avatar: string;
  name: string;
  profileUrl: string;
}

export interface BackstageRequest {
  id: number;
  artist_name: string;
  artist_id: string;
  type: string;
  user_id: number;
  user: User;
  artist?: Artist;
  created_at: string;
  status: 'approved' | 'pending' | 'denied';
  data: {
    socialProfiles: {[key: string]: ExternalSocialProfile};
    first_name?: string;
    last_name?: string;
    image?: string;
    company?: string;
    role?: string;
    passport_scan_entry_id?: number;
    passport_scan_entry?: FileEntry;
  };
}
