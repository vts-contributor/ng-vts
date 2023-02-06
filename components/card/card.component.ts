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
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation,
  Renderer2
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput, NgStyleInterface, VtsSizeDSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsCardBodyComponent } from './card-body.component';
import { VtsCardFooterComponent } from './card-footer.component';
import { VtsCardHeaderComponent } from './card-header.component';
import { VtsCardMetaAvatarComponent, VtsCardMetaComponent } from './card-meta.component';
import { VtsCardThumbnailComponent, VtsCardThumbnailPosition } from './card-thumbnail.component';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'card';

@Component({
  selector: 'vts-card',
  exportAs: 'vtsCard',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="!vtsLoading; else loading">
      <ng-container *ngIf="vtsThumbnail && vtsThumbnailPosition === 'left'">
        <ng-container *ngTemplateOutlet="thumbnail"></ng-container>
      </ng-container>
      <ng-container>
        <div class="vts-card-content">
          <ng-container *ngIf="vtsHeader">
            <ng-container *ngTemplateOutlet="header"></ng-container>
          </ng-container>
          <ng-container *ngIf="vtsThumbnail && vtsThumbnailPosition === 'top'">
            <ng-container *ngTemplateOutlet="thumbnail"></ng-container>
          </ng-container>
          <ng-container *ngIf="vtsBody; else defaultBody">
            <ng-container *ngTemplateOutlet="customBody"></ng-container>
          </ng-container>
          <ng-container *ngIf="vtsThumbnail && vtsThumbnailPosition === 'bottom'">
            <ng-container *ngTemplateOutlet="thumbnail"></ng-container>
          </ng-container>
          <ng-container *ngIf="vtsFooter">
            <ng-container *ngTemplateOutlet="footer"></ng-container>
          </ng-container>
        </div>
      </ng-container>
      <ng-container *ngIf="vtsThumbnail && vtsThumbnailPosition === 'right'">
        <ng-container *ngTemplateOutlet="thumbnail"></ng-container>
      </ng-container>
    </ng-container>

    <ng-template #thumbnail>
      <ng-content select="vts-card-thumbnail"></ng-content>
    </ng-template>
    <ng-template #header>
      <ng-content select="vts-card-header"></ng-content>
    </ng-template>
    <ng-template #customBody>
      <ng-content select="vts-card-body"></ng-content>
    </ng-template>
    <ng-template #defaultBody>
      <vts-card-body [vtsMeta]="vtsMeta && meta" [vtsContent]="content">
        <ng-template #content>
          <ng-content></ng-content>
        </ng-template>
      </vts-card-body>
    </ng-template>
    <ng-template #meta>
      <ng-content select="vts-card-meta"></ng-content>
    </ng-template>
    <ng-template #footer>
      <ng-content select="vts-card-footer"></ng-content>
    </ng-template>
    <ng-template #loading>
      <vts-card-loading></vts-card-loading>
    </ng-template>
  `,
  host: {
    '[class.vts-card-loading]': 'vtsLoading',
    '[class.vts-card-bordered]': 'vtsBorderless === false && vtsBordered',
    '[class.vts-card-borderless]': 'vtsBorderless',
    '[class.vts-card-no-radius]': 'vtsNoRadius',
    '[class.vts-card-hoverable]': 'vtsHoverable',
    '[class.vts-card-thumbnail-bottom]': `vtsThumbnailPosition === 'bottom'`,
    '[class.vts-card-thumbnail-top]': `vtsThumbnailPosition === 'top'`,
    '[class.vts-card-thumbnail-right]': `vtsThumbnailPosition === 'right'`,
    '[class.vts-card-thumbnail-left]': `vtsThumbnailPosition === 'left'`,
    '[class.vts-card-has-thumbnail]': `!!vtsThumbnail`
  }
})
export class VtsCardComponent implements OnDestroy, OnInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsBordered: BooleanInput;
  static ngAcceptInputType_vtsBorderless: BooleanInput;
  static ngAcceptInputType_vtsNoRadius: BooleanInput;
  static ngAcceptInputType_vtsLoading: BooleanInput;
  static ngAcceptInputType_vtsHoverable: BooleanInput;

  @Input() @WithConfig() @InputBoolean() vtsBordered: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsBorderless: boolean = false;
  @Input() @WithConfig() @InputBoolean() vtsNoRadius: boolean = false;
  @Input() @InputBoolean() vtsLoading = false;
  @Input() @WithConfig() @InputBoolean() vtsHoverable: boolean = true;
  @Input() vtsBodyStyle: NgStyleInterface | null = null;
  @Input() @WithConfig() vtsSize: VtsSizeDSType = 'md';
  dir: Direction = 'ltr';

  @ContentChild(VtsCardThumbnailComponent) vtsThumbnail?: VtsCardThumbnailComponent;
  @Input() vtsThumbnailPosition?: VtsCardThumbnailPosition;
  @ContentChild(VtsCardHeaderComponent) vtsHeader?: VtsCardHeaderComponent;
  @ContentChild(VtsCardMetaComponent) vtsMeta?: VtsCardMetaComponent;
  @ContentChild(VtsCardFooterComponent) vtsFooter?: VtsCardFooterComponent;
  @ContentChild(VtsCardMetaAvatarComponent) vtsMetaAvatar?: VtsCardMetaAvatarComponent;
  @ContentChild(VtsCardBodyComponent) vtsBody?: VtsCardBodyComponent;

  private destroy$ = new Subject();

  constructor(
    public vtsConfigService: VtsConfigService,
    public cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality,
    public renderer: Renderer2
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
