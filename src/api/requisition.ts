import { END_POINT } from '@/constants';
import { BaseService } from '@/shared/services/base-service';
import {
  TRequisition,
  TRequisitionCreateRequest,
  TRequisitionCreateResponse,
  TRequisitionSearch
} from '@/types';
import { TMutationConfig, TPagingResponse, TResponse } from '@/types/common';

const baseService = new BaseService(END_POINT.REQUISITION.BASE_URL);

export const createRequistionMutation: TMutationConfig = {
  name: 'createRequsition',
  fn: async (data: TRequisitionCreateRequest) => {
    const res = await baseService.post<
      TRequisitionCreateRequest,
      TResponse<TRequisitionCreateResponse>
    >(END_POINT.REQUISITION.CREATE, data);

    return res.data;
  }
};

export const getRequisitionQuery = {
  name: 'getRequisition',
  fn: async (id: string) => {
    const url = `/${id}`;
    const res = await baseService.get<undefined, TResponse<TRequisition>>(url, undefined);

    return res.data;
  }
};

export const getRequisitionListQuery = {
  name: 'getRequisitionList',
  fn: async (data: TRequisitionSearch) => {
    const res = await baseService.post<
      TRequisitionSearch,
      TResponse<TPagingResponse<TRequisition>>
    >(END_POINT.REQUISITION.SEARCH, data);

    return res.data;
  }
};
