import {useFormContext} from 'react-hook-form';
import React from 'react';
import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {IconButton} from '@common/ui/buttons/icon-button';
import {AddIcon} from '@common/icons/material/Add';
import {EditIcon} from '@common/icons/material/Edit';
import musicImage from '@app/admin/tracks-datatable-page/music.svg';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {Link} from 'react-router-dom';
import {ColumnConfig} from '@common/datatable/column-config';
import {Album} from '@app/web-player/albums/album';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {AlbumLink} from '@app/web-player/albums/album-link';
import {FormattedDate} from '@common/i18n/formatted-date';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {Table} from '@common/ui/tables/table';
import {useSortableTableData} from '@common/ui/tables/use-sortable-table-data';
import {UpdateArtistPayload} from '@app/admin/artist-datatable-page/requests/use-update-artist';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {CloseIcon} from '@common/icons/material/Close';
import {useDeleteAlbum} from '@app/web-player/albums/requests/use-delete-album';
import {InfoDialogTriggerIcon} from '@common/ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger-icon';

const Columns: ColumnConfig<Album>[] = [
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Name" />,
    visibleInMode: 'all',
    width: 'flex-3',
    body: album => (
      <div className="flex items-center gap-12">
        <AlbumImage
          album={album}
          className="flex-shrink-0"
          size="w-34 h-34 rounded"
        />
        <AlbumLink album={album} target="_blank" />
      </div>
    ),
  },
  {
    key: 'release_date',
    allowsSorting: true,
    header: () => <Trans message="Release date" />,
    body: album =>
      album.release_date ? <FormattedDate date={album.release_date} /> : null,
  },
  {
    key: 'track_count',
    allowsSorting: false,
    header: () => <Trans message="Track count" />,
    body: album =>
      album.tracks_count ? (
        <FormattedNumber value={album.tracks_count} />
      ) : null,
  },
  {
    key: 'plays',
    allowsSorting: true,
    header: () => <Trans message="Plays" />,
    body: album =>
      album.plays ? <FormattedNumber value={album.plays} /> : null,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    width: 'w-84 flex-shrink-0',
    visibleInMode: 'all',
    hideHeader: true,
    align: 'end',
    body: album => <RowActions album={album} />,
  },
];

interface Props {
  albums?: Album[];
}
export function ArtistAlbumsTable({albums = []}: Props) {
  const {watch} = useFormContext<UpdateArtistPayload>();
  const artistId = watch('id');
  const {data, sortDescriptor, onSortChange} = useSortableTableData(albums);
  return (
    <div>
      <div className="my-24">
        <div className="flex items-center gap-12">
          <h2 className="text-xl font-semibold">
            <Trans message="Albums" />
          </h2>
          <Button
            variant="outline"
            color="primary"
            size="xs"
            className="ml-auto"
            startIcon={<AddIcon />}
            elementType={artistId ? Link : undefined}
            to={`../../../albums/new?artistId=${artistId}`}
            relative="path"
            disabled={!artistId}
          >
            <Trans message="Add album" />
          </Button>
        </div>

        {!artistId && (
          <div className="flex items-center gap-6 text-sm">
            <InfoDialogTriggerIcon
              viewBox="0 0 16 16"
              size="xs"
              className="text-muted"
            />
            <Trans message="Save changes to enable album creation." />
          </div>
        )}
      </div>

      <Table
        columns={Columns}
        data={albums}
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
        enableSelection={false}
      />

      {!data.length ? (
        <IllustratedMessage
          className="mt-40"
          image={<SvgImage src={musicImage} />}
          title={<Trans message="This artist does not have any albums yet" />}
        />
      ) : null}
    </div>
  );
}

interface RowActionsProps {
  album: Album;
}
function RowActions({album}: RowActionsProps) {
  const deleteAlbum = useDeleteAlbum();
  return (
    <div className="text-muted">
      <Link to={`../../../albums/${album.id}/edit`} relative="path">
        <IconButton size="md">
          <EditIcon />
        </IconButton>
      </Link>
      <DialogTrigger
        type="modal"
        onClose={isConfirmed => {
          if (isConfirmed) {
            deleteAlbum.mutate({albumId: album.id});
          }
        }}
      >
        <IconButton size="md" disabled={deleteAlbum.isPending}>
          <CloseIcon />
        </IconButton>
        <ConfirmationDialog
          isDanger
          title={<Trans message="Delete album" />}
          body={<Trans message="Are you sure you want to delete this album?" />}
          confirm={<Trans message="Delete" />}
        />
      </DialogTrigger>
    </div>
  );
}
