import { Stack } from '@mantine/core';
import React from 'react';

import { TableHeader } from '@/components/ssrm-table';
import QSSRMTable from '@/components/ssrm-table/index';

import { columnDefs } from './masterConfig';

const RequisitonTable = () => {
  return (
    <Stack gap={16} h={'100%'}>
      <TableHeader title="Requisition Table" />

      <QSSRMTable masterDetail={true} columnDefs={columnDefs} />
    </Stack>
  );
};

export default RequisitonTable;
