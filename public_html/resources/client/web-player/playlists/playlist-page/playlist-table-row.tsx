import {RowElementProps} from '@common/ui/tables/table-row';
import {Track} from '@app/web-player/tracks/track';
import {useIsTouchDevice} from '@common/utils/hooks/is-touch-device';
import React, {Fragment, useContext, useRef} from 'react';
import {TableContext} from '@common/ui/tables/table-context';
import {DragPreviewRenderer} from '@common/ui/interactions/dnd/use-draggable';
import {useReorderPlaylistTracks} from '@app/web-player/playlists/requests/use-reorder-playlist-tracks';
import {usePlaylist} from '@app/web-player/playlists/requests/use-playlist';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {mergeProps} from '@react-aria/utils';
import {PlaylistTrackContextDialog} from '@app/web-player/playlists/playlist-page/playlist-track-context-dialog';
import {Trans} from '@common/i18n/trans';
import {DragPreview} from '@common/ui/interactions/dnd/drag-preview';
import {useSortable} from '@common/ui/interactions/dnd/sortable/use-sortable';

export function PlaylistTableRow({
  item,
  children,
  className,
  ...domProps
}: RowElementProps<Track>) {
  const isTouchDevice = useIsTouchDevice();
  const {
    data: tracks,
    selectRow,
    selectedRows,
    sortDescriptor,
  } = useContext(TableContext);
  const domRef = useRef<HTMLTableRowElement>(null);
  const previewRef = useRef<DragPreviewRenderer>(null);
  const reorderTracks = useReorderPlaylistTracks();
  const {data} = usePlaylist({loader: 'playlistPage'});

  const {sortableProps} = useSortable({
    ref: domRef,
    disabled:
      (isTouchDevice ?? false) ||
      reorderTracks.isPending ||
      // disable drag and drop if table is sorted via header
      sortDescriptor?.orderBy !== 'position',
    item: item,
    items: tracks,
    type: 'playlistTrack',
    preview: previewRef,
    strategy: 'line',
    onDragEnd: () => {
      selectRow(null);
    },
    onSortStart: () => {
      // if dragging a row that is already selected, do nothing,
      // otherwise deselect all other rows and select this one
      if (!selectedRows.includes(item.id)) {
        selectRow(item);
      }
    },
    onSortEnd: (oldIndex, newIndex) => {
      reorderTracks.mutate({
        tracks: tracks as Track[],
        oldIndexes:
          selectedRows.length > 1
            ? selectedRows.map(id => tracks.findIndex(t => t.id === id))
            : oldIndex,
        newIndex,
      });
    },
  });

  return (
    <Fragment>
      <DialogTrigger
        type="popover"
        triggerOnContextMenu
        placement="bottom-start"
      >
        <div
          className={className}
          ref={domRef}
          {...mergeProps(sortableProps, domProps)}
        >
          {children}
        </div>
        <PlaylistTrackContextDialog playlist={data!.playlist} />
      </DialogTrigger>
      {!item.isPlaceholder && <RowDragPreview track={item} ref={previewRef} />}
    </Fragment>
  );
}

interface RowDragPreviewProps {
  track: Track;
}
const RowDragPreview = React.forwardRef<
  DragPreviewRenderer,
  RowDragPreviewProps
>(({track}, ref) => {
  const {selectedRows} = useContext(TableContext);

  const content =
    selectedRows.length > 1 ? (
      <Trans message=":count tracks" values={{count: selectedRows.length}} />
    ) : (
      `${track.name} - ${track.artists?.[0]?.name}`
    );

  return (
    <DragPreview ref={ref}>
      {() => (
        <div
          className="rounded bg-chip p-8 text-base shadow"
          role="presentation"
        >
          {content}
        </div>
      )}
    </DragPreview>
  );
});
