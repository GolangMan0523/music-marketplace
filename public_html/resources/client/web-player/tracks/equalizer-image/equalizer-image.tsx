import white from './equalizer-white.gif';
import black from './equalizer-black.gif';
import clsx from 'clsx';
import {useIsDarkMode} from '@common/ui/themes/use-is-dark-mode';

interface EqualizerImageProps {
  className?: string;
  color?: 'black' | 'white';
}
export function EqualizerImage({className, color}: EqualizerImageProps) {
  const isDarkMode = useIsDarkMode();

  if (!color) {
    color = isDarkMode ? 'white' : 'black';
  }

  return (
    <div
      className={clsx('flex items-center justify-center w-20 h-20', className)}
    >
      <img
        src={color === 'white' ? white : black}
        alt=""
        className="w-12 h-12"
        aria-hidden
      />
    </div>
  );
}
