import { VtsFormControlComponent } from './../../form/form-control.component';
import { VtsButtonComponent } from '@ui-vts/ng-vts/button';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export type PageInfo = {
  pageSize: number;
  total: number;
  current: number;
};

export type RequestData<T> = {
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

export type ProColumns<T = any> = ProColumnGroupType<T> | ProColumnType;

export type ProColumnGroupType<RecordType> = {
  children: ProColumns<RecordType>[];
}

export type ProColumnType = {
  index?: number,
  colSize?: number,
  initialValue?: VtsSafeAny,
};

export type SortOrder = 'descend' | 'ascend' | null;

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type BorderedType = 'search' | 'table';

export type Bordered =
  | boolean
  | {
    search?: boolean;
    table?: boolean;
  };

export interface ColumnFilterItem {
  text: string | VtsSafeAny;
  value: string | number | boolean;
  children?: ColumnFilterItem[];
}

export type ColumnType = {
  title?: string | null,
  sorter?: boolean | {
    compare?: () => VtsSafeAny,
    multiple?: number
  },
  sortOrder?: SortOrder,
  defaultSortOrder?: SortOrder,
  sortDirections?: SortOrder[],
  showSorterTooltip?: boolean,
  filtered?: boolean,
  filters?: ColumnFilterItem[],
  onFilter?: (value: string | number | boolean, record: VtsSafeAny) => boolean,
  responsive?: Breakpoint[];
  filterDropdownVisible?: boolean;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
};

export type SizeType = 'small' | 'middle' | 'large' | undefined;

export type ProTable = {
  request?: (params?: {
    pageSize?: number,
    current?: number
  },
    sort?: VtsSafeAny,
    filter?: VtsSafeAny) => {
      data: VtsSafeAny,
      success: VtsSafeAny,
      total?: number
    };
  params: Object;
  postData?: (data: VtsSafeAny[]) => VtsSafeAny[];
  defaultData?: VtsSafeAny[];
  dataSource?: VtsSafeAny[];
  onDataSourceChange?: (dataSource: VtsSafeAny[]) => void;
  actionRef?: VtsSafeAny;
  formRef?: VtsSafeAny;
  toolBarRender?: (action: VtsSafeAny) => VtsSafeAny;
  onLoad?: (dataSource: VtsSafeAny[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  onRequestError?: (error: VtsSafeAny) => void;
  tableClassName?: string;
  tableStyle?: string;
  options?: {
    fullScreen: boolean | VtsSafeAny,
    reload: boolean | VtsSafeAny,
    setting: true,
    density?: boolean
  };
  search?: false | SearchConfig;
  dateFormatter?: 'string' | 'number' | false | ((value: VtsSafeAny, valueType: string) => string | number);
  defaultSize?: SizeType;
  beforeSearchSubmit?: (params: VtsSafeAny) => VtsSafeAny;
  onSizeChange?: (size: 'default' | 'middle' | 'small') => void;
  type?: 'form';
  form?: VtsFormControlComponent | VtsSafeAny;
  onSubmit?: (params: VtsSafeAny) => void;
  onReset?: () => void;
  columnEmptyText?: string | false;
  tableRender?: (childs?: VtsSafeAny[], dom?: VtsSafeAny, domList?: { toolbar: VtsSafeAny, alert: VtsSafeAny, table: VtsSafeAny }) => VtsSafeAny;
  toolbar?: VtsSafeAny;
  tableExtraRender?: VtsSafeAny;
  manualRequest?: boolean;
  editable?: VtsSafeAny;
  cardBordered?: boolean | { search?: boolean, table?: boolean };
  debounceTime?: number;
  revalidateOnFocus?: boolean;
  columnsState?: ColunmStateType;
}

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

export type ColunmStateType = {
  defaultValue?: Record<string, ColumnsState>;
  value?: Record<string, ColumnsState>;
  onChange?: (value: Record<string, ColumnsState>) => void;
  persistenceKey?: string | number;
  persistenceType?: 'localStorage' | 'sessionStorage';
}

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

interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: VtsSafeAny) => boolean;
  cancelEditable: (rowKey: VtsSafeAny) => boolean;
}

export type OptionsType =
  | ((event: VtsSafeAny, action?: ActionType) => void)
  | boolean;

export type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?: boolean;
  search?: (VtsSafeAny & { name?: string }) | boolean;
};

export type ColumnsConfig = {
  title?: VtsSafeAny | ((config: ProColumnType, type?: VtsSafeAny) => VtsSafeAny);
  tooltip?: string;
  ellipsis?: boolean;
  copyable?: boolean;
  valueEnum?: VtsSafeAny;
  valueType?: VtsSafeAny;
  order?: number;
  fieldProps?: (form?: VtsSafeAny, config?: VtsSafeAny) => VtsSafeAny;
  formItemProps?: VtsSafeAny;
  renderText?: (text?: VtsSafeAny, record?: VtsSafeAny, index?: number, action?: UseFetchDataAction<VtsSafeAny>) => string;
  render?: (text?: VtsSafeAny, record?: VtsSafeAny, index?: number, action?: UseFetchDataAction<VtsSafeAny>) => VtsSafeAny | VtsSafeAny[];
  renderFormItem?: VtsSafeAny;
  search?: false | { transform: (value: VtsSafeAny) => VtsSafeAny };
  editable?: false | ((text?: VtsSafeAny, record?: VtsSafeAny, index?: number) => boolean);
  colSize?: number;
  hideInSearch?: boolean;
  hideInTable?: boolean;
  hideInDescriptions?: boolean;
  filters?: boolean | Object[];
  onFilter?: (value?: VtsSafeAny, record?: VtsSafeAny) => boolean | false;
  request?: VtsSafeAny;
  initialValue?: VtsSafeAny;
}

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

export type Request = {
  url: string,
  type: "POST" | "GET",
  params?: {[key: string]: any},
  body?: {[key: string]: any},
  onSuccess?: void
}

