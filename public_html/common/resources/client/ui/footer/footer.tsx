import clsx from 'clsx';
import {CustomMenu} from '../../menus/custom-menu';
import {Button} from '../buttons/button';
import {DarkModeIcon} from '../../icons/material/DarkMode';
import {LightbulbIcon} from '../../icons/material/Lightbulb';
import {Trans} from '../../i18n/trans';
import {useThemeSelector} from '../themes/theme-selector-context';
import {useSettings} from '../../core/settings/use-settings';

import {FooterCopyright} from '@app/landing-page/footer/footer-copyright';
import {FooterLinks} from '@app/landing-page/footer/footer-links';

interface Props {
  className?: string;
  padding?: string;
}

export function Footer({className, padding}: Props) {
  const year = new Date().getFullYear();
  const {branding} = useSettings();
  return (
    <footer
      className={clsx(
        'text-sm',
        padding ? padding : 'pt-54',
        className,
      )}
    >
      <Menus />
      <div className="ml-60 mr-60">
        <FooterLinks />
        <FooterCopyright />
      </div>
    </footer>
  );
}

function Menus() {
  const settings = useSettings();
  const primaryMenu = settings.menus.find(m => m.positions?.includes('footer'));
  const secondaryMenu = settings.menus.find(m =>
    m.positions?.includes('footer-secondary'),
  );

  if (!primaryMenu && !secondaryMenu) return null;

  return (
    <div className="mb-14 items-center justify-between gap-10 overflow-x-auto border-b pb-14 md:flex">
      {primaryMenu && (
        <CustomMenu menu={primaryMenu} className="text-primary" />
      )}
      {secondaryMenu && (
        <CustomMenu menu={secondaryMenu} className="mb:mt-0 mt-14 text-muted" />
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
        <Trans message="Light mode" />
      ) : (
        <Trans message="Dark mode" />
      )}
    </Button>
  );
}
