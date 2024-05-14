import {Fragment, memo} from 'react';
import {useNumberFormatter} from './use-number-formatter';

interface FormattedCurrencyProps {
  value: number;
  currency: string;
  currency_position: boolean;
}

export const FormattedCurrency = memo(
  ({ value, currency, currency_position }: FormattedCurrencyProps) => {
    const formatter = useNumberFormatter({
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 0, // Set minimum fraction digits to 0 to remove decimals
      maximumFractionDigits: 0, // Set maximum fraction digits to 0 to remove decimals
    });

    if (isNaN(value)) {
      value = 0;
    }

    const formatted = formatter.format(value);

    let result = formatted;

    if (currency_position) {
      // If currency should be before the number
      const symbolMatch = formatted.match(/[^0-9.,\s]/g);
      const symbol = symbolMatch ? symbolMatch.join('') : '';
      const number = formatted.replace(/[^0-9.,]/g, '').trim();
      result = `${symbol} ${number}`.trim();
    } else {
      // If currency should be after the number
      const symbolMatch = formatted.match(/[^0-9.,]/g);
      const symbol = symbolMatch ? symbolMatch.join('') : '';
      const number = formatted.replace(/[^0-9.,]/g, '').trim();
      result = `${number} ${symbol}`.trim();
    }

    return <Fragment>{result}</Fragment>;
  }
);
