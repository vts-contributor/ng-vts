/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

export type VtsDescriptionsSize = 'default' | 'middle' | 'small';

export type VtsDescriptionsLayout = 'horizontal' | 'vertical';

export interface VtsDescriptionsItemRenderProps {
  title: string | TemplateRef<void>;
  span: number;
  content: TemplateRef<void>;
}
