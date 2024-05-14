import {useContext} from 'react';
import {
  AdConfig,
  SiteConfigContext,
} from '../../core/settings/site-config-context';
import {Form} from '../../ui/forms/form';
import {useForm} from 'react-hook-form';
import {FormTextField} from '../../ui/forms/input-field/text-field/text-field';
import {Trans} from '../../i18n/trans';
import {Button} from '../../ui/buttons/button';
import {FormSwitch} from '../../ui/forms/toggle/switch';
import {useAdminSettings} from '../settings/requests/use-admin-settings';
import {ProgressCircle} from '../../ui/progress/progress-circle';
import {Settings} from '../../core/settings/settings';
import {
  AdminSettingsWithFiles,
  useUpdateAdminSettings,
} from '../settings/requests/update-admin-settings';
import {DialogTrigger} from '../../ui/overlays/dialog/dialog-trigger';
import {ImageZoomDialog} from '../../ui/overlays/dialog/image-zoom-dialog';
import {StaticPageTitle} from '../../seo/static-page-title';

export function AdsPage() {
  const query = useAdminSettings();

  return (
    <div className="container mx-auto p-12 md:p-24">
      <StaticPageTitle>
        <Trans message="Ads" />
      </StaticPageTitle>
      <h1 className="mb-20 text-2xl font-light md:mb-40 md:text-3xl">
        <Trans message="Predefined Ad slots" />
      </h1>
      {query.isLoading ? (
        <ProgressCircle isIndeterminate />
      ) : (
        <AdsForm defaultValues={query.data?.client.ads || {}} />
      )}
    </div>
  );
}

interface AdsFormProps {
  defaultValues: Settings['ads'];
}
function AdsForm({defaultValues}: AdsFormProps) {
  const {
    admin: {ads},
  } = useContext(SiteConfigContext);

  const form = useForm<AdminSettingsWithFiles>({
    defaultValues: {client: {ads: defaultValues}},
  });
  const updateSettings = useUpdateAdminSettings(form);

  return (
    <Form
      form={form}
      onSubmit={value => {
        updateSettings.mutate(value);
      }}
    >
      {ads.map(ad => {
        return <AdSection key={ad.slot} adConfig={ad} />;
      })}
      <FormSwitch
        name="client.ads.disable"
        className="mb-30"
        description={
          <Trans message="Disable all add related functionality across the site." />
        }
      >
        <Trans message="Disable ads" />
      </FormSwitch>
      <Button
        type="submit"
        variant="flat"
        color="primary"
        disabled={updateSettings.isPending}
      >
        <Trans message="Save" />
      </Button>
    </Form>
  );
}

interface AdSectionProps {
  adConfig: AdConfig;
}
function AdSection({adConfig}: AdSectionProps) {
  return (
    <div className="flex items-center gap-24">
      <FormTextField
        className="mb-30 flex-auto"
        name={`client.${adConfig.slot}`}
        inputElementType="textarea"
        rows={8}
        label={<Trans {...adConfig.description} />}
      />
      <DialogTrigger type="modal">
        <button
          type="button"
          className="cursor-zoom-in overflow-hidden rounded outline-none transition hover:scale-105 focus-visible:ring max-md:hidden"
        >
          <img
            src={adConfig.image}
            className="h-[186px] w-auto border"
            alt="Ad slot example"
          />
        </button>
        <ImageZoomDialog image={adConfig.image} />
      </DialogTrigger>
    </div>
  );
}
