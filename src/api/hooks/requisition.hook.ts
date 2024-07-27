import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';

import { TRequisitionSearch } from '@/types';

import {
  createRequistionMutation,
  getRequisitionListQuery,
  getRequisitionQuery
} from '../requisition';

export const useCreateRequisition = (options?: MutationOptions) => {
  const { onSuccess, onError, ...otherOptions } = options;

  return useMutation({
    mutationKey: [createRequistionMutation.name],
    mutationFn: createRequistionMutation.fn,
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (error, variables, context) => {
      onError && onError(error, variables, context);
    },
    ...otherOptions
  });
};

export const useGetRequisition = (requisitionId: string) => {
  return useQuery({
    queryKey: [getRequisitionQuery.name, requisitionId],
    queryFn: () => {
      return getRequisitionQuery.fn(requisitionId);
    },
    enabled: !!requisitionId
  });
};

export const useGetRequisitionList = (search: TRequisitionSearch) => {
  return useQuery({
    queryKey: [getRequisitionListQuery.name, search],
    queryFn: () => {
      return getRequisitionListQuery.fn(search);
    },
    enabled: !!search
  });
};
