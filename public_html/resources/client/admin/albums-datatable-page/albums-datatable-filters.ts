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
import {ARTIST_MODEL} from '@app/web-player/artists/artist';

export const AlbumsDatatableFilters: BackendFilter[] = [
  {
    key: 'image',
    label: message('Artwork'),
    description: message('Whether album has any artwork uploaded'),
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
    key: 'plays',
    label: message('Plays count'),
    description: message('Number of times this album was played'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_PRIMITIVE_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      defaultValue: 100,
    },
  },
  createdAtFilter({
    description: message('Date album was created'),
  }),
  updatedAtFilter({
    description: message('Date album was last updated'),
  }),
  {
    defaultOperator: FilterOperator.has,
    key: 'artists',
    label: message('Artist'),
    description: message('Artist this album belongs to'),
    control: {
      type: FilterControlType.SelectModel,
      model: ARTIST_MODEL,
    },
  },
];
