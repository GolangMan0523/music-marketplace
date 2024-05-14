import {UserProfile} from '@app/web-player/user-profile/user-profile';
import {UserLink} from '@app/web-player/user-profile/user-link';
import {ProfileLinks} from '@app/web-player/user-profile/profile-links';
import {useLinkifiedString} from '@common/utils/hooks/use-linkified-string';

interface Props {
  profile?: UserProfile;
  links?: UserLink[];
  shortDescription?: boolean;
}
export function ProfileDescription({profile, links, shortDescription}: Props) {
  const description = useLinkifiedString(profile?.description) || '';
  if (!profile) return null;
  return (
    <div className="min-w-0 text-sm">
      {profile.description && (
        <div
          className="text-secondary max-w-720 rounded bg-alt/80 p-10 dark:bg"
          dangerouslySetInnerHTML={{
            __html: shortDescription ? description?.slice(0, 300) : description,
          }}
        />
      )}
      {profile.city || profile.country || links?.length ? (
        <div className="mt-20 flex items-center justify-between gap-24">
          {(profile.city || profile.country) && (
            <div className="text-secondary rounded bg-alt/80 p-10 dark:bg md:w-max">
              {profile.city}
              {profile.city && ','} {profile.country}
            </div>
          )}
          <ProfileLinks links={links} />
        </div>
      ) : null}
    </div>
  );
}
