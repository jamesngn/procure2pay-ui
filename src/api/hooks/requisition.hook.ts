import { useQuery } from "@tanstack/react-query";

import { TRequisitionSearch } from "@/types";

import { getRequisitionListQuery, getRequisitionQuery } from "../requisition";


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
