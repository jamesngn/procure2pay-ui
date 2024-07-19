import { AxiosResponse } from "axios";

import { END_POINT } from "@/constants";
import { BaseService } from "@/shared/services/base-service";
import { TRequisition, TRequisitionSearch } from "@/types";
import { TPagingResponse, TResponse } from "@/types/common";


const baseService = new BaseService(END_POINT.REQUISITION.BASE_URL);

export const getRequisitionQuery = {
    name: 'getRequisition',
    fn: async(id: string) => {
        const url = `/${id}`;
        const res = await baseService.get<undefined, TResponse<TRequisition>>(url, undefined);

        return res.data;
    }
};

export const getRequisitionListQuery = {
    name: 'getRequisitionList',
    fn: async(data: TRequisitionSearch ) => {
        const url = '/search';
        const res = await baseService.post<TRequisitionSearch, AxiosResponse<TPagingResponse<TRequisition[]>>>(url, data);

        return res.data;
    }
};