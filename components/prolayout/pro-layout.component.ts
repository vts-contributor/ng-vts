/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// import { Direction, Directionality } from '@angular/cdk/bidi';
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
  ViewEncapsulation
} from '@angular/core';
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
      .header-menu {
        line-height: 63px;
      }

      .vts-breadcrumb {
        margin-bottom: 24px;
        margin-left: 24px;
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
    private elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-prolayout-container');
  }

  isFixedHeader: boolean = true;
  isFixedSider: boolean = false;

  @Input() menuData: MenuItemProLayout[] = [];

  onChangeFixedSider(isFixed: boolean) {
    this.isFixedSider = isFixed;
    if (isFixed && this.isFixedHeader) {
      this.isFixedHeader = false;
    }
  }

  onChangeFixedHeader(isFixed: boolean) {
    this.isFixedHeader = isFixed;
    if (isFixed && this.isFixedSider) {
      this.isFixedSider = false;
    }
  }

  ngOnInit(): void {}
}
