import {observeElementOffset, useVirtualizer} from '@tanstack/react-virtual';
import React, {Fragment, useContext, useEffect, useRef} from 'react';
import {TableRow} from '@common/ui/tables/table-row';
import {TableBodyProps} from '@common/ui/tables/table';
import {getScrollParent} from '@react-aria/utils';
import {TableContext} from '@common/ui/tables/table-context';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {UseInfiniteQueryResult} from '@tanstack/react-query/src/types';

interface VirtualTableBodyProps extends TableBodyProps {
  totalItems?: number;
  query: UseInfiniteQueryResult;
}
export function VirtualTableBody({
  renderRowAs,
  totalItems = 0,
  query,
}: VirtualTableBodyProps) {
  const {data} = useContext(TableContext);

  // make sure we are not rendering more placeholder rows than
  // there are items left to lazy load and at most 10 placeholders.
  // If total items is unknown, we will render 10 placeholders.
  const placeholderRowCount =
    totalItems <= 0 ? 10 : Math.min(totalItems - data.length, 10);

  // only use virtualizer if playlist has more than 3 pages
  return totalItems < 91 ? (
    <Body
      placeholderRowCount={placeholderRowCount}
      renderRowAs={renderRowAs}
      query={query}
    />
  ) : (
    <VirtualizedBody
      placeholderRowCount={placeholderRowCount}
      renderRowAs={renderRowAs}
      query={query}
    />
  );
}

interface BodyProps extends TableBodyProps {
  placeholderRowCount: number;
  query: UseInfiniteQueryResult;
}
function Body({renderRowAs, placeholderRowCount, query}: BodyProps) {
  const {data} = useContext(TableContext);
  return (
    <Fragment>
      {data.map((track, index) => (
        <TableRow
          item={track}
          index={index}
          key={track.id}
          renderAs={renderRowAs}
        />
      ))}
      <Sentinel
        dataCount={data.length}
        placeholderRowCount={placeholderRowCount}
        query={query}
      />
    </Fragment>
  );
}

function VirtualizedBody({renderRowAs, placeholderRowCount, query}: BodyProps) {
  const {data} = useContext(TableContext);
  const bodyRef = useRef<HTMLTableSectionElement>(null);
  const scrollableRef = useRef<Element>(null!);
  const scrollOffset = useRef(0);

  // virtualizer will not work with "getScrollElement: () => scrollableRef.current"
  // if scrollableRef.current is set in useEffect and is null on first render
  const getScrollElement = () => {
    if (scrollableRef.current) {
      return scrollableRef.current;
    }
    if (bodyRef.current) {
      scrollableRef.current = getScrollParent(bodyRef.current);
    }
    return scrollableRef.current;
  };

  useEffect(() => {
    if (bodyRef.current) {
      scrollOffset.current =
        bodyRef.current.getBoundingClientRect().top +
        getScrollElement().scrollTop;
    }
  }, [bodyRef]);

  const virtualizer = useVirtualizer({
    overscan: 10,
    count: data.length,
    getScrollElement,
    estimateSize: () => 48,
    // getScrollElement: () => scrollableRef.current,
    observeElementOffset: (instance, cb) => {
      return observeElementOffset(instance, (offset, isScrolling) => {
        cb(offset, isScrolling); // Pass both offset and isScrolling arguments
      });
    },
  });

  const virtualRows = virtualizer.getVirtualItems();
  const virtualHeight = `${
    virtualizer.getTotalSize() +
    // if showing placeholder rows, extended height of virtual list to show them
    (query.isFetchingNextPage ? placeholderRowCount * 48 : 0)
  }px`;

  return (
    <div
      ref={bodyRef}
      role="presentation"
      className="relative w-full"
      style={{
        height: virtualHeight,
      }}
    >
      {virtualRows.map(virtualItem => {
        const item = data[virtualItem.index];
        return (
          <TableRow
            item={item}
            index={virtualItem.index}
            key={item.id}
            renderAs={renderRowAs}
            className="absolute left-0 top-0 w-full"
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          />
        );
      })}
      <Sentinel
        dataCount={virtualizer.range?.endIndex ?? 0}
        placeholderRowCount={placeholderRowCount}
        query={query}
        style={{
          top: `${virtualizer.getTotalSize()}px`,
        }}
      />
    </div>
  );
}

interface SentinelProps extends BodyProps {
  dataCount: number;
  query: UseInfiniteQueryResult;
  style?: React.CSSProperties;
}
function Sentinel({
  dataCount,
  placeholderRowCount,
  renderRowAs,
  query,
  style,
}: SentinelProps) {
  // show at least one placeholder row always
  return (
    <InfiniteScrollSentinel
      query={query}
      style={style}
      loaderMarginTop="mt-0"
      className="absolute left-0"
    >
      {[...new Array(Math.max(placeholderRowCount, 1)).keys()].map(
        (key, index) => {
          const id = `placeholder-${key}`;
          return (
            <TableRow
              item={{id, isPlaceholder: true}}
              index={dataCount + index}
              key={id}
              renderAs={renderRowAs}
            />
          );
        },
      )}
    </InfiniteScrollSentinel>
  );
}
