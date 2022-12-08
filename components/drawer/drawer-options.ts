/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { TemplateRef, Type } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsDrawerRef } from './drawer-ref';

export type VtsDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface VtsDrawerOptionsOfComponent<T = VtsSafeAny, D = VtsSafeAny> {
  vtsClosable?: boolean;
  vtsMaskClosable?: boolean;
  vtsCloseOnNavigation?: boolean;
  vtsDirection?: Direction;
  vtsMask?: boolean;
  vtsKeyboard?: boolean;
  vtsNoAnimation?: boolean;
  vtsTitle?: string | TemplateRef<{}>;
  vtsFooter?: string | TemplateRef<{}>;
  vtsContent?: TemplateRef<{ $implicit: D; drawerRef: VtsDrawerRef }> | Type<T>;
  vtsContentParams?: Partial<T & D>;
  vtsMaskStyle?: object;
  vtsBodyStyle?: object;
  vtsWrapClassName?: string;
  vtsWidth?: number | string;
  vtsHeight?: number | string;
  vtsPlacement?: VtsDrawerPlacement;
  vtsZIndex?: number;
  vtsOffsetX?: number;
  vtsOffsetY?: number;
}

export interface VtsDrawerOptions<T = VtsSafeAny, D = VtsSafeAny>
  extends VtsDrawerOptionsOfComponent<T, D> {
  vtsOnCancel?(): Promise<VtsSafeAny>;
}
