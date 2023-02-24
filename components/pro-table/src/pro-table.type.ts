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
}