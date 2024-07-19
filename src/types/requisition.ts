import { RequisitionStatus } from '@/shared/enums';

import { TPagingRequest } from './common';
import { TRequisitionItem } from './requisitionItem';
import { TUser } from './user';

export type TRequisition = {
  createdBy: TUser;
  createdOn: string;
  state: RequisitionStatus;
  items: TRequisitionItem[];
};

export type TRequisitionSearch = TPagingRequest & {
  code?: string;
  state?: RequisitionStatus;
  supplierItem?: string;
  fromDate?: string;
  toDate?: string;
  minTotalCost?: number;
  maxTotalCost?: number;
};