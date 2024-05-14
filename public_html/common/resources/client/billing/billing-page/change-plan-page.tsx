import {Breadcrumb} from '../../ui/breadcrumbs/breadcrumb';
import {BreadcrumbItem} from '../../ui/breadcrumbs/breadcrumb-item';
import {Trans} from '../../i18n/trans';
import {useNavigate} from '../../utils/hooks/use-navigate';
import {BillingPlanPanel} from './billing-plan-panel';
import {Product} from '../product';
import {
  findBestPrice,
  UpsellBillingCycle,
} from '../pricing-table/find-best-price';
import {Fragment, useState} from 'react';
import {FormattedPrice} from '../../i18n/formatted-price';
import {Button} from '../../ui/buttons/button';
import {Link} from 'react-router-dom';
import {useProducts} from '../pricing-table/use-products';
import {Price} from '../price';
import {useBillingUser} from './use-billing-user';
import {CheckIcon} from '../../icons/material/Check';
import {Skeleton} from '../../ui/skeleton/skeleton';
import {AnimatePresence, m} from 'framer-motion';
import {BillingCycleRadio} from '../pricing-table/billing-cycle-radio';
import {opacityAnimation} from '../../ui/animation/opacity-animation';
import {UpsellLabel} from '@common/billing/pricing-table/upsell-label';

export function ChangePlanPage() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbItem isLink onSelected={() => navigate('/billing')}>
          <Trans message="Billing" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Trans message="Plans" />
        </BreadcrumbItem>
      </Breadcrumb>
      <h1 className="my-32 text-3xl font-bold md:my-64">
        <Trans message="Change your plan" />
      </h1>
      <BillingPlanPanel title={<Trans message="Available plans" />}>
        <AnimatePresence initial={false} mode="wait">
          <PlanList />
        </AnimatePresence>
      </BillingPlanPanel>
    </Fragment>
  );
}

function PlanList() {
  const query = useProducts();
  const [selectedCycle, setSelectedCycle] =
    useState<UpsellBillingCycle>('monthly');

  if (query.isLoading) {
    return <PlanSkeleton key="plan-skeleton" />;
  }

  return (
    <Fragment key="plan-list">
      <BillingCycleRadio
        products={query.data?.products}
        selectedCycle={selectedCycle}
        onChange={setSelectedCycle}
        className="mb-20"
        size="md"
      />
      {query.data?.products.map(plan => {
        const price = findBestPrice(selectedCycle, plan.prices);
        if (!price || plan.hidden) return null;
        return (
          <m.div
            {...opacityAnimation}
            key={plan.id}
            className="justify-between gap-40 border-b py-32 md:flex"
          >
            <div className="mb-40 md:mb-0">
              <div className="text-xl font-bold">{plan.name}</div>
              {price ? (
                <FormattedPrice
                  priceClassName="font-bold text-4xl"
                  periodClassName="text-muted text-xs"
                  variant="separateLine"
                  price={price}
                  className="mt-32"
                />
              ) : (
                <div className="text-4xl font-bold">
                  <Trans message="Free" />
                </div>
              )}
              <br />
              {price ? (
                <div className="flex items-center justify-between">
                  {price.interval === 'year' && (
                    <div className="text-xs text-muted">
                      <Trans message="Billed Annually" />
                      <UpsellLabel products={[plan]} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-4xl font-bold">
                  <Trans message="Free" />
                </div>
              )}
              {price ? (
                <div className="flex items-center justify-between">
                  {price.interval === 'month' && (
                    <div className="text-xs text-muted">
                      <Trans message="Get" />
                      <UpsellLabel products={[plan]} />
                      <Trans message=" When Billed Annually" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-4xl font-bold">
                  <Trans message="Free" />
                </div>
              )}
              <div className="mt-12 text-base">{plan.description}</div>
              <FeatureList plan={plan} />
            </div>
            <ContinueButton product={plan} price={price} />
          </m.div>
        );
      })}
    </Fragment>
  );
}

interface FeatureListProps {
  plan: Product;
}
function FeatureList({plan}: FeatureListProps) {
  if (!plan.feature_list.length) return null;
  return (
    <div className="mt-32">
      <div className="mb-10 text-sm font-semibold">
        <Trans message="What's included" />
      </div>
      {plan.feature_list.map(feature => (
        <div key={feature} className="flex items-center gap-10 text-sm">
          <CheckIcon className="text-positive" size="sm" />
          <Trans message={feature} />
        </div>
      ))}
    </div>
  );
}

interface ContinueButtonProps {
  product: Product;
  price: Price;
}
function ContinueButton({product, price}: ContinueButtonProps) {
  const {subscription} = useBillingUser();
  if (!subscription?.price || !subscription?.product) return null;

  if (
    subscription.product_id === product.id &&
    subscription.price_id === price.id
  ) {
    return (
      <div className="flex w-[168px] items-center justify-center gap-10 text-muted">
        <CheckIcon size="md" />
        <Trans message="Current plan" />
      </div>
    );
  }

  return (
    <Button
      variant="flat"
      color="primary"
      className="w-[168px]"
      size="md"
      elementType={Link}
      to={`/billing/change-plan/${product.id}/${price.id}/confirm`}
    >
      <Trans message="Continue" />
    </Button>
  );
}

function PlanSkeleton() {
  return (
    <m.div
      key="plan-skeleton"
      {...opacityAnimation}
      className="border-b py-32 text-2xl"
    >
      <Skeleton className="mb-8" />
      <Skeleton className="mb-14" />
      <Skeleton className="mb-24" />
      <Skeleton className="mb-12" />
    </m.div>
  );
}
