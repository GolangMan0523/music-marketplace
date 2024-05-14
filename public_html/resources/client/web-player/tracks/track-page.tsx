import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {Trans} from '@common/i18n/trans';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import React, {Fragment} from 'react';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {
  actionButtonClassName,
  MediaPageHeaderLayout,
} from '@app/web-player/layout/media-page-header-layout';
import {AvatarGroup} from '@common/ui/images/avatar-group';
import {Avatar} from '@common/ui/images/avatar';
import {FormattedDuration} from '@common/i18n/formatted-duration';
import {PlaybackToggleButton} from '@app/web-player/playable-item/playback-toggle-button';
import {Album} from '@app/web-player/albums/album';
import {getSmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {getArtistLink} from '@app/web-player/artists/artist-link';
import {FormattedDate} from '@common/i18n/formatted-date';
import {useSortableTableData} from '@common/ui/tables/use-sortable-table-data';
import {BulletSeparatedItems} from '@app/web-player/layout/bullet-separated-items';
import {CommentList} from '@common/comments/comment-list/comment-list';
import {useTrack} from '@app/web-player/tracks/requests/use-track';
import {useTrackPermissions} from '@app/web-player/tracks/hooks/use-track-permissions';
import {Track} from '@app/web-player/tracks/track';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {useSettings} from '@common/core/settings/use-settings';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {TruncatedDescription} from '@common/ui/truncated-description';
import {Waveform} from '@app/web-player/tracks/waveform/waveform';
import {CommentBarContextProvider} from '@app/web-player/tracks/waveform/comment-bar-context';
import {CommentBarNewCommentForm} from '@app/web-player/tracks/waveform/comment-bar-new-comment-form';
import {GenreLink} from '@app/web-player/genres/genre-link';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {TrackActionsBar} from '@app/web-player/tracks/track-actions-bar';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {ChipList} from '@common/ui/forms/input-field/chip-field/chip-list';
import {Link} from 'react-router-dom';
import {FocusScope} from '@react-aria/focus';
import {trackIsLocallyUploaded} from '@app/web-player/tracks/utils/track-is-locally-uploaded';
import {AdHost} from '@common/admin/ads/ad-host';
import {useCommentPermissions} from '@app/web-player/tracks/hooks/use-comment-permissions';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

export function TrackPage() {
  const {canView: showComments, canCreate: allowCommenting} =
    useCommentPermissions();
  const query = useTrack({loader: 'trackPage'});
  const {canEdit} = useTrackPermissions([query.data?.track]);

  if (query.data) {
    return (
      <div>
        <CommentBarContextProvider>
          <PageMetaTags query={query} />
          <AdHost slot="general_top" className="mb-44" />
          <TrackPageHeader track={query.data.track} />
          {allowCommenting ? (
            <CommentBarNewCommentForm
              className="mb-16"
              commentable={query.data.track}
            />
          ) : null}
        </CommentBarContextProvider>
        {query.data.track.tags.length ? (
          <FocusScope>
            <ChipList className="mb-16" selectable>
              {query.data.track.tags.map(tag => (
                <Chip elementType={Link} to={`/tag/${tag.name}`} key={tag.id}>
                  #{tag.display_name || tag.name}
                </Chip>
              ))}
            </ChipList>
          </FocusScope>
        ) : null}
        <TruncatedDescription
          description={query.data.track.description}
          className="mt-24 text-sm"
        />
        {showComments ? (
          <CommentList
            className="mt-34"
            commentable={query.data.track}
            canDeleteAllComments={canEdit}
          />
        ) : null}
        {query.data.track.album && (
          <AlbumTrackTable album={query.data.track.album} />
        )}
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

interface AlbumTrackTableProps {
  album: Album;
}
function AlbumTrackTable({album}: AlbumTrackTableProps) {
  const {data, sortDescriptor, onSortChange} = useSortableTableData(
    album.tracks,
  );
  return (
    <div className="mt-44">
      <div className="mb-14 flex items-center gap-16 overflow-hidden rounded bg-hover">
        <AlbumImage
          album={album}
          className="flex-shrink-0 rounded"
          size="w-70 h-70"
        />
        <div className="flex-auto">
          <div className="text-sm">
            <Trans message="From the album" />
          </div>
          <div className="text-sm font-semibold">{album.name}</div>
        </div>
      </div>
      <TrackTable
        queueGroupId={queueGroupId(album)}
        tracks={data}
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
        hideTrackImage
        hideArtist
        hideAlbum
        hidePopularity={false}
      />
      {!album.tracks?.length ? (
        <IllustratedMessage
          className="mt-34"
          title={<Trans message="Nothing to display" />}
          description={
            <Trans message="This album does not have any tracks yet" />
          }
        />
      ) : null}
    </div>
  );
}

interface TrackPageHeaderProps {
  track: Track;
}
function TrackPageHeader({track}: TrackPageHeaderProps) {
  const isMobile = useIsMobileMediaQuery();
  const {player} = useSettings();
  const releaseDate = track.album?.release_date || track.created_at;
  const genre = track.genres?.[0];

  const showWave =
    !isMobile &&
    player?.seekbar_type === 'waveform' &&
    trackIsLocallyUploaded(track);

  return (
    <Fragment>
      <MediaPageHeaderLayout
        className="mb-28"
        image={<TrackImage track={track} />}
        title={track.name}
        subtitle={
          <AvatarGroup>
            {track.artists?.map(artist => (
              <Avatar
                key={artist.id}
                circle
                src={getSmallArtistImage(artist)}
                label={artist.name}
                link={getArtistLink(artist)}
              />
            ))}
          </AvatarGroup>
        }
        description={
          <BulletSeparatedItems className="text-sm text-muted">
            {track.duration ? (
              <FormattedDuration ms={track.duration} verbose />
            ) : null}
            {releaseDate && <FormattedDate date={releaseDate} />}
            {genre && <GenreLink genre={genre} />}
            {track.plays && !player?.enable_repost ? (
              <Trans
                message=":count plays"
                values={{count: <FormattedNumber value={track.plays} />}}
              />
            ) : null}
          </BulletSeparatedItems>
        }
        actionButtons={
          <TrackActionsBar
            item={track}
            managesItem={false}
            buttonGap={undefined}
            buttonSize="sm"
            buttonRadius="rounded-full"
            buttonClassName={actionButtonClassName()}
          >
            <PlaybackToggleButton
              buttonType="text"
              track={track}
              tracks={
                track.album?.tracks?.length ? track.album.tracks : undefined
              }
              className={actionButtonClassName({isFirst: true})}
              queueId={queueGroupId(track.album || track)}
            />
          </TrackActionsBar>
        }
        footer={
          showWave ? (
            <Waveform track={track} className="max-md:hidden" />
          ) : undefined
        }
      />
    </Fragment>
  );
}
