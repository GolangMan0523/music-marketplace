import {useAddItemsToLibrary} from '@app/web-player/library/requests/use-add-items-to-library';
import {useRemoveItemsFromLibrary} from '@app/web-player/library/requests/use-remove-items-from-library';
import {useLibraryStore} from '@app/web-player/library/state/likes-store';
import {Likeable} from '@app/web-player/library/likeable';
import {FavoriteIcon} from '@common/icons/material/Favorite';
import {FavoriteBorderIcon} from '@common/icons/material/FavoriteBorder';
import {Button, ButtonProps} from '@common/ui/buttons/button';
import {message} from '@common/i18n/message';
import {Trans} from '@common/i18n/trans';
import {useAuthClickCapture} from '@app/web-player/use-auth-click-capture';

interface LikeButtonProps extends Omit<ButtonProps, 'children' | 'onClick'> {
  likeable: Likeable;
}
export function LikeButton({
  likeable,
  radius = 'rounded-full',
  disabled,
  ...buttonProps
}: LikeButtonProps) {
  const authHandler = useAuthClickCapture();
  const addToLibrary = useAddItemsToLibrary();
  const removeFromLibrary = useRemoveItemsFromLibrary();
  const isLiked = useLibraryStore(s => s.has(likeable));
  const isLoading = addToLibrary.isPending || removeFromLibrary.isPending;

  const labels = getLabels(likeable);

  if (isLiked) {
    return (
      <Button
        {...buttonProps}
        variant="outline"
        radius={radius}
        startIcon={<FavoriteIcon className="text-primary" />}
        disabled={disabled || isLoading}
        onClickCapture={authHandler}
        onClick={() => {
          removeFromLibrary.mutate({likeables: [likeable]});
        }}
      >
        <Trans {...labels.removeLike} />
      </Button>
    );
  }
  return (
    <Button
      {...buttonProps}
      variant="outline"
      radius={radius}
      startIcon={<FavoriteBorderIcon />}
      disabled={disabled || isLoading}
      onClickCapture={authHandler}
      onClick={() => {
        addToLibrary.mutate({likeables: [likeable]});
      }}
    >
      <Trans {...labels.like} />
    </Button>
  );
}

function getLabels(likeable: Likeable) {
  switch (likeable.model_type) {
    case 'artist':
      return {like: message('Follow'), removeLike: message('Following')};
    default:
      return {like: message('Like'), removeLike: message('Liked')};
  }
}
