/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { VtsResizeDirection } from './resize-handle.component';

export const DEFAULT_RESIZE_DIRECTION: VtsResizeDirection[] = [
  'bottomRight',
  'topRight',
  'bottomLeft',
  'topLeft',
  'bottom',
  'right',
  'top',
  'left'
];

@Component({
  selector: 'vts-resize-handles',
  exportAs: 'vtsResizeHandles',
  template: `
    <vts-resize-handle *ngFor="let dir of directions" [vtsDirection]="dir"></vts-resize-handle>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsResizeHandlesComponent implements OnChanges {
  @Input() vtsDirections: VtsResizeDirection[] = DEFAULT_RESIZE_DIRECTION;
  directions: Set<VtsResizeDirection>;

  constructor() {
    this.directions = new Set(this.vtsDirections);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsDirections) {
      this.directions = new Set(changes.vtsDirections.currentValue);
    }
  }
}
