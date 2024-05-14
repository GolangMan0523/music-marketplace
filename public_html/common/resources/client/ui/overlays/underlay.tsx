import {m} from 'framer-motion';
import clsx from 'clsx';
import {ComponentPropsWithoutRef} from 'react';
import {opacityAnimation} from '../animation/opacity-animation';

interface UnderlayProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  position?: 'fixed' | 'absolute';
  className?: string;
  isTransparent?: boolean;
  disableInitialTransition?: boolean;
}
export function Underlay({
  position = 'absolute',
  className,
  isTransparent = false,
  disableInitialTransition,
  ...domProps
}: UnderlayProps) {
  return (
    <m.div
      {...domProps}
      className={clsx(
        className,
        !isTransparent && 'bg-background/80',
        'inset-0 z-10 h-full w-full',
        position,
        'backdrop-blur-sm'
      )}
      aria-hidden
      initial={disableInitialTransition ? undefined : {opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      {...opacityAnimation}
      transition={{duration: 0.15}}
    />
  );
}
