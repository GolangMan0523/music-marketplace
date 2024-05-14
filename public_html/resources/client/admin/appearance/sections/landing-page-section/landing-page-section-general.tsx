import {useFormContext} from 'react-hook-form';
import {
  appearanceState,
  AppearanceValues,
  useAppearanceStore,
} from '@common/admin/appearance/appearance-store';
import {Fragment, ReactNode} from 'react';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {FormImageSelector} from '@common/ui/images/image-selector';
import {FormSlider} from '@common/ui/forms/slider/slider';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {AppearanceButton} from '@common/admin/appearance/appearance-button';
import {ColorIcon} from '@common/admin/appearance/sections/themes/color-icon';
import {ColorPickerDialog} from '@common/ui/color-picker/color-picker-dialog';
import {Link} from 'react-router-dom';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {LandingPageContent} from '@app/landing-page/landing-page-content';

export function LandingPageSectionGeneral() {
  return (
    <Fragment>
      <HeaderSection />
      <div className="my-24 border-y py-24">
        <AppearanceButton
          to="action-buttons"
          elementType={Link}
          className="mb-20"
        >
          <Trans message="Action buttons" />
        </AppearanceButton>
        <AppearanceButton to="primary-features" elementType={Link}>
          <Trans message="Primary features" />
        </AppearanceButton>
        <AppearanceButton to="secondary-features" elementType={Link}>
          <Trans message="Secondary features" />
        </AppearanceButton>
      </div>
      <FooterSection />
      <PricingSection />
    </Fragment>
  );
}

function HeaderSection() {
  const defaultImage = useAppearanceStore(
    s => s.defaults?.settings.homepage.appearance?.headerImage,
  );

  return (
    <Fragment>
      <FormTextField
        label={<Trans message="Header title" />}
        className="mb-20"
        name="settings.homepage.appearance.headerTitle"
        onFocus={() => {
          appearanceState().preview.setHighlight('[data-testid="headerTitle"]');
        }}
      />
      <FormTextField
        label={<Trans message="Header subtitle" />}
        className="mb-30"
        inputElementType="textarea"
        rows={4}
        name="settings.homepage.appearance.headerSubtitle"
        onFocus={() => {
          appearanceState().preview.setHighlight(
            '[data-testid="headerSubtitle"]',
          );
        }}
      />
      <FormImageSelector
        name="settings.homepage.appearance.headerImage"
        className="mb-30"
        label={<Trans message="Header image" />}
        defaultValue={defaultImage}
        diskPrefix="homepage"
      />
      <FormSlider
        name="settings.homepage.appearance.headerImageOpacity"
        label={<Trans message="Header image opacity" />}
        minValue={0}
        step={0.1}
        maxValue={1}
        formatOptions={{style: 'percent'}}
      />
      <div className="mb-20 text-xs text-muted">
        <Trans message="In order for overlay colors to appear, header image opacity will need to be less then 100%" />
      </div>
      <ColorPickerTrigger
        formKey="settings.homepage.appearance.headerOverlayColor1"
        label={<Trans message="Header overlay color 1" />}
      />
      <ColorPickerTrigger
        formKey="settings.homepage.appearance.headerOverlayColor2"
        label={<Trans message="Header overlay color 2" />}
      />
    </Fragment>
  );
}

function FooterSection() {
  const defaultImage = useAppearanceStore(
    s =>
      (s.defaults?.settings.homepage.appearance as LandingPageContent)
        ?.footerImage,
  );
  return (
    <Fragment>
      <FormSwitch className="mb-24" name="settings.homepage.trending">
        <Trans message="Show trending artists" />
      </FormSwitch>
      <FormTextField
        label={<Trans message="Footer title" />}
        className="mb-20"
        name="settings.homepage.appearance.footerTitle"
        onFocus={() => {
          appearanceState().preview.setHighlight('[data-testid="footerTitle"]');
        }}
      />
      <FormTextField
        label={<Trans message="Footer subtitle" />}
        className="mb-20"
        name="settings.homepage.appearance.footerSubtitle"
        onFocus={() => {
          appearanceState().preview.setHighlight(
            '[data-testid="footerSubtitle"]',
          );
        }}
      />
      <FormImageSelector
        name="settings.homepage.appearance.footerImage"
        className="mb-30"
        label={<Trans message="Footer background image" />}
        defaultValue={defaultImage}
        diskPrefix="homepage"
      />
    </Fragment>
  );
}

function PricingSection() {
  return (
    <div className="mt-24 border-t pt-24">
      <FormTextField
        label={<Trans message="Pricing title" />}
        className="mb-20"
        name="settings.homepage.appearance.pricingTitle"
        onFocus={() => {
          appearanceState().preview.setHighlight(
            '[data-testid="pricingTitle"]',
          );
        }}
      />
      <FormTextField
        label={<Trans message="Pricing subtitle" />}
        className="mb-20"
        name="settings.homepage.appearance.pricingSubtitle"
        onFocus={() => {
          appearanceState().preview.setHighlight(
            '[data-testid="pricingSubtitle"]',
          );
        }}
      />
      <FormSwitch className="mb-24" name="settings.homepage.pricing">
        <Trans message="Show pricing table" />
      </FormSwitch>
    </div>
  );
}

interface ColorPickerTriggerProps {
  formKey: string;
  label: ReactNode;
}
function ColorPickerTrigger({label, formKey}: ColorPickerTriggerProps) {
  const key = formKey as 'settings.homepage.appearance.headerOverlayColor1';
  const {watch, setValue} = useFormContext<AppearanceValues>();

  const formValue = watch(key);

  const setColor = (value: string | null) => {
    setValue(formKey as any, value, {
      shouldDirty: true,
    });
  };

  return (
    <DialogTrigger
      value={formValue}
      type="popover"
      onValueChange={newValue => setColor(newValue)}
      onClose={value => setColor(value)}
    >
      <AppearanceButton
        className="capitalize"
        startIcon={
          <ColorIcon
            viewBox="0 0 48 48"
            className="icon-lg"
            style={{fill: formValue}}
          />
        }
      >
        {label}
      </AppearanceButton>
      <ColorPickerDialog />
    </DialogTrigger>
  );
}
