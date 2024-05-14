import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Link} from 'react-router-dom';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import React from 'react';
import {Track} from '@app/web-player/tracks/track';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {FormattedDuration} from '@common/i18n/formatted-duration';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {TrackLink} from '@app/web-player/tracks/track-link';
import {ArtistLink} from '@app/web-player/artists/artist-link';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {UpdateLyricDialog} from '@app/admin/lyrics-datatable-page/update-lyric-dialog';
import {CreateLyricDialog} from '@app/admin/lyrics-datatable-page/create-lyric-dialog';
import {ClosedCaptionIcon} from '@common/icons/material/ClosedCaption';
import {BarChartIcon} from '@common/icons/material/BarChart';

export const TracksDatatableColumns: ColumnConfig<Track>[] = [
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Track" />,
    width: 'flex-3 min-w-200',
    visibleInMode: 'all',
    body: track => (
      <div className="flex items-center gap-12">
        <TrackImage
          track={track}
          className="flex-shrink-0"
          size="w-34 h-34 rounded"
        />
        <TrackLink track={track} target="_blank" />
      </div>
    ),
  },
  {
    key: 'artist',
    allowsSorting: false,
    header: () => <Trans message="Artist" />,
    width: 'flex-2',
    body: track => {
      if (!track.artists?.[0]) return null;
      return (
        <div className="flex items-center gap-12">
          <SmallArtistImage
            artist={track.artists[0]}
            className="flex-shrink-0 rounded"
            size="w-34 h-34"
          />
          <ArtistLink artist={track.artists[0]} />
        </div>
      );
    },
  },
  {
    key: 'duration',
    minWidth: 'min-w-76',
    allowsSorting: true,
    header: () => <Trans message="Duration" />,
    body: track =>
      track.duration ? <FormattedDuration ms={track.duration} /> : null,
  },
  {
    key: 'plays',
    allowsSorting: true,
    minWidth: 'min-w-70',
    header: () => <Trans message="Plays" />,
    body: track =>
      track.plays ? <FormattedNumber value={track.plays} /> : null,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-100',
    header: () => <Trans message="Last updated" />,
    body: track =>
      track.updated_at ? <FormattedDate date={track.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    visibleInMode: 'all',
    width: 'w-128 flex-shrink-0',
    body: track => (
      <div className="text-muted">
        <IconButton size="md" elementType={Link} to={`${track.id}/insights`}>
          <BarChartIcon />
        </IconButton>
        <DialogTrigger type="modal">
          <IconButton size="md">
            <ClosedCaptionIcon />
          </IconButton>
          {track.lyric ? (
            <UpdateLyricDialog lyric={track.lyric} />
          ) : (
            <CreateLyricDialog trackId={track.id} />
          )}
        </DialogTrigger>
        <IconButton size="md" elementType={Link} to={`${track.id}/edit`}>
          <EditIcon />
        </IconButton>
      </div>
    ),
  },
];
