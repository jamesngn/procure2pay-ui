import { useQuery } from '@tanstack/react-query';

import { TSupplierItemSearch } from '@/types';

import { getSupplierItemList, getSupplierItemQuery } from '../supplerItem';

export const useGetSupplierItem = (id: string) => {
  return useQuery({
    queryKey: ['getSupplierItem', id],
    queryFn: () => {
      return getSupplierItemQuery.fn(id);
    },
    enabled: !!id
  });
};

export const useGetSupplierItemList = (search: TSupplierItemSearch) => {
  return useQuery({
    queryKey: ['getSupplierItemList', search],
    queryFn: () => {
      return getSupplierItemList.fn(search);
    },
    enabled: !!search
  });
};
