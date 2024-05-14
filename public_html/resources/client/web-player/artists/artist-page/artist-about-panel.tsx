import {Artist} from '@app/web-player/artists/artist';
import {ImageZoomDialog} from '@common/ui/overlays/dialog/image-zoom-dialog';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {useLinkifiedString} from '@common/utils/hooks/use-linkified-string';
import {useMemo} from 'react';

interface ArtistAboutTabProps {
  artist: Artist;
}
export function ArtistAboutPanel({artist}: ArtistAboutTabProps) {
  const description = useLinkifiedString(artist.profile?.description);

  const images = useMemo(() => {
    return artist.profile_images?.map(img => img.url) || [];
  }, [artist.profile_images]);

  return (
    <div className="">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-24">
        {images.map((src, index) => (
          <DialogTrigger key={src} type="modal">
            <button
              type="button"
              className="outline-none focus-visible:ring cursor-zoom-in rounded overflow-hidden hover:scale-105 transition"
            >
              <img
                className="aspect-video object-cover rounded shadow cursor-zoom-in"
                src={src}
                alt=""
              />
            </button>
            <ImageZoomDialog images={images} defaultActiveIndex={index} />
          </DialogTrigger>
        ))}
      </div>
      <div
        className="py-24 text-sm whitespace-pre-wrap"
        dangerouslySetInnerHTML={{__html: description || ''}}
      />
    </div>
  );
}
