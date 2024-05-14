import React from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@common/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import acceptRequest from './accept-request.svg';
import {BackstageRequestDatatableFilters} from '@app/admin/backstage-requests-datatable-page/backstage-request-datatable-filters';
import {BackstageRequestsDatatableColumns} from '@app/admin/backstage-requests-datatable-page/backstage-requests-datatable-columns';

export function BackstageRequestsDatatablePage() {
  return (
    <DataTablePage
      endpoint="backstage-request"
      title={<Trans message="Backstage requests" />}
      filters={BackstageRequestDatatableFilters}
      columns={BackstageRequestsDatatableColumns}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={acceptRequest}
          title={<Trans message="No requests have been submitted yet" />}
          filteringTitle={<Trans message="No matching requests" />}
        />
      }
    />
  );
}
