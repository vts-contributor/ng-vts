/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export type VtsEmptySize = 'normal' | 'small' | '';

export type VtsEmptyCustomContent = Type<VtsSafeAny> | TemplateRef<VtsSafeAny> | string;

export const VTS_EMPTY_COMPONENT_NAME = new InjectionToken<string>('vts-empty-component-name');
