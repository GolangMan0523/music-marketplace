import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {TRACK_MODEL} from '@app/web-player/tracks/track';
import {ALBUM_MODEL} from '@app/web-player/albums/album';
import {ARTIST_MODEL} from '@app/web-player/artists/artist';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {Likeable} from '@app/web-player/library/likeable';

interface State {
  [TRACK_MODEL]: Record<number, boolean>;
  [ALBUM_MODEL]: Record<number, boolean>;
  [ARTIST_MODEL]: Record<number, boolean>;
  has: (item: Likeable | Likeable[]) => boolean;
  add: (items: Likeable[]) => void;
  remove: (items: Likeable[]) => void;
}

export function createCountableStore(key: 'likes' | 'reposts') {
  const items = getBootstrapData()[key];
  return create<State>()(
    immer((set, get) => ({
      track: items?.track || {},
      album: items?.album || {},
      artist: (items && 'artist' in items && items?.artist) || {},
      has: item => {
        const items = Array.isArray(item) ? item : [item];
        return items.every(item => {
          return get()[item.model_type][item.id];
        });
      },
      add: items => {
        // will only be adding items with the same
        // type in one call, no need to group by type
        const type = items[0].model_type;
        set(state => {
          items.forEach(item => {
            state[type][item.id] = true;
          });
        });
      },
      remove: items => {
        const type = items[0].model_type;
        set(state => {
          items.forEach(item => {
            delete state[type][item.id];
          });
        });
      },
    }))
  );
}
