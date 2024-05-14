import {BackstageRequest} from '@app/web-player/backstage/backstage-request';
import {Trans} from '@common/i18n/trans';
import React from 'react';

interface Props {
  type: BackstageRequest['type'];
}
export function BackstageRequestType({type}: Props) {
  return (
    <span className="capitalize">
      {<Trans message={type.replace('-', ' ')} />}
    </span>
  );
}
