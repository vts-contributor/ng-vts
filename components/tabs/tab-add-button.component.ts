/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ElementRef, Input, TemplateRef } from '@angular/core';

import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-tab-add-button, button[vts-tab-add-button]',
  template: `
    <ng-container *vtsStringTemplateOutlet="addIcon; let icon">
      <i vts-icon [vtsType]="icon"></i>
    </ng-container>
  `,
  host: {
    class: 'vts-tabs-nav-add',
    'aria-label': 'Add tab',
    type: 'button'
  }
})
export class VtsTabAddButtonComponent {
  @Input() addIcon: string | TemplateRef<VtsSafeAny> = 'plus';

  private readonly element: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.element = this.elementRef.nativeElement;
  }

  getElementWidth(): number {
    return this.element?.offsetWidth || 0;
  }

  getElementHeight(): number {
    return this.element?.offsetHeight || 0;
  }
}
