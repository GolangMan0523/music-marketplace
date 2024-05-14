import {Trans} from '@common/i18n/trans';
import {useSettings} from '@common/core/settings/use-settings';
import claimLabelImage from './images/claim-label.jpg';
import claimArtistImage from './images/claim-artist.jpg';
import {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {usePrimaryArtistForCurrentUser} from '@app/web-player/backstage/use-primary-artist-for-current-user';
import clsx from 'clsx';
import {BackstageLayout} from '@app/web-player/backstage/backstage-layout';

export function BackstageTypeSelector() {
  const {branding} = useSettings();
  const isArtist = usePrimaryArtistForCurrentUser() != null;
  return (
    <BackstageLayout>
      <div className="max-w-780 my:20 md:my-40 mx-auto">
        <h1 className="text-3xl md:text-5xl text-center font-medium mb-10">
          <Trans
            message="Get access to :siteName for artists"
            values={{siteName: branding.site_name}}
          />
        </h1>
        <h2 className="text-lg font-medium mb-54 text-center">
          <Trans message="First, select the type of your request" />
        </h2>
        <div className="md:flex items-center gap-54">
          <ClaimPanelLayout
            className="mb-14 md:mb-0"
            title={
              isArtist ? (
                <Trans message="Get verified" />
              ) : (
                <Trans message="Become an artist" />
              )
            }
            link={isArtist ? 'verify-artist' : 'become-artist'}
            image={claimArtistImage}
          />
          <ClaimPanelLayout
            title={<Trans message="Claim existing artist" />}
            link="claim-artist"
            image={claimLabelImage}
          />
        </div>
      </div>
    </BackstageLayout>
  );
}

interface ClaimPanelLayoutProps {
  title: ReactNode;
  link: string;
  image: string;
  className?: string;
}
function ClaimPanelLayout({
  title,
  image,
  link,
  className,
}: ClaimPanelLayoutProps) {
  return (
    <Link
      to={link}
      className={clsx(
        'block flex-auto flex flex-col items-center justify-center p-34 border border-2 rounded-md bg-background transition-shadow hover:shadow-xl hover:bg-primary/4 cursor-pointer',
        className
      )}
    >
      <h3 className="text-lg mb-10 font-medium">{title}</h3>
      <img
        className="w-132 h-132 object-cover rounded-full"
        src={image}
        alt=""
      />
    </Link>
  );
}
