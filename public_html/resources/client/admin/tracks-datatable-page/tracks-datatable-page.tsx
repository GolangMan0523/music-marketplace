import React, {Fragment} from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@common/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import marketing from './music.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {Link} from 'react-router-dom';
import {TracksDatatableColumns} from '@app/admin/tracks-datatable-page/tracks-datatable-columns';
import {TracksDatatableFilters} from '@app/admin/tracks-datatable-page/tracks-datatable-filters';
import {useSettings} from '@common/core/settings/use-settings';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ImportTrackDialog} from '@app/admin/tracks-datatable-page/import-track-dialog';
import {PublishIcon} from '@common/icons/material/Publish';

export function TracksDatatablePage() {
  return (
    <DataTablePage
      endpoint="tracks"
      title={<Trans message="Tracks" />}
      filters={TracksDatatableFilters}
      columns={TracksDatatableColumns}
      queryParams={{
        with: 'artists,lyric',
      }}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={marketing}
          title={<Trans message="No tracks have been created yet" />}
          filteringTitle={<Trans message="No matching tracks" />}
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
              navigate(`/admin/tracks/${album.id}/edit`);
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
          <ImportTrackDialog />
        </DialogTrigger>
      )}
      <DataTableAddItemButton elementType={Link} to="new">
        <Trans message="Add new track" />
      </DataTableAddItemButton>
    </Fragment>
  );
}
