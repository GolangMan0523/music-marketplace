import {useSettings} from '@common/core/settings/use-settings';
import {useAppearanceEditorMode} from '@common/admin/appearance/commands/use-appearance-editor-mode';
import {useAuth} from '@common/auth/use-auth';
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from '@common/ui/toast/toast-container';
import {EmailVerificationPage} from '@common/auth/ui/email-verification-page/email-verification-page';
import {DialogStoreOutlet} from '@common/ui/overlays/store/dialog-store-outlet';
import {AppearanceListener} from '@common/admin/appearance/commands/appearance-listener';
import {CookieNotice} from '@common/ui/cookie-notice/cookie-notice';
import {AuthRoute} from '@common/auth/guards/auth-route';
import React, {Fragment} from 'react';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {DynamicHomepage} from '@common/ui/dynamic-homepage';
import {LandingPage} from '@app/landing-page/landing-page';
import {AuthRoutes} from '@common/auth/auth-routes';
import {BillingRoutes} from '@common/billing/billing-routes';
import {NotificationRoutes} from '@common/notifications/notification-routes';
import {ContactUsPage} from '@common/contact/contact-us-page';
import {CustomPageLayout} from '@common/custom-page/custom-page-layout';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import {MaintenancePage} from '@common/maintenance/maintenance-page';
import {LoginPageWrapper} from '@common/auth/ui/login-page-wrapper';
import {ForgotPasswordPage} from '@common/auth/ui/forgot-password-page';
import {ResetPasswordPage} from '@common/auth/ui/reset-password-page';

const AdminRoutes = React.lazy(() => import('@common/admin/admin-routes'));
const WebPlayerRoutes = React.lazy(
  () => import('@app/web-player/web-player-routes'),
);
const BackstageRoutes = React.lazy(
  () => import('@app/web-player/backstage/backstage-routes'),
);
const SwaggerApiDocs = React.lazy(
  () => import('@common/swagger/swagger-api-docs-page'),
);

export function AppRoutes() {
  const {billing, notifications, require_email_confirmation, api, homepage} =
    useSettings();
  const {isAppearanceEditorActive} = useAppearanceEditorMode();
  const {user, hasPermission} = useAuth();
  const {maintenance} = useSettings();
  const [isMaintenanceMode, setIsMaintenanceMode] = React.useState(maintenance.enable);
  const [redirected, setRedirected] = React.useState(false);

  React.useEffect(() => {
    setIsMaintenanceMode(maintenance.enable);
  }, [maintenance.enable]);

  React.useEffect(() => {
    // Skip redirection if the user is logged in
    if (user && !isMaintenanceMode && redirected) {
      setRedirected(false);
    }
    if (!user && isMaintenanceMode && window.location.pathname !== '/maintenance') {
      window.location.replace('/maintenance');
      setRedirected(true);
    } else if (!isMaintenanceMode && window.location.pathname === '/maintenance') {
      window.location.replace('/');
      setRedirected(true);
    }
  }, [isMaintenanceMode, redirected, user]);

  if (isMaintenanceMode && !user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPageWrapper />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/password/reset/:token" element={<ResetPasswordPage />} />
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="*" element={<MaintenancePage />} />
      </Routes>
    );
  }

  if (user != null && require_email_confirmation && !user.email_verified_at) {
    return (
      <Fragment>
        <ToastContainer />
        <Routes>
          <Route path="*" element={<EmailVerificationPage />} />
        </Routes>
        <DialogStoreOutlet />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <AppearanceListener />
      <CookieNotice />
      <ToastContainer />
      <Routes>
        <Route
          path="/*"
          element={
            <AuthRoute requireLogin={false} permission="music.view">
              <React.Suspense fallback={<FullPageLoader screen />}>
                <WebPlayerRoutes />
              </React.Suspense>
            </AuthRoute>
          }
        />

        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route
          path="backstage/*"
          element={
            <AuthRoute>
              <React.Suspense fallback={<FullPageLoader screen />}>
                <BackstageRoutes />
              </React.Suspense>
            </AuthRoute>
          }
        />
        {!homepage?.type.startsWith('channel') &&
          (user == null || isAppearanceEditorActive) && (
            <Route
              path="/"
              element={
                <DynamicHomepage homepageResolver={() => <LandingPage />} />
              }
            />
          )}
        <Route
          path="/admin/*"
          element={
            <AuthRoute permission="admin.access">
              <React.Suspense fallback={<FullPageLoader screen />}>
                <AdminRoutes />
              </React.Suspense>
            </AuthRoute>
          }
        />
        {AuthRoutes}
        {billing.enable && BillingRoutes}
        {notifications.integrated && NotificationRoutes}
        {api?.integrated && hasPermission('api.access') && (
          <Route
            path="api-docs"
            element={
              <React.Suspense fallback={<FullPageLoader screen />}>
                <SwaggerApiDocs />
              </React.Suspense>
            }
          />
        )}
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="pages/:pageSlug" element={<CustomPageLayout />} />
        <Route path="pages/:pageId/:pageSlug" element={<CustomPageLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <DialogStoreOutlet />
    </Fragment>
  );
}
