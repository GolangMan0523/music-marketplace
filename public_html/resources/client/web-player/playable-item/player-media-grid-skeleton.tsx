import {m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {ContentGrid} from '@app/web-player/playable-item/content-grid';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import React from 'react';
import clsx from 'clsx';

interface Props {
  itemCount: number;
  itemRadius?: string;
  showDescription?: boolean;
}
export function PlayableMediaGridSkeleton({
  itemCount,
  itemRadius,
  showDescription = true,
}: Props) {
  return (
    <m.div key="skeletons" {...opacityAnimation}>
      <ContentGrid>
        {[...new Array(Math.min(itemCount, 30)).keys()].map(key => {
          return (
            <div key={key} className="w-full relative">
              <div className="aspect-square w-full">
                <Skeleton variant="rect" radius={itemRadius} />
              </div>
              <div
                className={clsx(
                  'text-xs mt-12',
                  !showDescription && 'pt-[3px]'
                )}
              >
                <Skeleton variant="text" />
                {showDescription && (
                  <Skeleton variant="text" className="mt-[7px]" />
                )}
              </div>
            </div>
          );
        })}
      </ContentGrid>
    </m.div>
  );
}
