import { Center, Tooltip } from '@mantine/core';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import { RequisitionStatus, requisitionStatusData } from '@/shared/enums/biz.enum';

export const StatusCellRenderer = (props: ICellRendererParams<any>) => {
  const { status, reason } = props.data;

  const color = requisitionStatusData[status].color;

  if (status == RequisitionStatus.APPROVED) {
    return <></>;
  }

  return (
    <Tooltip label={reason} disabled={!reason} position="bottom">
      <Center style={{ height: '100%' }}>
        <div
          style={{
            background: color,
            borderRadius: '50%',
            width: '12px',
            height: '12px'
          }}
        />
      </Center>
    </Tooltip>
  );
};
