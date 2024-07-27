import { useQuery } from '@tanstack/react-query';

import { TSupplierSearch } from '@/types';

import { getSupplierListQuery, getSuppplierQuery } from '../supplier';

export const useGetSupplier = (supplierId: string) => {
  return useQuery({
    queryKey: ['getSupplier', supplierId],
    queryFn: () => {
      return getSuppplierQuery.fn(supplierId);
    },
    enabled: !!supplierId
  });
};

export const useGetSupplierList = (search: TSupplierSearch) => {
  return useQuery({
    queryKey: ['getRequisitionList', search],
    queryFn: () => {
      return getSupplierListQuery.fn(search);
    },
    enabled: !!search
  });
};
