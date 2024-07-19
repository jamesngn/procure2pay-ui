import { ColDef } from 'ag-grid-community';

import { TRequisition } from '@/types/requisition';

export const columnDefs: ColDef<TRequisition>[] = [
  {
    headerName: 'Document Number',
    field: 'createdBy.id',
    minWidth:40,
  },
  {
    headerName: 'Origin Name',
    field: 'createdBy.email',
    minWidth: 60,
  },
  {
    headerName: 'State',
    field: 'state',
    minWidth: 40,
  },
  {
    headerName: 'Requestor',
    field: 'createdBy',
    minWidth: 120,
    valueGetter: ({data}) => `${data.createdBy.firstName} ${data.createdBy.lastName}`
  },
  {
    headerName: 'Created On',
    field: 'createdOn',
    minWidth: 80,
  },
  {
    headerName: 'Total Value',
    field: 'createdBy.email',
    minWidth: 60,
  }
];
