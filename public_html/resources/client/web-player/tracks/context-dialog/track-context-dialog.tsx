import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {Trans} from '@common/i18n/trans';
import {Track} from '@app/web-player/tracks/track';
import {
  ContextDialogLayout,
  ContextMenuButton,
  ContextMenuLayoutProps,
} from '@app/web-player/context-dialog/context-dialog-layout';
import {PlaylistPanelButton} from '@app/web-player/context-dialog/playlist-panel';
import {CopyLinkMenuButton} from '@app/web-player/context-dialog/copy-link-menu-button';
import {getTrackLink, TrackLink} from '@app/web-player/tracks/track-link';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {useTrackPermissions} from '@app/web-player/tracks/hooks/use-track-permissions';
import {AddToQueueButton} from '@app/web-player/context-dialog/add-to-queue-menu-button';
import React, {Fragment, ReactNode, useCallback} from 'react';
import {ToggleInLibraryMenuButton} from '@app/web-player/context-dialog/toggle-in-library-menu-button';
import {ToggleRepostMenuButton} from '@app/web-player/context-dialog/toggle-repost-menu-button';
import {getRadioLink} from '@app/web-player/radio/get-radio-link';
import {useShouldShowRadioButton} from '@app/web-player/tracks/context-dialog/use-should-show-radio-button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {openDialog} from '@common/ui/overlays/store/dialog-store';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {useDeleteTracks} from '@app/web-player/tracks/requests/use-delete-tracks';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {getArtistLink} from '@app/web-player/artists/artist-link';
import {getAlbumLink} from '@app/web-player/albums/album-link';
import {ShareMediaButton} from '@app/web-player/context-dialog/share-media-button';
import {useSettings} from '@common/core/settings/use-settings';
import {trackIsLocallyUploaded} from '@app/web-player/tracks/utils/track-is-locally-uploaded';
import {useAuth} from '@common/auth/use-auth';
import {downloadFileFromUrl} from '@common/uploads/utils/download-file-from-url';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {usePlayerActions} from '@common/player/hooks/use-player-actions';
import {trackToMediaItem} from '@app/web-player/tracks/utils/track-to-media-item';

export interface TrackContextDialogProps {
  tracks: Track[];
  children?: (tracks: Track[]) => ReactNode;
  showAddToQueueButton?: boolean;
}
export function TrackContextDialog({
  children,
  tracks,
  showAddToQueueButton = true,
}: TrackContextDialogProps) {
  const isMobile = useIsMobileMediaQuery();
  const firstTrack = tracks[0];
  const {canEdit, canDelete} = useTrackPermissions(tracks);
  const shouldShowRadio = useShouldShowRadioButton();
  const {player} = useSettings();
  const {close} = useDialogContext();
  const navigate = useNavigate();
  const cuedTrack = usePlayerStore(s => s.cuedMedia?.meta as Track | undefined);
  const {play} = usePlayerActions();

  const loadTracks = useCallback(() => {
    return Promise.resolve(tracks);
  }, [tracks]);

  const headerProps: Partial<ContextMenuLayoutProps> =
    tracks.length === 1
      ? {
          image: <TrackImage track={firstTrack} />,
          title: <TrackLink track={firstTrack} />,
          description: <ArtistLinks artists={firstTrack.artists} />,
        }
      : {};

  return (
    <ContextDialogLayout {...headerProps} loadTracks={loadTracks}>
      {showAddToQueueButton && (
        <AddToQueueButton item={tracks} loadTracks={loadTracks} />
      )}
      <ToggleInLibraryMenuButton items={tracks} />
      {children?.(tracks)}
      <PlaylistPanelButton />
      {tracks.length === 1 ? (
        <Fragment>
          {shouldShowRadio && (
            <ContextMenuButton type="link" to={getRadioLink(firstTrack)}>
              <Trans message="Go to song radio" />
            </ContextMenuButton>
          )}
          {isMobile && (
            <Fragment>
              {firstTrack.artists?.[0] && (
                <ContextMenuButton
                  type="link"
                  to={getArtistLink(firstTrack.artists[0])}
                >
                  <Trans message="Go to artist" />
                </ContextMenuButton>
              )}
              {firstTrack.album && (
                <ContextMenuButton
                  type="link"
                  to={getAlbumLink(firstTrack.album)}
                >
                  <Trans message="Go to album" />
                </ContextMenuButton>
              )}
              <ContextMenuButton type="link" to={getTrackLink(firstTrack)}>
                <Trans message="Go to track" />
              </ContextMenuButton>
            </Fragment>
          )}
          {!player?.hide_lyrics && tracks.length === 1 && (
            <ContextMenuButton
              onClick={async () => {
                close();
                if (cuedTrack?.id !== firstTrack.id) {
                  await play(trackToMediaItem(firstTrack));
                }
                navigate('/lyrics');
              }}
            >
              <Trans message="View lyrics" />
            </ContextMenuButton>
          )}
          {!isMobile && (
            <CopyLinkMenuButton
              link={getTrackLink(firstTrack, {absolute: true})}
            >
              <Trans message="Copy song link" />
            </CopyLinkMenuButton>
          )}
          {tracks.length === 1 && <ShareMediaButton item={firstTrack} />}
          {tracks.length === 1 && <DownloadTrackButton track={firstTrack} />}
          {tracks.length === 1 ? (
            <ToggleRepostMenuButton item={tracks[0]} />
          ) : null}
          {tracks.length === 1 && canEdit && (
            <ContextMenuButton
              type="link"
              to={`/backstage/tracks/${firstTrack.id}/insights`}
            >
              <Trans message="Insights" />
            </ContextMenuButton>
          )}
          {tracks.length === 1 && canEdit && (
            <ContextMenuButton
              type="link"
              to={`/backstage/tracks/${firstTrack.id}/edit`}
            >
              <Trans message="Edit" />
            </ContextMenuButton>
          )}
        </Fragment>
      ) : null}
      {canDelete && !isMobile && <DeleteButton tracks={tracks} />}
    </ContextDialogLayout>
  );
}

interface DownloadTrackButtonProps {
  track: Track;
}
function DownloadTrackButton({track}: DownloadTrackButtonProps) {
  const {player, base_url} = useSettings();
  const {close: closeMenu} = useDialogContext();
  const {hasPermission} = useAuth();

  if (
    !player?.enable_download ||
    !track ||
    !trackIsLocallyUploaded(track) ||
    !hasPermission('music.download')
  ) {
    return null;
  }

  return (
    <ContextMenuButton
      onClick={() => {
        closeMenu();
        downloadFileFromUrl(`${base_url}/api/v1/tracks/${track.id}/download`);
      }}
    >
      <Trans message="Download" />
    </ContextMenuButton>
  );
}

function DeleteButton({tracks}: TrackContextDialogProps) {
  const {close: closeMenu} = useDialogContext();
  const {canDelete} = useTrackPermissions(tracks);

  if (!canDelete) {
    return null;
  }

  return (
    <ContextMenuButton
      onClick={() => {
        closeMenu();
        openDialog(DeleteTrackDialog, {
          tracks,
        });
      }}
    >
      <Trans message="Delete" />
    </ContextMenuButton>
  );
}

interface DeleteTrackDialogProps {
  tracks: Track[];
}
function DeleteTrackDialog({tracks}: DeleteTrackDialogProps) {
  const deleteTracks = useDeleteTracks();
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      isDanger
      title={<Trans message="Delete tracks" />}
      body={
        <Trans message="Are you sure you want to delete selected tracks?" />
      }
      isLoading={deleteTracks.isPending}
      confirm={<Trans message="Delete" />}
      onConfirm={() => {
        deleteTracks.mutate(
          {trackIds: tracks.map(t => t.id)},
          {
            onSuccess: () => close(),
          },
        );
      }}
    />
  );
}
