import {Genre} from '@app/web-player/genres/genre';
import {Artist} from '@app/web-player/artists/artist';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {ArrowDropDownIcon} from '@common/icons/material/ArrowDropDown';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {LikeButton} from '@app/web-player/library/like-button';
import {
  actionButtonClassName,
  MediaPageHeaderLayout,
} from '@app/web-player/layout/media-page-header-layout';
import {PlaybackToggleButton} from '@app/web-player/playable-item/playback-toggle-button';
import {GenreLink} from '@app/web-player/genres/genre-link';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ArtistContextDialog} from '@app/web-player/artists/artist-context-dialog';
import {ProfileDescription} from '@app/web-player/user-profile/profile-description';
import {useSettings} from '@common/core/settings/use-settings';
import {MediaItemStats} from '@app/web-player/tracks/media-item-stats';
import clsx from 'clsx';

interface ArtistPageHeaderProps {
  artist: Artist;
}
export function ArtistPageHeader({artist}: ArtistPageHeaderProps) {
  const {artistPage} = useSettings();
  return (
    <MediaPageHeaderLayout
      centerItems
      image={
        <SmallArtistImage
          showVerifiedBadge
          artist={artist}
          className="rounded-full object-cover shadow-lg"
        />
      }
      title={artist.name}
      subtitle={<GenreList genres={artist.genres} />}
      actionButtons={
        <div className="flex items-center justify-center gap-24 md:justify-between">
          <ActionButtons artist={artist} />
          <MediaItemStats className="max-md:hidden" item={artist} />
        </div>
      }
      footer={
        artistPage.showDescription && (
          <ProfileDescription
            profile={artist.profile}
            links={artist.links}
            shortDescription
          />
        )
      }
    />
  );
}

interface GenreListProps {
  genres?: Genre[];
}
function GenreList({genres}: GenreListProps) {
  return (
    <ul className="flex max-w-620 items-center justify-start gap-14 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-muted max-md:hidden">
      {genres?.slice(0, 5).map(genre => (
        <li key={genre.id}>
          <GenreLink genre={genre} />
        </li>
      ))}
    </ul>
  );
}

interface ActionButtonsProps {
  artist: Artist;
}
function ActionButtons({artist}: ActionButtonsProps) {
  return (
    <div>
      <PlaybackToggleButton
        queueId={queueGroupId(artist)}
        buttonType="text"
        className={actionButtonClassName({isFirst: true})}
      />
      <LikeButton
        likeable={artist}
        className={clsx(actionButtonClassName(), 'max-md:hidden')}
      />
      <DialogTrigger type="popover" mobileType="tray">
        <Button
          variant="outline"
          radius="rounded-full"
          endIcon={<ArrowDropDownIcon />}
          className={actionButtonClassName()}
        >
          <Trans message="More" />
        </Button>
        <ArtistContextDialog artist={artist} />
      </DialogTrigger>
    </div>
  );
}
