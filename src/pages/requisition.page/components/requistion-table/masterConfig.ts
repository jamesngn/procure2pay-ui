import { ColDef } from 'ag-grid-community';

import { TRequisition } from '@/types/requisition';

export const columnDefs: ColDef<TRequisition>[] = [
  {
    headerName: 'Document Number'
  },
  {
    headerName: 'Origin Name'
  },
  {
    headerName: 'State'
  },
  {
    headerName: 'Requestor'
  },
  {
    headerName: 'Created On'
  },
  {
    headerName: 'Total Value'
  }
];
