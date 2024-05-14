import {Trans} from '@common/i18n/trans';
import {artistPageTabs} from '@app/web-player/artists/artist-page-tabs';
import React, {Fragment, ReactNode, useRef} from 'react';
import {DragPreviewRenderer} from '@common/ui/interactions/dnd/use-draggable';
import {useFormContext} from 'react-hook-form';
import {AdminSettingsWithFiles} from '@common/admin/settings/requests/update-admin-settings';
import {moveItemInNewArray} from '@common/utils/array/move-item-in-new-array';
import {IconButton} from '@common/ui/buttons/icon-button';
import {DragHandleIcon} from '@common/icons/material/DragHandle';
import {Checkbox} from '@common/ui/forms/toggle/checkbox';
import {DragPreview} from '@common/ui/interactions/dnd/drag-preview';
import clsx from 'clsx';
import {FormSelect} from '@common/ui/forms/select/select';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {Item} from '@common/ui/forms/listbox/item';
import {useSortable} from '@common/ui/interactions/dnd/sortable/use-sortable';

export function ArtistPagePanel() {
  const {watch} = useFormContext<AdminSettingsWithFiles>();
  const tabs = watch('client.artistPage.tabs') || [];
  return (
    <div>
      <div className="mb-14 text-sm">
        <Trans message="Artist page tabs" />
        <div className="text-xs text-muted">
          <Trans message="Select which tabs should appear on artist page and in which order." />
        </div>
      </div>
      {tabs.map(tab => (
        <Fragment key={tab.id}>{getListItem(tab.id)}</Fragment>
      ))}
      <FormSelect
        className="my-24"
        name="client.player.default_artist_view"
        selectionMode="single"
        label={<Trans message="Default albums layout" />}
        description={
          <Trans message="How should albums on main artist page be displayed by default." />
        }
      >
        <Item value="list">
          <Trans message="List" />
        </Item>
        <Item value="grid">
          <Trans message="Grid" />
        </Item>
      </FormSelect>
      <FormSwitch
        name="client.artistPage.showDescription"
        description={
          <Trans message="Whether short artist biography be shown in main artist page header." />
        }
      >
        <Trans message="Show description" />
      </FormSwitch>
    </div>
  );
}

function getListItem(id: number) {
  switch (id) {
    case artistPageTabs.tracks:
      return (
        <ArtistTabListItem
          id={artistPageTabs.tracks}
          title={<Trans message="Tracks" />}
          description={
            <Trans message="Show all artist tracks in a list view." />
          }
        />
      );
    case artistPageTabs.albums:
      return (
        <ArtistTabListItem
          id={artistPageTabs.albums}
          title={<Trans message="Albums" />}
          description={
            <Trans message="Show all artist albums in a list view." />
          }
        />
      );
    case artistPageTabs.followers:
      return (
        <ArtistTabListItem
          id={artistPageTabs.followers}
          title={<Trans message="Followers" />}
          description={
            <Trans message="Shows all users that are currently following an artist." />
          }
        />
      );
    case artistPageTabs.similar:
      return (
        <ArtistTabListItem
          id={artistPageTabs.similar}
          title={<Trans message="Similar artists" />}
          description={<Trans message="Shows similar artists." />}
        />
      );
    case artistPageTabs.about:
      return (
        <ArtistTabListItem
          id={artistPageTabs.about}
          title={<Trans message="About" />}
          description={
            <Trans message="Shows artist biography/description as well as extra images" />
          }
        />
      );
    case artistPageTabs.discography:
      return (
        <ArtistTabListItem
          id={artistPageTabs.discography}
          title={<Trans message="Discography" />}
          description={
            <Trans message="Shows all artist albums in grid or list view." />
          }
        />
      );
  }
}

interface ArtistTabListItemProps {
  id: number;
  title: ReactNode;
  description: ReactNode;
}
function ArtistTabListItem({title, description, id}: ArtistTabListItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<DragPreviewRenderer>(null);
  const {watch, setValue} = useFormContext<AdminSettingsWithFiles>();
  const tabs = watch('client.artistPage.tabs') || [];
  const ids = tabs.map(tab => tab.id);
  const isChecked = tabs.find(tab => tab.id === id)?.active;
  const isFirst = ids[0] === id;

  const {sortableProps, dragHandleRef} = useSortable({
    ref,
    item: id,
    items: ids,
    type: 'artistPageTabs',
    preview: previewRef,
    strategy: 'line',
    onSortEnd: (oldIndex, newIndex) => {
      setValue(
        'client.artistPage.tabs',
        moveItemInNewArray(tabs, oldIndex, newIndex),
      );
    },
  });

  return (
    <Fragment>
      <div
        className={clsx(
          'flex w-full items-center gap-8 border-b py-6',
          isFirst && 'border-t border-t-transparent',
        )}
        ref={ref}
        {...sortableProps}
      >
        <IconButton ref={dragHandleRef}>
          <DragHandleIcon />
        </IconButton>
        <div className="flex-auto">
          <div className="text-sm">{title}</div>
          <div className="text-xs">{description}</div>
        </div>
        <Checkbox
          checked={isChecked}
          onChange={() => {
            const newTabs = tabs.map(tab => {
              if (tab.id === id) {
                return {...tab, active: !tab.active};
              }
              return tab;
            });
            setValue('client.artistPage.tabs', newTabs);
          }}
        />
      </div>
      <TabDragPreview title={title} ref={previewRef} />
    </Fragment>
  );
}

interface DragPreviewProps {
  title: ReactNode;
}
const TabDragPreview = React.forwardRef<DragPreviewRenderer, DragPreviewProps>(
  ({title}, ref) => {
    return (
      <DragPreview ref={ref}>
        {() => (
          <div className="rounded bg-chip p-8 text-sm shadow">{title}</div>
        )}
      </DragPreview>
    );
  },
);
