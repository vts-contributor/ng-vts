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

@Component({
  selector: 'vts-option-item-group',
  template: `
    <ng-container *vtsStringTemplateOutlet="vtsLabel">
      {{ vtsLabel }}
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VtsOptionItemGroupComponent {
  @Input() vtsLabel: string | TemplateRef<VtsSafeAny> | null = null;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-select-item', 'vts-select-item-group');
  }
}
