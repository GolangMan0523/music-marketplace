import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {AlbumIcon} from '@common/icons/material/Album';
import {Trans} from '@common/i18n/trans';

export function NoDiscographyMessage() {
  return (
    <IllustratedMessage
      className="my-80"
      imageHeight="h-auto"
      image={<AlbumIcon size="xl" className="text-muted" />}
      title={<Trans message="We do not have discography for this artist yet" />}
    />
  );
}
