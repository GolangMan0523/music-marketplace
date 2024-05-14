import {useUser} from '@common/auth/ui/use-user';
import {Trans} from '@common/i18n/trans';
import mailSentSvg from './mail-sent.svg';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import {Button} from '@common/ui/buttons/button';
import {useResendVerificationEmail} from '@common/auth/requests/use-resend-verification-email';
import {useIsDarkMode} from '@common/ui/themes/use-is-dark-mode';
import {useSettings} from '@common/core/settings/use-settings';
import {useLogout} from '@common/auth/requests/logout';

export function EmailVerificationPage() {
  const {data} = useUser('me');
  const resendEmail = useResendVerificationEmail();
  const {
    branding: {logo_light, logo_dark},
  } = useSettings();
  const isDarkMode = useIsDarkMode();
  const logoSrc = isDarkMode ? logo_light : logo_dark;
  const logout = useLogout();

  return (
    <div className="flex min-h-screen w-screen flex-col items-center bg-alt p-24">
      {logoSrc && (
        <img
          src={logoSrc}
          alt="Site logo"
          className="my-60 block h-42 w-auto"
        />
      )}
      <div className="flex max-w-580 flex-col items-center rounded border bg-background px-14 py-28 text-center shadow">
        <SvgImage src={mailSentSvg} height="h-144" />
        <h1 className="mb-20 mt-40 text-3xl">
          <Trans message="Verify your email" />
        </h1>
        <div className="mb-24 text-sm">
          <Trans
            message="We've sent an email to “:email“ to verify your email address and activate your account. The link in the the email will expire in 24 hours."
            values={{email: data?.user.email}}
          />
        </div>
        <div className="text-sm">
          <Trans message="If you did not receive an email, click the button below and we will send you another one." />
        </div>
        <div className="mt-30">
          <Button
            className="mr-10"
            variant="flat"
            color="primary"
            disabled={resendEmail.isPending || !data?.user.email}
            onClick={() => {
              resendEmail.mutate({email: data!.user.email});
            }}
          >
            <Trans message="Resend email" />
          </Button>
          <Button variant="outline" onClick={() => logout.mutate()}>
            <Trans message="Logout" />
          </Button>
        </div>
      </div>
    </div>
  );
}
