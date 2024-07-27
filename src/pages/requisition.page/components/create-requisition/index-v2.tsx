import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCreateRequisition } from '@/api/hooks/requisition.hook';
import VcButton from '@/components/button';
import { VcFormAction, VcFormInputs, VcTwoColumnFormWrapper } from '@/layout/form-layout';
import { ModalTitle } from '@/layout/view-detail-layout';
import { schema } from '@/schema-validator/requisition-yup';

import SupplierItemSearch from './form-input/supplier-item-search-v2';
import SupplierSelect from './form-input/supplier-select-v2';

const ActionSection: React.FC<{ control: any; getValues: any }> = ({ control, getValues }) => {
  const { isValid } = useFormState({ control });

  const navigate = useNavigate();

  const navigateParentPage = () => {
    setTimeout(() => {
      navigate('/requisition');
    }, 300);
  };

  const createRequisitionMutation = useCreateRequisition({
    onSuccess: () => {
      navigateParentPage();
    }
  });

  const onCreateRequisition = () => {
    if (!isValid) return;

    const formValues = getValues();

    // Call API to create requisition
    createRequisitionMutation.mutate(formValues);
  };

  return (
    <>
      <VcButton color="blue" onClick={onCreateRequisition}>
        <Text size="sm" tt="uppercase">
          Create
        </Text>
      </VcButton>
    </>
  );
};
const CreateRequisitionV2 = () => {
  const [opened, { close, open }] = useDisclosure(false, {
    onClose() {
      navigateParentPage();
    }
  });

  const navigate = useNavigate();
  const navigateParentPage = () => {
    setTimeout(() => {
      navigate('/requisition');
    }, 300);
  };

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
    watch,
    control,
    register
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      supplierItems: [{ supplierItemId: '', quantity: 1 }]
    }
  });

  useEffect(() => {
    open();
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        title={<ModalTitle value="New Requisition" />}
      >
        <VcTwoColumnFormWrapper
          onSubmit={handleSubmit(data => {
            console.log(data);
          })}
          leftContent={
            <VcFormInputs>
              <SupplierSelect control={control} />
            </VcFormInputs>
          }
          rightContent={
            <>
              <VcFormInputs>
                <SupplierItemSearch control={control} setValue={setValue} register={register} />
              </VcFormInputs>
              <VcFormAction>
                <ActionSection control={control} getValues={getValues} />
              </VcFormAction>
            </>
          }
          leftTitle="Supplier Information"
          rightTitle="Item Details"
        />
      </Modal>
    </>
  );
};

export default CreateRequisitionV2;
