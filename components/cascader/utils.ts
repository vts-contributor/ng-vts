/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { VtsCascaderOption } from './typings';

export function isChildOption(o: VtsCascaderOption): boolean {
  return o.isLeaf || !o.children || !o.children.length;
}

export function isParentOption(o: VtsCascaderOption): boolean {
  return !!o.children && !!o.children.length && !o.isLeaf;
}
