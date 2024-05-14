import clsx from 'clsx';
import {CustomMenu} from '@common/menus/custom-menu';
import {LocaleSwitcher} from '@common/i18n/locale-switcher';
import {Button} from '@common/ui/buttons/button';
import {DarkModeIcon} from '@common/icons/material/DarkMode';
import {LightbulbIcon} from '@common/icons/material/Lightbulb';
import {Trans} from '@common/i18n/trans';
import {useThemeSelector} from '@common/ui/themes/theme-selector-context';
import {useSettings} from '@common/core/settings/use-settings';
import {Link} from 'react-router-dom';
import {CookieSettings} from '@app/landing-page/footer/cookie-settings';
import {CookieIcon} from '@common/icons/material/Cookie';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {FooterVersion} from '@app/landing-page/footer/footer-version';
import React, {useState, useEffect} from 'react';

interface Props {
  className?: string;
  padding?: string;
}

export function FooterCopyright({className, padding}: Props) {
  const year = new Date().getFullYear();
  const {branding, version} = useSettings();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 1024 && window.innerWidth <= 1205,
  );

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= 1024);
      setIsTablet(windowWidth > 1024 && windowWidth <= 1205);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const divClass = clsx({
    'mt-20 justify-center items-center text-center': isMobile,
    'mt-0': !isMobile,
  });

  const copyrightClass = clsx({
    'flex flex-col justify-center items-center text-center': isMobile,
    'flex flex-col justify-between': !isMobile,
  });

  const tabletClass = clsx({
    'pb-84 pt-50': isTablet,
    '': !isTablet,
  });

  return (
    <footer
      className={clsx(
        'left-0 right-0 top-0 p-16 text-sm',
        padding ? padding : '',
        tabletClass,
      )}
    >
      <Menus />
      <div className="items-center justify-between gap-10 text-muted md:flex md:text-left">
        <div className={copyrightClass}>
          <div>
            <Link className="px-10 transition-colors hover:text-fg-base" to="/">
              <span className="text-xs">
                <Trans
                  message={`© ${year} | ${branding.site_name} | All Rights Reserved |`}
                />
              </span>
            </Link>
          </div>
          <FooterVersion />
        </div>
        <div className={divClass}>
          <DialogTrigger type="modal">
            <Button variant="text">
              <CookieIcon className="-ml-4 mr-8" />
              <Trans message="Cookies Preference" />
            </Button>
            <CookieSettings />
          </DialogTrigger>
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}

function Menus() {
  const settings = useSettings();
  const primaryMenu = settings.menus.find(
    m => m.positions?.includes('footer-terms'),
  );
  const secondaryMenu = settings.menus.find(
    m => m.positions?.includes('footer-terms-two'),
  );

  if (!primaryMenu && !secondaryMenu) return null;

  return (
    <div className="mb-14 flex items-center justify-between gap-10 overflow-x-auto px-10 pb-14 md:flex">
      {primaryMenu && <CustomMenu menu={primaryMenu} className="text-muted" />}
      {secondaryMenu && (
        <CustomMenu menu={secondaryMenu} className="mb:mt-0 text-muted" />
      )}
    </div>
  );
}

function ThemeSwitcher() {
  const {themes} = useSettings();
  const {selectedTheme, selectTheme} = useThemeSelector();
  if (!selectedTheme || !themes?.user_change) return null;

  return (
    <Button
      variant="text"
      startIcon={selectedTheme.is_dark ? <DarkModeIcon /> : <LightbulbIcon />}
      onClick={() => {
        if (selectedTheme.is_dark) {
          selectTheme('light');
        } else {
          selectTheme('dark');
        }
      }}
    >
      {selectedTheme.is_dark ? (
        <Trans message="Dark mode" />
      ) : (
        <Trans message="Light mode" />
      )}
    </Button>
  );
}
