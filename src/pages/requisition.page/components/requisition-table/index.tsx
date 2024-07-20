import { Stack } from '@mantine/core';
import { IServerSideGetRowsParams } from 'ag-grid-community';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TableHeader } from '@/components/ssrm-table';
import QSSRMTable from '@/components/ssrm-table/index';
import { TRequisition } from '@/types/requisition';

import { RequisitionDataSource } from './config';
import { columnDefs } from './masterConfig';

const RequisitionTable = () => {
  const navigate = useNavigate();

  const onNewClick = () => {
    navigate('/requisition/create');
  };

  // Callback function when data is successfully loaded
  const onLoadDataSuccess = ({ api }: IServerSideGetRowsParams) => {
    api.hideOverlay();
    api.sizeColumnsToFit();
  };

  const serverSideDatasource = useMemo(() => {
    const getRows = async (params: IServerSideGetRowsParams) => {
      const { rowCount, rowData } = await RequisitionDataSource(params.request);
      if (!rowCount) {
        params.api.showNoRowsOverlay();
      }

      params.success({ rowData, rowCount });

      params.api.hideOverlay();
      params.api.sizeColumnsToFit();

      if (rowCount > 0) {
        onLoadDataSuccess(params);
      }
    };

    return { getRows };
  }, []);

  const noRowsOverlayComponentParams = useMemo(() => {
    return {
      noRowsMessageFunc: () => {
        return 'Please search for a requisition';
      }
    };
  }, []);

  return (
    <Stack gap={16} h={'100%'}>
      <TableHeader title="Requisition Table" isCreatable={true} onNewClick={onNewClick} />

      <QSSRMTable<TRequisition>
        masterDetail={true}
        columnDefs={columnDefs}
        serverSideDatasource={serverSideDatasource}
        noRowsOverlayComponentParams={noRowsOverlayComponentParams}
        getRowId={data => {
          return data.data.createdOn;
        }}
      />
    </Stack>
  );
};

export default RequisitionTable;
