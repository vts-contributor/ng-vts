/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-select-clear',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i
      vts-icon
      vtsType="Close"
      *ngIf="!clearIcon; else clearIcon"
      class="vts-select-close-icon"
    ></i>
  `,
  host: {
    '(click)': 'onClick($event)'
  }
})
export class VtsSelectClearComponent {
  @Input() clearIcon: TemplateRef<VtsSafeAny> | null = null;
  @Output() readonly clear = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-select-clear');
  }

  onClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.clear.emit(e);
  }
}
