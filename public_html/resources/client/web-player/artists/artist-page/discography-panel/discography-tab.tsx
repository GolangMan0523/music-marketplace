import {Artist} from '@app/web-player/artists/artist';
import {Trans} from '@common/i18n/trans';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {Link} from 'react-router-dom';
import {getArtistLink} from '@app/web-player/artists/artist-link';
import {TopTracksTable} from '@app/web-player/artists/artist-page/discography-panel/top-tracks-table';
import {ArtistAlbumsList} from '@app/web-player/artists/artist-page/discography-panel/artist-albums-list';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ViewAgendaIcon} from '@common/icons/material/ViewAgenda';
import {GridViewIcon} from '@common/icons/material/GridView';
import {ArtistAlbumsGrid} from '@app/web-player/artists/artist-page/discography-panel/artist-albums-grid';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {
  albumGridViewPerPage,
  albumListViewPerPage,
} from '@app/web-player/artists/requests/use-artist-albums';
import {useSettings} from '@common/core/settings/use-settings';
import {AdHost} from '@common/admin/ads/ad-host';
import React from 'react';
import {
  albumLayoutKey,
  UseArtistResponse,
} from '@app/web-player/artists/requests/use-artist';
import {useCookie} from '@common/utils/hooks/use-cookie';

interface DiscographyTabProps {
  data: UseArtistResponse;
}
export function DiscographyTab({
  data: {artist, albums, selectedAlbumLayout},
}: DiscographyTabProps) {
  const {player} = useSettings();
  const [viewMode, setViewMode] = useCookie(
    albumLayoutKey,
    selectedAlbumLayout || player?.default_artist_view || 'list',
  );
  return (
    <div>
      <Header artist={artist} />
      <AdHost slot="artist_bottom" className="mt-34" />
      <div className="mt-44">
        <div className="mb-30 flex items-center border-b pb-4 text-muted">
          <h2 className="mr-auto text-base">
            <Trans message="Albums" />
          </h2>
          <Tooltip label={<Trans message="List view" />}>
            <IconButton
              className="ml-24 flex-shrink-0"
              color={viewMode === 'list' ? 'primary' : undefined}
              onClick={() => setViewMode('list')}
            >
              <ViewAgendaIcon />
            </IconButton>
          </Tooltip>
          <Tooltip label={<Trans message="Grid view" />}>
            <IconButton
              className="flex-shrink-0"
              color={viewMode === 'grid' ? 'primary' : undefined}
              onClick={() => setViewMode('grid')}
            >
              <GridViewIcon />
            </IconButton>
          </Tooltip>
        </div>
        {viewMode === 'list' ? (
          <ArtistAlbumsList
            artist={artist}
            initialAlbums={
              albums?.per_page === albumListViewPerPage ? albums : null
            }
          />
        ) : (
          <ArtistAlbumsGrid
            artist={artist}
            initialAlbums={
              albums?.per_page === albumGridViewPerPage ? albums : null
            }
          />
        )}
      </div>
    </div>
  );
}

interface HeaderProps {
  artist: Artist;
}
function Header({artist}: HeaderProps) {
  if (!artist.top_tracks?.length) return null;
  const similarArtists = artist.similar?.slice(0, 4) || [];

  return (
    <div className="flex items-start gap-30">
      <TopTracksTable tracks={artist.top_tracks} />
      {similarArtists.length ? (
        <div className="w-1/3 max-w-320 max-md:hidden">
          <h2 className="my-16 text-base text-muted">
            <Trans message="Similar artists" />
          </h2>
          <div>
            {similarArtists.map(similar => (
              <Link
                key={similar.id}
                to={getArtistLink(similar)}
                className="mb-4 flex cursor-pointer items-center gap-14 rounded p-4 hover:bg-hover"
              >
                <SmallArtistImage
                  artist={similar}
                  className="h-44 w-44 rounded-full object-cover"
                />
                <div className="text-sm">{similar.name}</div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
