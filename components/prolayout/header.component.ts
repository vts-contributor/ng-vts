/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'vts-prolayout-header',
  exportAs: 'vtsProLayoutHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
  <div class="logo" *ngIf="!hasSiderMenu"></div>
  <ul vts-menu vtsTheme="dark" vtsMode="horizontal" class="header-menu">
    <li vts-menu-item>nav 1</li>
    <li vts-menu-item vtsSelected>nav 2</li>
    <li vts-menu-item>nav 3</li>
  </ul>
  `
})
export class VtsHeaderComponent implements OnChanges {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'vts-prolayout-header');
  }

  @Input() hasSiderMenu: boolean = false;
  @Input() isFixed: boolean = false;

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);    
  }
}
