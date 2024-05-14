import React, {useContext} from 'react';
import {GetDatatableDataParams} from '../requests/paginated-resources';
import {UseQueryResult} from '@tanstack/react-query';
import {PaginatedBackendResponse} from '../../http/backend-response/pagination-response';

export interface DataTableContextValue {
  selectedRows: (string | number)[];
  setSelectedRows: (keys: (string | number)[]) => void;
  endpoint: string;
  params: GetDatatableDataParams;
  setParams: (value: GetDatatableDataParams) => void;
  query: UseQueryResult<PaginatedBackendResponse<unknown>, unknown>;
}

export const DataTableContext = React.createContext<DataTableContextValue>(
  null!
);

export function useDataTable() {
  return useContext(DataTableContext);
}
