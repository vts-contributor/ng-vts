/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[vts-menu-divider]',
  exportAs: 'vtsMenuDivider'
})
export class VtsMenuDividerDirective {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'vts-dropdown-menu-item-divider');
  }
}
