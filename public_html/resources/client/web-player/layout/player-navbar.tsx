import {useSettings} from '@common/core/settings/use-settings';
import {useAuth} from '@common/auth/use-auth';
import React, {Fragment, useMemo, useContext} from 'react';
import {Button} from '@common/ui/buttons/button';
import {Link} from 'react-router-dom';
import {Trans} from '@common/i18n/trans';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {usePrimaryArtistForCurrentUser} from '@app/web-player/backstage/use-primary-artist-for-current-user';
import {MenuItem} from '@common/ui/navigation/menu/menu-trigger';
import {MicIcon} from '@common/icons/material/Mic';
import {getArtistLink} from '@app/web-player/artists/artist-link';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import clsx from 'clsx';
import {IconButton} from '@common/ui/buttons/icon-button';

import {DashboardLayoutContext} from '@common/ui/layout/dashboard-layout-context';
import {setInLocalStorage as _setInLocalStorage} from '@common/utils/hooks/local-storage';
import {MenuOpenIcon} from '@common/icons/material/MenuOpen';
import {ReactElement, ReactNode} from 'react';
import {ButtonColor} from '@common/ui/buttons/get-shared-button-style';
import {
  NavbarAuthUser,
  NavbarAuthUserProps,
} from '@common/ui/navigation/navbar/navbar-auth-user';

type NavbarColor = 'primary' | 'bg' | 'bg-alt' | 'transparent' | string;

interface Props {
  className?: string;
}
export interface PlayerNavbarProps {
  hideLogo?: boolean | null;
  toggleButton?: ReactElement;
  children?: ReactNode;
  className?: string;
  color?: NavbarColor;
  darkModeColor?: NavbarColor;
  logoColor?: 'dark' | 'light';
  textColor?: string;
  primaryButtonColor?: ButtonColor;
  border?: string;
  size?: 'xs' | 'sm' | 'md';
  rightChildren?: ReactNode;
  menuPosition?: string;
  authMenuItems?: NavbarAuthUserProps['items'];
  alwaysDarkMode?: boolean;
}

interface DashboardNavbarProps extends PlayerNavbarProps {
  hideToggleButton?: boolean;
}

export function PlayerNavbar({
  children,
  className,
  hideToggleButton,
  ...props
}: DashboardNavbarProps) {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    name,
    leftSidenavCanBeCompact,
  } = useContext(DashboardLayoutContext);

  const shouldToggleCompactMode = leftSidenavCanBeCompact && !isMobileMode;
  const shouldShowToggle =
    !hideToggleButton && (isMobileMode || leftSidenavCanBeCompact);

  const handleToggle = () => {
    setLeftSidenavStatus(leftSidenavStatus === 'open' ? 'closed' : 'open');
  };

  const handleCompactModeToggle = () => {
    const newStatus = leftSidenavStatus === 'compact' ? 'open' : 'compact';
    _setInLocalStorage(`${name}.sidenav.compact`, newStatus === 'compact');
    setLeftSidenavStatus(newStatus);
  };

  const navigate = useNavigate();
  const primaryArtist = usePrimaryArtistForCurrentUser();
  const {player} = useSettings();
  const menuItems = useMemo(() => {
    if (primaryArtist) {
      return [
        <MenuItem
          value="author"
          key="author"
          startIcon={<MicIcon />}
          onSelected={() => {
            navigate(getArtistLink(primaryArtist));
          }}
        >
          <Trans message="Artist profile" />
        </MenuItem>,
      ];
    }
    if (player?.show_become_artist_btn) {
      return [
        <MenuItem
          value="author"
          key="author"
          startIcon={<MicIcon />}
          onSelected={() => {
            navigate('/backstage/requests');
          }}
        >
          <Trans message="Become an author" />
        </MenuItem>,
      ];
    }

    return [];
  }, [primaryArtist, navigate, player?.show_become_artist_btn]);

  return (
    <Navbar
      className={clsx('dashboard-grid-navbar', className)}
      border="border-b"
      size="sm"
      toggleButton={
        shouldShowToggle ? (
          <IconButton
            size="md"
            onClick={() => {
              if (shouldToggleCompactMode) {
                handleCompactModeToggle();
              } else {
                handleToggle();
              }
            }}
          >
            <MenuOpenIcon />
          </IconButton>
        ) : undefined
      }
      {...props}
    >
      {children}
      <ActionButtons />
    </Navbar>
  );
}

function ActionButtons() {
  const {player, billing} = useSettings();
  const {isLoggedIn, hasPermission, isSubscribed} = useAuth();

  const showUploadButton =
    player?.show_upload_btn && isLoggedIn && hasPermission('music.create');
  const showTryProButton =
    billing?.enable && hasPermission('plans.view') && !isSubscribed;

  return (
    <Fragment>
      {showTryProButton ? (
        <Button
          variant="outline"
          size="xs"
          color="primary"
          elementType={Link}
          to="/pricing"
        >
          <Trans message="Try Pro" />
        </Button>
      ) : null}
      {showUploadButton ? (
        <Button
          variant={showTryProButton ? 'text' : 'outline'}
          size="xs"
          color={showTryProButton ? undefined : 'primary'}
          elementType={Link}
          to="/backstage/upload"
        >
          <Trans message="Upload" />
        </Button>
      ) : null}
    </Fragment>
  );
}
