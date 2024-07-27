import { IsNotEmpty, IsString } from 'class-validator';

import { ERROR_MESSAGE } from './constants';

type TCreateRequisitionItem = {
  supplierItemId: string;
  quantity: number;
};

export class CreateRequisitionSchema {
  @IsString({ message: ERROR_MESSAGE.INVALID_FORMAT })
  @IsNotEmpty({ message: ERROR_MESSAGE.REQUIRED })
  supplierId: string;

  supplierItems: TCreateRequisitionItem[];
}
