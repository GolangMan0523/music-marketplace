import {ContextMenuButton} from '@app/web-player/context-dialog/context-dialog-layout';
import {Trans} from '@common/i18n/trans';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useAddItemsToLibrary} from '@app/web-player/library/requests/use-add-items-to-library';
import {useRemoveItemsFromLibrary} from '@app/web-player/library/requests/use-remove-items-from-library';
import {useLibraryStore} from '@app/web-player/library/state/likes-store';
import {Likeable} from '@app/web-player/library/likeable';
import {useAuthClickCapture} from '@app/web-player/use-auth-click-capture';

interface ToggleInLibraryMenuButtonProps {
  items: Likeable[];
  modelType?: 'track' | 'album' | 'artist';
}
export function ToggleInLibraryMenuButton({
  items,
  modelType,
}: ToggleInLibraryMenuButtonProps) {
  const authHandler = useAuthClickCapture();
  const {close: closeMenu} = useDialogContext();
  const addToLibrary = useAddItemsToLibrary();
  const removeFromLibrary = useRemoveItemsFromLibrary();
  const allInLibrary = useLibraryStore(s => s.has(items));

  if (allInLibrary) {
    const label =
      modelType === 'artist' ? (
        <Trans message="Following" />
      ) : (
        <Trans message="Remove from your music" />
      );
    return (
      <ContextMenuButton
        onClickCapture={authHandler}
        onClick={() => {
          closeMenu();
          removeFromLibrary.mutate({likeables: items});
        }}
      >
        {label}
      </ContextMenuButton>
    );
  }

  const label =
    modelType === 'artist' ? (
      <Trans message="Follow" />
    ) : (
      <Trans message="Add to your music" />
    );
  return (
    <ContextMenuButton
      onClickCapture={authHandler}
      onClick={() => {
        closeMenu();
        addToLibrary.mutate({likeables: items});
      }}
    >
      {label}
    </ContextMenuButton>
  );
}
