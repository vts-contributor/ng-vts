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
  VtsTooltipBaseComponent,
  VtsTooltipBaseDirective,
  VtsTooltipTrigger,
  PropertyMapping,
  VtsTooltipType
} from './base';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Directive({
  selector: '[vts-tooltip]',
  exportAs: 'vtsTooltip',
  host: {
    '[class.vts-tooltip-open]': 'visible'
  }
})
export class VtsTooltipDirective extends VtsTooltipBaseDirective {
  static ngAcceptInputType_arrowPointAtCenter: BooleanInput;

  @Input('vtsTooltipTitle') override title?: VtsTSType | null;
  @Input('vts-tooltip') override directiveTitle?: VtsTSType | null;
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

  // tslint:disable-next-line:no-output-rename
  @Output('vtsTooltipVisibleChange')
  override readonly visibleChange = new EventEmitter<boolean>();

  override componentRef: ComponentRef<VtsToolTipComponent> =
    this.hostView.createComponent(VtsToolTipComponent);

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
  selector: 'vts-tooltip',
  exportAs: 'vtsTooltipComponent',
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
        class="vts-tooltip"
        [class.vts-tooltip-rtl]="dir === 'rtl'"
        [class.vts-tooltip-sentence]="vtsType === 'sentence'"
        [class.vts-tooltip-paragraph]="vtsType === 'paragraph'"
        [ngClass]="_classMap"
        [ngStyle]="vtsOverlayStyle"
        [@.disabled]="noAnimation?.vtsNoAnimation"
        [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="vts-tooltip-content">
          <div class="vts-tooltip-arrow">
            <span class="vts-tooltip-arrow-content" [ngStyle]="_contentStyleMap"></span>
          </div>
          <div class="vts-tooltip-inner" [ngStyle]="_contentStyleMap">
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
export class VtsToolTipComponent extends VtsTooltipBaseComponent {
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
