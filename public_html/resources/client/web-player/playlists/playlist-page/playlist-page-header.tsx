import {Playlist} from '@app/web-player/playlists/playlist';
import {
  getPlaylistImageSrc,
  PlaylistImage,
} from '@app/web-player/playlists/playlist-image';
import {Trans} from '@common/i18n/trans';
import {FormattedDuration} from '@common/i18n/formatted-duration';
import React, {Fragment} from 'react';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {ImageSelector} from '@common/ui/images/image-selector';
import {ImageIcon} from '@common/icons/material/Image';
import {useUpdatePlaylist} from '@app/web-player/playlists/requests/use-update-playlist';
import {usePlaylistPermissions} from '@app/web-player/playlists/hooks/use-playlist-permissions';
import {Button} from '@common/ui/buttons/button';
import {ArrowDropDownIcon} from '@common/icons/material/ArrowDropDown';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {PlaylistContextDialog} from '@app/web-player/playlists/playlist-context-dialog';
import {FollowPlaylistButton} from '@app/web-player/playlists/playlist-page/follow-playlist-button';
import {AvatarGroup} from '@common/ui/images/avatar-group';
import {Avatar} from '@common/ui/images/avatar';
import {getUserProfileLink} from '@app/web-player/users/user-profile-link';
import {PlaybackToggleButton} from '@app/web-player/playable-item/playback-toggle-button';
import {
  actionButtonClassName,
  MediaPageHeaderLayout,
} from '@app/web-player/layout/media-page-header-layout';
import {BulletSeparatedItems} from '@app/web-player/layout/bullet-separated-items';

interface PlaylistPageHeaderProps {
  playlist: Playlist;
  totalDuration: number;
  queueId: string;
}
export function PlaylistPageHeader({
  playlist,
  totalDuration,
  queueId,
}: PlaylistPageHeaderProps) {
  return (
    <Fragment>
      <MediaPageHeaderLayout
        image={<EditableImage playlist={playlist} />}
        title={playlist.name}
        subtitle={
          <AvatarGroup>
            {playlist.editors?.map(editor => (
              <Avatar
                key={editor.id}
                circle
                src={editor.avatar}
                label={editor.display_name}
                link={getUserProfileLink(editor)}
              />
            ))}
          </AvatarGroup>
        }
        description={
          <Fragment>
            {playlist.description}
            {playlist.tracks_count ? (
              <BulletSeparatedItems className="mt-14 text-sm text-muted">
                <Trans
                  message="[one 1 track|other :count tracks]"
                  values={{count: playlist.tracks_count}}
                />
                <FormattedDuration ms={totalDuration} verbose />
                {playlist.collaborative && <Trans message="Collaborative" />}
              </BulletSeparatedItems>
            ) : null}
          </Fragment>
        }
        actionButtons={
          <ActionButtons
            playlist={playlist}
            hasTracks={totalDuration > 0}
            queueId={queueId}
          />
        }
      />
    </Fragment>
  );
}

interface ImageContainerProps {
  playlist: Playlist;
  size?: string;
  className?: string;
}
function EditableImage({playlist, size, className}: ImageContainerProps) {
  const updatePlaylist = useUpdatePlaylist();
  const {canEdit} = usePlaylistPermissions(playlist);

  if (!canEdit) {
    return (
      <PlaylistImage
        className={`${size} ${className} rounded object-cover`}
        playlist={playlist}
      />
    );
  }

  return (
    <FileUploadProvider>
      <ImageSelector
        showEditButtonOnHover
        diskPrefix="playlist_media"
        variant="square"
        previewSize={size}
        className={className}
        value={getPlaylistImageSrc(playlist)}
        onChange={newValue => {
          updatePlaylist.mutate({image: newValue});
        }}
        placeholderIcon={<ImageIcon />}
        stretchPreview
      />
    </FileUploadProvider>
  );
}

interface ActionButtonsProps {
  playlist: Playlist;
  hasTracks: boolean;
  queueId: string;
}
function ActionButtons({playlist, hasTracks, queueId}: ActionButtonsProps) {
  return (
    <div className="text-center md:text-start">
      <PlaybackToggleButton
        disabled={!hasTracks}
        buttonType="text"
        queueId={queueId}
        className={actionButtonClassName({isFirst: true})}
      />
      <FollowPlaylistButton
        buttonType="text"
        playlist={playlist}
        className={actionButtonClassName()}
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
        <PlaylistContextDialog playlist={playlist} />
      </DialogTrigger>
    </div>
  );
}
