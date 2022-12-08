/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';
import { WeekDayIndex } from '@ui-vts/ng-vts/core/time';

export interface VtsDateConfig {
  /** Customize the first day of a week */
  firstDayOfWeek?: WeekDayIndex;
}

export const VTS_DATE_CONFIG = new InjectionToken<VtsDateConfig>('date-config');

export const VTS_DATE_CONFIG_DEFAULT: VtsDateConfig = {
  firstDayOfWeek: undefined
};

export function mergeDateConfig(config: VtsDateConfig): VtsDateConfig {
  return { ...VTS_DATE_CONFIG_DEFAULT, ...config };
}
