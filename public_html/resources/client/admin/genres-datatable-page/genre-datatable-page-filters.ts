import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {message} from '@common/i18n/message';

export const GenreDatatablePageFilters = [
  createdAtFilter({
    description: message('Date genre was created'),
  }),
  updatedAtFilter({
    description: message('Date genre was last updated'),
  }),
];
