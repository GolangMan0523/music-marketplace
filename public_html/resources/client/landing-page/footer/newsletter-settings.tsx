import React from 'react';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {NewsletterSettingsForm} from '@app/landing-page/footer/newsletter-settings-form';

export function NewsletterSettings() {
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Join our newsletter" />
      </DialogHeader>
      <DialogBody>
        <NewsletterSettingsForm />
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
