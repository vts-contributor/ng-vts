/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsTableSortOrder } from '../pro-table.type';

@Component({
  selector: 'vts-protable-sorters',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <span class="vts-protable-column-sorter" [class.vts-protable-column-sorter-full]="isDown && isUp">
      <span class="vts-protable-column-sorter-inner">
        <i
          vts-icon
          vtsType="ArrowUpOutline"
          *ngIf="isUp"
          class="vts-protable-column-sorter-up"
          [class.active]="sortOrder == 'ascend'"
        ></i>
        <i
          vts-icon
          vtsType="ArrowDownOutline"
          *ngIf="isDown"
          class="vts-protable-column-sorter-down"
          [class.active]="sortOrder == 'descend'"
        ></i>
      </span>
    </span>
  `
})
export class VtsProTableSortersComponent implements OnChanges {
  @Input() sortDirections: VtsTableSortOrder[] = ['ascend', 'descend', null];
  @Input() sortOrder: VtsTableSortOrder = null;
  @Input() contentTemplate: TemplateRef<VtsSafeAny> | null = null;
  isUp = false;
  isDown = false;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-column-sorters');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { sortDirections } = changes;
    if (sortDirections) {
      this.isUp = this.sortDirections.indexOf('ascend') !== -1;
      this.isDown = this.sortDirections.indexOf('descend') !== -1;
    }
  }
}
