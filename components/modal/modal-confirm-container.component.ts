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
  EventEmitter,
  Inject,
  Optional,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

import { VtsI18nService, VtsModalI18nInterface } from '@ui-vts/ng-vts/i18n';

import { takeUntil } from 'rxjs/operators';

import { vtsModalAnimations } from './modal-animations';
import { BaseModalContainerComponent } from './modal-container';
import { ModalOptions } from './modal-types';

@Component({
  selector: 'vts-modal-confirm-container',
  exportAs: 'vtsModalConfirmContainer',
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
        <div class="vts-modal-body" [ngStyle]="config.vtsBodyStyle!">
          <div class="vts-modal-confirm-body-wrapper">
            <div class="vts-modal-confirm-body">
              <i vts-icon [vtsType]="config.vtsIconType!"></i>
              <span class="vts-modal-confirm-title">
                <ng-container *vtsStringTemplateOutlet="config.vtsTitle">
                  <span [innerHTML]="config.vtsTitle"></span>
                </ng-container>
              </span>
              <div class="vts-modal-confirm-content">
                <ng-template cdkPortalOutlet></ng-template>
                <div *ngIf="isStringContent" [innerHTML]="config.vtsContent"></div>
              </div>
            </div>
            <div class="vts-modal-confirm-btns">
              <button
                *ngIf="config.vtsCancelText !== null"
                [attr.cdkFocusInitial]="config.vtsAutofocus === 'cancel' || null"
                vts-button
                (click)="onCancel()"
                [vtsLoading]="!!config.vtsCancelLoading"
                [disabled]="config.vtsCancelDisabled"
              >
                {{ config.vtsCancelText || locale.cancelText }}
              </button>
              <button
                *ngIf="config.vtsOkText !== null"
                [attr.cdkFocusInitial]="config.vtsAutofocus === 'ok' || null"
                vts-button
                [vtsType]="config.vtsOkType!"
                (click)="onOk()"
                [vtsLoading]="!!config.vtsOkLoading"
                [disabled]="config.vtsOkDisabled"
              >
                {{ config.vtsOkText || locale.okText }}
              </button>
            </div>
          </div>
        </div>
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
export class VtsModalConfirmContainerComponent extends BaseModalContainerComponent {
  @ViewChild(CdkPortalOutlet, { static: true }) override portalOutlet!: CdkPortalOutlet;
  @ViewChild('modalElement', { static: true })
  overridemodalElementRef!: ElementRef<HTMLDivElement>;
  @Output() override readonly cancelTriggered = new EventEmitter<void>();
  @Output() override readonly okTriggered = new EventEmitter<void>();
  locale!: VtsModalI18nInterface;

  constructor(
    private i18n: VtsI18nService,
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
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Modal');
    });
  }

  onCancel(): void {
    this.cancelTriggered.emit();
  }

  onOk(): void {
    this.okTriggered.emit();
  }
}
