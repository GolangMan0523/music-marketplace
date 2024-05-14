import {
  ALL_PRIMITIVE_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {ARTIST_MODEL} from '@app/web-player/artists/artist';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const TracksDatatableFilters: BackendFilter[] = [
  {
    key: 'image',
    label: message('Artwork'),
    description: message('Whether track has any artwork uploaded'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: '02',
      options: [
        {
          key: '01',
          label: message('Has artwork'),
          value: false,
        },
        {
          key: '02',
          label: message('Does not have artwork'),
          value: true,
        },
      ],
    },
  },
  {
    key: 'album_id',
    label: message('Album'),
    description: message('Whether track is part of an album'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: '01',
      options: [
        {
          key: '01',
          label: message('Part of an album'),
          value: {operator: FilterOperator.ne, value: null},
        },
        {
          key: '02',
          label: message('Single'),
          value: {operator: FilterOperator.eq, value: null},
        },
      ],
    },
  },
  {
    key: 'plays',
    label: message('Plays count'),
    description: message('Number of times this track was played'),
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
  {
    defaultOperator: FilterOperator.has,
    key: 'artists',
    label: message('Artist'),
    description: message('Artist this track belongs to'),
    control: {
      type: FilterControlType.SelectModel,
      model: ARTIST_MODEL,
    },
  },
];
