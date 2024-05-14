import React from 'react';
import clsx from 'clsx';
import {CustomMenu} from '@common/menus/custom-menu';
import {useSettings} from '@common/core/settings/use-settings';
import {Trans} from '@common/i18n/trans';
import {FooterLogoDesktop} from '@app/landing-page/footer/footer-logo-desktop';
import {MailIcon} from '@common/icons/material/Mail';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Button} from '@common/ui/buttons/button';
import {NewsletterSettings} from '@app/landing-page/footer/newsletter-settings';
import {PwaButton} from '@app/landing-page/footer/pwa-button';
import {GooglePlayButton} from '@app/landing-page/footer/google-play-button';
import {AppleStoreButton} from '@app/landing-page/footer/apple-store-button';

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

export function FooterLinksDesktop({className, padding}: Props) {
  const {branding, version} = useSettings();

  return (
    <footer
      className={clsx(
        'border-b border-t p-16 text-sm',
        padding ? padding : 'pb-50 pt-50',
        className,
      )}
    >
      <div className="mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Logo Section */}
          <div className="col-span-1 mb-6 md:col-span-1">
            <div className="col-span-1 mb-6 border-b pb-20 md:col-span-1">
              <div className="col-span-1 mb-6 px-10 pb-20 md:col-span-1">
                <FooterLogoDesktop />
              </div>
              <div className="mt-20 px-10 pb-20 text-muted">
                <h3>
                  <Trans message={`${branding.site_name} | ${branding.site_description}`} />
                </h3>
              </div>
              <DialogTrigger type="modal">
                <Button variant="text">
                  <MailIcon className="-ml-4 mr-8" />
                  <Trans message="Subscribe to our Newsletter" />
                </Button>
                <NewsletterSettings />
              </DialogTrigger>
            </div>

            {/* App Download Section */}
            <div className="col-span-1 mb-6 md:col-span-1">
              <div className="mt-20 px-10 pb-20 text-muted">
                <h3>
                  <Trans message="Listen Anytime, Anywhere. From Any Device." />
                </h3>
              </div>
              <div className="flex gap-10 px-10">
                <div className="flex-1">
                  <PwaButton
                    link="https://example.com"
                    altText="Download Pwa App"
                  />
                </div>
                <div className="flex-1">
                  <GooglePlayButton
                    link="https://example.com"
                    altText="Download Android App"
                  />
                </div>
                <div className="flex-1">
                  <AppleStoreButton
                    link="https://example.com"
                    altText="Download Ios App"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="col-span-1 mb-6 md:col-span-1">
            <h6 className="mb-4 pb-20 font-bold uppercase">
              <Trans message={`${branding.site_name}`} />
            </h6>
            <Menus
              menuPosition="footer-company"
              className="flex flex-col items-start gap-0 text-muted"
            />
          </div>

          {/* Terms Section */}
          <div className="col-span-1 mb-6 md:col-span-1">
            <h6 className="mb-4 pb-20 font-bold uppercase">
              <Trans message="Support" />
            </h6>
            <Menus
              menuPosition="footer-support"
              className="flex flex-col items-start gap-0 text-muted"
            />
          </div>

          {/* Extra Section */}
          <div className="col-span-1 mb-6 md:col-span-1">
            <h6 className="mb-4 pb-20 font-bold uppercase">
              <Trans message="Extra" />
            </h6>
            <Menus
              menuPosition="footer-extra"
              className="flex flex-col items-start gap-0 text-muted"
            />
          </div>

          {/* Social Media Section */}
          <div className="col-span-1 mb-6 md:col-span-1">
            <h6 className="mb-4 pb-20 font-bold uppercase">
              <Trans message="Social Media" />
            </h6>
            <Menus
              menuPosition="footer-media"
              className="flex flex-col items-start gap-0 text-muted"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterLinksDesktop;
