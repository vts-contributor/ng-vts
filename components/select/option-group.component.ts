/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';

@Component({
  selector: 'vts-option-group',
  exportAs: 'vtsOptionGroup',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `
})
export class VtsOptionGroupComponent implements OnChanges {
  @Input() vtsLabel: string | TemplateRef<VtsSafeAny> | null = null;
  changes = new Subject<void>();
  ngOnChanges(): void {
    this.changes.next();
  }
}
