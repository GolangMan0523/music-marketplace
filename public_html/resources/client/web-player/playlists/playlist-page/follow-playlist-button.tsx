import {FavoriteIcon} from '@common/icons/material/Favorite';
import {FavoriteBorderIcon} from '@common/icons/material/FavoriteBorder';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {Playlist} from '@app/web-player/playlists/playlist';
import {useFollowPlaylist} from '@app/web-player/playlists/requests/use-follow-playlist';
import {useUnfollowPlaylist} from '@app/web-player/playlists/requests/use-unfollow-playlist';
import {useIsFollowingPlaylist} from '@app/web-player/playlists/hooks/use-is-following-playlist';
import {usePlaylistPermissions} from '@app/web-player/playlists/hooks/use-playlist-permissions';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ButtonSize} from '@common/ui/buttons/button-size';

interface FollowPlaylistButtonProps {
  buttonType: 'icon' | 'text';
  className?: string;
  size?: ButtonSize;
  playlist: Playlist;
  radius?: string;
}
export function FollowPlaylistButton({
  playlist,
  size = 'sm',
  className,
  buttonType = 'text',
  radius,
}: FollowPlaylistButtonProps) {
  const {isCreator} = usePlaylistPermissions(playlist);
  const follow = useFollowPlaylist(playlist);
  const unfollow = useUnfollowPlaylist(playlist);
  const isFollowing = useIsFollowingPlaylist(playlist.id);
  const isLoading = follow.isPending || unfollow.isPending;

  if (isCreator) {
    return null;
  }

  if (buttonType === 'icon') {
    if (isFollowing) {
      return (
        <IconButton
          size={size}
          radius={radius}
          color="primary"
          className={className}
          disabled={isLoading}
          onClick={() => unfollow.mutate()}
        >
          <FavoriteIcon />
        </IconButton>
      );
    }
    return (
      <IconButton
        size={size}
        radius={radius}
        disabled={isLoading}
        className={className}
        onClick={() => follow.mutate()}
      >
        <FavoriteBorderIcon />
      </IconButton>
    );
  }

  if (isFollowing) {
    return (
      <Button
        size={size}
        variant="outline"
        radius={radius || 'rounded-full'}
        startIcon={<FavoriteIcon className="text-primary" />}
        disabled={isLoading}
        className={className}
        onClick={() => unfollow.mutate()}
      >
        <Trans message="Following" />
      </Button>
    );
  }
  return (
    <Button
      size={size}
      variant="outline"
      radius={radius || 'rounded-full'}
      startIcon={<FavoriteBorderIcon />}
      disabled={isLoading}
      className={className}
      onClick={() => follow.mutate()}
    >
      <Trans message="Follow" />
    </Button>
  );
}
