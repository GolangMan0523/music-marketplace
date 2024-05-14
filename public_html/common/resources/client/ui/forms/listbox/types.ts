import React, {MutableRefObject, ReactElement, ReactNode} from 'react';
import {
  OffsetOptions,
  Placement,
  ReferenceType,
  UseFloatingReturn,
  VirtualElement,
} from '@floating-ui/react-dom';
import {
  buildListboxCollection,
  ListboxCollection,
} from './build-listbox-collection';
import {ListboxItemProps} from './item';

export type PrimitiveValue = string | number;
type SingleSelectionProps = {
  selectionMode?: 'single';
  onSelectionChange?: (value: PrimitiveValue) => void;
  selectedValue?: PrimitiveValue | null;
  defaultSelectedValue?: PrimitiveValue;
};
type MultipleSelectionProps = {
  selectionMode?: 'multiple';
  onSelectionChange?: (value: PrimitiveValue[]) => void;
  selectedValue?: PrimitiveValue[];
  defaultSelectedValue?: PrimitiveValue[];
};
type NoneSelectionProps = {
  selectionMode?: 'none' | null;
};
type SelectionProps =
  | NoneSelectionProps
  | SingleSelectionProps
  | MultipleSelectionProps;

export interface ListBoxChildren<T> {
  items?: T[];
  children: ReactNode | ((item: T) => ReactElement<ListboxItemProps>);
}

export type ListboxProps = SelectionProps & {
  role?: 'listbox' | 'menu';
  virtualFocus?: boolean;
  loopFocus?: boolean;
  autoFocusFirstItem?: boolean;
  autoUpdatePosition?: boolean;
  floatingWidth?: 'auto' | 'matchTrigger';
  floatingMinWidth?: string;
  floatingMaxHeight?: number;
  placement?: Placement;
  offset?: OffsetOptions;
  isAsync?: boolean;
  maxItems?: number;
  allowEmptySelection?: boolean;
  // fired whenever user selects an item (via click or keyboard), regardless of current selection mode
  onItemSelected?: (value: PrimitiveValue) => void;
  clearSelectionOnInputClear?: boolean;
  clearInputOnItemSelection?: boolean;
  blurReferenceOnItemSelection?: boolean;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  allowCustomValue?: boolean; // for combobox
  isLoading?: boolean;
  showEmptyMessage?: boolean;
  showCheckmark?: boolean;
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export interface UseListboxReturn {
  handleItemSelection: (value: PrimitiveValue) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focusItem: (
    fallbackOperation: 'increment' | 'decrement',
    newIndex: number,
  ) => void;

  allowCustomValue: ListboxProps['allowCustomValue']; // for combobox
  loopFocus: ListboxProps['loopFocus'];
  floatingWidth: ListboxProps['floatingWidth'];
  floatingMinWidth: ListboxProps['floatingMinWidth'];
  floatingMaxHeight: ListboxProps['floatingMaxHeight'];
  showCheckmark: ListboxProps['showCheckmark'];
  // active collection, either filtered or all provided items
  collection: ListboxCollection;
  collections: ReturnType<typeof buildListboxCollection>;
  virtualFocus: ListboxProps['virtualFocus'];
  showEmptyMessage: ListboxProps['showEmptyMessage'];
  refs: {
    reference: React.MutableRefObject<HTMLElement | VirtualElement | null>;
    floating: React.MutableRefObject<HTMLElement | null>;
  };
  reference: (instance: ReferenceType | null) => void;
  floating: UseFloatingReturn['refs']['setFloating'];
  listboxId: string;
  role: ListboxProps['role'];
  listContent: (string | null)[];
  listItemsRef: MutableRefObject<(HTMLElement | null)[]>;
  positionStyle: {
    position: 'absolute' | 'fixed';
    top: string | number;
    left: string | number;
  };

  state: {
    // currently focused or active (if virtual focus) option
    activeIndex: number | null;
    setActiveIndex: (value: number | null) => void;

    selectedIndex?: number | null;
    setSelectedIndex: (index: number) => void;
    selectionMode: 'single' | 'multiple' | 'none';
    selectedValues: PrimitiveValue[];
    selectValues: (value: PrimitiveValue[] | PrimitiveValue) => void;

    inputValue: string;
    setInputValue: (value: string) => void;

    isOpen: boolean;
    setIsOpen: (value: boolean) => void;

    setActiveCollection: (value: 'all' | 'filtered') => void;
  };
}
