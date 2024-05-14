import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Link} from 'react-router-dom';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import React from 'react';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {ArtistLink} from '@app/web-player/artists/artist-link';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {Album} from '@app/web-player/albums/album';
import {AlbumLink} from '@app/web-player/albums/album-link';
import {BarChartIcon} from '@common/icons/material/BarChart';

export const AlbumsDatatableColumns: ColumnConfig<Album>[] = [
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Album" />,
    width: 'flex-3',
    visibleInMode: 'all',
    body: album => (
      <div className="flex items-center gap-12">
        <AlbumImage
          album={album}
          className="flex-shrink-0"
          size="w-34 h-34 rounded"
        />
        <AlbumLink album={album} target="_blank" />
      </div>
    ),
  },
  {
    key: 'artist',
    allowsSorting: false,
    header: () => <Trans message="Artist" />,
    width: 'flex-2',
    body: album => {
      if (!album.artists?.[0]) return null;
      return (
        <div className="flex items-center gap-12">
          <SmallArtistImage
            artist={album.artists[0]}
            className="flex-shrink-0 rounded"
            size="w-34 h-34"
          />
          <ArtistLink artist={album.artists[0]} />
        </div>
      );
    },
  },
  {
    key: 'release_date',
    allowsSorting: true,
    minWidth: 'min-w-100',
    header: () => <Trans message="Release date" />,
    body: album =>
      album.release_date ? <FormattedDate date={album.release_date} /> : null,
  },
  {
    key: 'track_count',
    allowsSorting: false,
    minWidth: 'min-w-70',
    header: () => <Trans message="Track count" />,
    body: album =>
      album.tracks_count ? (
        <FormattedNumber value={album.tracks_count} />
      ) : null,
  },
  {
    key: 'plays',
    allowsSorting: true,
    header: () => <Trans message="Plays" />,
    minWidth: 'min-w-70',
    body: album =>
      album.plays ? <FormattedNumber value={album.plays} /> : null,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-100',
    header: () => <Trans message="Last updated" />,
    body: album =>
      album.updated_at ? <FormattedDate date={album.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    visibleInMode: 'all',
    align: 'end',
    width: 'w-84 flex-shrink-0',
    body: album => (
      <div className="text-muted">
        <IconButton size="md" elementType={Link} to={`${album.id}/insights`}>
          <BarChartIcon />
        </IconButton>
        <IconButton size="md" elementType={Link} to={`${album.id}/edit`}>
          <EditIcon />
        </IconButton>
      </div>
    ),
  },
];
