import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {Trans} from '@common/i18n/trans';
import {TrackTable} from '@app/web-player/tracks/track-table/track-table';
import React, {Fragment} from 'react';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {useAlbum} from '@app/web-player/albums/requests/use-album';
import {
  actionButtonClassName,
  MediaPageHeaderLayout,
} from '@app/web-player/layout/media-page-header-layout';
import {AvatarGroup} from '@common/ui/images/avatar-group';
import {Avatar} from '@common/ui/images/avatar';
import {FormattedDuration} from '@common/i18n/formatted-duration';
import {PlaybackToggleButton} from '@app/web-player/playable-item/playback-toggle-button';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {Album} from '@app/web-player/albums/album';
import {getSmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {getArtistLink} from '@app/web-player/artists/artist-link';
import {FormattedDate} from '@common/i18n/formatted-date';
import {useSortableTableData} from '@common/ui/tables/use-sortable-table-data';
import {BulletSeparatedItems} from '@app/web-player/layout/bullet-separated-items';
import {CommentList} from '@common/comments/comment-list/comment-list';
import {useAlbumPermissions} from '@app/web-player/albums/use-album-permissions';
import {PageStatus} from '@common/http/page-status';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {TrackActionsBar} from '@app/web-player/tracks/track-actions-bar';
import {FocusScope} from '@react-aria/focus';
import {ChipList} from '@common/ui/forms/input-field/chip-field/chip-list';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {Link} from 'react-router-dom';
import {TruncatedDescription} from '@common/ui/truncated-description';
import {CommentBarContextProvider} from '@app/web-player/tracks/waveform/comment-bar-context';
import {CommentBarNewCommentForm} from '@app/web-player/tracks/waveform/comment-bar-new-comment-form';
import {AdHost} from '@common/admin/ads/ad-host';
import {useCommentPermissions} from '@app/web-player/tracks/hooks/use-comment-permissions';

export function AlbumPage() {
  const {canView: showComments, canCreate: allowCommenting} =
    useCommentPermissions();
  const query = useAlbum({loader: 'albumPage'});
  const {canEdit} = useAlbumPermissions(query.data?.album);

  if (query.data) {
    return (
      <div>
        <CommentBarContextProvider>
          <PageMetaTags query={query} />
          <AdHost slot="general_top" className="mb-44" />
          <AlbumPageHeader album={query.data.album} />
          {allowCommenting ? (
            <CommentBarNewCommentForm
              className="mb-16"
              commentable={query.data.album}
            />
          ) : null}
        </CommentBarContextProvider>
        {query.data.album.tags?.length ? (
          <FocusScope>
            <ChipList className="mb-16" selectable>
              {query.data.album.tags.map(tag => (
                <Chip elementType={Link} to={`/tag/${tag.name}`} key={tag.id}>
                  #{tag.display_name || tag.name}
                </Chip>
              ))}
            </ChipList>
          </FocusScope>
        ) : null}
        <TruncatedDescription
          description={query.data.album.description}
          className="mt-24 text-sm"
        />
        <AdHost slot="album_above" className="mt-34" />
        <AlbumTrackTable album={query.data.album} />
        {showComments && (
          <CommentList
            className="mt-34"
            commentable={query.data.album}
            canDeleteAllComments={canEdit}
          />
        )}
        <AdHost slot="general_bottom" className="mt-44" />
      </div>
    );
  }

  return (
    <PageStatus
      query={query}
      loaderClassName="absolute inset-0 m-auto"
      loaderIsScreen={false}
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

interface PlaylistPageHeaderProps {
  album: Album;
}
function AlbumPageHeader({album}: PlaylistPageHeaderProps) {
  const totalDuration = album.tracks?.reduce(
    (t, track) => t + (track.duration || 0),
    0,
  );

  return (
    <Fragment>
      <MediaPageHeaderLayout
        className="mb-28"
        image={<AlbumImage album={album} className="rounded" />}
        title={album.name}
        subtitle={
          <AvatarGroup>
            {album.artists?.map(artist => (
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
            {album.tracks?.length ? (
              <Trans
                message="[one 1 track|other :count tracks]"
                values={{count: album.tracks.length}}
              />
            ) : null}
            {album.tracks?.length ? (
              <FormattedDuration ms={totalDuration} verbose />
            ) : null}
            <FormattedDate date={album.release_date} />
          </BulletSeparatedItems>
        }
        actionButtons={
          <TrackActionsBar
            item={album}
            managesItem={false}
            buttonGap={undefined}
            buttonSize="sm"
            buttonRadius="rounded-full"
            buttonClassName={actionButtonClassName()}
          >
            <PlaybackToggleButton
              disabled={!album.tracks?.length}
              buttonType="text"
              queueId={queueGroupId(album)}
              className={actionButtonClassName({isFirst: true})}
            />
          </TrackActionsBar>
        }
      />
    </Fragment>
  );
}
