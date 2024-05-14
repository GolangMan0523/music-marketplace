import {
  ALL_PRIMITIVE_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const ArtistDatatableFilters: BackendFilter[] = [
  {
    key: 'verified',
    label: message('Status'),
    description: message('Whether artist is verified'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: '01',
      options: [
        {
          key: '01',
          label: message('Verified'),
          value: true,
        },
        {
          key: '02',
          label: message('Not verified'),
          value: false,
        },
      ],
    },
  },
  {
    key: 'plays',
    label: message('Plays count'),
    description: message('Number of times artist tracks have been played'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      defaultValue: 100,
    },
  },
  {
    key: 'views',
    label: message('Views count'),
    description: message('Number of times artist page have been viewed'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      defaultValue: 100,
    },
  },
  createdAtFilter({
    description: message('Date artist was created'),
  }),
  updatedAtFilter({
    description: message('Date artist was last updated'),
  }),
];
