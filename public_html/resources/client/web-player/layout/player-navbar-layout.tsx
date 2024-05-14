import {
  PlayerNavbar,
  PlayerNavbarProps,
} from '@app/web-player/layout/player-navbar';
import {IconButton} from '@common/ui/buttons/icon-button';
import React, {Fragment, useContext, useMemo} from 'react';
import clsx from 'clsx';
import {DashboardLayoutContext} from '@common/ui/layout/dashboard-layout-context';
import {setInLocalStorage} from '@common/utils/hooks/local-storage';
import {MenuOpenIcon} from '@common/icons/material/MenuOpen';
import {SearchAutocomplete} from '@app/web-player/search/search-autocomplete';

export interface PlayerNavbarLayoutProps
  extends Omit<PlayerNavbarProps, 'toggleButton'> {
  hideToggleButton?: boolean;
  style?: React.CSSProperties;
}

export function PlayerNavbarLayout({
  children,
  className,
  hideToggleButton,
  ...props
}: PlayerNavbarLayoutProps) {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    name,
    leftSidenavCanBeCompact,
  } = useContext(DashboardLayoutContext);

  const shouldToggleCompactMode = leftSidenavCanBeCompact && !isMobileMode;
  const shouldShowToggle = !hideToggleButton;
  // const shouldShowToggle = !hideToggleButton && (isMobileMode || leftSidenavCanBeCompact);

  const handleToggle = () => {
    setLeftSidenavStatus(leftSidenavStatus === 'closed' ? 'open' : 'closed');
  };

  const handleCompactModeToggle = () => {
    const newStatus = leftSidenavStatus === 'compact' ? 'open' : 'compact';
    setInLocalStorage(`${name}.sidenav.compact`, newStatus === 'compact');
    setLeftSidenavStatus(newStatus);
  };

  return (
    <Fragment>
      <PlayerNavbar
        className={clsx('dashboard-grid-navbar w-full', className)}
        border="border-b"
        size="sm"
        menuPosition="landing-page-navbar"
        style={{position: 'relative'}}
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
        <SearchAutocomplete />
        {children}
      </PlayerNavbar>
    </Fragment>
  );
}
