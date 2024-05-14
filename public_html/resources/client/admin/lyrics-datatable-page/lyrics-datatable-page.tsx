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
import {EditIcon} from '@common/icons/material/Edit';
import lyricImage from './source-code.svg';
import {Lyric} from '@app/web-player/tracks/lyrics/lyric';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {TrackLink} from '@app/web-player/tracks/track-link';
import {AlbumLink} from '@app/web-player/albums/album-link';
import {LyricDatatablePageFilters} from '@app/admin/lyrics-datatable-page/lyric-datatable-page-filters';
import {CreateLyricDialog} from '@app/admin/lyrics-datatable-page/create-lyric-dialog';
import {UpdateLyricDialog} from '@app/admin/lyrics-datatable-page/update-lyric-dialog';

const columnConfig: ColumnConfig<Lyric>[] = [
  {
    key: 'track_id',
    allowsSorting: true,
    header: () => <Trans message="Track" />,
    width: 'flex-3 min-w-200',
    visibleInMode: 'all',
    body: lyric =>
      lyric.track ? (
        <div className="flex items-center gap-12">
          <TrackImage
            track={lyric.track}
            className="flex-shrink-0 rounded"
            size="w-34 h-34"
          />
          <TrackLink track={lyric.track} target="_blank" />
        </div>
      ) : null,
  },
  {
    key: 'album',
    width: 'flex-2',
    header: () => <Trans message="Album" />,
    body: lyric =>
      lyric.track?.album ? <AlbumLink album={lyric.track.album} /> : null,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-100',
    header: () => <Trans message="Last updated" />,
    body: lyric => <FormattedDate date={lyric.updated_at} />,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    visibleInMode: 'all',
    width: 'w-42 flex-shrink-0',
    body: lyric => {
      return (
        <DialogTrigger type="modal">
          <IconButton size="md" className="text-muted">
            <EditIcon />
          </IconButton>
          <UpdateLyricDialog lyric={lyric} />
        </DialogTrigger>
      );
    },
  },
];

export function LyricsDatatablePage() {
  return (
    <DataTablePage
      endpoint="lyrics"
      title={<Trans message="Lyrics" />}
      columns={columnConfig}
      filters={LyricDatatablePageFilters}
      queryParams={{
        with: 'track.album.artists',
      }}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={lyricImage}
          title={<Trans message="No lyrics have been created yet" />}
          filteringTitle={<Trans message="No matching lyrics" />}
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
          <Trans message="Add new lyric" />
        </DataTableAddItemButton>
        <CreateLyricDialog />
      </DialogTrigger>
    </Fragment>
  );
}
