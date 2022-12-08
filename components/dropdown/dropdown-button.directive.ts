/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterViewInit, Directive, ElementRef, Host, Optional, Renderer2 } from '@angular/core';
import { VtsButtonGroupComponent } from '@ui-vts/ng-vts/button';

@Directive({
  selector: '[vts-button][vts-dropdown]'
})
export class VtsDropdownButtonDirective implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    @Host()
    @Optional()
    private vtsButtonGroupComponent: VtsButtonGroupComponent,
    private elementRef: ElementRef
  ) {}
  ngAfterViewInit(): void {
    const parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
    if (this.vtsButtonGroupComponent && parentElement) {
      this.renderer.addClass(parentElement, 'vts-dropdown-button');
    }
  }
}
