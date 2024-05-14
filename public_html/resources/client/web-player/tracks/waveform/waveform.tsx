import {Track} from '@app/web-player/tracks/track';
import {useEffect, useRef, useState} from 'react';
import {drawAnimation} from './waveform-animation';
import {useTrackWaveData} from '@app/web-player/tracks/requests/use-track-wave-data';
import {usePlayerActions} from '@common/player/hooks/use-player-actions';

import {
  WAVE_HEIGHT,
  WAVE_WIDTH,
} from '@app/web-player/tracks/waveform/generate-waveform-data';
import clsx from 'clsx';
import {FormattedDuration} from '@common/i18n/formatted-duration';
import {useSlider} from '@common/ui/forms/slider/use-slider';
import {useThemeSelector} from '@common/ui/themes/theme-selector-context';
import {themeValueToHex} from '@common/ui/themes/utils/theme-value-to-hex';
import {drawWaveform} from '@app/web-player/tracks/waveform/draw-waveform';
import {useTrackSeekbar} from '@app/web-player/player-controls/seekbar/use-track-seekbar';
import {CommentBar} from '@app/web-player/tracks/waveform/comment-bar';
import {useMyContext} from '@app/GlobalContext';

function generateFakeWaveData(
  length: number,
  amplitude: number,
  segments: number,
): number[][] {
  const waveData: number[][] = [];

  for (let i = 0; i < segments; i++) {
    const start = i * (length / segments);
    const end = (i + 1) * (length / segments);
    const startAmplitude = (Math.random() * 0.5 + 0.5) * amplitude; // Random between 0.5 and 1, multiplied by amplitude
    const endAmplitude = (Math.random() * 0.5 + 0.5) * amplitude;

    waveData.push([start, startAmplitude, end - start, endAmplitude]);
  }

  return waveData;
}

const durationClassName =
  'text-[11px] absolute bottom-32 p-3 rounded text-white font-semibold z-30 pointer-events-none bg-black/80';

interface WaveformProps {
  track: Track;
  queue?: Track[];
  className?: string;
}

export function Waveform({track, className}: WaveformProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const {data} = useTrackWaveData(track.id, {enabled: isInView});
  const themeSelector = useThemeSelector();
  const {analyzerData, setAnalyzerData} = useMyContext();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target === ref.current) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {root: document.body},
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fakeWaveData = generateFakeWaveData(500, 50, 550); //

    if (
      canvasRef.current &&
      progressCanvasRef.current &&
      analyzerData.analyzer
    ) {
      drawWaveform(
        fakeWaveData,
        canvasRef.current,
        '#424242',
        5,
        3,
        track.src as string,
        analyzerData,
      );
      drawWaveform(
        fakeWaveData,
        progressCanvasRef.current,
        themeValueToHex('#fff'),
        5,
        3,
        track.src as string,
        analyzerData,
      );
      setIsVisible(true);
    }
  }, [data?.waveData, themeSelector.selectedTheme, track.src, analyzerData]);

  const {value, onChange, onChangeEnd, duration, ...sliderProps} =
    useTrackSeekbar(track);
  const {domProps, groupId, thumbIds, trackRef, getThumbPercent} = useSlider({
    ...sliderProps,
    value: [value],
    onChange: ([newValue]: number[]) => onChange(newValue),
    onChangeEnd: () => onChangeEnd(),
  });

  useEffect(() => {
    const fakeWaveData = generateFakeWaveData(500, 50, 550); //

    if (canvasRef.current && !analyzerData.analyzer) {
      drawAnimation(fakeWaveData, canvasRef.current, '#424242', 5, 3);
    }
  }, []);

  return (
    <section className="relative max-w-full">
      <div
        id={groupId}
        role="group"
        ref={ref}
        className={clsx(
          'relative isolate h-70 cursor-pointer overflow-hidden transition-opacity duration-200 ease-in',
          isVisible ? 'opacity-100' : 'opacity-0',
          className,
        )}
      >
        <output
          className={clsx(durationClassName, 'left-0')}
          htmlFor={thumbIds[0]}
          aria-live="off"
        >
          {value ? <FormattedDuration seconds={value} /> : '0:00'}
        </output>
        <div key="wave" {...domProps} ref={trackRef}>
          <canvas
            ref={canvasRef}
            width={WAVE_WIDTH}
            height={WAVE_HEIGHT / 2 + 25}
          />
          <div
            className="absolute left-0 top-0 z-20 w-5 overflow-hidden"
            style={{width: `${getThumbPercent(0) * 100}%`}}
          >
            <canvas
              ref={progressCanvasRef}
              width={WAVE_WIDTH}
              height={WAVE_HEIGHT / 2 + 25}
              className="wave-canvas"
            />
          </div>
        </div>
        <div className={clsx(durationClassName, 'right-0')}>
          <FormattedDuration seconds={duration} />
        </div>
      </div>
      {data?.comments && <CommentBar comments={data.comments} track={track} />}
    </section>
  );
}
