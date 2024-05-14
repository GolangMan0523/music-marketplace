import {useSettings} from '@common/core/settings/use-settings';
import {useCuedTrack} from '@app/web-player/player-controls/use-cued-track';
import {IconButton} from '@common/ui/buttons/icon-button';
import {trackIsLocallyUploaded} from '@app/web-player/tracks/utils/track-is-locally-uploaded';
import {DownloadIcon} from '@common/icons/material/Download';
import {downloadFileFromUrl} from '@common/uploads/utils/download-file-from-url';
import {useAuth} from '@common/auth/use-auth';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';

export function DownloadTrackButton() {
  const {player, base_url} = useSettings();
  const track = useCuedTrack();
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
    <Tooltip label={<Trans message="Download" />}>
      <IconButton
        onClick={() => {
          downloadFileFromUrl(`${base_url}/api/v1/tracks/${track.id}/download`);
        }}
      >
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
}
