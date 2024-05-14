import {User} from '@common/auth/user';
import {UserImage} from '@app/web-player/users/user-image';
import {UserProfileLink} from '@app/web-player/users/user-profile-link';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {FollowButton} from '@common/users/follow-button';

interface Props {
  follower: User;
}
export function FollowerListItem({follower}: Props) {
  return (
    <div
      key={follower.id}
      className="mb-16 flex items-center gap-16 border-b pb-16"
    >
      <UserImage user={follower} className="h-64 w-64 rounded" />
      <div className="text-sm">
        <UserProfileLink user={follower} />
        {follower.followers_count && follower.followers_count > 0 ? (
          <div className="text-xs text-muted">
            <Trans
              message="[one 1 followers|other :count followers]"
              values={{count: follower.followers_count}}
            />
          </div>
        ) : null}
      </div>
      <FollowButton
        user={follower}
        variant="outline"
        radius="rounded-full"
        className="ml-auto flex-shrink-0"
      />
    </div>
  );
}
