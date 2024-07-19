import {
  ColDef,
  IDateFilterParams,
  INumberFilterParams,
  ISetFilterParams,
  ITextFilterParams
} from 'ag-grid-community';

export const displayNameMap = {
  contains: 'Gồm ký tự',
  notContains: 'Không gồm ký tự',
  endsWith: 'Kết thúc với',
  equals: {
    date: 'Bằng ngày',
    number: 'Bằng giá trị',
    text: 'Bằng ký tự'
  },
  notEqual: {
    date: 'Khác ngày',
    number: 'Khác giá trị',
    text: 'Khác ký tự'
  },
  greaterThan: {
    date: 'Sau ngày',
    number: 'Lớn hơn'
  },
  greaterThanOrEqual: {
    date: 'Sau hoặc bằng ngày',
    number: 'Lớn hơn hoặc bằng'
  },
  lessThan: {
    date: 'Trước ngày',
    number: 'Nhỏ hơn'
  },
  lessThanOrEqual: {
    date: 'Trước hoặc bằng ngày',
    number: 'Nhỏ hơn hoặc bằng'
  }
};

export const filterableColDef: ColDef = {
  floatingFilter: true
};

export const sortableColDef: ColDef = {
  sortable: true,
  unSortIcon: true
};

export const defaultTextFilterParams: ITextFilterParams = {
  maxNumConditions: 1,
  filterOptions: [
    {
      displayKey: 'contains',
      displayName: displayNameMap['contains'],
      predicate: (filter: any, value: any) => value.indexOf(filter) >= 0
    }
  ]
};

export const defaultSetFilterParams: ISetFilterParams = {
  suppressSorting: true,
  suppressSelectAll: true,
  // suppressMiniFilter: true,
  applyMiniFilterWhileTyping: false,
  defaultToNothingSelected: true,
  buttons: ['apply', 'clear']
};

export const defaultSetFilterParamsFunc = (data: any) => {
  const setFilterValues = Object.keys(data)
    .map(Number)
    .filter(key => key != 0);

  return {
    ...defaultSetFilterParams,
    values: setFilterValues,
    valueFormatter: (params: any) => {
      const label = data?.[params.value]?.label;
      return label !== undefined ? label : params.value;
    }
  };
};

export const defaultDateFilterParams: IDateFilterParams = {
  maxNumConditions: 1,
  defaultOption: 'equals',
  filterOptions: [
    {
      displayKey: 'lessThan',
      displayName: displayNameMap['lessThan']['date'],
      predicate: ([filterValue], cellValue) => {
        return cellValue == null || cellValue < filterValue;
      }
    },
    {
      displayKey: 'equals',
      displayName: displayNameMap['equals']['date'],
      predicate: ([filterValue], cellValue) => cellValue == null || cellValue > filterValue
    },
    {
      displayKey: 'greaterThan',
      displayName: displayNameMap['greaterThan']['date'],
      predicate: ([filterValue], cellValue) => {
        return cellValue == null || cellValue > filterValue;
      }
    }
  ]
};

export const defaultNumberFilterParams: INumberFilterParams = {
  maxNumConditions: 1,
  defaultOption: 'equals',
  filterOptions: [
    {
      displayKey: 'equals',
      displayName: displayNameMap['equals']['number'],
      predicate: (filter: any, value: any) => value == filter
    },
    {
      displayKey: 'lessThan',
      displayName: displayNameMap['lessThan']['number'],
      predicate: (filter: any, value: any) => value < filter
    },
    {
      displayKey: 'greaterThan',
      displayName: displayNameMap['greaterThan']['number'],
      predicate: (filter: any, value: any) => value > filter
    }
  ]
};
