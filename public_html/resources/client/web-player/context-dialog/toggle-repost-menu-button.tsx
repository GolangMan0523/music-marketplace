import {ContextMenuButton} from '@app/web-player/context-dialog/context-dialog-layout';
import {Trans} from '@common/i18n/trans';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Track} from '@app/web-player/tracks/track';
import {Album} from '@app/web-player/albums/album';
import {useSettings} from '@common/core/settings/use-settings';
import {useToggleRepost} from '@app/web-player/reposts/use-toggle-repost';
import {useRepostsStore} from '@app/web-player/library/state/reposts-store';
import {useAuthClickCapture} from '@app/web-player/use-auth-click-capture';

interface Props {
  item: Track | Album;
}
export function ToggleRepostMenuButton({item}: Props) {
  const authHandler = useAuthClickCapture();
  const {close: closeMenu} = useDialogContext();
  const {player} = useSettings();
  const toggleRepost = useToggleRepost();
  const isReposted = useRepostsStore(s => s.has(item));
  if (!player?.enable_repost) return null;

  return (
    <ContextMenuButton
      onClickCapture={authHandler}
      onClick={() => {
        closeMenu();
        toggleRepost.mutate({repostable: item});
      }}
    >
      {isReposted ? <Trans message="Reposted" /> : <Trans message="Repost" />}
    </ContextMenuButton>
  );
}
