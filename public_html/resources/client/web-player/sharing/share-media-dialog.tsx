import {Artist} from '@app/web-player/artists/artist';
import {Album} from '@app/web-player/albums/album';
import {Track} from '@app/web-player/tracks/track';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {TabPanel, TabPanels} from '@common/ui/tabs/tab-panels';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {getArtistLink} from '@app/web-player/artists/artist-link';
import {getAlbumLink} from '@app/web-player/albums/album-link';
import {getTrackLink} from '@app/web-player/tracks/track-link';
import {Button} from '@common/ui/buttons/button';
import {useRef} from 'react';
import useCopyClipboard from 'react-use-clipboard';
import {ShareMediaButtons} from '@app/web-player/sharing/share-media-buttons';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {Playlist} from '@app/web-player/playlists/playlist';
import {PlaylistImage} from '@app/web-player/playlists/playlist-image';
import {getPlaylistLink} from '@app/web-player/playlists/playlist-link';

interface Props {
  item: Artist | Album | Track | Playlist;
}
export function ShareMediaDialog({item}: Props) {
  const {close} = useDialogContext();
  return (
    <Dialog size="xl">
      <DialogHeader>
        <Trans message="Share :name" values={{name: item.name}} />
      </DialogHeader>
      <DialogBody>
        {item.model_type === 'artist' || item.model_type === 'playlist' ? (
          <SharePanel item={item} />
        ) : (
          <Tabs>
            <TabList>
              <Tab>
                <Trans message="Share" />
              </Tab>
              <Tab>
                <Trans message="Embed" />
              </Tab>
            </TabList>
            <TabPanels className="pt-20">
              <TabPanel>
                <SharePanel item={item} />
              </TabPanel>
              <TabPanel>
                <EmbedPanel item={item} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Close" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function EmbedPanel({item}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const link = `${getLink(item)}/embed`;
  const height = item.model_type === 'track' ? 174 : 384;

  const code = `<iframe width="100%" height="${height}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src="${link}"></iframe>`;

  return (
    <div>
      {!isMobile && (
        <iframe
          src={link}
          width="100%"
          height={height}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )}
      <TextField
        className="mt-20"
        inputElementType="textarea"
        readOnly
        value={code}
        rows={3}
        onClick={e => {
          e.currentTarget.focus();
          e.currentTarget.select();
        }}
      />
    </div>
  );
}

function SharePanel({item}: Props) {
  const link = getLink(item);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, copyLink] = useCopyClipboard(link, {successDuration: 600});
  return (
    <div className="flex items-center gap-14">
      <MediaImage
        item={item}
        size="w-128 h-128"
        className="rounded object-cover flex-shrink-0 max-md:hidden"
      />
      <div className="flex-auto">
        <div className="text-xl mb-8">{item.name}</div>
        <TextField
          className="mb-8"
          inputRef={inputRef}
          readOnly
          onClick={e => {
            e.currentTarget.focus();
            e.currentTarget.select();
          }}
          value={link}
          endAppend={
            <Button
              variant="flat"
              color="primary"
              onClick={() => {
                inputRef.current?.select();
                copyLink();
              }}
            >
              {copied ? <Trans message="Copied!" /> : <Trans message="Copy" />}
            </Button>
          }
        />
        <ShareMediaButtons
          link={link}
          image={'image' in item ? item.image : (item as any).image_small}
          name={item.name}
        />
      </div>
    </div>
  );
}

interface MediaImageProps {
  item: Props['item'];
  className?: string;
  size?: string;
}
function MediaImage({item, className, size}: MediaImageProps) {
  switch (item.model_type) {
    case 'artist':
      return (
        <SmallArtistImage
          size={size}
          className={className}
          wrapperClassName="max-md:hidden"
          artist={item}
        />
      );
    case 'album':
      return <AlbumImage size={size} className={className} album={item} />;
    case 'track':
      return <TrackImage size={size} className={className} track={item} />;
    case 'playlist':
      return (
        <PlaylistImage size={size} className={className} playlist={item} />
      );
  }
}

function getLink(item: Props['item']) {
  switch (item.model_type) {
    case 'artist':
      return getArtistLink(item, {absolute: true});
    case 'album':
      return getAlbumLink(item, {absolute: true});
    case 'track':
      return getTrackLink(item, {absolute: true});
    case 'playlist':
      return getPlaylistLink(item, {absolute: true});
  }
}
