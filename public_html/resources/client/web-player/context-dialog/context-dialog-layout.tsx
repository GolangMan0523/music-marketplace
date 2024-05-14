import {AnimatePresence} from 'framer-motion';
import {
  cloneElement,
  ComponentPropsWithRef,
  createContext,
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {SvgIconProps} from '@common/icons/svg-icon';
import clsx from 'clsx';
import {PlaylistPanel} from '@app/web-player/context-dialog/playlist-panel';
import {Track} from '@app/web-player/tracks/track';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {Link, To, useLocation} from 'react-router-dom';
import {usePrevious} from '@common/utils/hooks/use-previous';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';

interface ContextMenuLayoutStateValue {
  playlistPanelIsActive: boolean;
  setPlaylistPanelIsActive: (value: boolean) => void;
  loadTracks: () => Promise<Track[]>;
}
export const ContextMenuLayoutState =
  createContext<ContextMenuLayoutStateValue>(null!);

export interface ContextMenuLayoutProps {
  image?: ReactElement<{className: string}> | null;
  title?: ReactElement | null;
  description?: ReactElement;
  children: ReactNode;
  loadTracks: () => Promise<Track[]>;
}
export function ContextDialogLayout({
  image,
  title,
  description,
  children,
  loadTracks,
}: ContextMenuLayoutProps) {
  const [playlistPanelIsActive, setPlaylistPanelIsActive] = useState(false);
  const {close} = useDialogContext();
  const contextValue: ContextMenuLayoutStateValue = useMemo(() => {
    return {
      playlistPanelIsActive,
      setPlaylistPanelIsActive,
      loadTracks,
    };
  }, [playlistPanelIsActive, loadTracks]);

  const {pathname} = useLocation();

  // close dialog on route change
  const previousPathname = usePrevious(pathname);
  useEffect(() => {
    if (previousPathname && previousPathname !== pathname) {
      close();
    }
  }, [pathname, previousPathname, close]);

  const header =
    image || title ? (
      <div className="flex items-center gap-14 border-b p-14 mb-10">
        {image && cloneElement(image, {className: 'w-44 h-44 rounded'})}
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
          {title}
          {description && (
            <div className="text-xs text-muted">{description}</div>
          )}
        </div>
      </div>
    ) : null;

  return (
    <ContextMenuLayoutState.Provider value={contextValue}>
      <Dialog size="xs">
        <DialogBody
          padding="p-0"
          onContextMenu={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="pb-10">
            {header}
            <AnimatePresence initial={false} mode="wait">
              {playlistPanelIsActive ? (
                <PlaylistPanel key="playlist-panel" />
              ) : (
                <ul key="menu" className="text-base md:text-sm">
                  {children}
                </ul>
              )}
            </AnimatePresence>
          </div>
        </DialogBody>
      </Dialog>
    </ContextMenuLayoutState.Provider>
  );
}

interface ButtonMenuItemProps
  extends Omit<ComponentPropsWithRef<'button'>, 'type'> {
  type?: 'button';
}

interface LinkMenuItemProps
  extends Omit<ComponentPropsWithRef<'link'>, 'type'> {
  type?: 'link';
}

type ContextMenuListItemProps = (ButtonMenuItemProps | LinkMenuItemProps) & {
  children: ReactNode;
  endIcon?: ReactElement<SvgIconProps>;
  startIcon?: ReactElement<SvgIconProps>;
  className?: string;
  to?: To;
};
export const ContextMenuButton = forwardRef<any, ContextMenuListItemProps>(
  (
    {
      children,
      endIcon,
      startIcon,
      className,
      type = 'button',
      to,
      ...buttonProps
    },
    ref
  ) => {
    const Element = type === 'button' ? 'button' : Link;
    return (
      <li>
        <Element
          {...(buttonProps as any)}
          to={to as any}
          ref={ref}
          className={clsx(
            'flex items-center gap-12 py-12 px-20 hover:bg-hover cursor-pointer outline-none focus-visible:ring focus-visible:ring-inset w-full text-left',
            className
          )}
        >
          {startIcon}
          <span className="mr-auto whitespace-nowrap overflow-hidden overflow-ellipsis min-w-0">
            {children}
          </span>
          {endIcon}
        </Element>
      </li>
    );
  }
);
