import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {message} from '@common/i18n/message';

export const LyricDatatablePageFilters = [
  createdAtFilter({
    description: message('Date lyric was created'),
  }),
  updatedAtFilter({
    description: message('Date lyric was last updated'),
  }),
];
