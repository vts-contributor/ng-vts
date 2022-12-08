/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export type VtsSelectModeType = 'default' | 'multiple' | 'tags';
export interface VtsSelectItemInterface {
  template?: TemplateRef<VtsSafeAny> | null;
  vtsLabel: string | null;
  vtsValue: VtsSafeAny | null;
  vtsDisabled?: boolean;
  vtsHide?: boolean;
  vtsCustomContent?: boolean;
  groupLabel?: string | TemplateRef<VtsSafeAny> | null;
  type?: string;
  key?: VtsSafeAny;
}

export interface VtsSelectOptionInterface {
  label: string | null | TemplateRef<VtsSafeAny>;
  value: VtsSafeAny | null;
  disabled?: boolean;
  hide?: boolean;
  groupLabel?: string | TemplateRef<VtsSafeAny> | null;
}

export type VtsSelectTopControlItemType = Partial<VtsSelectItemInterface> & {
  contentTemplateOutlet: TemplateRef<VtsSafeAny> | null;
  contentTemplateOutletContext: VtsSafeAny;
};

export type VtsFilterOptionType = (input: string, option: VtsSelectItemInterface) => boolean;
