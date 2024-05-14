import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {useContext, useEffect, useRef} from 'react';
import {PlayerStoreContext} from '@common/player/player-context';
import {useHtmlMediaInternalState} from '@common/player/providers/html-media/use-html-media-internal-state';
import {useHtmlMediaEvents} from '@common/player/providers/html-media/use-html-media-events';
import {useHtmlMediaApi} from '@common/player/providers/html-media/use-html-media-api';

export function HtmlVideoProvider() {
  const ref = useRef<HTMLVideoElement>(null);

  const autoPlay = usePlayerStore(s => s.options.autoPlay);
  const muted = usePlayerStore(s => s.muted);
  const cuedMedia = usePlayerStore(s => s.cuedMedia);
  const store = useContext(PlayerStoreContext);

  const state = useHtmlMediaInternalState(ref);
  const events = useHtmlMediaEvents(state);
  const providerApi = useHtmlMediaApi(state);

  useEffect(() => {
    store.setState({
      providerApi,
    });
  }, [store, providerApi]);

  let src = cuedMedia?.src;
  if (src && cuedMedia?.initialTime) {
    src = `${src}#t=${cuedMedia.initialTime}`;
  }

  return (
    <video
      className="w-full h-full"
      ref={ref}
      src={src}
      playsInline
      poster={cuedMedia?.poster}
      autoPlay={autoPlay}
      muted={muted}
      {...events}
    >
      {cuedMedia?.captions?.map((caption, index) => (
        <track
          key={caption.id}
          label={caption.label}
          kind="subtitles"
          srcLang={caption.language || 'en'}
          src={caption.src}
          default={index === 0}
        />
      ))}
    </video>
  );
}
