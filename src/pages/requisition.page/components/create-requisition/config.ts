import { Control } from 'react-hook-form';

import { CreateRequisitionSchema } from '@/schema-validator/requisition';

export const defaultCreateValues: CreateRequisitionSchema = {
  supplierId: ''
};

export type TInputProps = {
  setValue?: any;
  control: Control<CreateRequisitionSchema>;
};

export const formConfig = {
  supplierId: {
    label: 'Supplier',
    name: 'supplierId',
    placeholder: 'Select Supplier',
    required: true
  }
};
