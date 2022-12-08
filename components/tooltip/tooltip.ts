/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
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
import { NgStyleInterface, VtsTSType } from '@ui-vts/ng-vts/core/types';
import { Directionality } from '@angular/cdk/bidi';
import {
  isTooltipEmpty,
  VtsTooltipBaseComponent,
  VtsTooltipBaseDirective,
  VtsTooltipTrigger,
  PropertyMapping,
  VtsTooltipType
} from './base';

@Directive({
  selector: '[vts-tooltip]',
  exportAs: 'vtsTooltip',
  host: {
    '[class.vts-tooltip-open]': 'visible'
  }
})
export class VtsTooltipDirective extends VtsTooltipBaseDirective {
  @Input('vtsTooltipTitle') title?: VtsTSType | null;
  @Input('vts-tooltip') directiveTitle?: VtsTSType | null;
  @Input('vtsTooltipTrigger') trigger?: VtsTooltipTrigger = 'hover';
  @Input('vtsTooltipPlacement') placement?: string | string[] = 'top';
  @Input('vtsTooltipOrigin') origin?: ElementRef<HTMLElement>;
  @Input('vtsTooltipVisible') visible?: boolean;
  @Input('vtsTooltipMouseEnterDelay') mouseEnterDelay?: number;
  @Input('vtsTooltipMouseLeaveDelay') mouseLeaveDelay?: number;
  @Input('vtsTooltipOverlayClassName') overlayClassName?: string;
  @Input('vtsTooltipOverlayStyle') overlayStyle?: NgStyleInterface;
  @Input('vtsTooltipType') vtsType?: VtsTooltipType;
  @Input() vtsTooltipColor?: string;

  // tslint:disable-next-line:no-output-rename
  @Output('vtsTooltipVisibleChange')
  readonly visibleChange = new EventEmitter<boolean>();

  componentFactory: ComponentFactory<VtsToolTipComponent> =
    this.resolver.resolveComponentFactory(VtsToolTipComponent);

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() noAnimation?: VtsNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation);
  }

  protected getProxyPropertyMap(): PropertyMapping {
    return {
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
  vtsTitle: VtsTSType | null = null;

  vtsColor?: string | VtsPresetColor;

  _contentStyleMap: NgStyleInterface = {};

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() directionality: Directionality,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    super(cdr, directionality, noAnimation);
  }

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.vtsTitle);
  }

  updateStyles(): void {
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
