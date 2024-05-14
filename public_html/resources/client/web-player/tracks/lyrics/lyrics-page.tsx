import {
  SyncedLyricResponse,
  useLyrics,
  UseLyricsResponse,
} from '@app/web-player/tracks/lyrics/use-lyrics';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {MediaMicrophoneIcon} from '@common/icons/media/media-microphone';
import {Trans} from '@common/i18n/trans';
import React, {ReactNode, useEffect, useMemo} from 'react';
import clsx from 'clsx';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import {MusicNoteIcon} from '@common/icons/material/MusicNote';
import {useCuedTrack} from '@app/web-player/player-controls/use-cued-track';
import {Track} from '@app/web-player/tracks/track';
import {useCurrentTime} from '@common/player/hooks/use-current-time';
import {usePlayerStore} from '@common/player/hooks/use-player-store';

export function LyricsPage() {
  const track = useCuedTrack();
  return (
    <AnimatePresence initial={false} mode="wait">
      <div>
        {track ? (
          <Lyrics track={track} />
        ) : (
          <NoLyricsMessage
            title={<Trans message="Play a song in order to view lyrics." />}
          />
        )}
      </div>
    </AnimatePresence>
  );
}

interface LyricsProps {
  track: Track;
}
function Lyrics({track}: LyricsProps) {
  const duration = usePlayerStore(s => s.mediaDuration);
  const {data, isLoading} = useLyrics(track.id, {duration});

  if (data) {
    return <SyncedLyrics data={data} />;
  }

  if (isLoading) {
    return <LyricSkeleton />;
  }

  return (
    <NoLyricsMessage
      title={<Trans message="We do not have lyrics for this song yet" />}
      description={<Trans message="Please try again later" />}
    />
  );
}

// calculate currently active line index based on current player time
const calcActiveIndex = (data: SyncedLyricResponse, time: number) => {
  for (let i = 0; i < data.lines.length; i++) {
    if (data.lines[i].time <= time && data.lines[i + 1]?.time > time) {
      return i;
    }
  }
  return null;
};

interface SyncedLyricsProps {
  data: UseLyricsResponse;
}
function SyncedLyrics({data}: SyncedLyricsProps) {
  const duration = usePlayerStore(s => s.mediaDuration);
  const lyricDuration = data.duration;
  // if there's a duration difference of more then 12 seconds between lyrics and media, don't sync
  const shouldSync =
    data.is_synced &&
    (!lyricDuration || Math.abs(lyricDuration - duration) <= 12);
  const currentTime = useCurrentTime({
    precision: 'seconds',
    disabled: !shouldSync,
  });

  const activeIndex = useMemo(
    () =>
      shouldSync
        ? calcActiveIndex(data as SyncedLyricResponse, currentTime)
        : null,
    [data, currentTime, shouldSync],
  );

  // reset index when lyrics change
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(`[data-line-index="${0}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  }, [data]);

  // scroll to active line
  useEffect(() => {
    if (activeIndex != null) {
      document
        .querySelector(`[data-line-index="${activeIndex}"]`)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
    }
  }, [activeIndex]);

  return (
    <LyricsWrapper animationKey="synced-lyrics">
      {data.lines.map((line, index) => {
        const isPast = activeIndex && index < activeIndex;
        const isActive = activeIndex === index;
        return (
          <div
            key={line.time || index}
            data-line-index={index}
            className={clsx(
              'max-md:mb-18 md:leading-[48px]',
              isPast && 'opacity-40',
              isActive && 'text-primary',
            )}
          >
            {line.text || <MusicNoteIcon />}
          </div>
        );
      })}
    </LyricsWrapper>
  );
}

const widths = [40, 55, 70, 80, 90, 100];
function LyricSkeleton() {
  return (
    <LyricsWrapper animationKey="skeletons" width="min-w-[70%]">
      {[...new Array(12).keys()].map(key => (
        <Skeleton
          key={key}
          variant="rect"
          className="mb-14"
          size="h-48 w-full"
          style={{maxWidth: `${widths[key % widths.length]}%`}}
        />
      ))}
    </LyricsWrapper>
  );
}

interface LyricsWrapperProps {
  children: ReactNode;
  animationKey: string;
  width?: string;
}
function LyricsWrapper({
  children,
  animationKey,
  width = 'w-max',
}: LyricsWrapperProps) {
  return (
    <m.div
      key={animationKey}
      {...opacityAnimation}
      className="flex-col items-center justify-start md:flex"
    >
      <div
        className={clsx(
          'max-w-full flex-auto text-2xl md:mx-64 md:text-3xl',
          width,
        )}
      >
        {children}
      </div>
    </m.div>
  );
}

interface NoLyricsMessageProps {
  title: ReactNode;
  description?: ReactNode;
}
function NoLyricsMessage({title, description}: NoLyricsMessageProps) {
  return (
    <m.div key="no-lyrics-message" {...opacityAnimation}>
      <IllustratedMessage
        image={<MediaMicrophoneIcon size="xl" />}
        imageHeight="h-auto"
        title={title}
        description={description}
      />
    </m.div>
  );
}
