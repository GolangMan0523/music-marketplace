import React, {useContext, useState} from 'react';
import {IconButton} from '@common/ui/buttons/icon-button';
import {DashboardLayoutContext} from '@common/ui/layout/dashboard-layout-context';
import {setInLocalStorage} from '@common/utils/hooks/local-storage';
import {MenuOpenIcon} from '@common/icons/material/MenuOpen';

export function ToggleMenuButton() {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    name,
    leftSidenavCanBeCompact,
  } = useContext(DashboardLayoutContext);

  const [isMenuOpen, setIsMenuOpen] = useState(leftSidenavStatus === 'open');

  const shouldToggleCompactMode = leftSidenavCanBeCompact && !isMobileMode;
  const shouldShowToggle = leftSidenavCanBeCompact || isMobileMode;

  const handleToggle = () => {
    const newStatus = isMenuOpen ? 'closed' : 'open';
    setLeftSidenavStatus(newStatus);
    setIsMenuOpen(newStatus === 'open');
  };

  const handleCompactModeToggle = () => {
    const newStatus = isMenuOpen ? 'compact' : 'open';
    setInLocalStorage(`${name}.sidenav.compact`, newStatus === 'compact');
    setLeftSidenavStatus(newStatus);
    setIsMenuOpen(newStatus === 'open');
  };

  return shouldShowToggle ? (
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
  ) : null;
}