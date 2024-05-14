import {useForm} from 'react-hook-form';
import {
  CreateTrackPayload,
  CreateTrackResponse,
  useCreateTrack,
} from '@app/admin/tracks-datatable-page/requests/use-create-track';

interface Props {
  onTrackCreated?: (response: CreateTrackResponse) => void;
  defaultValues?: Partial<CreateTrackPayload>;
}

export function useCreateTrackForm({
  onTrackCreated,
  defaultValues,
}: Props = {}) {
  const form = useForm<CreateTrackPayload>({
    defaultValues,
  });
  const createTrack = useCreateTrack(form, {onSuccess: onTrackCreated});
  return {form, createTrack};
}
