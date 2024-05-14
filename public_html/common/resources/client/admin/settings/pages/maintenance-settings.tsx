import {SettingsPanel} from '../settings-panel';
import {Trans} from '../../../i18n/trans';
import {FormSwitch} from '../../../ui/forms/toggle/switch';
import {useFormContext} from 'react-hook-form';
import {AdminSettings} from '../admin-settings';

export function MaintenanceSettings() {
  return (
    <SettingsPanel
      title={<Trans message="Maintenance" />}
      description={
        <Trans message="Configure Maintenance Mode Settings." />
      }
    >
      <MaintenanceSection />
    </SettingsPanel>
  );
}

function MaintenanceSection() {
  const {watch} = useFormContext<AdminSettings>();
  const maintenanceEnabled = watch('maintenance.enable');

  return (
    <div>
      <FormSwitch
        name="client.maintenance.enable"
        className="mb-20"
        description={
          <Trans message="Website maintenance improves performance and security. Some features may be temporarily unavailable, with users seeing a maintenance page until work is done." />
        }
      >
        <Trans message="Enable Maintenance Mode" />
      </FormSwitch>
    </div>
  );
}