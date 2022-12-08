/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { isPromise } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsI18nService, VtsModalI18nInterface } from '@ui-vts/ng-vts/i18n';

import { VtsModalRef } from './modal-ref';
import { ModalButtonOptions, ModalOptions } from './modal-types';

@Component({
  selector: 'div[vts-modal-footer]',
  exportAs: 'VtsModalFooterBuiltin',
  template: `
    <ng-container *ngIf="config.vtsFooter; else defaultFooterButtons">
      <ng-container
        *vtsStringTemplateOutlet="
          config.vtsFooter;
          context: { $implicit: config.vtsComponentParams, modalRef: modalRef }
        "
      >
        <div *ngIf="!buttonsFooter" [innerHTML]="config.vtsFooter"></div>
        <ng-container *ngIf="buttonsFooter">
          <button
            *ngFor="let button of buttons"
            vts-button
            (click)="onButtonClick(button)"
            [hidden]="!getButtonCallableProp(button, 'show')"
            [vtsLoading]="getButtonCallableProp(button, 'loading')"
            [disabled]="getButtonCallableProp(button, 'disabled')"
            [vtsType]="button.type!"
            [vtsShape]="button.shape!"
            [vtsSize]="button.size!"
          >
            {{ button.label }}
          </button>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #defaultFooterButtons>
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
    </ng-template>
  `,
  host: {
    class: 'vts-modal-footer'
  },
  changeDetection: ChangeDetectionStrategy.Default
})
export class VtsModalFooterComponent implements OnDestroy {
  buttonsFooter = false;
  buttons: ModalButtonOptions[] = [];
  locale!: VtsModalI18nInterface;
  @Output() readonly cancelTriggered = new EventEmitter<void>();
  @Output() readonly okTriggered = new EventEmitter<void>();
  @Input() modalRef!: VtsModalRef;
  private destroy$ = new Subject<void>();

  constructor(private i18n: VtsI18nService, public config: ModalOptions) {
    if (Array.isArray(config.vtsFooter)) {
      this.buttonsFooter = true;
      this.buttons = (config.vtsFooter as ModalButtonOptions[]).map(mergeDefaultOption);
    }
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

  /**
   * Returns the value of the specified key.
   * If it is a function, run and return the return value of the function.
   */
  getButtonCallableProp(options: ModalButtonOptions, prop: keyof ModalButtonOptions): boolean {
    const value = options[prop];
    const componentInstance = this.modalRef.getContentComponent();
    return typeof value === 'function'
      ? value.apply(options, componentInstance && [componentInstance])
      : value;
  }

  /**
   * Run function based on the type and set its `loading` prop if needed.
   */
  onButtonClick(options: ModalButtonOptions): void {
    const loading = this.getButtonCallableProp(options, 'loading');
    if (!loading) {
      const result = this.getButtonCallableProp(options, 'onClick');
      if (options.autoLoading && isPromise(result)) {
        options.loading = true;
        result.then(() => (options.loading = false)).catch(() => (options.loading = false));
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

function mergeDefaultOption(options: ModalButtonOptions): ModalButtonOptions {
  return {
    type: null,
    size: 'md',
    autoLoading: true,
    show: true,
    loading: false,
    disabled: false,
    ...options
  };
}
