import { Text } from '@mantine/core';
import React from 'react';

type ModalTitleProps = {
  value: string;
};

export const ModalTitle: React.FC<ModalTitleProps> = props => {
  return (
    <Text fz={24} fw={500}>
      {props.value}
    </Text>
  );
};
