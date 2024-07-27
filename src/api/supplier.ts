import { END_POINT } from '@/constants';
import { BaseService } from '@/shared/services/base-service';
import { TPagingResponse, TResponse, TSupplier, TSupplierSearch } from '@/types';

const baseService = new BaseService(END_POINT.SUPPLIER.BASE_URL);

export const getSuppplierQuery = {
  name: 'getSupplier',
  fn: async (id: string) => {
    const url = `/${id}`;
    const res = await baseService.get<undefined, TResponse<TSupplier>>(url, undefined);

    return res.data;
  }
};

export const getSupplierListQuery = {
  name: 'getSupplierList',
  fn: async (data: TSupplierSearch) => {
    const res = await baseService.post<TSupplierSearch, TResponse<TPagingResponse<TSupplier>>>(
      END_POINT.SUPPLIER.SEARCH,
      data
    );

    return res.data;
  }
};
