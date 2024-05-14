import {useForm} from 'react-hook-form';
import {
  UpdateTrackPayload,
  UpdateTrackResponse,
  useUpdateTrack,
} from '@app/admin/tracks-datatable-page/requests/use-update-track';
import {Track} from '@app/web-player/tracks/track';
import {CreateTrackPayload} from '@app/admin/tracks-datatable-page/requests/use-create-track';

interface Options {
  onTrackUpdated?: (response: UpdateTrackResponse) => void;
}

export function useUpdateTrackForm(
  track: UpdateTrackPayload | CreateTrackPayload | Omit<Track, 'lyric'>,
  options: Options = {}
) {
  const form = useForm<UpdateTrackPayload>({
    defaultValues: {
      ...track,
      image: track.image || (track as Track).album?.image,
    },
  });
  const updateTrack = useUpdateTrack(form, {onSuccess: options.onTrackUpdated});
  return {form, updateTrack};
}
