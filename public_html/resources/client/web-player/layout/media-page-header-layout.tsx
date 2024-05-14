import React, {cloneElement, ReactElement, ReactNode} from 'react';
import clsx from 'clsx';

interface MediaPageHeaderLayoutProps {
  className?: string;
  image: ReactElement<{size: string; className?: string}>;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  actionButtons?: ReactNode;
  centerItems?: boolean;
  footer?: ReactNode;
}
export function MediaPageHeaderLayout({
  className,
  image,
  title,
  subtitle,
  description,
  actionButtons,
  footer,
  centerItems = false,
}: MediaPageHeaderLayoutProps) {
  return (
    <header
      className={clsx(
        'flex flex-col md:flex-row gap-24 md:gap-34',
        centerItems && 'items-center',
        className
      )}
    >
      {cloneElement(image, {
        size: image.props.size || 'w-256 h-256',
        className: clsx(image.props.className, 'mx-auto flex-shrink-0'),
      })}
      <div className="flex-auto min-w-0">
        <h1 className="text-2xl md:text-4xl font-semibold mb-14 text-center md:text-start">
          {title}
        </h1>
        {subtitle && <div className="w-max mx-auto md:mx-0">{subtitle}</div>}
        {description ? (
          <div className="text-muted mt-18 md:mt-26 text-sm w-max mx-auto md:mx-0">
            {description}
          </div>
        ) : null}
        <div className="mt-30">{actionButtons}</div>
        {footer ? <div className="mt-30">{footer}</div> : null}
      </div>
    </header>
  );
}

interface ActionButtonClassNameProps {
  isFirst?: boolean;
}
export function actionButtonClassName({
  isFirst,
}: ActionButtonClassNameProps = {}) {
  return clsx('min-h-40', isFirst ? 'min-w-128 mr-20' : 'mr-10 min-w-100');
}
