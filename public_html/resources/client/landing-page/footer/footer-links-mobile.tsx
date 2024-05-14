import React, {useState, ReactNode} from 'react';
import clsx from 'clsx';
import {useSettings} from '@common/core/settings/use-settings';
import {Trans} from '@common/i18n/trans';
import {FooterLogoMobile} from '@app/landing-page/footer/footer-logo-mobile';
import {MailIcon} from '@common/icons/material/Mail';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Button} from '@common/ui/buttons/button';
import {NewsletterSettings} from '@app/landing-page/footer/newsletter-settings';
import {PwaButton} from '@app/landing-page/footer/pwa-button';
import {GooglePlayButton} from '@app/landing-page/footer/google-play-button';
import {AppleStoreButton} from '@app/landing-page/footer/apple-store-button';
import {CustomMenu} from '@common/menus/custom-menu';

interface Props {
  className?: string;
  padding?: string;
  menuPosition?: string;
}

const AccordionItem = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-6 w-full">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={toggleAccordion} // Attach the onClick event handler here
      >
        <h3>{title}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div className="flex flex-col items-start gap-0 text-muted">
          {children}
        </div>
      )}
    </div>
  );
};

const Menus = ({
  menuPosition,
  className,
}: {
  menuPosition: string;
  className?: string;
}) => {
  const settings = useSettings();
  const menu = settings.menus.find(m => m.positions?.includes(menuPosition));

  if (!menu) return null;

  return (
    <CustomMenu
      menu={menu}
      className={className || 'transition-colors hover:text-fg-base'}
    />
  );
};

export function FooterLinksMobile({className, padding}: Props) {
  const {branding, version} = useSettings();

  return (
    <footer
      className={clsx(
        'border-b border-t p-16 text-sm',
        padding ? padding : 'pb-50 pt-50',
        className,
        'left-0 right-0 top-0',
      )}
    >
      <div className="mx-auto">
        <div className="flex flex-wrap justify-center text-center">
          {/* Logo Section */}
          <div className="col-span-1 mb-6 md:col-span-1">
            <div className="col-span-1 mb-6 border-b pb-20 md:col-span-1">
              <div className="col-span-1 mb-6 justify-center px-10 pb-20 md:col-span-1">
                <FooterLogoMobile />
              </div>
              <div className="mt-20 px-10 pb-20 text-muted">
                <h3>
                  <Trans
                    message={`${branding.site_name} | ${branding.site_description}`}
                  />
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

          {/* Company Section with Dropdown */}
          <div className="col-span-1 mb-6 mt-20 w-full md:col-span-1">
            <AccordionItem title="#BEATBOSS">
              <Menus
                menuPosition="footer-company"
                className="flex flex-col items-start gap-0 text-muted"
              />
            </AccordionItem>
          </div>

          {/* Support Section with Dropdown */}
          <div className="col-span-1 mb-6 w-full md:col-span-1">
            <AccordionItem title="Support">
              <Menus
                menuPosition="footer-support"
                className="flex flex-col items-start gap-0 text-muted"
              />
            </AccordionItem>
          </div>

          {/* Extra Section with Dropdown */}
          <div className="col-span-1 mb-6 w-full md:col-span-1">
            <AccordionItem title="Extra">
              <Menus
                menuPosition="footer-extra"
                className="flex flex-col items-start gap-0 text-muted"
              />
            </AccordionItem>
          </div>

          {/* Social Media Section with Dropdown */}
          <div className="col-span-1 mb-6 w-full md:col-span-1">
            <AccordionItem title="Social Media">
              <Menus
                menuPosition="footer-media"
                className="flex flex-col items-start gap-0 text-muted"
              />
            </AccordionItem>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterLinksMobile;
