import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Likeable} from '@app/web-player/library/likeable';
import {userLibrary} from '@app/web-player/library/state/likes-store';

interface Response extends BackendResponse {}

interface Payload {
  likeables: Likeable[];
}

export function useRemoveItemsFromLibrary() {
  return useMutation({
    mutationFn: (payload: Payload) => addToLibrary(payload),
    onSuccess: (response, payload) => {
      toast(getMessage(payload.likeables[0]));
      userLibrary().remove(payload.likeables);
      // tracks/albums/artists
      queryClient.invalidateQueries({
        queryKey: [`${payload.likeables[0].model_type}s`, 'library'],
      });
    },
    onError: r => showHttpErrorToast(r),
  });
}

function addToLibrary(payload: Payload): Promise<Response> {
  const likeables = payload.likeables
    .filter(likeable => {
      return userLibrary().has(likeable);
    })
    .map(likeable => {
      return {
        likeable_id: likeable.id,
        likeable_type: likeable.model_type,
      };
    });
  return apiClient
    .post('users/me/remove-from-library', {likeables})
    .then(r => r.data);
}

function getMessage(likeable: Likeable) {
  switch (likeable.model_type) {
    case 'artist':
      return message('Removed from your artists');
    case 'album':
      return message('Removed from your albums');
    case 'track':
      return message('Removed from your liked songs');
  }
}
