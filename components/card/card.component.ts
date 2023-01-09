/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput, NgStyleInterface, VtsSizeDSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsCardGridDirective } from './card-grid.directive';
import { VtsCardTabComponent } from './card-tab.component';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'card';

@Component({
  selector: 'vts-card',
  exportAs: 'vtsCard',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="vts-card-head" *ngIf="vtsTitle || vtsExtra || listOfVtsCardTabComponent">
      <div class="vts-card-head-wrapper">
        <div class="vts-card-head-title" *ngIf="vtsTitle">
          <ng-container *vtsStringTemplateOutlet="vtsTitle">
            {{ vtsTitle }}
          </ng-container>
        </div>
        <div class="vts-card-extra" *ngIf="vtsExtra">
          <ng-container *vtsStringTemplateOutlet="vtsExtra">
            {{ vtsExtra }}
          </ng-container>
        </div>
      </div>
      <ng-container *ngIf="listOfVtsCardTabComponent">
        <ng-template [ngTemplateOutlet]="listOfVtsCardTabComponent.template"></ng-template>
      </ng-container>
    </div>
    <div class="vts-card-cover" *ngIf="vtsCover && vtsCoverPosition === 'top'">
      <ng-template [ngTemplateOutlet]="vtsCover"></ng-template>
    </div>
    <div class="vts-card-body" [ngStyle]="vtsBodyStyle">
      <ng-container *ngIf="!vtsLoading; else loadingTemplate">
        <ng-content></ng-content>
        <div class="vts-card-cover" *ngIf="vtsCover && vtsCoverPosition === 'fluid'">
          <ng-template [ngTemplateOutlet]="vtsCover"></ng-template>
        </div>
      </ng-container>
      <ng-template #loadingTemplate>
        <vts-card-loading></vts-card-loading>
      </ng-template>
    </div>
    <div class="vts-card-cover" *ngIf="vtsCover && vtsCoverPosition === 'bottom'">
      <ng-template [ngTemplateOutlet]="vtsCover"></ng-template>
    </div>
    <ul class="vts-card-actions" *ngIf="vtsActions.length">
      <li *ngFor="let action of vtsActions" [style.width.%]="100 / vtsActions.length">
        <span><ng-template [ngTemplateOutlet]="action"></ng-template></span>
      </li>
    </ul>
  `,
  host: {
    '[class.vts-card-loading]': 'vtsLoading',
    '[class.vts-card-bordered]': 'vtsBorderless === false && vtsBordered',
    '[class.vts-card-hoverable]': 'vtsHoverable',
    '[class.vts-card-contain-grid]':
      'listOfVtsCardGridDirective && listOfVtsCardGridDirective.length',
    '[class.vts-card-type-inner]': 'vtsType === "inner"',
    '[class.vts-card-contain-tabs]': '!!listOfVtsCardTabComponent',
    '[class.vts-card-rtl]': `dir === 'rtl'`,
    '[class.vts-card-cover-fluid]': `vtsCoverPosition === 'fluid'`,
    '[class.vts-card-cover-bottom]': `vtsCoverPosition === 'bottom'`,
    '[class.vts-card-cover-top]': `vtsCoverPosition === 'top'`
  }
})
export class VtsCardComponent implements OnDestroy, OnInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsBordered: BooleanInput;
  static ngAcceptInputType_vtsBorderless: BooleanInput;
  static ngAcceptInputType_vtsLoading: BooleanInput;
  static ngAcceptInputType_vtsHoverable: BooleanInput;

  @Input() @WithConfig() @InputBoolean() vtsBordered: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsBorderless: boolean = false;
  @Input() @InputBoolean() vtsLoading = false;
  @Input() @WithConfig() @InputBoolean() vtsHoverable: boolean = true;
  @Input() vtsBodyStyle: NgStyleInterface | null = null;
  @Input() vtsCover?: TemplateRef<void>;
  @Input() vtsCoverPosition?: 'top' | 'bottom' | 'fluid' = 'top';
  @Input() vtsActions: Array<TemplateRef<void>> = [];
  @Input() vtsType: string | 'inner' | null = null;
  @Input() @WithConfig() vtsSize: VtsSizeDSType = 'md';
  @Input() vtsTitle?: string | TemplateRef<void>;
  @Input() vtsExtra?: string | TemplateRef<void>;
  @ContentChild(VtsCardTabComponent, { static: false })
  listOfVtsCardTabComponent?: VtsCardTabComponent;
  @ContentChildren(VtsCardGridDirective)
  listOfVtsCardGridDirective!: QueryList<VtsCardGridDirective>;
  dir: Direction = 'ltr';

  private destroy$ = new Subject();

  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-card');

    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
