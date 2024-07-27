import { RequisitionStatus } from '@/shared/enums';

import { TPagingRequest } from './common';
import { TUser } from './user';

export type TRequisition = {
  createdBy: TUser;
  createdOn: string;
  state: RequisitionStatus;
  items: TRequisitionItem[];
};

export type TRequisitionItem = {
  requisitionItemId: number;
  requisitionId: number;
  supplierName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
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

export type TRequisitionCreateRequest = {
  supplierId: string;
};

export type TRequisitionCreateResponse = {
  requisitionId: string;
  supplierName: string;
  userFirstName: string;
  userLastName: string;
  createdOn: string;
  totalCost: number;
  code: string;
};
