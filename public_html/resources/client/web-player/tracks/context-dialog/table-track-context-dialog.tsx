import {Track} from '@app/web-player/tracks/track';
import {useContext, useMemo} from 'react';
import {TableContext} from '@common/ui/tables/table-context';
import {
  TrackContextDialog,
  TrackContextDialogProps,
} from '@app/web-player/tracks/context-dialog/track-context-dialog';

interface TableTrackContextDialogProps
  extends Omit<TrackContextDialogProps, 'tracks'> {}
export function TableTrackContextDialog({
  children,
  ...props
}: TableTrackContextDialogProps) {
  const {selectedRows, data} = useContext(TableContext);
  const tracks = useMemo(() => {
    return selectedRows
      .map(trackId => data.find(track => track.id === trackId))
      .filter(t => !!t) as Track[];
  }, [selectedRows, data]);
  return (
    <TrackContextDialog {...props} tracks={tracks}>
      {children}
    </TrackContextDialog>
  );
}
