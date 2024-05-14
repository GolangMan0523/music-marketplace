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
import {Artist} from '@app/web-player/artists/artist';
import {BarChartIcon} from '@common/icons/material/BarChart';

export const ArtistDatatableColumns: ColumnConfig<Artist>[] = [
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Artist" />,
    width: 'flex-3',
    visibleInMode: 'all',
    body: artist => (
      <div className="flex items-center gap-12 w-max">
        <SmallArtistImage
          artist={artist}
          className="flex-shrink-0"
          size="w-34 h-34 rounded"
        />
        <ArtistLink artist={artist} target="_blank" />
      </div>
    ),
  },
  {
    key: 'albums_count',
    allowsSorting: true,
    header: () => <Trans message="Album count" />,
    body: artist =>
      artist.albums_count ? (
        <FormattedNumber value={artist.albums_count} />
      ) : null,
  },
  {
    key: 'plays',
    allowsSorting: true,
    header: () => <Trans message="Total plays" />,
    body: artist =>
      artist.plays ? <FormattedNumber value={artist.plays} /> : null,
  },
  {
    key: 'views',
    allowsSorting: true,
    header: () => <Trans message="Page views" />,
    body: artist =>
      artist.views ? <FormattedNumber value={artist.views} /> : null,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    maxWidth: 'max-w-100',
    header: () => <Trans message="Last updated" />,
    body: artist =>
      artist.updated_at ? <FormattedDate date={artist.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    visibleInMode: 'all',
    align: 'end',
    width: 'w-84 flex-shrink-0',
    body: artist => (
      <div className="text-muted">
        <IconButton size="md" elementType={Link} to={`${artist.id}/insights`}>
          <BarChartIcon />
        </IconButton>
        <IconButton size="md" elementType={Link} to={`${artist.id}/edit`}>
          <EditIcon />
        </IconButton>
      </div>
    ),
  },
];
