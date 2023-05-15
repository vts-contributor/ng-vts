/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vts-tree-node-indents',
  template: `
    <span
      class="vts-tree-indent-unit"
      [class.vts-tree-indent-unit-start]="first"
      [class.vts-tree-indent-unit-end]="last"
      [class.vts-tree-indent-unit-eliminated]="isEliminated"
      *ngFor="let isEliminated of indents; let last = last; let first = first"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'vts-tree-indent'
  }
})
export class VtsTreeNodeIndentsComponent {
  @Input() indents: boolean[] = [];
}
