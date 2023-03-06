import { VtsButtonComponent } from '@ui-vts/ng-vts/button';
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

export type RecordCreator = {
  record?: Object;
  position?: 'top' | 'bottom';
  childButtons?: VtsButtonComponent[];
};

export type ColumnsState = {
  show?: boolean;
  fixed?: 'right' | 'left' | undefined;
  order?: number;
  disable?:
  | boolean
  | {
    checkbox: boolean;
  };
};

export type SearchConfig = {
  filterType?: 'query' | 'light';
  searchText?: string;
  resetText?: string;
  submitText?: string;
  labelWidth?: 'number' | 'auto';
  span?: 'number' | 'ColConfig';
  className?: string;
  collapseRender?: (collapsed: boolean, showCollapseButton?: boolean,) => VtsSafeAny;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  optionRender?: ((searchConfig: VtsSafeAny,
    formProps: VtsSafeAny,
    dom: VtsSafeAny) => VtsSafeAny[]) | false;
}

export const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

export type ConfigColumn = {
  headerName: string,
  propName: string
}

export type PropertyType = {
  headerTitle?: string;
  propertyName: string;
  required?: boolean;
  datatype: 'string' | 'number' | 'datetime';
  checked?: boolean;
}
export type VtsProTablePaginationPosition = 'top' | 'bottom' | 'both';

export type Request = {
  url: string,
  type: "POST" | "GET",
  params?: {[key: string]: any},
  body?: {[key: string]: any},
  onSuccess?: (data: {[key: string]: any}) => void,
  onError?: () => void
}

