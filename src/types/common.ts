import { DefaultError, MutateFunction } from '@tanstack/react-query';
import { any } from 'zod';

export type TMutationConfig<T = any> = {
  name: string;
  fn: MutateFunction<unknown, DefaultError, T, unknown>;
};

export type TResponse<TData> = {
  serverDateTime: string;
  status: number;
  code: number;
  msg: string;
  exception: null | string;
  successful: boolean;
  data: TData;
};

export type TPagingResponse<TData> = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  elements: TData[];
  hasMore: boolean;
  hasPrevious: boolean;
} | null;

export type TPagingRequest = {
  pageSize: number;
  pageNumber: number;
};

export type TAgGridDatasourceResponse = {
  rowCount: number;
  rowData: any[];
};