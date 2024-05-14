import {
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {USER_MODEL} from '@common/auth/user';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const BackstageRequestDatatableFilters: BackendFilter[] = [
  {
    key: 'type',
    label: message('Type'),
    description: message('Type of the request'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'become-artist',
      options: [
        {
          key: 'become-artist',
          label: message('Become artist'),
          value: 'become-artist',
        },
        {
          key: 'verify-artist',
          label: message('Verify artist'),
          value: 'verify-artist',
        },
        {
          key: 'claim-artist',
          label: message('Claim artist'),
          value: 'claim-artist',
        },
      ],
    },
  },
  {
    key: 'status',
    label: message('Status'),
    description: message('Status of the request'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'pending',
      options: [
        {
          key: 'pending',
          label: message('Pending'),
          value: 'pending',
        },
        {
          key: 'approved',
          label: message('Approved'),
          value: 'approved',
        },
        {
          key: 'denied',
          label: message('Denied'),
          value: 'denied',
        },
      ],
    },
  },
  {
    key: 'user_id',
    label: message('Requester'),
    description: message('User that submitted the request'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL,
    },
  },
  createdAtFilter({
    description: message('Date request was created'),
  }),
  updatedAtFilter({
    description: message('Date request was last updated'),
  }),
];
