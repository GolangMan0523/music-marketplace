import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Playlist} from '@app/web-player/playlists/playlist';
import {UseFormReturn} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {onFormQueryError} from '@common/errors/on-form-query-error';

interface Response extends BackendResponse {
  playlist: Playlist;
}

export interface CreatePlaylistPayload {
  name: string;
  public: boolean;
  collaborative: boolean;
  image: string;
  description: string;
}

export function useCreatePlaylist(form: UseFormReturn<CreatePlaylistPayload>) {
  return useMutation({
    mutationFn: (props: CreatePlaylistPayload) => createPlaylist(props),
    onSuccess: () => {
      toast(message('Playlist created'));
      queryClient.invalidateQueries({queryKey: ['playlists']});
    },
    onError: r => onFormQueryError(r, form),
  });
}

function createPlaylist(payload: CreatePlaylistPayload): Promise<Response> {
  return apiClient.post('playlists', payload).then(r => r.data);
}
