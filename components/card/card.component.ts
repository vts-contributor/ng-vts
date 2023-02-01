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
  ViewEncapsulation,
  Renderer2,
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput, NgStyleInterface, VtsSizeDSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsCardGridDirective } from './card-grid.directive';
import { VtsCardHeaderComponent } from './card-header.component';
import { VtsCardTabComponent } from './card-tab.component';
import { VtsCardThumbnailComponent, VtsCardThumbnailPosition } from './card-thumbnail.component';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'card';

@Component({
  selector: 'vts-card',
  exportAs: 'vtsCard',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="vtsThumbnail && vtsThumbnailPosition === 'left'">
      <ng-container *ngTemplateOutlet="thumbnail"></ng-container>
    </ng-container>
    <ng-container>
      <ng-container *ngIf="vtsHeader">
        <ng-container *ngTemplateOutlet="header"></ng-container>
      </ng-container>
      <ng-container *ngIf="vtsThumbnail && vtsThumbnailPosition === 'top'">
        <ng-container *ngTemplateOutlet="thumbnail"></ng-container>
      </ng-container>
      <div class="vts-card-body" [ngStyle]="vtsBodyStyle">
        <ng-container *ngIf="!vtsLoading; else loadingTemplate">
          <ng-content></ng-content>
          <ng-container *ngIf="vtsThumbnail && vtsThumbnailPosition === 'fluid'">
            <ng-container *ngTemplateOutlet="thumbnail"></ng-container>
          </ng-container>
        </ng-container>
        <ng-template #loadingTemplate>
          <vts-card-loading></vts-card-loading>
        </ng-template>
      </div>
      <ng-container *ngIf="vtsThumbnail && vtsThumbnailPosition === 'bottom'">
        <ng-container *ngTemplateOutlet="thumbnail"></ng-container>
      </ng-container>
      <ul class="vts-card-actions" *ngIf="vtsActions.length">
        <li *ngFor="let action of vtsActions" [style.width.%]="100 / vtsActions.length">
          <span><ng-template [ngTemplateOutlet]="action"></ng-template></span>
        </li>
      </ul>
    </ng-container>
    <ng-container *ngIf="vtsThumbnail && vtsThumbnailPosition === 'right'">
      <ng-container *ngTemplateOutlet="thumbnail"></ng-container>
    </ng-container>

    <ng-template #thumbnail>
      <ng-content select="vts-card-thumbnail"></ng-content>
    </ng-template>
    <ng-template #header>
      <ng-content select="vts-card-header"></ng-content>
    </ng-template>
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

    '[class.vts-card-thumbnail-fluid]': `vtsThumbnailPosition === 'fluid'`,
    '[class.vts-card-thumbnail-bottom]': `vtsThumbnailPosition === 'bottom'`,
    '[class.vts-card-thumbnail-top]': `vtsThumbnailPosition === 'top'`,
    '[class.vts-card-thumbnail-right]': `vtsThumbnailPosition === 'right'`,
    '[class.vts-card-thumbnail-left]': `vtsThumbnailPosition === 'left'`,

    '[class.vts-card-layout-basic]': `vtsCardLayout === 'basic'`,
    '[class.vts-card-layout-cover]': `vtsCardLayout === 'cover'`,
    '[class.vts-card-layout-container]': `vtsType === 'container'`,
    '[class.vts-card-layout-avatar]': `vtsType === 'avatar'`,
    '[class.vts-card-layout-align-left]': `vtsAlign === 'left' && vtsType === 'container'`,
    '[class.vts-card-layout-align-center]': `vtsAlign === 'center' && vtsType === 'container'`,
    '[class.vts-card-layout-align-right]': `vtsAlign === 'right' && vtsType === 'container'`
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
  @Input() vtsCardLayout: 'basic' | 'cover' | null = null;
  @Input() vtsType: 'container' | 'avatar' | 'inner' | null  = 'avatar';
  @Input() vtsAlign: 'left' | 'center' | 'right' | null = null;
  @Input() vtsActions: Array<TemplateRef<void>> = [];
  @Input() @WithConfig() vtsSize: VtsSizeDSType = 'md';
  @ContentChild(VtsCardTabComponent, { static: false })
  listOfVtsCardTabComponent?: VtsCardTabComponent;
  @ContentChildren(VtsCardGridDirective)
  listOfVtsCardGridDirective!: QueryList<VtsCardGridDirective>;
  dir: Direction = 'ltr';

  @ContentChild(VtsCardThumbnailComponent) vtsThumbnail?: VtsCardThumbnailComponent
  @Input() vtsThumbnailPosition?: VtsCardThumbnailPosition;
  
  @ContentChild(VtsCardHeaderComponent) vtsHeader?: VtsCardHeaderComponent

  private destroy$ = new Subject();

  constructor(
    public vtsConfigService: VtsConfigService,
    public cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality,
    public renderer: Renderer2,
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-card');
    this.elementRef.nativeElement.classList.add('vts-card-layout');

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
