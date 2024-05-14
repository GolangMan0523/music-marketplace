import {useSettings} from '@common/core/settings/use-settings';
import {useAuth} from '@common/auth/use-auth';

export function useCommentPermissions() {
  const {player} = useSettings();
  const {hasPermission} = useAuth();
  const canView = player?.track_comments && hasPermission('comments.view');
  return {canView, canCreate: canView && hasPermission('comments.create')};
}
