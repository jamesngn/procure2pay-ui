import { Select } from '@mantine/core';
import React from 'react';
import { Control, Controller, useController } from 'react-hook-form';

import { useGetSupplierList } from '@/api/hooks/supplier.hook';
import VcInputWrapper from '@/layout/form-layout';
import { CreateRequisitionSchema } from '@/schema-validator/requisition';
import { TPagingResponse, TSupplier } from '@/types';

export type TSelectOption = {
  label: string;
  value: string;
};

const SupplierSelect: React.FC<{ control: Control<CreateRequisitionSchema> }> = ({ control }) => {
  const {
    fieldState: { error }
  } = useController({
    name: 'supplierId',
    control
  });

  const { data: supplierList } = useGetSupplierList({
    pageNumber: 0,
    pageSize: 20
  });

  const formatData = (data: TPagingResponse<TSupplier>) => {
    if (!data || data === undefined) return [];
    return (data?.elements || []).map(item => {
      const result: TSelectOption = {
        label: item.supplierInfo.supplierName,
        value: `${item.supplierInfo.supplierId}`
      };
      return result;
    });
  };

  return (
    <VcInputWrapper required label="Supplier" error={error?.message}>
      <Controller
        name="supplierId"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select Supplier"
            error={!!error?.message}
            data={formatData(supplierList)}
            {...field}
          />
        )}
      ></Controller>
    </VcInputWrapper>
  );
};

export default SupplierSelect;
