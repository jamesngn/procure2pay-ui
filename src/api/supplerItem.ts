import { END_POINT } from '@/constants';
import { BaseService } from '@/shared/services/base-service';
import { TPagingResponse, TResponse, TSupplierItem, TSupplierItemSearch } from '@/types';

const baseService = new BaseService(END_POINT.SUPPLIER_ITEM.BASE_URL);

export const getSupplierItemQuery = {
  name: 'getSupplierItem',
  fn: async (id: string) => {
    const res = await baseService.get<undefined, TResponse<TSupplierItem>>(`/${id}`, undefined);

    return res.data;
  }
};

export const getSupplierItemList = {
  name: 'getSupplierItemList',
  fn: async (data: TSupplierItemSearch) => {
    const res = await baseService.post<
      TSupplierItemSearch,
      TResponse<TPagingResponse<TSupplierItem>>
    >(END_POINT.SUPPLIER_ITEM.SEARCH, data);

    return res.data;
  }
};
