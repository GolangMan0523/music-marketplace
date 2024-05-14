import {useCuedTrack} from '@app/web-player/player-controls/use-cued-track';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {usePlayerStore} from '@common/player/hooks/use-player-store';
import React, {useMemo} from 'react';
import {ProgressBar} from '@common/ui/progress/progress-bar';
import {CustomMenuItem} from '@common/menus/custom-menu';
import clsx from 'clsx';
import {useCustomMenu} from '@common/menus/use-custom-menu';
import {Trans} from '@common/i18n/trans';
import {NavbarAuthMenu} from '@common/ui/navigation/navbar/navbar-auth-menu';
import {PersonIcon} from '@common/icons/material/Person';
import {Badge} from '@common/ui/badge/badge';
import {useAuth} from '@common/auth/use-auth';
import {
  Menu,
  MenuItem,
  MenuTrigger,
} from '@common/ui/navigation/menu/menu-trigger';
import {Item} from '@common/ui/forms/listbox/item';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useSettings} from '@common/core/settings/use-settings';
import {playerOverlayState} from '@app/web-player/state/player-overlay-store';
import {usePrimaryArtistForCurrentUser} from '@app/web-player/backstage/use-primary-artist-for-current-user';
import {MicIcon} from '@common/icons/material/Mic';
import {getArtistLink} from '@app/web-player/artists/artist-link';
import {useCurrentTime} from '@common/player/hooks/use-current-time';
import {PlayButton} from '@common/player/ui/controls/play-button';
import {PreviousButton} from '@common/player/ui/controls/previous-button';
import {NextButton} from '@common/player/ui/controls/next-button';
import {BufferingIndicator} from '@app/web-player/player-controls/buffering-indicator';

export function MobilePlayerControls() {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-[calc(100%-20px)] mx-auto bg-background/95">
      <PlayerControls />
      <MobileNavbar />
    </div>
  );
}

function PlayerControls() {
  const mediaIsCued = usePlayerStore(s => s.cuedMedia != null);
  if (!mediaIsCued) return null;

  return (
    <div
      className="bg-chip rounded p-6 flex items-center gap-24 justify-between shadow relative"
      onClick={() => {
        playerOverlayState.toggle();
      }}
    >
      <QueuedTrack />
      <PlaybackButtons />
      <PlayerProgressBar />
    </div>
  );
}

function QueuedTrack() {
  const track = useCuedTrack();

  if (!track) {
    return null;
  }

  return (
    <div className="flex items-center gap-10 min-w-0 flex-auto">
      <TrackImage className="rounded w-36 h-36 object-cover" track={track} />
      <div className="flex-auto whitespace-nowrap overflow-hidden">
        <div className="text-sm font-medium overflow-hidden overflow-ellipsis">
          {track.name}
        </div>
        <div className="text-xs text-muted overflow-hidden overflow-ellipsis">
          {track.artists?.map(a => a.name).join(', ')}
        </div>
      </div>
    </div>
  );
}

function PlaybackButtons() {
  return (
    <div className="flex items-center justify-center">
      <PreviousButton stopPropagation />
      <div className="relative">
        <BufferingIndicator />
        <PlayButton size="md" iconSize="lg" stopPropagation />
      </div>
      <NextButton stopPropagation />
    </div>
  );
}

function PlayerProgressBar() {
  const duration = usePlayerStore(s => s.mediaDuration);
  const currentTime = useCurrentTime();
  return (
    <ProgressBar
      size="xs"
      className="absolute left-0 right-0 bottom-0"
      progressColor="bg-white"
      trackColor="bg-white/10"
      trackHeight="h-2"
      radius="rounded-none"
      minValue={0}
      maxValue={duration}
      value={currentTime}
    />
  );
}

function MobileNavbar() {
  const menu = useCustomMenu('mobile-bottom');
  if (!menu) return null;

  return (
    <div className="flex items-center justify-center gap-30 my-12">
      {menu.items.map(item => (
        <CustomMenuItem
          unstyled
          iconClassName="block mx-auto mb-6"
          iconSize="md"
          className={({isActive}) =>
            clsx(
              'text-xs whitespace-nowrap overflow-hidden',
              isActive && 'font-bold'
            )
          }
          key={item.id}
          item={item}
        />
      ))}
      <AccountButton />
    </div>
  );
}

function AccountButton() {
  const {user} = useAuth();
  const hasUnreadNotif = !!user?.unread_notifications_count;
  const navigate = useNavigate();
  const {registration} = useSettings();

  const primaryArtist = usePrimaryArtistForCurrentUser();
  const {player} = useSettings();
  const menuItems = useMemo(() => {
    if (primaryArtist) {
      return [
        <MenuItem
          value="author"
          key="author"
          startIcon={<MicIcon />}
          onSelected={() => {
            navigate(getArtistLink(primaryArtist));
          }}
        >
          <Trans message="Artist profile" />
        </MenuItem>,
      ];
    }
    if (player?.show_become_artist_btn) {
      return [
        <MenuItem
          value="author"
          key="author"
          startIcon={<MicIcon />}
          onSelected={() => {
            navigate('/backstage/requests');
          }}
        >
          <Trans message="Become an author" />
        </MenuItem>,
      ];
    }

    return [];
  }, [primaryArtist, navigate, player?.show_become_artist_btn]);

  const button = (
    <button className="text-xs relative">
      <PersonIcon size="md" />
      {hasUnreadNotif ? (
        <Badge className="-top-6" right="right-4">
          {user?.unread_notifications_count}
        </Badge>
      ) : null}
      <div className="text-xs">
        <Trans message="Account" />
      </div>
    </button>
  );

  if (!user) {
    return (
      <MenuTrigger>
        {button}
        <Menu>
          <Item value="login" onSelected={() => navigate('/login')}>
            <Trans message="Login" />
          </Item>
          {!registration.disable && (
            <Item value="register" onSelected={() => navigate('/register')}>
              <Trans message="Register" />
            </Item>
          )}
        </Menu>
      </MenuTrigger>
    );
  }

  return <NavbarAuthMenu items={menuItems}>{button}</NavbarAuthMenu>;
}
