import {useContext} from 'react';
import {TableContext} from '@common/ui/tables/table-context';

export interface TrackTableMeta {
  queueGroupId?: string | number;
  hideTrackImage?: boolean;
}

const stableObj = {};

export function useTrackTableMeta() {
  const {meta} = useContext(TableContext);
  return (meta || stableObj) as TrackTableMeta;
}
