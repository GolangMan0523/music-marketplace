import React, {useMemo} from 'react';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {
  RadioSeed,
  useRadioRecommendations,
} from '@app/web-player/radio/requests/use-radio-recommendations';
import {useSortableTableData} from '@common/ui/tables/use-sortable-table-data';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import {
  actionButtonClassName,
  MediaPageHeaderLayout,
} from '@app/web-player/layout/media-page-header-layout';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {Trans} from '@common/i18n/trans';
import {BulletSeparatedItems} from '@app/web-player/layout/bullet-separated-items';
import {FormattedDuration} from '@common/i18n/formatted-duration';
import {PlaybackToggleButton} from '@app/web-player/playable-item/playback-toggle-button';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {GenreImage} from '@app/web-player/genres/genre-image';
import {useParams} from 'react-router-dom';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import {AdHost} from '@common/admin/ads/ad-host';

const validSeeds: RadioSeed['model_type'][] = ['artist', 'track', 'genre'];

export function RadioPage() {
  const {seedType} = useParams();
  const query = useRadioRecommendations();
  const {data, onSortChange, sortDescriptor} = useSortableTableData(
    query.data?.recommendations,
  );

  const totalDuration = useMemo(() => {
    return data.reduce((total, track) => {
      return total + (track.duration || 0);
    }, 0);
  }, [data]);

  if (!validSeeds.includes(seedType as any)) {
    return <NotFoundPage />;
  }

  if (query.data) {
    const seed = query.data.seed;
    const queueId = queueGroupId(seed, 'radio');
    return (
      <div>
        <PageMetaTags query={query} />
        <AdHost slot="general_top" className="mb-44" />
        <MediaPageHeaderLayout
          image={<Image seed={seed} />}
          title={
            <Trans
              message=":name radio"
              values={{
                name:
                  'display_name' in seed && seed.display_name
                    ? seed.display_name
                    : seed.name,
              }}
            />
          }
          subtitle={
            <BulletSeparatedItems className="justify-center text-sm text-muted md:justify-start">
              <RadioType seed={seed} />
              <Trans
                message="[one 1 song|other :count songs]"
                values={{count: data.length}}
              />
              <FormattedDuration ms={totalDuration} verbose />
            </BulletSeparatedItems>
          }
          actionButtons={
            <div className="text-center md:text-start">
              <PlaybackToggleButton
                tracks={data}
                disabled={!data.length}
                buttonType="text"
                queueId={queueId}
                className={actionButtonClassName({isFirst: true})}
              />
            </div>
          }
        />
        <TrackTable
          className="mt-34"
          tracks={data}
          queueGroupId={queueId}
          onSortChange={onSortChange}
          sortDescriptor={sortDescriptor}
        />
        <AdHost slot="general_bottom" className="mt-44" />
      </div>
    );
  }

  return (
    <PageStatus
      query={query}
      loaderIsScreen={false}
      loaderClassName="absolute inset-0 m-auto"
    />
  );
}

interface SeedImageProps {
  seed: RadioSeed;
}
function Image({seed}: SeedImageProps) {
  switch (seed.model_type) {
    case 'artist':
      return (
        <SmallArtistImage
          artist={seed}
          size="w-240 h-240"
          wrapperClassName="mx-auto"
          className="rounded"
        />
      );
    case 'genre':
      return (
        <GenreImage
          genre={seed}
          size="w-240 h-240"
          className="mx-auto rounded"
        />
      );
    default:
      return (
        <TrackImage
          track={seed}
          size="w-240 h-240"
          className="mx-auto rounded"
        />
      );
  }
}

function RadioType({seed}: SeedImageProps) {
  switch (seed.model_type) {
    case 'artist':
      return <Trans message="Artist radio" />;
    case 'genre':
      return <Trans message="Genre radio" />;
    default:
      return <Trans message="Track radio" />;
  }
}
