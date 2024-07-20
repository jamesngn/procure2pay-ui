import { Button, Center, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { GridApi, GridReadyEvent, IServerSideGetRowsParams } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import cx from 'classnames';
import React, { ForwardedRef, forwardRef, useMemo, useRef } from 'react';

import { QIcon } from '../icon';

export type VcTableProps<TData> = AgGridReactProps<TData> & {
  wrapperClassName?: string;
  name?: string;
  style?: React.CSSProperties;
  externalOnGridReady?: (event: GridReadyEvent<TData>) => void;
  onLoadDataSuccess?: (params: IServerSideGetRowsParams) => void;
};

export type TVcTableRef<TData> = Partial<GridApi<TData>>;

export const CustomNoRowsOverlay = (props: { noRowsMessageFunc?: () => string }) => {
  return (
    <div className="ag-overlay-loading-center" style={{ border: 'none', boxShadow: 'none' }}>
      <Stack gap={8} align="center">
        <QIcon name="icNoData" size={32} fill="var(--mantine-color-gray-6)" />
        <Text fz={14} c="gray.6">
          {props?.noRowsMessageFunc?.() || 'No data available'}
        </Text>
      </Stack>
    </div>
  );
};

const VcSSRMTable = <TData,>(props: VcTableProps<TData>, ref: ForwardedRef<TVcTableRef<TData>>) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef<AgGridReact<TData>>(null);
  const apiRef = useRef<AgGridReact<TData>['api']>(null);
  //   const columnApiRef = useRef<AgGridReact<TData>['columnApi']>(null);

  const { externalOnGridReady } = props;

  const noRowsOverlayComponent = useMemo(() => {
    return CustomNoRowsOverlay;
  }, []);

  const onGridReady = (event: GridReadyEvent<TData>) => {
    apiRef.current = event.api;
    // columnApiRef.current = event.columnApi;

    // Size the columns to fit
    apiRef.current?.sizeColumnsToFit();

    // const viewport = tableWrapperRef?.current?.querySelector('.ag-body-viewport');
    // const ps = new Scrollbar(viewport);
    // ps.update();

    // Call the external onGridReady if it exists
    externalOnGridReady?.(event);
  };

  return (
    <div
      ref={tableWrapperRef}
      className={cx('ag-theme-alpine', props.wrapperClassName)}
      style={props.style || { width: '100%', height: '100%' }}
    >
      <AgGridReact<TData>
        ref={gridRef}
        animateRows
        rowSelection="single"
        rowModelType="serverSide"
        noRowsOverlayComponent={noRowsOverlayComponent}
        blockLoadDebounceMillis={500}
        cacheBlockSize={20}
        headerHeight={32}
        rowHeight={32}
        getContextMenuItems={params => []}
        components={{
          noRowsOverlay: CustomNoRowsOverlay
        }}
        defaultColDef={{ suppressHeaderMenuButton: true }}
        onGridReady={onGridReady}
        onGridSizeChanged={e => {
          e.api.sizeColumnsToFit();
        }}
        onLoadDataSuccess={params => params.api.sizeColumnsToFit()}
        {...props}
      />
    </div>
  );
};

const VcSSRMTableWithRef = forwardRef(VcSSRMTable) as <T>(
  props: VcTableProps<T> & { ref?: ForwardedRef<TVcTableRef<T>> }
) => ReturnType<typeof VcSSRMTable>;

type TTableHeaderProps = {
  title?: string;
  onReload?: () => void;
  isCreatable?: boolean;
  onNewClick?: () => void;
};

export const TableHeader: React.FC<TTableHeaderProps> = props => {
  return (
    <Group
      justify="space-between"
      align="center"
      pl={8}
      h={32}
      style={{ borderLeft: '2px solid var(--mantine-color-black)' }}
    >
      <Text fw="bold" tt="uppercase" c="black">
        {props.title}
      </Text>

      <Group gap={4}>
        <UnstyledButton onClick={props.onReload}>
          <Center
            p={4}
            w={32}
            h={32}
            style={{ borderRadius: '4px', border: '1px solid var(--mantine-color-gray-2)' }}
          >
            <QIcon name="icSearch" size={16} />
          </Center>
        </UnstyledButton>

        {props.isCreatable && props.onNewClick && (
          <UnstyledButton
            style={{
              backgroundColor: 'var(--mantine-primary-color-5)',
              color: 'white',
              borderRadius: '4px',
              height: '32px',
              padding: '0 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              '&:hover': {
                backgroundColor: 'var(--mantine-primary-color-1)'
              }
            }}
            onClick={props.onNewClick}
          >
            + Add
          </UnstyledButton>
        )}
      </Group>
    </Group>
  );
};

export default VcSSRMTableWithRef;
