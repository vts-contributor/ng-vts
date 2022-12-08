/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type VtsMark = string | VtsMarkObj;

export interface VtsMarkObj {
  style?: object;
  label: string;
}

export class VtsMarks {
  [key: string]: VtsMark;
}

/**
 * Processed steps that would be passed to sub components.
 */
export interface VtsExtendedMark {
  value: number;
  offset: number;
  config: VtsMark;
}

/**
 * Marks that would be rendered.
 */
export interface VtsDisplayedMark extends VtsExtendedMark {
  active: boolean;
  label: string;
  style?: object;
}

/**
 * Steps that would be rendered.
 */
export interface VtsDisplayedStep extends VtsExtendedMark {
  active: boolean;
  style?: object;
}

export type VtsSliderShowTooltip = 'always' | 'never' | 'default';

export type VtsSliderValue = number[] | number;

export interface VtsSliderHandler {
  offset: number | null;
  value: number | null;
  active: boolean;
}
