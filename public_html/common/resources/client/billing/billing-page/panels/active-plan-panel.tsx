import {useBillingUser} from '../use-billing-user';
import {FormattedDate} from '../../../i18n/formatted-date';
import {BillingPlanPanel} from '../billing-plan-panel';
import {Trans} from '../../../i18n/trans';
import {FormattedPrice} from '../../../i18n/formatted-price';
import {Button} from '../../../ui/buttons/button';
import {Link} from 'react-router-dom';
import {UpsellLabel} from '@common/billing/pricing-table/upsell-label';

export function ActivePlanPanel() {
  const {subscription} = useBillingUser();
  if (!subscription?.price || !subscription?.product) return null;

  const renewDate = (
    <FormattedDate preset="long" date={subscription.renews_at} />
  );

  return (
    <BillingPlanPanel title={<Trans message="Current plan" />}>
      <div className="mt-24 flex justify-between gap-20">
        <div>
          <div className="mb-2 text-xl font-bold">
            {subscription.product.name}
          </div>
          {subscription.price ? (
            <FormattedPrice
              priceClassName="font-bold text-4xl"
              periodClassName="text-muted text-xs"
              variant="separateLine"
              price={subscription.price}
              className="mt-32"
            />
          ) : (
            <div className="text-4xl font-bold">
              <Trans message="Free" />
            </div>
          )}
          <br />
          {subscription.price ? (
            <div className="flex items-center justify-between">
              {subscription.price.interval === 'year' && (
                <div className="text-xs text-muted">
                  <Trans message="Billed Annually" />
                  <UpsellLabel />
                </div>
              )}
            </div>
          ) : (
            <div className="text-4xl font-bold">
              <Trans message="Free" />
            </div>
          )}
          <br />
          {subscription.price ? (
            <div className="flex items-center justify-between">
              {subscription.price.interval === 'month' && (
                <div className="text-xs text-muted">
                  <Trans message="Get" />
                  <UpsellLabel />
                  <Trans message=" When Billed Annually" />
                </div>
              )}
            </div>
          ) : (
            <div className="text-4xl font-bold">
              <Trans message="Free" />
            </div>
          )}
          <div className="text-base">
            <Trans
              message="Your plan renews on :date"
              values={{date: renewDate}}
            />
          </div>
        </div>
        <div className="w-[233px]">
          <Button
            variant="flat"
            color="primary"
            size="md"
            className="mb-12 w-full"
            elementType={Link}
            to="/billing/change-plan"
            disabled={subscription.gateway_name === 'none'}
          >
            <Trans message="Change plan" />
          </Button>
          <Button
            variant="outline"
            color="danger"
            size="md"
            className="w-full"
            elementType={Link}
            to="/billing/cancel"
          >
            <Trans message="Cancel plan" />
          </Button>
        </div>
      </div>
    </BillingPlanPanel>
  );
}
