import {Link} from 'react-router-dom';
import {getUserProfileLink} from '@app/web-player/users/user-profile-link';
import {UserImage} from '@app/web-player/users/user-image';
import {User} from '@common/auth/user';
import {Trans} from '@common/i18n/trans';

interface UserGridItemProps {
  user: User;
}
export function UserGridItem({user}: UserGridItemProps) {
  return (
    <div>
      <Link to={getUserProfileLink(user)}>
        <UserImage
          user={user}
          className="shadow-md w-full aspect-square rounded"
        />
      </Link>
      <div className="text-sm mt-12">
        <div className="overflow-hidden overflow-ellipsis">
          <Link to={getUserProfileLink(user)}>{user.display_name}</Link>
        </div>
        {user.followers_count ? (
          <div className="text-muted mt-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
            <Trans
              message=":count followers"
              values={{count: user.followers_count}}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
