import {useSettings} from '@common/core/settings/use-settings';
import {Link, NavLink} from 'react-router-dom';
import {useTrans} from '@common/i18n/use-trans';
import {useIsDarkMode} from '@common/ui/themes/use-is-dark-mode';
import {CustomMenu} from '@common/menus/custom-menu';
import {Trans} from '@common/i18n/trans';
import {IconButton} from '@common/ui/buttons/icon-button';
import {PlaylistAddIcon} from '@common/icons/material/PlaylistAdd';
import {ReactNode} from 'react';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {CreatePlaylistDialog} from '@app/web-player/playlists/crupdate-dialog/create-playlist-dialog';
import {useAuthUserPlaylists} from '@app/web-player/playlists/requests/use-auth-user-playlists';
import {getPlaylistLink} from '@app/web-player/playlists/playlist-link';
import clsx from 'clsx';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {useAuthClickCapture} from '@app/web-player/use-auth-click-capture';
import {useAuth} from '@common/auth/use-auth';
import {useThemeSelector} from '@common/ui/themes/theme-selector-context';
import {DarkModeIcon} from '@common/icons/material/DarkMode';
import {LightbulbIcon} from '@common/icons/material/Lightbulb';
import {LocaleSwitcher} from '@common/i18n/locale-switcher';
import {Button} from '@common/ui/buttons/button';

const menuItemClassName = (isActive: boolean): string => {
  return clsx(
    'h-44 px-12 mx-12 hover:bg-hover rounded-button',
    isActive && 'text-primary',
  );
};

interface Props {
  className?: string;
}
export function Sidenav({className}: Props) {
  const {isLoggedIn, hasPermission} = useAuth();
  const year = new Date().getFullYear();
  const {branding} = useSettings();

  return (
    <div className={clsx('overflow-y-auto border-r bg-alt py-12', className)} style={{ scrollbarWidth: 'thin', scrollbarColor: '#5a5a5a #2a2a2a' }}>
      <CustomMenu
        className="border-grey-900 mt-24 items-stretch border-b"
        menu="home-on-sidebar"
        orientation="vertical"
        gap="gap-none"
        iconClassName="text-muted"
        itemClassName={({isActive}) => menuItemClassName(isActive)}
      />
      {isLoggedIn && hasPermission('music.create') && (
        <div className="mt-48">
          <SectionTitle>
            <Trans message="Studio" />
          </SectionTitle>
          <CustomMenu
            className="border-grey-900 mt-12 items-stretch border-b text-sm"
            menu="studio-on-sidebar"
            orientation="vertical"
            gap="gap-none"
            iconClassName="text-muted"
            itemClassName={({isActive}) => menuItemClassName(isActive)}
          />
        </div>
      )}
      {isLoggedIn && hasPermission('music.view') && (
        <div className="mt-48">
          <SectionTitle>
            <Trans message="Account" />
          </SectionTitle>
          <CustomMenu
            className="border-grey-900 mt-12 items-stretch border-b text-sm"
            menu="account-on-sidebar"
            orientation="vertical"
            gap="gap-none"
            iconClassName="text-muted"
            itemClassName={({isActive}) => menuItemClassName(isActive)}
          />
          <PlaylistSection />
        </div>
      )}
      <div className="mt-48">
        <SectionTitle>
          <Trans message="Settings" />
        </SectionTitle>
        <CustomMenu
          className="border-grey-900 mt-12 items-stretch border-b text-sm"
          orientation="vertical"
          gap="gap-none"
          iconClassName="text-muted"
          itemClassName={({isActive}) => menuItemClassName(isActive)}
        />
        <ThemeSwitcher />
      </div>
      <div className="">
        <CustomMenu
          className="border-grey-900 mt-12 items-stretch border-b text-sm"
          menu="settings-on-sidebar"
          orientation="vertical"
          gap="gap-none"
          iconClassName="text-muted"
          itemClassName={({isActive}) => menuItemClassName(isActive)}
        />
      </div>
      <div className="mt-48">
        <CustomMenu
          className="text-gray-700 text-8 border-grey-900 mt-12 items-stretch border-b text-center text-sm opacity-75"
          menu="footer-on-sidebar"
          orientation="vertical"
          gap="gap-none"
          iconClassName="text-muted"
          itemClassName={({isActive}) => menuItemClassName(isActive)}
        />
      </div>
      <div className="mb-70 ml-10 mt-20">
        <CustomMenu
          className="border-grey-900 mt-12 items-stretch border-b text-sm"
          orientation="vertical"
          gap="gap-none"
          iconClassName="text-muted"
          itemClassName={({isActive}) => menuItemClassName(isActive)}
        />
        <div
          style={{
            color: 'rgb(255, 255, 255)',
            fontSize: '12px',
            opacity: 0.35,
            textAlign: 'left',
            marginLeft: '15px',
            textTransform: 'uppercase',
          }}
        >
          <Trans
            message="© :year :name"
            values={{year, name: branding.site_name}}
          />
        </div>
      </div>
    </div>
  );
}

interface SectionTitleProps {
  children?: ReactNode;
}
function SectionTitle({children}: SectionTitleProps) {
  return (
    <div
      className="mx-24 mb-8 text-xs font-extrabold uppercase text-muted"
      style={{color: '#FFFFFF84'}}
    >
      <span>{children}</span>
    </div>
  );
}

function Logo() {
  const {branding} = useSettings();
  const {trans} = useTrans();
  const isDarkMode = useIsDarkMode();
  const logoUrl = isDarkMode ? branding.logo_light : branding.logo_dark;

  return (
    <Link
      to="/"
      className="mx-18 block flex-shrink-0"
      aria-label={trans({message: 'Go to homepage'})}
    >
      <img
        className="block h-56 w-auto max-w-[188px] object-contain"
        src={logoUrl}
        alt={trans({message: 'Site logo'})}
      />
    </Link>
  );
}

function PlaylistSection() {
  const {data} = useAuthUserPlaylists();
  const navigate = useNavigate();
  const authHandler = useAuthClickCapture();

  return (
    <div className="border-grey-900 mt-40 border-b">
      <div className="mr-24 flex items-center justify-between">
        <SectionTitle>
          <Trans message="Playlists" />
        </SectionTitle>
        <DialogTrigger
          type="modal"
          onClose={newPlaylist => {
            if (newPlaylist) {
              navigate(getPlaylistLink(newPlaylist));
            }
          }}
        >
          <IconButton
            className="flex-shrink-0 text-muted"
            onClickCapture={authHandler}
          >
            <PlaylistAddIcon />
          </IconButton>
          <CreatePlaylistDialog />
        </DialogTrigger>
      </div>
      {data?.playlists?.map(playlist => (
        <NavLink
          to={getPlaylistLink(playlist)}
          key={playlist.id}
          className={({isActive}) =>
            clsx(menuItemClassName(isActive), 'flex items-center text-sm')
          }
        >
          <div className="overflow-hidden overflow-ellipsis">
            {playlist.name}
          </div>
        </NavLink>
      ))}
    </div>
  );
}

function ThemeSwitcher() {
  const {themes} = useSettings();
  const {selectedTheme, selectTheme} = useThemeSelector();

  if (!selectedTheme || !themes?.user_change) return null;

  // Updated menuItemClassName function based on theme
  const menuItemClassName = (isActive: boolean): string => {
    return clsx(
      'h-44 px-12 mx-12 hover:bg-hover rounded-button',
      selectedTheme.is_dark
        ? isActive
          ? 'text-white'
          : '' // White text for active items in dark theme
        : isActive
          ? 'text-primary'
          : 'text-black', // Primary or black text for active items in light theme
    );
  };

  return (
    <div className="pl-10">
      <div className="mr-10 flex items-center justify-between">
        <Button
          variant="text"
          startIcon={
            selectedTheme.is_dark ? <DarkModeIcon /> : <LightbulbIcon />
          }
          onClick={() => {
            selectTheme(selectedTheme.is_dark ? 'light' : 'dark'); // Toggle theme
          }}
        >
          {selectedTheme.is_dark ? (
            <Trans message="Light mode" />
          ) : (
            <Trans message="Dark mode" />
          )}
        </Button>
      </div>
      <LocaleSwitcher />
    </div>
  );
}
