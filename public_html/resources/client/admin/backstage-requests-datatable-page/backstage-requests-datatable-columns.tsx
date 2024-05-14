import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Link} from 'react-router-dom';
import React from 'react';
import {BackstageRequest} from '@app/web-player/backstage/backstage-request';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {ArtistLink} from '@app/web-player/artists/artist-link';
import clsx from 'clsx';
import {Button} from '@common/ui/buttons/button';
import {BackstageRequestType} from '@app/admin/backstage-requests-datatable-page/backstage-request-type';

export const BackstageRequestsDatatableColumns: ColumnConfig<BackstageRequest>[] =
  [
    {
      key: 'type',
      allowsSorting: true,
      minWidth: 'min-w-100',
      header: () => <Trans message="Type" />,
      body: request => <BackstageRequestType type={request.type} />,
    },
    {
      key: 'status',
      allowsSorting: true,
      visibleInMode: 'all',
      minWidth: 'min-w-100',
      header: () => <Trans message="Status" />,
      body: request => (
        <div className="flex items-center gap-8">
          <div
            className={clsx(
              'w-10 h-10 rounded-full flex-shrink-0',
              request.status === 'approved' && 'bg-positive',
              request.status === 'pending' && 'bg-warning',
              request.status === 'denied' && 'bg-danger'
            )}
          />
          <div className="capitalize">
            <Trans message={request.status} />
          </div>
        </div>
      ),
    },
    {
      key: 'user',
      allowsSorting: true,
      visibleInMode: 'all',
      width: 'flex-3',
      header: () => <Trans message="User" />,
      body: request =>
        request.user ? (
          <NameWithAvatar
            image={request.user.avatar}
            label={request.user.display_name}
            description={request.user.email}
          />
        ) : null,
    },
    {
      key: 'artist',
      allowsSorting: true,
      width: 'flex-3',
      header: () => <Trans message="Artist" />,
      body: request => {
        if (!request.artist) return request.artist_name;
        return (
          <div className="flex items-center gap-12 w-max">
            <SmallArtistImage
              artist={request.artist}
              className="flex-shrink-0 rounded"
              size="w-34 h-34"
            />
            <ArtistLink artist={request.artist} />
          </div>
        );
      },
    },
    {
      key: 'created_at',
      allowsSorting: true,
      width: 'w-100',
      header: () => <Trans message="Requested at" />,
      body: request =>
        request.created_at ? <FormattedDate date={request.created_at} /> : '',
    },
    {
      key: 'actions',
      header: () => <Trans message="Actions" />,
      hideHeader: true,
      align: 'end',
      visibleInMode: 'all',
      width: 'w-60 flex-shrink-0',
      body: request => (
        <Button
          elementType={Link}
          to={`${request.id}`}
          color="primary"
          variant="outline"
          size="xs"
        >
          <Trans message="View" />
        </Button>
      ),
    },
  ];
