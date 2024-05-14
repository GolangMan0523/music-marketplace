import {SortDescriptor} from '@common/ui/tables/types/sort-descriptor';
import {Menu, MenuTrigger} from '@common/ui/navigation/menu/menu-trigger';
import {Button} from '@common/ui/buttons/button';
import {ArrowDropDownIcon} from '@common/icons/material/ArrowDropDown';
import {Trans} from '@common/i18n/trans';
import {Item} from '@common/ui/forms/listbox/item';
import React from 'react';
import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {IconButton} from '@common/ui/buttons/icon-button';
import {SortIcon} from '@common/icons/material/Sort';

interface Props {
  items: Record<string, MessageDescriptor>;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (sort: SortDescriptor) => void;
}
export function LibraryPageSortDropdown({
  items,
  sortDescriptor,
  setSortDescriptor,
}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const selectedValue = `${sortDescriptor.orderBy}:${sortDescriptor.orderDir}`;
  return (
    <MenuTrigger
      selectionMode="single"
      selectedValue={selectedValue}
      onSelectionChange={newValue => {
        const [orderBy, orderDir] = (newValue as string).split(':');
        setSortDescriptor({
          orderBy,
          orderDir: orderDir as SortDescriptor['orderDir'],
        });
      }}
    >
      {isMobile ? (
        <IconButton>
          <SortIcon />
        </IconButton>
      ) : (
        <Button
          variant="outline"
          className="flex-shrink-0"
          endIcon={<ArrowDropDownIcon />}
        >
          <Trans {...items[selectedValue]} />
        </Button>
      )}
      <Menu>
        {Object.entries(items).map(([value, label]) => (
          <Item key={value} value={value}>
            <Trans {...label} />
          </Item>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
