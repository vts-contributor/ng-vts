/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export function scrollIntoView(node: HTMLElement): void {
  const nodeAsAny = node as VtsSafeAny;
  if (nodeAsAny.scrollIntoViewIfNeeded) {
    /* tslint:disable-next-line:no-string-literal */
    nodeAsAny.scrollIntoViewIfNeeded(false);
    return;
  }
  if (node.scrollIntoView) {
    node.scrollIntoView(false);
    return;
  }
}
