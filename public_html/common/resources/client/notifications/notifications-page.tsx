import {NotificationList} from './notification-list';
import {useUserNotifications} from './dialog/requests/user-notifications';
import {ProgressCircle} from '../ui/progress/progress-circle';
import {NotificationEmptyStateMessage} from './empty-state/notification-empty-state-message';
import {Trans} from '../i18n/trans';
import {useMarkNotificationsAsRead} from './requests/use-mark-notifications-as-read';
import {useAuth} from '../auth/use-auth';
import {Button} from '../ui/buttons/button';
import {DoneAllIcon} from '../icons/material/DoneAll';
import {StaticPageTitle} from '../seo/static-page-title';
import {Fragment} from 'react';
import {Footer} from '@common/ui/footer/footer';
import {IconButton} from '@common/ui/buttons/icon-button';
import {Link} from 'react-router-dom';
import {SettingsIcon} from '@common/icons/material/Settings';

import {PlayerNavbarLayout} from '@app/web-player/layout/player-navbar-layout';
import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {SidedavFrontend} from '@app/web-player/layout/sidenav-frontend';
import {Sidenav} from '@app/web-player/layout/sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import {useSettings} from '@common/core/settings/use-settings';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

export function NotificationsPage() {
  const {user} = useAuth();
  const {data, isLoading} = useUserNotifications({perPage: 30});
  const hasUnread = !!user?.unread_notifications_count;
  const markAsRead = useMarkNotificationsAsRead();
  const {notif} = useSettings();
  const {player} = useSettings();
  const isMobile = useIsMobileMediaQuery();

  const handleMarkAsRead = () => {
    if (!data) return;
    markAsRead.mutate({
      markAllAsUnread: true,
    });
  };

  const markAsReadButton = (
    <Button
      variant="outline"
      color="primary"
      size="xs"
      startIcon={<DoneAllIcon />}
      onClick={handleMarkAsRead}
      disabled={markAsRead.isPending || isLoading}
      className="ml-auto"
    >
      <Trans message="Mark all as read" />
    </Button>
  );

  return (
    <Fragment>
      <StaticPageTitle>
        <Trans message="Notifications" />
      </StaticPageTitle>
      <DashboardLayout
        name="web-player"
        initialRightSidenavStatus={player?.hide_queue ? 'closed' : 'open'}
      >
        <PlayerNavbarLayout
          size="sm"
          menuPosition="notifications-page"
          className="flex-shrink-0"
        />
        <SidedavFrontend position="left" display="block">
          <Sidenav />
        </SidedavFrontend>
        <DashboardContent>
          <div className="container mx-auto min-h-[1000px] p-16 md:p-24">
            <div className="mb-30 flex items-center gap-24">
              <h1 className="text-3xl">
                <Trans message="Notifications" />
              </h1>
              {hasUnread && markAsReadButton}
              {notif.subs.integrated && (
                <IconButton
                  className="ml-auto text-muted"
                  elementType={Link}
                  to="/notifications/settings"
                  target="_blank"
                >
                  <SettingsIcon />
                </IconButton>
              )}
            </div>
            <PageContent />
          </div>
        </DashboardContent>
      </DashboardLayout>
    </Fragment>
  );
}

function PageContent() {
  const {data, isLoading} = useUserNotifications({perPage: 30});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <ProgressCircle aria-label="Loading notifications..." isIndeterminate />
      </div>
    );
  }
  if (!data?.pagination.data.length) {
    return <NotificationEmptyStateMessage />;
  }
  return (
    <NotificationList
      className="rounded border"
      notifications={data.pagination.data}
    />
  );
}
