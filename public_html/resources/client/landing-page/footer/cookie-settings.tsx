import React from 'react';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {CookieSettingsForm} from '@app/landing-page/footer/cookie-settings-form';

export function CookieSettings() {
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Cookie Preference Settings" />
      </DialogHeader>
      <DialogBody>
        <CookieSettingsForm />
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={() => {
            close();
          }}
        >
          <Trans message="Cancel" />
        </Button>
        <Button variant="flat" color="primary" type="submit">
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
