import {Fragment} from 'react';
import {Seekbar} from '@common/player/ui/controls/seeking/seekbar';
import {FormattedCurrentTime} from '@common/player/ui/controls/formatted-current-time';
import {FormattedPlayerDuration} from '@common/player/ui/controls/formatted-player-duration';

export function MainSeekbar() {
  return (
    <Fragment>
      <div className="flex items-center gap-12">
        <div className="text-xs text-muted flex-shrink-0 min-w-40 text-right">
          <FormattedCurrentTime />
        </div>
        <Seekbar className="flex-auto" trackColor="neutral" />
        <div className="text-xs text-muted flex-shrink-0 min-w-40">
          <FormattedPlayerDuration />
        </div>
      </div>
    </Fragment>
  );
}
