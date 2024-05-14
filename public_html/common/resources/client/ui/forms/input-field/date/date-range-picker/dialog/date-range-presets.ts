import {DateRangeValue} from '../date-range-value';
import {message} from '@common/i18n/message';
import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  now,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from '@internationalized/date';
import {startOfDay} from '@common/utils/date/start-of-day';
import {endOfDay} from '@common/utils/date/end-of-day';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';
import {getUserTimezone} from '@common/i18n/get-user-timezone';

const Now = startOfDay(now(getUserTimezone()));
const locale = getBootstrapData()?.i18n?.language || 'en';

export interface DateRangePreset {
  key: number;
  label: MessageDescriptor;
  getRangeValue: () => DateRangeValue;
}

export const DateRangePresets: DateRangePreset[] = [
  {
    key: 0,
    label: message('Today'),
    getRangeValue: () => ({
      preset: 0,
      start: Now,
      end: endOfDay(Now),
    }),
  },
  {
    key: 1,
    label: message('Yesterday'),
    getRangeValue: () => ({
      preset: 1,
      start: Now.subtract({days: 1}),
      end: endOfDay(Now).subtract({days: 1}),
    }),
  },
  {
    key: 2,
    label: message('This week'),
    getRangeValue: () => ({
      preset: 2,
      start: startOfWeek(Now, locale),
      end: endOfWeek(endOfDay(Now), locale),
    }),
  },
  {
    key: 3,
    label: message('Last week'),
    getRangeValue: () => {
      const start = startOfWeek(Now, locale).subtract({days: 7});
      return {
        preset: 3,
        start,
        end: start.add({days: 6}),
      };
    },
  },
  {
    key: 4,
    label: message('Last 7 days'),
    getRangeValue: () => ({
      preset: 4,
      start: Now.subtract({days: 7}),
      end: endOfDay(Now),
    }),
  },
  {
    key: 6,
    label: message('Last 30 days'),
    getRangeValue: () => ({
      preset: 6,
      start: Now.subtract({days: 30}),
      end: endOfDay(Now),
    }),
  },
  {
    key: 7,
    label: message('Last 3 months'),
    getRangeValue: () => ({
      preset: 7,
      start: Now.subtract({months: 3}),
      end: endOfDay(Now),
    }),
  },
  {
    key: 8,
    label: message('Last 12 months'),
    getRangeValue: () => ({
      preset: 8,
      start: Now.subtract({months: 12}),
      end: endOfDay(Now),
    }),
  },
  {
    key: 9,
    label: message('This month'),
    getRangeValue: () => ({
      preset: 9,
      start: startOfMonth(Now),
      end: endOfMonth(endOfDay(Now)),
    }),
  },
  {
    key: 10,
    label: message('This year'),
    getRangeValue: () => ({
      preset: 10,
      start: startOfYear(Now),
      end: endOfYear(endOfDay(Now)),
    }),
  },
  {
    key: 11,
    label: message('Last year'),
    getRangeValue: () => ({
      preset: 11,
      start: startOfYear(Now).subtract({years: 1}),
      end: endOfYear(endOfDay(Now)).subtract({years: 1}),
    }),
  },
];
