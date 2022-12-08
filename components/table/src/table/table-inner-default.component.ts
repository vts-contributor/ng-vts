/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsTableLayout } from '../table.types';

@Component({
  selector: 'vts-table-inner-default',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="vts-table-content">
      <table
        vts-table-content
        [contentTemplate]="contentTemplate"
        [tableLayout]="tableLayout"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
      ></table>
    </div>
  `
})
export class VtsTableInnerDefaultComponent {
  @Input() tableLayout: VtsTableLayout = 'auto';
  @Input() listOfColWidth: ReadonlyArray<string | null> = [];
  @Input() theadTemplate: TemplateRef<VtsSafeAny> | null = null;
  @Input() contentTemplate: TemplateRef<VtsSafeAny> | null = null;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-table-container');
  }
}
