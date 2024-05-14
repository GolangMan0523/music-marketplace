import {PlayableGridItem} from '@app/web-player/playable-item/playable-grid-item';
import {Playlist} from '@app/web-player/playlists/playlist';
import {PlaylistImage} from '@app/web-player/playlists/playlist-image';
import {
  getPlaylistLink,
  PlaylistLink,
} from '@app/web-player/playlists/playlist-link';
import {PlaylistContextDialog} from '@app/web-player/playlists/playlist-context-dialog';
import {Trans} from '@common/i18n/trans';
import {UserProfileLink} from '@app/web-player/users/user-profile-link';
import React from 'react';
import {FollowPlaylistButton} from '@app/web-player/playlists/playlist-page/follow-playlist-button';

interface PlaylistGridItemProps {
  playlist: Playlist;
}
export function PlaylistGridItem({playlist}: PlaylistGridItemProps) {
  return (
    <PlayableGridItem
      image={<PlaylistImage playlist={playlist} />}
      title={<PlaylistLink playlist={playlist} />}
      subtitle={<PlaylistOwnerName playlist={playlist} />}
      link={getPlaylistLink(playlist)}
      likeButton={
        <FollowPlaylistButton buttonType="icon" size="md" playlist={playlist} />
      }
      model={playlist}
      contextDialog={<PlaylistContextDialog playlist={playlist} />}
    />
  );
}

export function PlaylistOwnerName({playlist}: PlaylistGridItemProps) {
  const owner = playlist.owner || playlist.editors?.[0];
  if (!owner) {
    return null;
  }
  return (
    <Trans
      message="By :name"
      values={{
        name: <UserProfileLink user={owner} />,
      }}
    />
  );
}
