import { SupplierItemState } from '@/shared/enums';

import { TPagingRequest } from './common';

export type TSupplierInfo = {
  supplierId: number;
  supplierName: string;
  address: string;
  phoneNumber: string;
};

export type TSupplier = {
  supplierInfo: TSupplierInfo;
  supplierItems: TSupplierItem[];
};

export type TSupplierSearch = TPagingRequest & {
  supplierName?: string;
  address?: string;
};

export type TSupplierItem = {
  supplierItemId: number;
  supplierItemName: string;
  supplierName: string;
  description: string;
  unitCost: number;
  type: string;
  state: SupplierItemState;
};

export type TSupplierItemSearch = TPagingRequest & {
  supplierId?: number;
  supplierItemName?: string;
  supplierType?: string;
  minUnitCost?: number;
  maxUnitCost?: number;
};
