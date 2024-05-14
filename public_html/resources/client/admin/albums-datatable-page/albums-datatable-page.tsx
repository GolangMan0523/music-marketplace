import React, {Fragment} from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@common/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import musicImage from './../tracks-datatable-page/music.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {Link} from 'react-router-dom';
import {AlbumsDatatableColumns} from '@app/admin/albums-datatable-page/albums-datatable-columns';
import {AlbumsDatatableFilters} from '@app/admin/albums-datatable-page/albums-datatable-filters';
import {useSettings} from '@common/core/settings/use-settings';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ImportAlbumDialog} from '@app/admin/albums-datatable-page/import-album-dialog';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {PublishIcon} from '@common/icons/material/Publish';

export function AlbumsDatatablePage() {
  return (
    <DataTablePage
      endpoint="albums"
      title={<Trans message="Albums" />}
      filters={AlbumsDatatableFilters}
      columns={AlbumsDatatableColumns}
      queryParams={{
        withCount: 'tracks',
      }}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={musicImage}
          title={<Trans message="No albums have been created yet" />}
          filteringTitle={<Trans message="No matching albums" />}
        />
      }
    />
  );
}

function Actions() {
  const {spotify_is_setup} = useSettings();
  const navigate = useNavigate();
  return (
    <Fragment>
      {spotify_is_setup && (
        <DialogTrigger
          type="modal"
          onClose={album => {
            if (album) {
              navigate(`/admin/albums/${album.id}/edit`);
            }
          }}
        >
          <Tooltip label={<Trans message="Import by spotify ID" />}>
            <IconButton
              variant="outline"
              color="primary"
              className="flex-shrink-0"
              size="sm"
            >
              <PublishIcon />
            </IconButton>
          </Tooltip>
          <ImportAlbumDialog />
        </DialogTrigger>
      )}
      <DataTableAddItemButton elementType={Link} to="new">
        <Trans message="Add new album" />
      </DataTableAddItemButton>
    </Fragment>
  );
}
