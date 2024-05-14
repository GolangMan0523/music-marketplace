import {message} from '@common/i18n/message';
import {
  ALL_PRIMITIVE_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const PlaylistDatatablePageFilters: BackendFilter[] = [
  {
    key: 'public',
    label: message('Visibility'),
    description: message('Whether playlist is publicly viewable'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: '01',
      options: [
        {key: '01', label: message('Private'), value: false},
        {key: '02', label: message('Public'), value: true},
      ],
    },
  },
  {
    key: 'collaborative',
    label: message('Collaborative'),
    description: message('Whether playlist is marked as collaborative'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.BooleanToggle,
      defaultValue: true,
    },
  },
  {
    key: 'plays',
    label: message('Play count'),
    description: message('Number of times this playlist was played'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      defaultValue: 100,
      inputType: 'number',
    },
  },
  {
    key: 'views',
    label: message('View count'),
    description: message('Number of times this playlist page was viewed'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      defaultValue: 100,
    },
  },
  createdAtFilter({
    description: message('Date playlist was created'),
  }),
  updatedAtFilter({
    description: message('Date playlist was last updated'),
  }),
];
