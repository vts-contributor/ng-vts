/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

export type DisabledDateFn = (d: Date) => boolean;

export type DisabledTimePartial = 'start' | 'end';

export type VtsDateMode = 'decade' | 'year' | 'month' | 'week' | 'date' | 'time';

export type RangePartType = 'left' | 'right';

export type CompatibleDate = Date | Date[];

export type DisabledTimeFn = (
  current: Date | Date[],
  partial?: DisabledTimePartial
) => DisabledTimeConfig | undefined;

export interface DisabledTimeConfig {
  vtsDisabledHours(): number[];
  vtsDisabledMinutes(hour: number): number[];
  vtsDisabledSeconds(hour: number, minute: number): number[];
}

export interface SupportTimeOptions {
  vtsFormat?: string;
  vtsHourStep?: number;
  vtsMinuteStep?: number;
  vtsSecondStep?: number;
  vtsDisabledHours?(): number[];
  vtsDisabledMinutes?(hour: number): number[];
  vtsDisabledSeconds?(hour: number, minute: number): number[];
  vtsHideDisabledOptions?: boolean;
  vtsDefaultOpenValue?: Date;
  vtsAddOn?: TemplateRef<void>;
  vtsUse12Hours?: boolean;
}

export interface PresetRanges {
  [key: string]: Date[] | (() => Date[]);
}
