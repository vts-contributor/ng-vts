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
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import { VtsMenuThemeType } from '../menu';
import { MenuItemProLayout } from './pro-layout.types';

@Component({
  selector: 'vts-prolayout-header',
  exportAs: 'vtsProLayoutHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <div class="logo-header vts-logo" *ngIf="showLogo"></div>
    <ul vts-menu vtsTheme="dark" vtsMode="horizontal" class="header-menu" [vtsTheme]="vtsTheme" *ngIf="!useSplitMenu">
      <ng-container *ngFor="let item of menuData">
        <vts-prolayout-menu-item-horizontal [menuItem]="item"></vts-prolayout-menu-item-horizontal>
      </ng-container>
    </ul>
  `,
  styles: [
    `
      .logo-header {
        width: 120px;
        height: 63px;
        margin: 16px 28px 0 24px;
        float: left;
        background-repeat: no-repeat;
        background-size: contain;
      }
    `,
    `
      .header-menu {
        line-height: 63px;
      }
    `
  ]
})
export class VtsHeaderComponent implements OnChanges {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'vts-prolayout-header');
  }

  @Input() isFixedHeader: boolean = false;
  @Input() isFixedSider: boolean = false;
  @Input() menuData: MenuItemProLayout[] = [];
  @Input() vtsTheme: VtsMenuThemeType = 'light';
  @Input() useSplitMenu: boolean = false;

  showLogo: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    const {isFixedHeader, isFixedSider } = changes;
    this.handleChangeFixedStatus(isFixedHeader, isFixedSider);    
  }

  handleChangeFixedStatus(isFixedHeader: SimpleChange, isFixedSider: SimpleChange){
    if(isFixedHeader && isFixedSider){
      if(isFixedHeader.currentValue && !isFixedSider.currentValue){
        this.showLogo = true;
      }
      else if(!isFixedHeader.currentValue && !isFixedSider.currentValue){
        this.showLogo = true;
      }
      else if(!isFixedHeader.currentValue && isFixedSider.currentValue){
        this.showLogo = false;
      }
    }
    else if(isFixedHeader && !isFixedSider){
      if(isFixedHeader.currentValue && !this.isFixedSider){
        this.showLogo = true;
      }
      else if(!isFixedHeader.currentValue && !this.isFixedSider){
        this.showLogo = true;
      }
      else if(!isFixedHeader.currentValue && this.isFixedSider){
        this.showLogo = false;
      }
    }
    else if(!isFixedHeader && isFixedSider){
      if(this.isFixedHeader && !isFixedSider.currentValue){
        this.showLogo = true;
      }
      else if(!this.isFixedHeader && !isFixedSider.currentValue){
        this.showLogo = true;
      }
      else if(!this.isFixedHeader && isFixedSider.currentValue){
        this.showLogo = false;
      }
    }
  }
}