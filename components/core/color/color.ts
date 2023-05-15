/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export const presetColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
] as const;

export type VtsPresetColor = (typeof presetColors)[number];

export function isPresetColor(color: string): color is VtsPresetColor {
  return presetColors.indexOf(color as VtsSafeAny) !== -1;
}

// export const presetStatusColors = ['success', 'processing', 'error', 'default', 'warning'];

// export type VtsPresetStatusColor = typeof presetStatusColors[number];

// export function isPresetStatusColor(color: string): color is VtsPresetStatusColor {
//   return presetStatusColors.indexOf(color as VtsSafeAny) !== -1;
// }
