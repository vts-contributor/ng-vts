/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

import { VtsTreeBaseService } from './vts-tree-base.service';

export const VtsTreeHigherOrderServiceToken = new InjectionToken<VtsTreeBaseService>(
  'VtsTreeHigherOrder'
);
