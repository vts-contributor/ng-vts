/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export type VtsCascaderExpandTrigger = 'click' | 'hover';
export type VtsCascaderTriggerType = 'click' | 'hover';
export type VtsCascaderSize = 'sm' | 'md' | 'lg' | 'xl';

export type VtsCascaderFilter = (searchValue: string, path: VtsCascaderOption[]) => boolean;
export type VtsCascaderSorter = (
  a: VtsCascaderOption[],
  b: VtsCascaderOption[],
  inputValue: string
) => number;

export interface VtsCascaderOption {
  value?: VtsSafeAny;
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  parent?: VtsCascaderOption;
  children?: VtsCascaderOption[];

  [key: string]: VtsSafeAny;
}

export interface VtsCascaderSearchOption extends VtsCascaderOption {
  path: VtsCascaderOption[];
}

export interface VtsShowSearchOptions {
  filter?: VtsCascaderFilter;
  sorter?: VtsCascaderSorter;
}

export function isShowSearchObject(
  options: VtsShowSearchOptions | boolean
): options is VtsShowSearchOptions {
  return typeof options !== 'boolean';
}

/**
 * To avoid circular dependency, provide an interface of `VtsCascaderComponent`
 * for `VtsCascaderService`.
 */
export interface VtsCascaderComponentAsSource {
  inputValue: string;
  vtsShowSearch: VtsShowSearchOptions | boolean;
  vtsLabelProperty: string;
  vtsValueProperty: string;
  vtsChangeOnSelect: boolean;

  vtsChangeOn?(option: VtsCascaderOption, level: number): boolean;

  vtsLoadData?(node: VtsCascaderOption, index: number): PromiseLike<VtsSafeAny>;
}
