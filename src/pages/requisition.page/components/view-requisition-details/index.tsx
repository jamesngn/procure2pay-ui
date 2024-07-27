import { Accordion, rem } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import React from 'react';

const RequisitionDetailsAccordion = () => {
  return (
    <Accordion>
      <Accordion.Item value="item-1">
        <Accordion.Control
          icon={
            <IconPhoto
              style={{ color: 'var(--mantine-color-red-6', width: rem(20), height: rem(20) }}
            />
          }
        >
          Recent photos
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default RequisitionDetailsAccordion;
