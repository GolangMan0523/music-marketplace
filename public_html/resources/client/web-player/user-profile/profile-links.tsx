import {UserLink} from '@app/web-player/user-profile/user-link';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import {IconButton} from '@common/ui/buttons/icon-button';

interface ProfileLinksProps {
  links?: UserLink[];
}
export function ProfileLinks({links}: ProfileLinksProps) {
  if (!links?.length) return null;
  return (
    <div className="flex items-center">
      {links.map(link => (
        <Tooltip label={link.title} key={link.url}>
          <IconButton
            size="xs"
            elementType="a"
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            <RemoteFavicon url={link.url} alt={link.title} />
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
}
