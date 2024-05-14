import {Trans} from '../i18n/trans';
import {Form} from '../ui/forms/form';
import {useForm} from 'react-hook-form';
import {
  ContactPagePayload,
  useSubmitContactForm,
} from './use-submit-contact-form';
import {FormTextField} from '../ui/forms/input-field/text-field/text-field';
import {Button} from '../ui/buttons/button';
import {useRecaptcha} from '../recaptcha/use-recaptcha';
import {StaticPageTitle} from '../seo/static-page-title';

import {PlayerNavbarLayout} from '@app/web-player/layout/player-navbar-layout';
import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {SidedavFrontend} from '@app/web-player/layout/sidenav-frontend';
import {Sidenav} from '@app/web-player/layout/sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import {useSettings} from '@common/core/settings/use-settings';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {Footer} from '../ui/footer/footer';

export function ContactUsPage() {
  const form = useForm<ContactPagePayload>();
  const submitForm = useSubmitContactForm(form);
  const {verify, isVerifying} = useRecaptcha('contact');
  const {player} = useSettings();
  const isMobile = useIsMobileMediaQuery();

  return (
    <>
      <DashboardLayout
        name="web-player"
        initialRightSidenavStatus={player?.hide_queue ? 'closed' : 'open'}
      >
        <PlayerNavbarLayout
          size="sm"
          menuPosition="custom-us-page"
          className="flex-shrink-0"
        />
        <SidedavFrontend position="left" display="block">
          <Sidenav />
        </SidedavFrontend>
        <DashboardContent>
          <div className="flex flex-col bg-alt">
            <StaticPageTitle>
              <Trans message="Contact us" />
            </StaticPageTitle>
            <div className="container mx-auto flex flex-auto items-center justify-center p-24 md:p-40">
              <div className="max-w-620 rounded border bg-background p-24">
                <h1 className="text-2xl">
                  <Trans message="Contact us" />
                </h1>
                <p className="mb-30 mt-4 text-sm">
                  <Trans message="Please use the form below to send us a message and we'll get back to you as soon as possible." />
                </p>
                <Form
                  form={form}
                  onSubmit={async value => {
                    const isValid = await verify();
                    if (isValid) {
                      submitForm.mutate(value);
                    }
                  }}
                >
                  <FormTextField
                    label={<Trans message="Name" />}
                    name="name"
                    required
                    className="mb-20"
                  />
                  <FormTextField
                    label={<Trans message="Email" />}
                    name="email"
                    required
                    type="email"
                    className="mb-20"
                  />
                  <FormTextField
                    label={<Trans message="Message" />}
                    name="message"
                    required
                    inputElementType="textarea"
                    className="mb-20"
                    rows={8}
                  />
                  <Button
                    type="submit"
                    variant="flat"
                    color="primary"
                    disabled={submitForm.isPending || isVerifying}
                  >
                    <Trans message="Send" />
                  </Button>
                </Form>
              </div>
            </div>
            <Footer />
          </div>
        </DashboardContent>
      </DashboardLayout>
    </>
  );
}
