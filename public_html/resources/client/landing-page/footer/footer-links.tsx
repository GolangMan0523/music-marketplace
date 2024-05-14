import React, {useState, useEffect} from 'react';
import {CustomMenu} from '@common/menus/custom-menu';
import {useSettings} from '@common/core/settings/use-settings';
import {FooterLinksDesktop} from '@app/landing-page/footer/footer-links-desktop';
import {FooterLinksMobile} from '@app/landing-page/footer/footer-links-mobile';

interface Props {
  className?: string;
  padding?: string;
  menuPosition?: string;
}

function Menus({
  menuPosition,
  className,
}: {
  menuPosition: string;
  className?: string;
}) {
  const settings = useSettings();
  const menu = settings.menus.find(m => m.positions?.includes(menuPosition));

  if (!menu) return null;

  return (
    <CustomMenu
      menu={menu}
      className={className || 'transition-colors hover:text-fg-base'}
    />
  );
}

export function FooterLinks({className, padding}: Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1205);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1205);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer>{isMobile ? <FooterLinksMobile /> : <FooterLinksDesktop />}</footer>
  );
}

export default FooterLinks;
