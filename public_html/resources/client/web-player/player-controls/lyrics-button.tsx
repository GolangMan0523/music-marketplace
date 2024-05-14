import {useSettings} from '@common/core/settings/use-settings';
import {useCuedTrack} from '@app/web-player/player-controls/use-cued-track';
import {IconButton} from '@common/ui/buttons/icon-button';
import {MediaMicrophoneIcon} from '@common/icons/media/media-microphone';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {Trans} from '@common/i18n/trans';
import {useLocation, useMatch} from 'react-router-dom';
import {useNavigate} from '@common/utils/hooks/use-navigate';

export function LyricsButton() {
  const {player} = useSettings();
  const track = useCuedTrack();
  const navigate = useNavigate();
  const isOnLyricsPage = !!useMatch('/lyrics');
  const {key} = useLocation();
  const hasPreviousUrl = key !== 'default';

  if (!track || player?.hide_lyrics) {
    return null;
  }

  return (
    <Tooltip label={<Trans message="Lyrics" />}>
      <IconButton
        onClick={() => {
          if (isOnLyricsPage) {
            if (hasPreviousUrl) {
              navigate(-1);
            }
          } else {
            navigate(`/lyrics`);
          }
        }}
        color={isOnLyricsPage ? 'primary' : undefined}
      >
        <MediaMicrophoneIcon />
      </IconButton>
    </Tooltip>
  );
}
