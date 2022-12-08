/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Observable } from 'rxjs';
import { VtsDrawerPlacement } from './drawer-options';

export abstract class VtsDrawerRef<T = VtsSafeAny, R = VtsSafeAny> {
  abstract afterClose: Observable<R>;
  abstract afterOpen: Observable<void>;
  abstract close(result?: R): void;
  abstract open(): void;
  abstract getContentComponent(): T | null;

  abstract vtsClosable?: boolean;
  abstract vtsNoAnimation?: boolean;
  abstract vtsMaskClosable?: boolean;
  abstract vtsKeyboard?: boolean;
  abstract vtsMask?: boolean;
  abstract vtsTitle?: string | TemplateRef<{}>;
  abstract vtsPlacement?: VtsDrawerPlacement;
  abstract vtsMaskStyle?: object;
  abstract vtsBodyStyle?: object;
  abstract vtsWrapClassName?: string;
  abstract vtsWidth?: number | string;
  abstract vtsHeight?: number | string;
  abstract vtsZIndex?: number | string;
  abstract vtsOffsetX?: number | string;
  abstract vtsOffsetY?: number | string;
}
