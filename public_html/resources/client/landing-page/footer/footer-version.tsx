import clsx from 'clsx';
import {Trans} from '@common/i18n/trans';
import {useSettings} from '@common/core/settings/use-settings';
import {Link} from 'react-router-dom';

interface FooterVersionProps {
  className?: string;
  padding?: string;
}

export function FooterVersion({className, padding}: FooterVersionProps) {
  const {version} = useSettings();

  return (
    <footer className={clsx('text-sm', padding ? padding : '', className)}>
      <div className="mt-4 md:mt-0">
        <Link className="px-10 transition-colors hover:text-fg-base" to="/">
          <span className="text-xs">
            <Trans message="Version: :number" values={{number: version}} />
          </span>
        </Link>
      </div>
    </footer>
  );
}
