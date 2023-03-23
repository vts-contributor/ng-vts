/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  // ChangeDetectionStrategy,
  Component,
  // ContentChildren,
  // SimpleChanges,
  ElementRef,
  // ChangeDetectorRef,
  // OnDestroy,
  OnInit,
  Input,
  // Optional,
  // OnChanges,
  // QueryList,
  ViewEncapsulation,
  TemplateRef
} from '@angular/core';
import { ProlayoutService } from './pro-layout.service';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
import { MenuItemProLayout } from './pro-layout.types';
// import { VtsSiderComponent } from './sider.component';

@Component({
  selector: 'vts-prolayout-container',
  exportAs: 'vtsProLayoutContainer',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  templateUrl: 'pro-layout.component.html',
  styles: [
    `
     .vts-breadcrumb {
        margin-bottom: 24px;
      }

      .inner-layout {
        background: #fff;
      }

      .sider-menu {
        height: 100%;
      }

      .inner-content {
        padding: 0 24px;
        min-height: 280px;
      }

      vts-prolayout-footer {
        text-align: center;
      }
    `
  ]
})
export class VtsProLayoutContainerComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private prolayoutService: ProlayoutService
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-prolayout-container');
  }

  themeColor: string = '#EE0033';
  useDarkMode:  boolean = false;

  isFixedHeader: boolean = false;
  isFixedSider: boolean = true;
  @Input() isShowHeader: boolean = true;
  @Input() isShowSider: boolean = true;
  @Input() isShowFooter: boolean = true;
  @Input() isMenuSplitted: boolean = false;
  @Input() menuHeader: MenuItemProLayout[] = [];
  @Input() menuSider: MenuItemProLayout[] = [];  
  @Input() headerTitle: string | TemplateRef<void> | null = "GOVERNMENT SOLUTION CENTER PLATFORM";

  onChangeVisiblityHeader(value: boolean) {
    this.isShowHeader = value;
    if(!value && this.isFixedHeader){
      this.isFixedHeader = false;
    }
  }

  onChangeVisiblitySider(value: boolean) {
    this.isShowSider = value;
    if(!value && this.isFixedSider){
      this.isFixedSider = false;
    }
  }

  onChangeVisiblityFooter(value: boolean) {
    this.isShowFooter = value;
  }

  onChangeThemeColor(color: string){
    this.themeColor = color;
  }

  onChangePageStyle(useDarkMode: boolean){
    this.useDarkMode = useDarkMode;
  }

  onSelectMenuSiderItem(selected: MenuItemProLayout){
    let menuSider = [
      ...this.menuSider
    ];
    menuSider.forEach(item => {
      if(item.isSelected){
        item.isSelected = false;
      }
    })
    menuSider.forEach(item => {
      if(item.id == selected.id){
        item.isSelected = true;
      }
    })
    this.menuSider = [
      ...menuSider
    ];
  }

  ngOnInit(): void {
    // on change ix fixed
    this.prolayoutService.fixedSiderChange$.subscribe((isFixed: boolean) => {
      this.isFixedSider = isFixed;
    });
    this.prolayoutService.fixedHeaderChange$.subscribe((isFixed: boolean) => {
      this.isFixedHeader = isFixed;
    });

    // onchange visibility
    this.prolayoutService.visibilityHeaderChange$.subscribe((isShow: boolean) => {
      this.onChangeVisiblityHeader(isShow);
    });
    this.prolayoutService.visibilitySiderChange$.subscribe((isShow: boolean) => {
      this.onChangeVisiblitySider(isShow);
    });
    this.prolayoutService.visibilityFooterChange$.subscribe((isShow: boolean) => {
      this.onChangeVisiblityFooter(isShow);
    });
  }
}
