import {Trans} from '@common/i18n/trans';
import {Item} from '@common/ui/forms/listbox/item';
import {FormSelect} from '@common/ui/forms/select/select';
import React from 'react';

export function BackstageRoleSelect() {
  return (
    <FormSelect
      name="role"
      label={<Trans message="Role" />}
      selectionMode="single"
      className="mb-24"
    >
      <Item value="artist">
        <Trans message="Artist" />
      </Item>
      <Item value="agent">
        <Trans message="Agent" />
      </Item>
      <Item value="composer">
        <Trans message="Composer" />
      </Item>
      <Item value="label">
        <Trans message="Label" />
      </Item>
      <Item value="manager">
        <Trans message="Manager" />
      </Item>
      <Item value="musician">
        <Trans message="Musician" />
      </Item>
      <Item value="producer">
        <Trans message="Producer" />
      </Item>
      <Item value="publisher">
        <Trans message="Publisher" />
      </Item>
      <Item value="songwriter">
        <Trans message="Songwriter" />
      </Item>
    </FormSelect>
  );
}
