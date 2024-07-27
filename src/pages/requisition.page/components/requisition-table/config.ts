import { IServerSideGetRowsRequest } from 'ag-grid-community';

import { getRequisitionListQuery } from '@/api/requisition';
import { getPagingRequest } from '@/shared/utils';
import { TAgGridDatasourceResponse } from '@/types';

export const RequisitionDataSource: (
  request: IServerSideGetRowsRequest
) => Promise<TAgGridDatasourceResponse> = async request => {
  const { pageSize, pageNumber } = getPagingRequest(request);
  const data = await getRequisitionListQuery.fn({ pageSize, pageNumber });

  return {
    rowCount: data?.totalElements || 0,
    rowData: data?.elements || []
  };
};
