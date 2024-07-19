import { IServerSideGetRowsRequest } from 'ag-grid-community';

import { TPagingResponse } from '@/types';


type TParsePagingResponse<T> = {
  rowData: T[];
  rowCount: number;
};

export const parsePagingResponse = <T>(data: TPagingResponse<T>): TParsePagingResponse<T> => {
  const { elements, totalElements } = data;

  return {
    rowData: elements,
    rowCount: totalElements
  };
};

export const getPagingRequest = (request: IServerSideGetRowsRequest) => {
  const { startRow, endRow } = request;

  const pageSize = endRow - startRow;
  const pageNumber = startRow / pageSize;

  return {
    pageSize,
    pageNumber
  };
};
