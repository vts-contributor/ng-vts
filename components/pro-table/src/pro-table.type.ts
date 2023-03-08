import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
export type SortOrder = 'descend' | 'ascend' | null;

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type BorderedType = 'search' | 'table';

export type Bordered =
  | boolean
  | {
    search?: boolean;
    table?: boolean;
  };

export type SizeType = 'small' | 'middle' | 'large' | undefined;

export const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

export type PropertyType = {
  headerTitle?: string;
  propertyName: string;
  required?: boolean;
  datatype: 'string' | 'number' | 'datetime' | 'status';
  checked?: boolean;
  align?: 'left' | 'center' | 'right';
}
export type VtsProTablePaginationPosition = 'top' | 'bottom' | 'both';

export type Request = {
  url: string,
  type: "POST" | "GET" | "PUT" | "DELETE",
  params?: {[key: string]: VtsSafeAny},
  body?: {[key: string]: VtsSafeAny},
  onSuccess?: (data: {[key: string]: VtsSafeAny}) => void,
  onError?: (data: {[key: string]: VtsSafeAny}) => void
}

export type StatusProTable = "success" | "error" | "default" | "processing" | "warning";

export type ViewMode = "view" | "edit" | "create";

export type DrawerConfig = {
  entityName: string,
  showTitleBasedOnProp?: string, // Thêm mới (Chỉnh sửa) [entityName] entity[showTitleBasedOnProp]
  onOpen?: () => void,
  onClose?: () => void,
  onSave?: (data: {[key: string]: any}) => void,
}

export type TabGroupConfig = {
  tabProperty: string,  // property name
  tabValueConfig: TabConfig[]
}

export type TabConfig = {
  tabTitle: string,
  tabCondition?: TabCondition
};

export type TabCondition = {
  operation: string[],
  threshold: any[]
};

export type Status = {
  text: string,
  style: string,
  classNames: string
};

export type StatusConfig = Status[];

export type ButtonConfig = {
  buttonText: string,
  buttonAPI?: string,
  style: {[key: string]: string},
  classNames?: string,
  onClick?: () => void
}