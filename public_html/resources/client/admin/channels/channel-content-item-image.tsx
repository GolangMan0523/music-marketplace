import {NormalizedModel} from '@common/datatable/filters/normalized-model';
import clsx from 'clsx';
import {ImageIcon} from '@common/icons/material/Image';

interface Props {
  item: NormalizedModel;
}
export function ChannelContentItemImage({item}: Props) {
  const imageClassName = clsx(
    'aspect-square w-46 rounded object-cover',
    !item.image ? 'flex items-center justify-center' : 'block',
  );

  return item.image ? (
    <img className={imageClassName} src={item.image} alt="" />
  ) : (
    <span className={imageClassName}>
      <ImageIcon className="max-w-[60%] text-divider" size="text-6xl" />
    </span>
  );
}
