/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsButtonType } from '@ui-vts/ng-vts/button';
import { zoomBigMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { BooleanInput, NgStyleInterface, VtsTSType } from '@ui-vts/ng-vts/core/types';

import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import {
  VtsTooltipBaseDirective,
  VtsToolTipComponent,
  VtsTooltipTrigger,
  PropertyMapping
} from '@ui-vts/ng-vts/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'popconfirm';

@Directive({
  selector: '[vts-popconfirm]',
  exportAs: 'vtsPopconfirm',
  host: {
    '[class.vts-popover-open]': 'visible'
  }
})
export class VtsPopconfirmDirective extends VtsTooltipBaseDirective {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsCondition: BooleanInput;
  static ngAcceptInputType_vtsPopconfirmShowArrow: BooleanInput;

  @Input('vtsPopconfirmTitle') override title?: VtsTSType;
  @Input('vts-popconfirm') override directiveTitle?: VtsTSType | null;
  @Input('vtsPopconfirmTrigger') override trigger?: VtsTooltipTrigger = 'click';
  @Input('vtsPopconfirmPlacement') override placement?: string | string[] = 'top';
  @Input('vtsPopconfirmOrigin') override origin?: ElementRef<HTMLElement>;
  @Input('vtsPopconfirmMouseEnterDelay') override mouseEnterDelay?: number;
  @Input('vtsPopconfirmMouseLeaveDelay') override mouseLeaveDelay?: number;
  @Input('vtsPopconfirmOverlayClassName') override overlayClassName?: string;
  @Input('vtsPopconfirmOverlayStyle') override overlayStyle?: NgStyleInterface;
  @Input('vtsPopconfirmVisible') override visible?: boolean;
  @Input() vtsOkText?: string;
  @Input() vtsOkType?: string;
  @Input() vtsCancelText?: string;
  @Input() vtsIcon?: string | TemplateRef<void>;
  @Input() @InputBoolean() vtsCondition: boolean = false;
  @Input() @InputBoolean() vtsPopconfirmShowArrow: boolean = true;
  @Input() @WithConfig() vtsPopconfirmBackdrop?: boolean = false;

  // tslint:disable-next-line:no-output-rename
  @Output('vtsPopconfirmVisibleChange')
  override readonly visibleChange = new EventEmitter<boolean>();
  @Output() readonly vtsOnCancel = new EventEmitter<void>();
  @Output() readonly vtsOnConfirm = new EventEmitter<void>();

  protected override readonly componentRef: ComponentRef<VtsPopconfirmComponent> =
    this.hostView.createComponent(VtsPopconfirmComponent);

  protected override getProxyPropertyMap(): PropertyMapping {
    return {
      vtsOkText: ['vtsOkText', () => this.vtsOkText],
      vtsOkType: ['vtsOkType', () => this.vtsOkType],
      vtsCancelText: ['vtsCancelText', () => this.vtsCancelText],
      vtsCondition: ['vtsCondition', () => this.vtsCondition],
      vtsIcon: ['vtsIcon', () => this.vtsIcon],
      vtsPopconfirmShowArrow: ['vtsPopconfirmShowArrow', () => this.vtsPopconfirmShowArrow],
      vtsPopconfirmBackdrop: ['vtsBackdrop', () => this.vtsPopconfirmBackdrop],
      ...super.getProxyPropertyMap()
    };
  }

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() noAnimation?: VtsNoAnimationDirective,
    vtsConfigService?: VtsConfigService
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation, vtsConfigService);
  }

  /**
   * @override
   */
  protected override createComponent(): void {
    super.createComponent();

    (this.component as VtsPopconfirmComponent).vtsOnCancel
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.vtsOnCancel.emit();
      });
    (this.component as VtsPopconfirmComponent).vtsOnConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.vtsOnConfirm.emit();
      });
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-popconfirm',
  exportAs: 'vtsPopconfirmComponent',
  preserveWhitespaces: false,
  animations: [zoomBigMotion],
  template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      vtsConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="vtsBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
    >
      <div
        class="vts-popover"
        [ngClass]="_classMap"
        [class.vts-popover-rtl]="dir === 'rtl'"
        [ngStyle]="vtsOverlayStyle"
        [@.disabled]="noAnimation?.vtsNoAnimation"
        [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="vts-popover-content">
          <div class="vts-popover-arrow" *ngIf="vtsPopconfirmShowArrow"></div>
          <div class="vts-popover-inner">
            <div>
              <div class="vts-popover-inner-content">
                <div class="vts-popover-message">
                  <ng-container *vtsStringTemplateOutlet="vtsTitle">
                    <ng-container *vtsStringTemplateOutlet="vtsIcon; let icon">
                      <i vts-icon [vtsType]="icon || 'exclamation-circle'"></i>
                    </ng-container>
                    <div class="vts-popover-message-title">{{ vtsTitle }}</div>
                  </ng-container>
                </div>
                <div class="vts-popover-buttons">
                  <button vts-button [vtsSize]="'sm'" (click)="onCancel()">
                    <ng-container *ngIf="vtsCancelText">
                      {{ vtsCancelText }}
                    </ng-container>
                    <ng-container *ngIf="!vtsCancelText">
                      {{ 'Modal.cancelText' | vtsI18n }}
                    </ng-container>
                  </button>
                  <button vts-button [vtsSize]="'sm'" [vtsType]="vtsOkType" (click)="onConfirm()">
                    <ng-container *ngIf="vtsOkText">
                      {{ vtsOkText }}
                    </ng-container>
                    <ng-container *ngIf="!vtsOkText">
                      {{ 'Modal.okText' | vtsI18n }}
                    </ng-container>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class VtsPopconfirmComponent extends VtsToolTipComponent implements OnDestroy {
  vtsCancelText?: string;
  vtsCondition = false;
  vtsPopconfirmShowArrow = true;
  vtsIcon?: string | TemplateRef<void>;
  vtsOkText?: string;
  vtsOkType: VtsButtonType = 'primary';

  readonly vtsOnCancel = new Subject<void>();
  readonly vtsOnConfirm = new Subject<void>();

  protected override _trigger: VtsTooltipTrigger = 'click';

  override _prefix = 'vts-popover';

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() directionality: Directionality,
    @Host() @Optional() noAnimation?: VtsNoAnimationDirective
  ) {
    super(cdr, directionality, noAnimation);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.vtsOnCancel.complete();
    this.vtsOnConfirm.complete();
  }

  /**
   * @override
   */
  override show(): void {
    if (!this.vtsCondition) {
      super.show();
    } else {
      this.onConfirm();
    }
  }

  onCancel(): void {
    this.vtsOnCancel.next();
    super.hide();
  }

  onConfirm(): void {
    this.vtsOnConfirm.next();
    super.hide();
  }
}
