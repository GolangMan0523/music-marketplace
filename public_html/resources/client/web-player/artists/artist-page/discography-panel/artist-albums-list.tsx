import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {Artist} from '@app/web-player/artists/artist';
import {PaginationResponse} from '@common/http/backend-response/pagination-response';
import {Album} from '@app/web-player/albums/album';
import {useArtistAlbums} from '@app/web-player/artists/requests/use-artist-albums';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {AlbumLink} from '@app/web-player/albums/album-link';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Button} from '@common/ui/buttons/button';
import {ArrowDropDownIcon} from '@common/icons/material/ArrowDropDown';
import {Trans} from '@common/i18n/trans';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {NoDiscographyMessage} from '@app/web-player/artists/artist-page/discography-panel/no-discography-message';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {AlbumContextDialog} from '@app/web-player/albums/album-context-dialog';
import {useSortableTableData} from '@common/ui/tables/use-sortable-table-data';

interface ArtistAlbumsListProps {
  artist: Artist;
  initialAlbums: PaginationResponse<Album> | null;
}
export function ArtistAlbumsList({initialAlbums}: ArtistAlbumsListProps) {
  const query = useArtistAlbums(initialAlbums, 'list');
  const {isLoading, items} = query;

  if (!isLoading && !items.length) {
    return <NoDiscographyMessage />;
  }

  return (
    <section>
      {items.map(album => (
        <div key={album.id} className="mb-40">
          <div className="mb-20 items-center gap-14 md:flex">
            <AlbumImage
              album={album}
              size="w-110 h-110"
              className="flex-shrink-0 rounded object-cover"
            />
            <div className="flex-auto">
              <h4 className="min-w-0 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-semibold max-md:mt-12">
                <AlbumLink album={album} />
              </h4>
              {album.release_date && (
                <div className="mb-18 mt-2 text-sm text-muted">
                  <FormattedDate date={album.release_date} />
                </div>
              )}
              <DialogTrigger type="popover" mobileType="tray" offset={10}>
                <Button
                  variant="outline"
                  size="xs"
                  radius="rounded-full"
                  endIcon={<ArrowDropDownIcon />}
                >
                  <Trans message="More" />
                </Button>
                <AlbumContextDialog album={album} />
              </DialogTrigger>
            </div>
          </div>
          <AlbumTrackTable album={album} />
        </div>
      ))}
      <InfiniteScrollSentinel query={query} />
    </section>
  );
}

interface AlbumTrackTableProps {
  album: Album;
}
function AlbumTrackTable({album}: AlbumTrackTableProps) {
  const {data, sortDescriptor, onSortChange} = useSortableTableData(
    album.tracks,
  );
  return (
    <TrackTable
      tracks={data}
      hideArtist
      hideAlbum
      hideTrackImage
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      queueGroupId={queueGroupId(album, '*', sortDescriptor)}
    />
  );
}
