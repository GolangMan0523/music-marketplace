import {Link, LinkProps} from 'react-router-dom';
import clsx from 'clsx';
import React, {useMemo} from 'react';
import {slugifyString} from '@common/utils/string/slugify-string';
import {User} from '@common/auth/user';

interface UserProfileLinkProps extends Omit<LinkProps, 'to'> {
  user: User;
  className?: string;
}
export function UserProfileLink({
  user,
  className,
  ...linkProps
}: UserProfileLinkProps) {
  const finalUri = useMemo(() => {
    return getUserProfileLink(user);
  }, [user]);

  return (
    <Link
      {...linkProps}
      className={clsx('hover:underline', className)}
      to={finalUri}
    >
      {user.display_name}
    </Link>
  );
}

export function getUserProfileLink(user: User): string {
  return `/user/${user.id}/${slugifyString(user.display_name)}`;
}
