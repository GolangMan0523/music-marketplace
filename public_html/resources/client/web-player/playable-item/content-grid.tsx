import {ReactNode} from 'react';
import clsx from 'clsx';

interface PlayableMediaGrid {
  className?: string;
  children: ReactNode;
}
export function ContentGrid({children, className}: PlayableMediaGrid) {
  return (
    <div
      className={clsx(
        'content-grid grid grid-cols-[repeat(var(--nVisibleItems),minmax(0,1fr))] gap-18',
        className
      )}
    >
      {children}
    </div>
  );
}
