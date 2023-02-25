/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  // ChangeDetectionStrategy,
  Component,
  ContentChildren,
  // SimpleChanges,
  ElementRef,
  // ChangeDetectorRef,
  OnDestroy,
  OnInit,
  Input,
  Optional,
  // OnChanges,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuItemProLayout } from './pro-layout.types';
import { VtsSiderComponent } from './sider.component';

@Component({
  selector: 'vts-prolayout-container',
  exportAs: 'vtsProLayoutContainer',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <vts-prolayout>
      <vts-prolayout-sider
        vtsWidth="200px"
        vtsTheme="light"
        *ngIf="isFixedSider"
        [isFixedHeader]="isFixedHeader"
        [isFixedSider]="isFixedSider"
        [menuData]="menuData"
      ></vts-prolayout-sider>

      <vts-prolayout-header
        [isFixedHeader]="isFixedHeader"
        [isFixedSider]="isFixedSider"
        *ngIf="!isFixedSider"
      ></vts-prolayout-header>

      <vts-prolayout *ngIf="isFixedSider; else onlyContent">
        <vts-prolayout-header
          [isFixedHeader]="isFixedHeader"
          [isFixedSider]="isFixedSider"
        ></vts-prolayout-header>
        <vts-prolayout-content class="outer-content">
          <vts-breadcrumb>
            <vts-breadcrumb-item>Home</vts-breadcrumb-item>
            <vts-breadcrumb-item>List</vts-breadcrumb-item>
            <vts-breadcrumb-item>App</vts-breadcrumb-item>
          </vts-breadcrumb>
          <vts-prolayout class="inner-layout" *ngIf="!isFixedHeader; else notFixedHeader">
            <vts-prolayout-sider
              vtsWidth="200px"
              vtsTheme="light"
              *ngIf="!isFixedSider"
              [isFixedHeader]="isFixedHeader"
              [isFixedSider]="isFixedSider"
              [menuData]="menuData"
            ></vts-prolayout-sider>
            <vts-prolayout-content class="inner-content">Content</vts-prolayout-content>
          </vts-prolayout>

          <ng-template #notFixedHeader>
            <vts-prolayout-content class="inner-content">
              <ng-content></ng-content>
            </vts-prolayout-content>
          </ng-template>

          <vts-setting-drawer
            (setFixedHeader)="onChangeFixedHeader($event)"
            (setFixedSider)="onChangeFixedSider($event)"
          ></vts-setting-drawer>

          <vts-prolayout-footer>NG-VTS</vts-prolayout-footer>
        </vts-prolayout-content>
      </vts-prolayout>

      <ng-template #onlyContent>
        <vts-prolayout-content class="outer-content">
          <vts-breadcrumb>
            <vts-breadcrumb-item>Home</vts-breadcrumb-item>
            <vts-breadcrumb-item>List</vts-breadcrumb-item>
            <vts-breadcrumb-item>App</vts-breadcrumb-item>
          </vts-breadcrumb>
          <vts-prolayout class="inner-layout" *ngIf="!isFixedHeader; else notFixedHeader">
            <vts-prolayout-sider
              vtsWidth="200px"
              vtsTheme="light"
              *ngIf="!isFixedSider"
              [isFixedHeader]="isFixedHeader"
              [isFixedSider]="isFixedSider"
              [menuData]="menuData"
            ></vts-prolayout-sider>
            <vts-prolayout-content class="inner-content">
              <ng-content></ng-content>
            </vts-prolayout-content>
          </vts-prolayout>

          <ng-template #notFixedHeader>
            <vts-prolayout-content class="inner-content">
              <ng-content></ng-content>
            </vts-prolayout-content>
          </ng-template>

          <vts-prolayout-footer>NG-VTS</vts-prolayout-footer>
        </vts-prolayout-content>
      </ng-template>

      <vts-setting-drawer
        [isFixedHeader]="isFixedHeader"
        [isFixedSider]="isFixedSider"
        (setFixedHeader)="onChangeFixedHeader($event)"
        (setFixedSider)="onChangeFixedSider($event)"
      ></vts-setting-drawer>
    </vts-prolayout>
  `,
  host: {
    '[class.vts-prolayout-rtl]': `dir === 'rtl'`,
    '[class.vts-prolayout-has-sider]': 'listOfVtsSiderComponent.length > 0'
  },
  styles: [
    `
      .header-menu {
        line-height: 63px;
      }

      vts-breadcrumb {
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
export class VtsProLayoutContainerComponent implements OnDestroy, OnInit {
  constructor(
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-prolayout-container');
  }

  @ContentChildren(VtsSiderComponent)
  listOfVtsSiderComponent!: QueryList<VtsSiderComponent>;

  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  isFixedHeader: boolean = false;
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

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
