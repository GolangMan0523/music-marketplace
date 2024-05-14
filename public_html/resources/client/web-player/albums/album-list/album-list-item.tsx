import {PlaybackToggleButton} from '@app/web-player/playable-item/playback-toggle-button';
import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {Track} from '@app/web-player/tracks/track';
import {useSettings} from '@common/core/settings/use-settings';
import {TrackSeekbar} from '@app/web-player/player-controls/seekbar/track-seekbar';
import {trackIsLocallyUploaded} from '@app/web-player/tracks/utils/track-is-locally-uploaded';
import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import {CommentBarContextProvider} from '@app/web-player/tracks/waveform/comment-bar-context';
import React, {Fragment, memo} from 'react';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {GenreLink} from '@app/web-player/genres/genre-link';
import {Album} from '@app/web-player/albums/album';
import {RepeatIcon} from '@common/icons/material/Repeat';
import clsx from 'clsx';
import {User} from '@common/auth/user';
import {UserProfileLink} from '@app/web-player/users/user-profile-link';
import {useAlbumPermissions} from '@app/web-player/albums/use-album-permissions';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {AlbumLink} from '@app/web-player/albums/album-link';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {FormattedNumber} from '@common/i18n/formatted-number';
import {PlayArrowFilledIcon} from '@app/web-player/tracks/play-arrow-filled';
import {usePlayerStore} from '@common/player/hooks/use-player-store';
import {queueGroupId} from '@app/web-player/queue-group-id';
import {usePlayerActions} from '@common/player/hooks/use-player-actions';
import {tracksToMediaItems} from '@app/web-player/tracks/utils/track-to-media-item';
import {WaveformWithComments} from '@app/web-player/tracks/track-list/track-list-item';
import {TrackActionsBar} from '@app/web-player/tracks/track-actions-bar';

interface Props {
  album: Album;
  reposter?: User;
  className?: string;
  hideArtwork?: boolean;
  hideActions?: boolean;
  linksInNewTab?: boolean;
  maxHeight?: string;
}
export const AlbumListItem = memo(
  ({
    album,
    reposter,
    className,
    hideArtwork,
    hideActions,
    linksInNewTab,
    maxHeight,
  }: Props) => {
    const queueId = queueGroupId(album);
    const {player} = useSettings();
    const {managesAlbum} = useAlbumPermissions(album);
    const tracks = album?.tracks || [];

    const media = usePlayerStore(s => s.cuedMedia);
    const activeTrack = tracks.find(t => t.id === media?.meta.id) || tracks[0];

    const showWave =
      player?.seekbar_type === 'waveform' &&
      trackIsLocallyUploaded(activeTrack);

    return (
      <div
        key={album.id}
        className={clsx(
          'overflow-hidden',
          !hideArtwork && 'md:flex md:gap-24',
          className,
          maxHeight,
        )}
      >
        {!hideArtwork && (
          <AlbumImage
            album={album}
            className="flex-shrink-0 rounded max-md:hidden"
            size="w-184 h-184"
          />
        )}
        <div
          className={clsx(
            'min-w-0 flex-auto',
            maxHeight && 'flex h-full flex-col',
          )}
        >
          <div className="flex-shrink-0">
            <div className="flex items-center gap-14">
              <PlaybackToggleButton
                queueId={queueId}
                track={activeTrack}
                tracks={album.tracks}
                buttonType="icon"
                color="primary"
                variant="flat"
                radius="rounded-full"
                equalizerColor="white"
              />
              <div>
                <div className="flex items-center gap-6 text-sm text-muted">
                  <ArtistLinks
                    artists={album.artists}
                    target={linksInNewTab ? '_blank' : undefined}
                  />
                  {reposter && (
                    <Fragment>
                      <RepeatIcon size="xs" />
                      <UserProfileLink
                        user={reposter}
                        target={linksInNewTab ? '_blank' : undefined}
                      />
                    </Fragment>
                  )}
                </div>
                <div>
                  <AlbumLink
                    album={album}
                    target={linksInNewTab ? '_blank' : undefined}
                  />
                </div>
              </div>
              <div className="ml-auto text-sm">
                <FormattedRelativeTime date={album.created_at} />
                {album.genres?.length ? (
                  <Chip className="mt-6 w-max" size="xs">
                    <GenreLink
                      genre={album.genres[0]}
                      target={linksInNewTab ? '_blank' : undefined}
                    />
                  </Chip>
                ) : null}
              </div>
            </div>
            <div className="my-20">
              {showWave ? (
                <CommentBarContextProvider disableCommenting={hideActions}>
                  <WaveformWithComments
                    track={activeTrack}
                    queue={album.tracks}
                  />
                </CommentBarContextProvider>
              ) : (
                <TrackSeekbar track={activeTrack} queue={album.tracks} />
              )}
            </div>
          </div>
          <div className="flex-auto overflow-y-auto">
            {tracks.map((track, index) => {
              const isLast = index - 1 === album.tracks?.length;
              const isActive = activeTrack?.id === track.id;
              return (
                <TrackItem
                  key={track.id}
                  track={track}
                  album={album}
                  index={index}
                  isLast={isLast}
                  isActive={isActive}
                />
              );
            })}
          </div>
          {!hideActions && (
            <TrackActionsBar
              className="mt-20"
              item={album}
              managesItem={managesAlbum}
            />
          )}
        </div>
      </div>
    );
  },
);

interface TrackItemProps {
  track: Track;
  album: Album;
  index: number;
  isLast: boolean;
  isActive: boolean;
}
function TrackItem({track, index, isLast, isActive, album}: TrackItemProps) {
  const playerActions = usePlayerActions();
  return (
    <div
      key={track.id}
      className={clsx(
        'flex cursor-pointer items-center gap-8 p-8 text-[13px] hover:bg-hover',
        !isLast && 'border-b',
        isActive && 'text-primary',
      )}
      onClick={() => {
        if (album.tracks?.length) {
          playerActions.overrideQueueAndPlay(
            tracksToMediaItems(album.tracks),
            index,
          );
        }
      }}
    >
      <TrackImage track={track} size="w-20 h-20" className="rounded" />
      <div>{index + 1}</div>
      <div className="mx-10 flex-auto">{track.name}</div>
      {track.plays && track.plays > 0 ? (
        <Fragment>
          <PlayArrowFilledIcon size="xs" className="ml-auto text-muted" />
          <div className="text-muted">
            <FormattedNumber value={track.plays} />
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}
