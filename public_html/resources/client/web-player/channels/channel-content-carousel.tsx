import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {IconButton} from '@common/ui/buttons/icon-button';
import {KeyboardArrowRightIcon} from '@common/icons/material/KeyboardArrowRight';
import {KeyboardArrowLeftIcon} from '@common/icons/material/KeyboardArrowLeft';
import {ChannelContentProps} from '@app/web-player/channels/channel-content';
import {ChannelContentGridItem} from '@app/web-player/channels/channel-content-grid-item';
import {ChannelHeading} from '@app/web-player/channels/channel-heading';
import debounce from 'just-debounce-it';

export function ChannelContentCarousel(props: ChannelContentProps) {
  const {channel} = props;
  const ref = useRef<HTMLDivElement>(null);
  const itemWidth = useRef<number>(0);

  const [enablePrev, setEnablePrev] = useState(false);
  const [enableNext, setEnableNext] = useState(true);

  const updateNavStatus = useCallback(() => {
    const el = ref.current;
    if (el && itemWidth.current) {
      setEnablePrev(el.scrollLeft > 0);
      setEnableNext(el.scrollWidth - el.scrollLeft !== el.clientWidth);
    }
  }, []);

  // enable/disable navigation buttons based on element scroll offset
  useEffect(() => {
    const el = ref.current;
    const handleScroll = debounce(() => updateNavStatus(), 100);
    if (el) {
      el.addEventListener('scroll', handleScroll);
    }
    return () => el?.removeEventListener('scroll', handleScroll);
  }, [updateNavStatus]);

  // get width for first grid item
  useLayoutEffect(() => {
    const el = ref.current;
    if (el) {
      const firstGridItem = el.children.item(0);
      const observer = new ResizeObserver(entries => {
        itemWidth.current = entries[0].contentRect.width;
        updateNavStatus();
      });
      if (firstGridItem) {
        observer.observe(firstGridItem);
      }
      return () => observer.unobserve(el);
    }
  }, [updateNavStatus]);

  const scrollAmount = () => {
    return itemWidth.current * (3 - 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-24 mb-14">
        <ChannelHeading {...props} margin="mb-4" />
        <div>
          <IconButton
            disabled={!enablePrev}
            onClick={() => {
              if (ref.current) {
                ref.current.scrollBy({left: -scrollAmount()});
              }
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton
            disabled={!enableNext}
            onClick={() => {
              if (ref.current) {
                ref.current.scrollBy({left: scrollAmount()});
              }
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
      </div>
      <div
        ref={ref}
        className="content-carousel content-grid relative w-full grid grid-flow-col grid-rows-[auto] overflow-x-auto overflow-y-hidden gap-24 snap-always snap-x snap-mandatory hidden-scrollbar scroll-smooth"
      >
        {channel.content?.data.map(item => (
          <ChannelContentGridItem
            key={`${item.id}-${item.model_type}`}
            item={item}
            items={channel.content?.data}
          />
        ))}
      </div>
    </div>
  );
}
