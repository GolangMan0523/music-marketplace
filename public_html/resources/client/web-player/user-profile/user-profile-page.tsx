import {useUserProfile} from '@app/web-player/user-profile/requests/use-user-profile';
import {User} from '@common/auth/user';
import {PageStatus} from '@common/http/page-status';
import React, {Fragment, useCallback} from 'react';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {Trans} from '@common/i18n/trans';
import {TabPanel, TabPanels} from '@common/ui/tabs/tab-panels';
import {Link, useParams} from 'react-router-dom';
import {useSettings} from '@common/core/settings/use-settings';
import {ProfileRepostsPanel} from '@app/web-player/user-profile/panels/profile-reposts-panel';
import {ProfileTracksPanel} from '@app/web-player/user-profile/panels/profile-tracks-panel';
import {ProfilePlaylistsPanel} from '@app/web-player/user-profile/panels/profile-playlists-panel';
import {ProfileAlbumsPanel} from '@app/web-player/user-profile/panels/profile-albums-panel';
import {ProfileArtistsPanel} from '@app/web-player/user-profile/panels/profile-artists-panel';
import {ProfileFollowersPanel} from '@app/web-player/user-profile/panels/profile-followers-panel';
import {ProfileFollowedUsersPanel} from '@app/web-player/user-profile/panels/profile-followed-users-panel';
import {ProfileHeader} from '@app/web-player/user-profile/header/profile-header';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

const profileTabs = [
  'tracks',
  'playlists',
  'reposts',
  'albums',
  'artists',
  'followers',
  'following',
];

if (!getBootstrapData().settings.player?.enable_repost) {
  profileTabs.splice(2, 1);
}

export function UserProfilePage() {
  const query = useUserProfile({loader: 'userProfilePage'});

  if (query.data) {
    return <PageContent user={query.data.user} />;
  }

  return (
    <PageStatus
      query={query}
      loaderIsScreen={false}
      loaderClassName="absolute inset-0 m-auto"
    />
  );
}

export interface ProfileContentProps {
  user: User;
}
function PageContent({user}: ProfileContentProps) {
  const {player} = useSettings();
  const {tabName = 'tracks'} = useParams();

  const selectedTab = profileTabs.indexOf(tabName) || 0;

  const tabLink = useCallback(
    (tabName: string) => {
      return `/user/${user.id}/${user.display_name}/${tabName}`;
    },
    [user],
  );

  return (
    <Fragment>
      <ProfileHeader user={user} tabLink={tabLink} />
      <Tabs className="mt-48" isLazy selectedTab={selectedTab}>
        <TabList>
          <Tab elementType={Link} to={tabLink('tracks')}>
            <Trans message="Liked tracks" />
          </Tab>
          <Tab elementType={Link} to={tabLink('playlists')}>
            <Trans message="Public playlists" />
          </Tab>
          {player?.enable_repost && (
            <Tab elementType={Link} to={tabLink('reposts')}>
              <Trans message="Reposts" />
            </Tab>
          )}
          <Tab elementType={Link} to={tabLink('albums')}>
            <Trans message="Liked albums" />
          </Tab>
          <Tab elementType={Link} to={tabLink('artists')}>
            <Trans message="Liked artists" />
          </Tab>
          <Tab elementType={Link} to={tabLink('followers')}>
            <Trans message="Followers" />
          </Tab>
          <Tab elementType={Link} to={tabLink('following')}>
            <Trans message="Following" />
          </Tab>
        </TabList>
        <TabPanels className="mt-24">
          <TabPanel>
            <ProfileTracksPanel user={user} />
          </TabPanel>
          <TabPanel>
            <ProfilePlaylistsPanel user={user} />
          </TabPanel>
          {player?.enable_repost && (
            <TabPanel>
              <ProfileRepostsPanel user={user} />
            </TabPanel>
          )}
          <TabPanel>
            <ProfileAlbumsPanel user={user} />
          </TabPanel>
          <TabPanel>
            <ProfileArtistsPanel user={user} />
          </TabPanel>
          <TabPanel>
            <ProfileFollowersPanel user={user} />
          </TabPanel>
          <TabPanel>
            <ProfileFollowedUsersPanel user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Fragment>
  );
}
