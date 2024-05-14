import {Track} from '@app/web-player/tracks/track';
import {Album} from '@app/web-player/albums/album';
import {useSettings} from '@common/core/settings/use-settings';
import {useToggleRepost} from '@app/web-player/reposts/use-toggle-repost';
import {useRepostsStore} from '@app/web-player/library/state/reposts-store';
import {Button} from '@common/ui/buttons/button';
import {RepeatIcon} from '@common/icons/material/Repeat';
import clsx from 'clsx';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {ButtonSize} from '@common/ui/buttons/button-size';
import {useAuthClickCapture} from '@app/web-player/use-auth-click-capture';

interface RepostButtonProps {
  item: Track | Album;
  className?: string;
  size?: ButtonSize;
  radius?: string;
  disabled?: boolean;
}
export function RepostButton({
  item,
  className,
  size = 'xs',
  radius,
  disabled,
}: RepostButtonProps) {
  const authHandler = useAuthClickCapture();
  const {player} = useSettings();
  const toggleRepost = useToggleRepost();
  const isReposted = useRepostsStore(s => s.has(item));
  if (!player?.enable_repost) return null;

  return (
    <Button
      className={className}
      variant="outline"
      size={size}
      radius={radius}
      startIcon={<RepeatIcon className={clsx(isReposted && 'text-primary')} />}
      disabled={disabled || toggleRepost.isPending}
      onClickCapture={authHandler}
      onClick={() => toggleRepost.mutate({repostable: item})}
    >
      {isReposted ? <Trans message="Reposted" /> : <Trans message="Repost" />}
    </Button>
  );
}
