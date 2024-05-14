import {FormattedCurrency} from './formatted-currency';
import React from 'react';
import {Price} from '../billing/price';
import {Trans} from './trans';
import clsx from 'clsx';

interface FormattedPriceProps {
  price?: Omit<Price, 'id'>;
  variant?: 'slash' | 'separateLine';
  className?: string;
  priceClassName?: string;
  periodClassName?: string;
}

export function FormattedPrice({
  price,
  variant = 'slash',
  className,
  priceClassName,
  periodClassName,
}: FormattedPriceProps) {
  if (!price) return null;

  const translatedInterval = <Trans message="month" />;

  let monthlyAmount = price.amount / (price.interval_count ?? 1);
  if (price.interval === 'year') {
    // Convert yearly price to monthly because price per month is less when billed yearly
    monthlyAmount /= 12;
  }

  return (
    <div className={clsx('flex gap-6 items-center', className)}>
      <div className={priceClassName}>
        <FormattedCurrency
          value={monthlyAmount}
          currency={price.currency}
          currency_position={price.currency_position}
        />
        <span className="" style={{color: '#FFFFFF84'}}>
          {' '}
          /
        </span>
      </div>
      {variant === 'slash' ? (
        <div className={periodClassName}>
          {' '}
          <Trans message={price.interval} />
        </div>
      ) : (
        <div className={periodClassName}>
          <Trans message="per" /> <br /> {translatedInterval}
        </div>
      )}
    </div>
  );
}
