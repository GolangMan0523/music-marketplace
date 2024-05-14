import {CheckIcon} from '@common/icons/material/Check';
import {Trans} from '@common/i18n/trans';
import {Link} from 'react-router-dom';
import {Button} from '@common/ui/buttons/button';
import {useBackstageRequest} from '@app/web-player/backstage/requests/use-backstage-request';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {BackstageLayout} from '@app/web-player/backstage/backstage-layout';

export function BackstageRequestSubmittedPage() {
  const {isLoading} = useBackstageRequest();

  return (
    <BackstageLayout>
      <div className="mx-auto my-40 max-w-[590px]">
        {isLoading ? <FullPageLoader className="my-40" /> : <SuccessMessage />}
      </div>
    </BackstageLayout>
  );
}

function SuccessMessage() {
  return (
    <div>
      <div className="text-center">
        <CheckIcon size="text-6xl" />
      </div>

      <h1 className="mb-48 mt-24 text-center text-5xl font-medium">
        <Trans message="We've got your request" />
      </h1>

      <ul className="mb-60 list-inside list-disc px-20">
        <li className="pb-10">
          <Trans message="Our support team will review it and send you an email within 3 days!" />
        </li>
        <li className="pb-10">
          <Trans message="Don't submit another request until you hear from us." />
        </li>
        <li>
          <Trans message="If this artist profile is already claimed, ask an admin on your team to invite you." />
        </li>
      </ul>

      <div className="text-center">
        <Button
          variant="raised"
          color="primary"
          elementType={Link}
          to="/"
          className="min-w-140"
          radius="rounded-full"
        >
          <Trans message="Got It" />
        </Button>
      </div>
    </div>
  );
}
