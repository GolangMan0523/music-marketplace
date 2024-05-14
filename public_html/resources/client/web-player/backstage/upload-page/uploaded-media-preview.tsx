import {Track} from '@app/web-player/tracks/track';
import {Album, ALBUM_MODEL} from '@app/web-player/albums/album';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {ChipList} from '@common/ui/forms/input-field/chip-field/chip-list';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {Trans} from '@common/i18n/trans';
import {Link} from 'react-router-dom';
import {getTrackLink} from '@app/web-player/tracks/track-link';
import {getAlbumLink} from '@app/web-player/albums/album-link';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import clsx from 'clsx';
import albumBorderImage from './album-border.png';
import {ShareMediaButtons} from '@app/web-player/sharing/share-media-buttons';

interface UploadedMediaPreviewProps {
  media: Track | Album;
}
export function UploadedMediaPreview({media}: UploadedMediaPreviewProps) {
  const isAlbum = media.model_type === ALBUM_MODEL;
  const absoluteLink = isAlbum
    ? getAlbumLink(media, {absolute: true})
    : getTrackLink(media, {absolute: true});

  return (
    <div className="flex items-center gap-28 border rounded bg-background p-20 my-20 mx-auto w-780 max-w-full">
      <div className={clsx(isAlbum && 'relative isolate my-14 mx-18')}>
        {isAlbum ? (
          <AlbumImage
            album={media}
            className="rounded flex-shrink-0 z-20 relative"
            size="w-132 h-132"
          />
        ) : (
          <TrackImage
            track={media}
            className="rounded flex-shrink-0 z-20 relative"
            size="w-132 h-132"
          />
        )}
        {isAlbum && (
          <img
            className="absolute block w-160 h-160 max-w-160 -top-14 -left-14 z-10"
            src={albumBorderImage}
            alt=""
          />
        )}
      </div>
      <div className="flex-auto">
        <div className="text-base font-bold">{media.name}</div>
        <div className="text-muted text-sm mb-14">
          <ArtistLinks artists={media.artists} />
        </div>
        {media.genres?.length ? (
          <ChipList selectable={false} size="sm" className="mb-14">
            {media.genres?.map(genre => {
              return (
                <Chip key={genre.id}>{genre.display_name || genre.name}</Chip>
              );
            })}
          </ChipList>
        ) : null}
        <div className="text-sm">
          <Trans
            message="Upload complete. <a>Go to your track</a>"
            values={{
              a: parts => (
                <Link
                  className={LinkStyle}
                  to={isAlbum ? getAlbumLink(media) : getTrackLink(media)}
                >
                  {parts}
                </Link>
              ),
            }}
          />
        </div>
      </div>
      <div className="ml-auto flex-auto max-w-300">
        <div className="text-muted text-sm">
          <Trans message="Share your new track" />
          <ShareMediaButtons
            name={media.name}
            image={media.image}
            link={absoluteLink}
          />
          <TextField
            value={absoluteLink}
            readOnly
            className="mt-24 w-full"
            size="sm"
            onClick={e => {
              (e.target as HTMLInputElement).select();
            }}
          />
        </div>
      </div>
    </div>
  );
}
