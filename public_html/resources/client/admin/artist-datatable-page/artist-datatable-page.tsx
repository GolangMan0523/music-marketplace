import React, {Fragment} from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@common/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import musicImage from './../tracks-datatable-page/music.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {Link} from 'react-router-dom';
import {ArtistDatatableColumns} from '@app/admin/artist-datatable-page/artist-datatable-columns';
import {ArtistDatatableFilters} from '@app/admin/artist-datatable-page/artist-datatable-filters';
import {useSettings} from '@common/core/settings/use-settings';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ImportArtistDialog} from '@app/admin/artist-datatable-page/import-artist-dialog';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {PublishIcon} from '@common/icons/material/Publish';

export function ArtistDatatablePage() {
  return (
    <DataTablePage
      endpoint="artists"
      title={<Trans message="Artists" />}
      filters={ArtistDatatableFilters}
      columns={ArtistDatatableColumns}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={musicImage}
          title={<Trans message="No artists have been created yet" />}
          filteringTitle={<Trans message="No matching artists" />}
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
          onClose={artist => {
            if (artist) {
              navigate(`/admin/artists/${artist.id}/edit`);
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
          <ImportArtistDialog />
        </DialogTrigger>
      )}
      <DataTableAddItemButton elementType={Link} to="new">
        <Trans message="Add new artist" />
      </DataTableAddItemButton>
    </Fragment>
  );
}
