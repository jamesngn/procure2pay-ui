import { NumberInput, Select, Stack } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { useGetSupplierItemList } from '@/api/hooks/supplierItem.hook';
import { getSupplierItemQuery } from '@/api/supplerItem';
import VcInputWrapper from '@/layout/form-layout';
import { CreateRequisitionSchema } from '@/schema-validator/requisition';
import { TPagingResponse, TSupplierItem } from '@/types';

import { TSelectOption } from './supplier-select';

const SupplierItemsDisplay: React.FC<{
  selectedItemIds: string[];
  setValue: UseFormSetValue<CreateRequisitionSchema>;
  register: UseFormRegister<CreateRequisitionSchema>;
}> = ({ selectedItemIds, setValue, register }) => {
  const [supplierItemsDetails, setSupplierItemsDetails] = useState([]);

  useEffect(() => {
    if (selectedItemIds.length > 0) {
      const lastItemId = selectedItemIds[selectedItemIds.length - 1];
      fetchSupplierItemDetails(lastItemId);
    }
  }, [selectedItemIds]);

  const fetchSupplierItemDetails = async itemId => {
    const data = await getSupplierItemQuery.fn(itemId);
    const newItem = { ...data, quantity: 1 }; // Initialize quantity as 1 (or any default value)
    setSupplierItemsDetails(prevItems => [...prevItems, newItem]);
    setValue(`supplierItems[${supplierItemsDetails.length}].quantity`, 1); // Set initial quantity in the form
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = supplierItemsDetails.map((item, idx) =>
      idx === index ? { ...item, quantity } : item
    );
    setSupplierItemsDetails(updatedItems);
    setValue(`supplierItems[${index}].quantity`, quantity); // Update quantity in the form
  };

  return (
    <Stack gap={16}>
      {supplierItemsDetails.map((item, index) => (
        <div key={index}>
          <div>{item.supplierItemName}</div>
          <NumberInput
            label="Quantity"
            type="number"
            min={1}
            value={item.quantity}
            onChange={e => handleQuantityChange(index, e.target.value)}
            {...register(`supplierItems[${index}].quantity`)}
          />
        </div>
      ))}
    </Stack>
  );
};

const SupplierItemSearch: React.FC<{
  control: Control<CreateRequisitionSchema>;
  setValue: UseFormSetValue<CreateRequisitionSchema>;
  register: UseFormRegister<CreateRequisitionSchema>;
}> = ({ control, setValue }) => {
  const [selectedItemIds, setselectedItemIds] = useState([]);

  const supplierId = control._getWatch('supplierId');

  useEffect(() => {
    setselectedItemIds([]);
  }, [supplierId]);

  const { data: supplierItemData } = useGetSupplierItemList({
    supplierId,
    pageNumber: 0,
    pageSize: 20
  });

  const handleChange = value => {
    if (!value) return;
    if (selectedItemIds.includes(value)) return;

    const updatedItems = [...selectedItemIds, value];
    setselectedItemIds(updatedItems);
    setValue('supplierItems', updatedItems); // Synchronize state with the
  };

  const formatData = (data: TPagingResponse<TSupplierItem>) => {
    if (!data || data === undefined) return [];
    return (data?.elements || []).map(item => {
      const result: TSelectOption = {
        label: item.supplierItemName,
        value: `${item.supplierItemId}`
      };
      return result;
    });
  };

  return (
    <VcInputWrapper label="Search Supplier Items">
      <Select
        placeholder="Select supplier item"
        data={formatData(supplierItemData)}
        onChange={value => handleChange(value)}
      />
      {selectedItemIds.length > 0 && (
        <SupplierItemsDisplay
          selectedItemIds={selectedItemIds}
          setValue={setValue}
          register={register}
        />
      )}
    </VcInputWrapper>
  );
};

export default SupplierItemSearch;