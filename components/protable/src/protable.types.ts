import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export type VtsProTableData =
  | VtsSafeAny
  | {
    [key: string]: VtsProTableData;
  };
export type VtsProTableLayout = 'fixed' | 'auto';
export type VtsProTablePaginationPosition = 'top' | 'bottom' | 'both';
export type VtsProTablePaginationType = 'default' | 'small';
export type VtsProTableSize = 'middle' | 'default' | 'small';
export type VtsProTableFilterList = Array<{
  text: string;
  value: VtsSafeAny;
  byDefault?: boolean;
}>;
export type VtsProTableSortOrder = string | 'ascend' | 'descend' | null;
export type VtsProTableSortFn = (
  a: VtsProTableData,
  b: VtsProTableData,
  sortOrder?: VtsProTableSortOrder
) => number;
export type VtsProTableFilterValue = VtsSafeAny[] | VtsSafeAny;
export type VtsProTableFilterFn = (value: VtsProTableFilterValue, data: VtsProTableData) => boolean;

export interface VtsProTableQueryParams {
  pageIndex: number;
  pageSize: number;
  sort: Array<{ key: string; value: VtsProTableSortOrder }>;
  filter: Array<{ key: string; value: VtsProTableFilterValue }>;
}

export type PageInfo = {
  pageSize: number;
  total: number;
  current: number;
};

export type VtsProTableRowHeight = 'normal' | 'expand' | 'narrow' | null;

export type VtsProTableRequesData<T> = {
  data: T[] | undefined;
  success?: boolean;
  total?: number;
} & Record<string, any>;

export type UseFetchDataAction<T = any> = {
  dataSource: T[];
  setDataSource: (dataSource: T[]) => void;
  loading: boolean | undefined;
  pageInfo: PageInfo;
  reload: () => Promise<void>;
  fullScreen?: () => void;
  reset: () => void;
  pollingLoading: boolean;
  setPageInfo: (pageInfo: Partial<PageInfo>) => void;
};