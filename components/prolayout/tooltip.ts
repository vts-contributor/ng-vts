/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  Optional,
  Output,
  Renderer2,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { zoomBigMotion } from '@ui-vts/ng-vts/core/animation';
import { isPresetColor, VtsPresetColor } from '@ui-vts/ng-vts/core/color';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { BooleanInput, NgStyleInterface, VtsTSType } from '@ui-vts/ng-vts/core/types';
import { Directionality } from '@angular/cdk/bidi';
import {
  isTooltipEmpty,
  SiderTooltipBaseDirective,
  VtsTooltipTrigger,
  PropertyMapping,
  VtsTooltipType,
  SiderTooltipBaseComponent
} from './tooltip-sider.base';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { MenuItemProLayout } from './pro-layout.types';

@Directive({
  selector: '[sider-tooltip]',
  exportAs: 'siderTooltip',
  host: {
    '[class.sider-tooltip-open]': 'visible'
  }
})
export class SiderTooltipDirective extends SiderTooltipBaseDirective {
  static ngAcceptInputType_arrowPointAtCenter: BooleanInput;

  @Input('vtsTooltipTitle') override title?: VtsTSType | null;
  @Input('sider-tooltip') override directiveTitle?: VtsTSType | null;
  @Input('vtsTooltipTrigger') override trigger?: VtsTooltipTrigger = 'hover';
  @Input('vtsTooltipPlacement') override placement?: string | string[] = 'top';
  @Input('vtsTooltipOrigin') override origin?: ElementRef<HTMLElement>;
  @Input('vtsTooltipVisible') override visible?: boolean;
  @Input('vtsTooltipMouseEnterDelay') override mouseEnterDelay?: number;
  @Input('vtsTooltipMouseLeaveDelay') override mouseLeaveDelay?: number;
  @Input('vtsTooltipOverlayClassName') override overlayClassName?: string;
  @Input('vtsTooltipOverlayStyle') override overlayStyle?: NgStyleInterface;
  @Input('vtsTooltipType') override vtsType?: VtsTooltipType;
  @Input('vtsTooltipArrowPointAtCenter') @InputBoolean() override arrowPointAtCenter?: boolean;
  @Input() vtsTooltipColor?: string;
  @Input('tooltipMenuItem')  override menuItem?: MenuItemProLayout | null;

  // tslint:disable-next-line:no-output-rename
  @Output('vtsTooltipVisibleChange')
  override readonly visibleChange = new EventEmitter<boolean>();

  override componentRef: ComponentRef<SiderToolTipComponent> =
    this.hostView.createComponent(SiderToolTipComponent);

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() noAnimation?: VtsNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation);
  }

  protected override getProxyPropertyMap(): PropertyMapping {
    return {
      ...super.getProxyPropertyMap(),
      vtsTooltipColor: ['vtsColor', () => this.vtsTooltipColor]
    };
  }
}

@Component({
  selector: 'sider-tooltip',
  exportAs: 'siderTooltipComponent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [zoomBigMotion],
  template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      vtsConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayPush]="true"
      [vtsArrowPointAtCenter]="vtsArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="sider-tooltip"
        [class.sider-tooltip-rtl]="dir === 'rtl'"
        [class.sider-tooltip-sentence]="vtsType === 'sentence'"
        [class.sider-tooltip-paragraph]="vtsType === 'paragraph'"
        [ngClass]="_classMap"
        [ngStyle]="vtsOverlayStyle"
        [@.disabled]="noAnimation?.vtsNoAnimation"
        [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="sider-tooltip-content">
          <div class="sider-tooltip-arrow">
            <span class="sider-tooltip-arrow-content" [ngStyle]="_contentStyleMap"></span>
          </div>
          <div class="sider-tooltip-inner" [ngStyle]="_contentStyleMap">
            <ng-container *vtsStringTemplateOutlet="vtsTitle">
              {{ vtsTitle }}
            </ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  preserveWhitespaces: false
})
export class SiderToolTipComponent extends SiderTooltipBaseComponent {
  override vtsTitle: VtsTSType | null = null;

  vtsColor?: string | VtsPresetColor;

  _contentStyleMap: NgStyleInterface = {};

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() directionality: Directionality,
    @Host() @Optional() noAnimation?: VtsNoAnimationDirective
  ) {
    super(cdr, directionality, noAnimation);
  }

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.vtsTitle);
  }

  override updateStyles(): void {
    const isColorPreset = this.vtsColor && isPresetColor(this.vtsColor);

    this._classMap = {
      [this.vtsOverlayClassName]: true,
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true,
      [`${this._prefix}-${this.vtsColor}`]: isColorPreset
    };

    this._contentStyleMap = {
      backgroundColor: !!this.vtsColor && !isColorPreset ? this.vtsColor : null
    };
  }
}
