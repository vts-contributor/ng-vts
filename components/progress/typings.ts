/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { NgStyleInterface } from '@ui-vts/ng-vts/core/types';

export type VtsProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';

export type VtsProgressStatusType = 'success' | 'exception' | 'active' | 'normal';

export type VtsProgressTypeType = 'line' | 'circle' | 'dashboard';

export type VtsProgressStrokeLinecapType = 'round' | 'square';

export interface VtsProgressGradientProgress {
  [percent: string]: string;
}

export interface VtsProgressGradientFromTo {
  from: string;
  to: string;
}

export type VtsProgressColorGradient = { direction?: string } & (
  | VtsProgressGradientProgress
  | VtsProgressGradientFromTo
);

export type VtsProgressStrokeColorType = string | VtsProgressColorGradient;

export type VtsProgressFormatter =
  | ((percent: number) => string)
  | TemplateRef<{ $implicit: number }>;

export interface VtsProgressCirclePath {
  stroke: string | null;
  strokePathStyle: NgStyleInterface;
}

export interface VtsProgressStepItem {
  backgroundColor: string;
  width: string;
  height: string;
}
