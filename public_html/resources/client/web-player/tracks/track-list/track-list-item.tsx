import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {PlaybackToggleButton} from '@app/web-player/playable-item/playback-toggle-button';
import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {Waveform} from '@app/web-player/tracks/waveform/waveform';
import {Track} from '@app/web-player/tracks/track';
import {useSettings} from '@common/core/settings/use-settings';
import {TrackSeekbar} from '@app/web-player/player-controls/seekbar/track-seekbar';
import {trackIsLocallyUploaded} from '@app/web-player/tracks/utils/track-is-locally-uploaded';
import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import {
  CommentBarContext,
  CommentBarContextProvider,
} from '@app/web-player/tracks/waveform/comment-bar-context';
import {CommentBarNewCommentForm} from '@app/web-player/tracks/waveform/comment-bar-new-comment-form';
import React, {Fragment, memo, useContext} from 'react';
import {AnimatePresence} from 'framer-motion';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {GenreLink} from '@app/web-player/genres/genre-link';
import {RepeatIcon} from '@common/icons/material/Repeat';
import {TrackLink} from '@app/web-player/tracks/track-link';
import {useTrackPermissions} from '@app/web-player/tracks/hooks/use-track-permissions';
import {User} from '@common/auth/user';
import {UserProfileLink} from '@app/web-player/users/user-profile-link';
import {TrackActionsBar} from '@app/web-player/tracks/track-actions-bar';
import clsx from 'clsx';

interface TrackListItemProps {
  track: Track;
  queue?: Track[];
  reposter?: User;
  className?: string;
  hideArtwork?: boolean;
  hideActions?: boolean;
  linksInNewTab?: boolean;
}
export const TrackListItem = memo(
  ({
    track,
    queue,
    reposter,
    className,
    hideArtwork = false,
    hideActions = false,
    linksInNewTab = false,
  }: TrackListItemProps) => {
    const {player} = useSettings();
    const {managesTrack} = useTrackPermissions([track]);

    const showWave =
      player?.seekbar_type === 'waveform' && trackIsLocallyUploaded(track);

    return (
      <div
        className={clsx(
          'overflow-hidden',
          !hideArtwork && 'md:flex md:gap-24',
          className,
        )}
      >
        {!hideArtwork && (
          <TrackImage
            track={track}
            className="flex-shrink-0 rounded max-md:hidden"
            size="w-184 h-184"
          />
        )}
        <div className="min-w-0 flex-auto">
          <div className="flex items-center gap-14">
            <PlaybackToggleButton
              track={track}
              tracks={queue}
              buttonType="icon"
              color="primary"
              variant="flat"
              radius="rounded-full"
              equalizerColor="white"
            />
            <div>
              <div className="flex items-center gap-6 text-sm text-muted">
                <ArtistLinks
                  artists={track.artists}
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
                <TrackLink
                  track={track}
                  target={linksInNewTab ? '_blank' : undefined}
                />
              </div>
            </div>
            <div className="ml-auto text-sm">
              <FormattedRelativeTime date={track.created_at} />
              {track.genres?.length ? (
                <Chip className="mt-6 w-max" size="xs">
                  <GenreLink
                    genre={track.genres[0]}
                    target={linksInNewTab ? '_blank' : undefined}
                  />
                </Chip>
              ) : null}
            </div>
          </div>
          <div className="mt-20">
            {showWave ? (
              <CommentBarContextProvider disableCommenting={hideActions}>
                <WaveformWithComments track={track} queue={queue} />
              </CommentBarContextProvider>
            ) : (
              <TrackSeekbar track={track} queue={queue} />
            )}
          </div>
          {!hideActions && (
            <TrackActionsBar
              item={track}
              managesItem={managesTrack}
              className="mt-20"
            />
          )}
        </div>
      </div>
    );
  },
);

interface WaveformWithCommentsProps {
  track: Track;
  queue?: Track[];
}
export function WaveformWithComments({
  track,
  queue,
}: WaveformWithCommentsProps) {
  const {markerIsVisible} = useContext(CommentBarContext);
  return (
    <Fragment>
      <Waveform track={track} queue={queue} />
      <AnimatePresence mode="wait">
        {markerIsVisible && (
          <CommentBarNewCommentForm
            className="mb-8 mt-28"
            commentable={track}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
}
