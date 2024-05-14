import {useAddItemsToLibrary} from '@app/web-player/library/requests/use-add-items-to-library';
import {useRemoveItemsFromLibrary} from '@app/web-player/library/requests/use-remove-items-from-library';
import {useLibraryStore} from '@app/web-player/library/state/likes-store';
import {Likeable} from '@app/web-player/library/likeable';
import {IconButton, IconButtonProps} from '@common/ui/buttons/icon-button';
import {FavoriteIcon} from '@common/icons/material/Favorite';
import {FavoriteBorderIcon} from '@common/icons/material/FavoriteBorder';
import {useAuthClickCapture} from '@app/web-player/use-auth-click-capture';

interface LikeIconButtonProps
  extends Omit<IconButtonProps, 'children' | 'disabled' | 'onClick'> {
  likeable: Likeable;
}
export function LikeIconButton({
  likeable,
  size = 'sm',
  ...buttonProps
}: LikeIconButtonProps) {
  const authHandler = useAuthClickCapture();
  const addToLibrary = useAddItemsToLibrary();
  const removeFromLibrary = useRemoveItemsFromLibrary();
  const isLiked = useLibraryStore(s => s.has(likeable));
  const isLoading = addToLibrary.isPending || removeFromLibrary.isPending;

  if (isLiked) {
    return (
      <IconButton
        {...buttonProps}
        size={size}
        color="primary"
        disabled={isLoading}
        onClickCapture={authHandler}
        onClick={e => {
          e.stopPropagation();
          removeFromLibrary.mutate({likeables: [likeable]});
        }}
      >
        <FavoriteIcon />
      </IconButton>
    );
  }
  return (
    <IconButton
      {...buttonProps}
      size={size}
      disabled={isLoading}
      onClickCapture={authHandler}
      onClick={e => {
        e.stopPropagation();
        addToLibrary.mutate({likeables: [likeable]});
      }}
    >
      <FavoriteBorderIcon />
    </IconButton>
  );
}
