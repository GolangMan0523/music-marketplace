import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {useContext, useEffect, useRef} from 'react';
import {PlayerStoreContext} from '@common/player/player-context';
import {useHtmlMediaInternalState} from '@common/player/providers/html-media/use-html-media-internal-state';
import {useHtmlMediaEvents} from '@common/player/providers/html-media/use-html-media-events';
import {useHtmlMediaApi} from '@common/player/providers/html-media/use-html-media-api';
import {useMyContext} from '@app/GlobalContext';

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export function HtmlAudioProvider() {
  const ref = useRef<HTMLAudioElement>(null);
  const dataREf = useRef<any>(null);
  let previousSrc: string | null = null;

  const {analyzerData, setAnalyzerData} = useMyContext();

  const autoPlay = usePlayerStore(s => s.options.autoPlay);
  const muted = usePlayerStore(s => s.muted);
  const cuedMedia = usePlayerStore(s => s.cuedMedia);
  const store = useContext(PlayerStoreContext);

  const state = useHtmlMediaInternalState(ref);
  const events = useHtmlMediaEvents(state);
  const providerApi = useHtmlMediaApi(state);

  const audioAnalyzer = async () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioCtx.createAnalyser();

    analyzer.fftSize = 2048;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    if (ref.current && ref.current.src) {
      const source = audioCtx.createMediaElementSource(ref.current);
      source.connect(analyzer);
      source.connect(audioCtx.destination);
    }
    if (ref.current && !ref.current.paused) {
      setAnalyzerData({analyzer, bufferLength, dataArray, audioCtx});
    }

    const logAudioData = () => {
      if (ref.current && !ref.current.paused) {
        analyzer.getByteFrequencyData(dataArray);
      }

      // Use the analyzer from the state directly
      requestAnimationFrame(logAudioData);
    };

    // Start logging the data
    logAudioData();
  };

  useEffect(() => {
    store.setState({
      providerApi,
    });
  }, [store, providerApi]);

  useEffect(() => {
    if (ref.current) {
      // Check if the current song source is different from the previous one
      if (cuedMedia?.src !== previousSrc) {
        // Update the previous song URL with the current one
        previousSrc = cuedMedia?.src as any;
        // Assign the onplay event to trigger audioAnalyzer
        ref.current.onplay = audioAnalyzer;
      }
    }
  }, [cuedMedia?.src]); // Adjust dependencies based on your needs

  let src = cuedMedia?.src;
  if (src && cuedMedia?.initialTime) {
    src = `${src}#t=${cuedMedia.initialTime}`;
  }

  return (
    <audio
      className="h-full w-full"
      ref={ref}
      src={src}
      autoPlay={autoPlay}
      muted={muted}
      {...events}
    />
  );
}
