import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export type VtsPropertyType = {
  headerTitle?: string;
  propertyName: string;
  required?: boolean;
  datatype: 'string' | 'number' | 'datetime' | 'status' | 'date';
  checked?: boolean;
  align?: 'left' | 'center' | 'right';
}
export type VtsProTablePaginationPosition = 'top' | 'bottom' | 'both';

export type VtsRequest = {
  url: string,
  type: "POST" | "GET" | "PUT" | "DELETE",
  params?: {[key: string]: VtsSafeAny},
  body?: {[key: string]: VtsSafeAny},
  onSuccess?: (data: {[key: string]: VtsSafeAny}) => void,
  onError?: (data: {[key: string]: VtsSafeAny}) => void
}

export type VtsViewMode = "view" | "edit" | "create" | "create-another";

export type VtsDrawerConfig = {
  openWith: "drawer" | "modal",
  entityName: string,
  showTitleBasedOnProp?: string,
  onOpen?: () => void,
  onClose?: () => void,
  onSave?: (data: {[key: string]: any}) => void,
}

export type VtsStatusConfig = {
  text: string,
  color: string,
  value: string | number
}

export type VtsModalConfig = {
  title?: string,
  content?: string
}

export type VtsModalDeleteConfig = VtsModalConfig & {
  entityName?: string,
  showNameBasedOnProp?: string,
  type?: string
}

export type VtsModalUploadConfig = VtsModalConfig & {
  acceptTypes?: string,
  maxFileSizeInKB?: number
}

export type VtsTabGroupConfig = {
  tabProperty?: string,
  tabValueConfig?: VtsTabConfig[]
}

export type VtsTabConfig = {
  tabTitle: string,
  tabValue: string,
  tabCondition?: VtsTabCondition,
  total?: number
};

export type VtsTabCondition = {
  operation: string[],
  threshold: any[]
};

export type VtsButtonConfig = {
  buttonText: string,
  buttonAPI?: VtsRequest,
  style: {[key: string]: string},
  classNames?: string,
  onClick?: () => void
}

export type VtsProTableFilterList = Array<{
  text: string;
  value: VtsSafeAny;
  byDefault?: boolean;
}>;

export type VtsTableData =
  | VtsSafeAny
  | {
      [key: string]: VtsTableData;
    };
export type VtsTableLayout = 'fixed' | 'auto';
export type VtsTablePaginationPosition = 'top' | 'bottom' | 'both';
export type VtsTablePaginationType = 'default' | 'small';
export type VtsTableSize = 'middle' | 'default' | 'small';
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

export type VtsActionType = 'create' | 'create-another' | 'edit' | 'delete' | 'import' | 'export' | 'view' | 'more' | 'reload';