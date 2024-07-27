import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { Control, useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCreateRequisition } from '@/api/hooks/requisition.hook';
import VcButton from '@/components/button';
import { VcFormAction, VcFormInputs, VcTwoColumnFormWrapper } from '@/layout/form-layout';
import { ModalTitle } from '@/layout/view-detail-layout';
import { CreateRequisitionSchema } from '@/schema-validator/requisition';

import SupplierItemSearch from './form-input/supplier-item-search';
import SupplierSelect from './form-input/supplier-select';

const ActionSection: React.FC<{ control: Control<CreateRequisitionSchema>; getValues: any }> = ({
  control,
  getValues
}) => {
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
const CreateRequisition = () => {
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
  } = useForm<CreateRequisitionSchema>({
    resolver: classValidatorResolver(CreateRequisitionSchema),
    defaultValues: {
      supplierId: '',
      supplierItems: []
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

export default CreateRequisition;
