/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'vts-tree-indent',
  exportAs: 'vtsTreeIndent',
  template: `
    <span
      [class.vts-tree-indent-unit]="!vtsSelectMode"
      [class.vts-select-tree-indent-unit]="vtsSelectMode"
      [class.vts-select-tree-indent-unit-start]="vtsSelectMode && first"
      [class.vts-tree-indent-unit-start]="!vtsSelectMode && first"
      [class.vts-select-tree-indent-unit-end]="vtsSelectMode && last"
      [class.vts-tree-indent-unit-end]="!vtsSelectMode && last"
      [class.vts-select-tree-indent-unit-elimated]="vtsSelectMode && !last && vtsIsEnd[i + 1]"
      [class.vts-tree-indent-unit-eliminated]="!vtsSelectMode && !last && vtsIsEnd[i + 1]"
      *ngFor="let _ of listOfUnit; let i = index; let last = last; let first = first"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[attr.aria-hidden]': 'true',
    '[class.vts-tree-indent]': '!vtsSelectMode',
    '[class.vts-select-tree-indent]': 'vtsSelectMode'
  }
})
export class VtsTreeIndentComponent implements OnInit, OnChanges {
  @Input() vtsTreeLevel = 0;
  @Input() vtsIsStart: boolean[] = [];
  @Input() vtsIsEnd: boolean[] = [];
  @Input() vtsSelectMode = false;

  listOfUnit: number[] = [];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsTreeLevel } = changes;
    if (vtsTreeLevel) {
      this.listOfUnit = [...new Array(vtsTreeLevel.currentValue || 0)];
    }
  }
}
