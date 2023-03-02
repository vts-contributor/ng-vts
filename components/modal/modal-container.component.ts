/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Optional,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

import { vtsModalAnimations } from './modal-animations';
import { BaseModalContainerComponent } from './modal-container';
import { ModalOptions } from './modal-types';

@Component({
  selector: 'vts-modal-container',
  exportAs: 'vtsModalContainer',
  template: `
    <div
      #modalElement
      role="document"
      class="vts-modal"
      (mousedown)="onMousedown()"
      [ngClass]="config.vtsClassName!"
      [ngStyle]="config.vtsStyle!"
      [style.width]="config?.vtsWidth! | vtsToCssUnit"
    >
      <div class="vts-modal-content">
        <button *ngIf="config.vtsClosable" vts-modal-close (click)="onCloseClick()"></button>
        <div *ngIf="config.vtsTitle" vts-modal-title></div>
        <div class="vts-modal-body" [ngStyle]="config.vtsBodyStyle!">
          <ng-template cdkPortalOutlet></ng-template>
          <div *ngIf="isStringContent" [innerHTML]="config.vtsContent"></div>
        </div>
        <div
          *ngIf="config.vtsFooter !== null"
          vts-modal-footer
          [modalRef]="modalRef"
          (cancelTriggered)="onCloseClick()"
          (okTriggered)="onOkClick()"
        ></div>
      </div>
    </div>
  `,
  animations: [vtsModalAnimations.modalContainer],
  // Using OnPush for modal caused footer can not to detect changes. we can fix it when 8.x.
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    tabindex: '-1',
    role: 'dialog',
    '[class]':
      'config.vtsWrapClassName ? "vts-modal-wrap " + config.vtsWrapClassName : "vts-modal-wrap"',
    '[class.vts-modal-wrap-rtl]': `dir === 'rtl'`,
    '[class.vts-modal-centered]': 'config.vtsCentered',
    '[style.zIndex]': 'config.vtsZIndex',
    '[@.disabled]': 'config.vtsNoAnimation',
    '[@modalContainer]': 'state',
    '(@modalContainer.start)': 'onAnimationStart($event)',
    '(@modalContainer.done)': 'onAnimationDone($event)',
    '(click)': 'onContainerClick($event)',
    '(mouseup)': 'onMouseup()'
  }
})
export class VtsModalContainerComponent extends BaseModalContainerComponent {
  @ViewChild(CdkPortalOutlet, { static: true }) override portalOutlet!: CdkPortalOutlet;
  @ViewChild('modalElement', { static: true })
  override modalElementRef!: ElementRef<HTMLDivElement>;
  constructor(
    elementRef: ElementRef,
    focusTrapFactory: FocusTrapFactory,
    cdr: ChangeDetectorRef,
    render: Renderer2,
    overlayRef: OverlayRef,
    vtsConfigService: VtsConfigService,
    public override config: ModalOptions,
    @Optional() @Inject(DOCUMENT) document: VtsSafeAny,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationType: string
  ) {
    super(
      elementRef,
      focusTrapFactory,
      cdr,
      render,
      overlayRef,
      vtsConfigService,
      config,
      document,
      animationType
    );
  }
}
