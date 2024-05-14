import {ReactNode} from 'react';
import clsx from 'clsx';

export interface SectionHelperProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  color?: 'positive' | 'danger' | 'warning' | 'primary' | 'neutral' | 'bgAlt';
  className?: string;
  size?: 'sm' | 'md';
}
export function SectionHelper({
  title,
  description,
  actions,
  color = 'primary',
  className,
  size = 'md',
}: SectionHelperProps) {
  return (
    <div
      className={clsx(
        className,
        'rounded p-10',
        size === 'sm' ? 'text-xs' : 'text-sm',
        color === 'positive' && 'bg-positive/focus',
        color === 'warning' && 'bg-warning/focus',
        color === 'danger' && 'bg-danger/focus',
        color === 'primary' && 'bg-primary/focus',
        color === 'neutral' && 'border bg',
        color === 'bgAlt' && 'border bg-alt',
      )}
    >
      {title && <div className="mb-4 font-medium">{title}</div>}
      {description && <div>{description}</div>}
      {actions && <div className="mt-14">{actions}</div>}
    </div>
  );
}
