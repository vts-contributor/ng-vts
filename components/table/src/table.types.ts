/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { VtsSafeAny, VtsSizeLMSType } from '@ui-vts/ng-vts/core/types';

export type VtsTableData =
  | VtsSafeAny
  | {
      [key: string]: VtsTableData;
    };
export type VtsTableLayout = 'fixed' | 'auto';
export type VtsTablePaginationPosition = 'top' | 'bottom' | 'both';
export type VtsTablePaginationType = 'default' | 'small';
export type VtsTableSize = VtsSizeLMSType;
export type VtsTableFilterList = Array<{
  text: string;
  value: VtsSafeAny;
  byDefault?: boolean;
}>;
export type VtsTableSortOrder = string | 'ascend' | 'descend' | null;
export type VtsTableSortFn = (
  a: VtsTableData,
  b: VtsTableData,
  sortOrder?: VtsTableSortOrder
) => number;
export type VtsTableFilterValue = VtsSafeAny[] | VtsSafeAny;
export type VtsTableFilterFn = (value: VtsTableFilterValue, data: VtsTableData) => boolean;

export interface VtsTableQueryParams {
  pageIndex: number;
  pageSize: number;
  sort: Array<{ key: string; value: VtsTableSortOrder }>;
  filter: Array<{ key: string; value: VtsTableFilterValue }>;
}
