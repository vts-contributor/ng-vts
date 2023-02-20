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