import {Genre} from '@app/web-player/genres/genre';
import {ColumnConfig} from '@common/datatable/column-config';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import React, {Fragment} from 'react';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {FormattedDate} from '@common/i18n/formatted-date';
import {IconButton} from '@common/ui/buttons/icon-button';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {Trans} from '@common/i18n/trans';
import {GenreDatatablePageFilters} from '@app/admin/genres-datatable-page/genre-datatable-page-filters';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {GenreLink} from '@app/web-player/genres/genre-link';
import {EditIcon} from '@common/icons/material/Edit';
import {UpdateGenreDialog} from '@app/admin/genres-datatable-page/update-genre-dialog';
import GenreImage from './../tracks-datatable-page/music.svg';
import {CreateGenreDialog} from '@app/admin/genres-datatable-page/create-genre-dialog';

const columnConfig: ColumnConfig<
  Genre & {artists_count: number; updated_at: string}
>[] = [
  {
    key: 'name',
    allowsSorting: true,
    visibleInMode: 'all',
    width: 'flex-3 min-w-200',
    header: () => <Trans message="Genre" />,
    body: genre => (
      <NameWithAvatar image={genre.image} label={<GenreLink genre={genre} />} />
    ),
  },
  {
    key: 'display_name',
    allowsSorting: true,
    header: () => <Trans message="Display name" />,
    body: genre => genre.display_name || genre.name,
  },
  {
    key: 'artists_count',
    allowsSorting: true,
    header: () => <Trans message="Number of artists" />,
    body: genre => genre.artists_count,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-100',
    header: () => <Trans message="Last updated" />,
    body: genre => <FormattedDate date={genre.updated_at} />,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    visibleInMode: 'all',
    width: 'w-42 flex-shrink-0',
    body: genre => {
      return (
        <DialogTrigger type="modal">
          <IconButton size="md" className="text-muted">
            <EditIcon />
          </IconButton>
          <UpdateGenreDialog genre={genre} />
        </DialogTrigger>
      );
    },
  },
];

export function GenresDatatablePage() {
  return (
    <DataTablePage
      endpoint="genres"
      title={<Trans message="Genres" />}
      columns={columnConfig}
      filters={GenreDatatablePageFilters}
      queryParams={{
        withCount: 'artists',
      }}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={GenreImage}
          title={<Trans message="No genres have been created yet" />}
          filteringTitle={<Trans message="No matching genres" />}
        />
      }
    />
  );
}

function Actions() {
  return (
    <Fragment>
      <DialogTrigger type="modal">
        <DataTableAddItemButton>
          <Trans message="Add new genre" />
        </DataTableAddItemButton>
        <CreateGenreDialog />
      </DialogTrigger>
    </Fragment>
  );
}
