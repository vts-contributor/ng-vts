/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
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
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { NgStyleInterface, VtsTSType } from '@ui-vts/ng-vts/core/types';
import {
  isTooltipEmpty,
  VtsTooltipBaseDirective,
  VtsToolTipComponent,
  VtsTooltipTrigger,
  PropertyMapping
} from '@ui-vts/ng-vts/tooltip';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'popover';

@Directive({
  selector: '[vts-popover]',
  exportAs: 'vtsPopover',
  host: {
    '[class.vts-popover-open]': 'visible'
  }
})
export class VtsPopoverDirective extends VtsTooltipBaseDirective {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  @Input('vtsPopoverTitle') title?: VtsTSType;
  @Input('vtsPopoverContent') content?: VtsTSType;
  @Input('vts-popover') directiveTitle?: VtsTSType | null;
  @Input('vtsPopoverTrigger') trigger?: VtsTooltipTrigger = 'hover';
  @Input('vtsPopoverPlacement') placement?: string | string[] = 'top';
  @Input('vtsPopoverOrigin') origin?: ElementRef<HTMLElement>;
  @Input('vtsPopoverVisible') visible?: boolean;
  @Input('vtsPopoverMouseEnterDelay') mouseEnterDelay?: number;
  @Input('vtsPopoverMouseLeaveDelay') mouseLeaveDelay?: number;
  @Input('vtsPopoverOverlayClassName') overlayClassName?: string;
  @Input('vtsPopoverOverlayStyle') overlayStyle?: NgStyleInterface;
  @Input() @WithConfig() vtsPopoverBackdrop?: boolean = false;

  // tslint:disable-next-line:no-output-rename
  @Output('vtsPopoverVisibleChange')
  readonly visibleChange = new EventEmitter<boolean>();

  componentFactory: ComponentFactory<VtsPopoverComponent> =
    this.resolver.resolveComponentFactory(VtsPopoverComponent);

  protected getProxyPropertyMap(): PropertyMapping {
    return {
      vtsPopoverBackdrop: ['vtsBackdrop', () => this.vtsPopoverBackdrop],
      ...super.getProxyPropertyMap()
    };
  }

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective,
    vtsConfigService?: VtsConfigService
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation, vtsConfigService);
  }
}

@Component({
  selector: 'vts-popover',
  exportAs: 'vtsPopoverComponent',
  animations: [zoomBigMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      vtsConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="hasBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="vts-popover"
        [class.vts-popover-rtl]="dir === 'rtl'"
        [ngClass]="_classMap"
        [ngStyle]="vtsOverlayStyle"
        [@.disabled]="noAnimation?.vtsNoAnimation"
        [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="vts-popover-content">
          <div class="vts-popover-arrow"></div>
          <div class="vts-popover-inner" role="tooltip">
            <div>
              <div class="vts-popover-title" *ngIf="vtsTitle">
                <ng-container *vtsStringTemplateOutlet="vtsTitle">
                  {{ vtsTitle }}
                </ng-container>
              </div>
              <div class="vts-popover-inner-content">
                <ng-container *vtsStringTemplateOutlet="vtsContent">
                  {{ vtsContent }}
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class VtsPopoverComponent extends VtsToolTipComponent {
  _prefix = 'vts-popover';

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() directionality: Directionality,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    super(cdr, directionality, noAnimation);
  }

  get hasBackdrop(): boolean {
    return this.vtsTrigger === 'click' ? this.vtsBackdrop : false;
  }

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.vtsTitle) && isTooltipEmpty(this.vtsContent);
  }
}
