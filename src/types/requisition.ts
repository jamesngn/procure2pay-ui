import { RequisitionStatus } from '@/shared/enums';

import { TRequisitionItem } from './requisitionItem';
import { TUser } from './user';

export type TRequisition = {
  createdBy: TUser;
  createdOn: string;
  state: RequisitionStatus;
  items: TRequisitionItem[];
};
