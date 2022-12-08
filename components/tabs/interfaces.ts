/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Observable } from 'rxjs';

export type VtsTabPosition = 'top' | 'bottom' | 'left' | 'right';
export type VtsTabType = 'line' | 'card' | 'editable-card';
export type VtsTabsCanDeactivateFn = (
  fromIndex: number,
  toIndex: number
) => Observable<boolean> | Promise<boolean> | boolean;
export type VtsTabPositionMode = 'horizontal' | 'vertical';

export interface VtsAnimatedInterface {
  inkBar: boolean;
  tabPane: boolean;
}

export class VtsTabChangeEvent {
  index?: number;
  tab: VtsSafeAny;
}

export interface VtsTabScrollListOffset {
  x: number;
  y: number;
}

export type VtsTabScrollListOffsetEvent = VtsTabScrollListOffset & {
  event: Event;
};

interface VtsTabWheelScrollEvent {
  type: 'wheel';
  event: WheelEvent;
}

interface VtsTabTouchScrollEvent {
  type: 'touchstart' | 'touchmove' | 'touchend';
  event: TouchEvent;
}

export type VtsTabScrollEvent = VtsTabTouchScrollEvent | VtsTabWheelScrollEvent;
export type VtsTabScrollEventHandlerFun<T extends VtsTabScrollEvent['event']> = (event: T) => void;

export interface TabTemplateContext {
  visible: boolean;
}
