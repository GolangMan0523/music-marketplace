import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {User} from '@common/auth/user';
import clsx from 'clsx';
import {Trans} from '@common/i18n/trans';
import {StarIcon} from '@common/icons/material/Star';
import userDefaultImage from './user-default.svg';

interface UserImageProps {
  user: User;
  className?: string;
  size?: string;
  showProBadge?: boolean;
}
export function UserImage({
  user,
  className,
  size,
  showProBadge,
}: UserImageProps) {
  const {trans} = useTrans();
  const showBadge = showProBadge && user.subscriptions?.find(s => s.valid);
  return (
    <div
      className={clsx(
        'relative flex-shrink-0 isolate overflow-hidden',
        size,
        className
      )}
    >
      <img
        className="object-cover bg-fg-base/4 w-full h-full"
        draggable={false}
        src={getUserImage(user)}
        alt={trans(
          message('Avatar for :name', {values: {name: user.display_name}})
        )}
      />
      {showBadge && (
        <div
          className="absolute bottom-12 text-sm left-0 right-0 w-max max-w-full mx-auto flex items-center gap-6 bg-black/60 text-white rounded-full py-4 px-8"
          color="positive"
        >
          <div className="bg-primary rounded-full p-1">
            <StarIcon className="text-white" size="sm" />
          </div>
          <Trans message="PRO user" />
        </div>
      )}
    </div>
  );
}

export function getUserImage(user: User): string {
  return user.avatar || userDefaultImage;
}
