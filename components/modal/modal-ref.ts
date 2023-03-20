/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { EventEmitter } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { isPromise } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { BaseModalContainerComponent } from './modal-container';
import { VtsModalLegacyAPI } from './modal-legacy-api';
import { ModalOptions } from './modal-types';

export const enum VtsModalState {
  OPEN,
  CLOSING,
  CLOSED
}

export const enum VtsTriggerAction {
  CANCEL = 'cancel',
  OK = 'ok'
}

export class VtsModalRef<T = VtsSafeAny, R = VtsSafeAny> implements VtsModalLegacyAPI<T, R> {
  componentInstance: T | null = null;
  result?: R;
  state: VtsModalState = VtsModalState.OPEN;
  afterClose: Subject<R> = new Subject();
  afterOpen: Subject<void> = new Subject();

  private closeTimeout?: number | ReturnType<typeof setTimeout>;

  constructor(
    private overlayRef: OverlayRef,
    private config: ModalOptions,
    public containerInstance: BaseModalContainerComponent
  ) {
    containerInstance.animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'enter'),
        take(1)
      )
      .subscribe(() => {
        this.afterOpen.next();
        this.afterOpen.complete();
        if (config.vtsAfterOpen instanceof EventEmitter) {
          config.vtsAfterOpen.emit();
        }
      });

    containerInstance.animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'exit'),
        take(1)
      )
      .subscribe(() => {
        clearTimeout(this.closeTimeout);
        this._finishDialogClose();
      });

    containerInstance.containerClick.pipe(take(1)).subscribe(() => {
      const cancelable = !this.config.vtsCancelLoading && !this.config.vtsOkLoading;
      if (cancelable) {
        this.trigger(VtsTriggerAction.CANCEL);
      }
    });

    overlayRef
      .keydownEvents()
      .pipe(
        filter(event => {
          return (
            (this.config.vtsKeyboard as boolean) &&
            !this.config.vtsCancelLoading &&
            !this.config.vtsOkLoading &&
            event.keyCode === ESCAPE &&
            !hasModifierKey(event)
          );
        })
      )
      .subscribe(event => {
        event.preventDefault();
        this.trigger(VtsTriggerAction.CANCEL);
      });

    containerInstance.cancelTriggered.subscribe(() => this.trigger(VtsTriggerAction.CANCEL));

    containerInstance.okTriggered.subscribe(() => this.trigger(VtsTriggerAction.OK));

    overlayRef.detachments().subscribe(() => {
      this.afterClose.next(this.result);
      this.afterClose.complete();
      if (config.vtsAfterClose instanceof EventEmitter) {
        config.vtsAfterClose.emit(this.result);
      }
      this.componentInstance = null;
      this.overlayRef.dispose();
    });
  }

  getContentComponent(): T {
    return this.componentInstance as T;
  }

  getElement(): HTMLElement {
    return this.containerInstance.getNativeElement();
  }

  destroy(result?: R): void {
    this.close(result);
  }

  triggerOk(): Promise<void> {
    return this.trigger(VtsTriggerAction.OK);
  }

  triggerCancel(): Promise<void> {
    return this.trigger(VtsTriggerAction.CANCEL);
  }

  close(result?: R): void {
    this.result = result;
    this.containerInstance.animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'start'),
        take(1)
      )
      .subscribe(event => {
        this.overlayRef.detachBackdrop();
        this.closeTimeout = setTimeout(() => {
          this._finishDialogClose();
        }, event.totalTime + 100);
      });

    this.containerInstance.startExitAnimation();
    this.state = VtsModalState.CLOSING;
  }

  updateConfig(config: ModalOptions): void {
    Object.assign(this.config, config);
    this.containerInstance.bindBackdropStyle();
    this.containerInstance.cdr.markForCheck();
  }

  getState(): VtsModalState {
    return this.state;
  }

  getConfig(): ModalOptions {
    return this.config;
  }

  getBackdropElement(): HTMLElement | null {
    return this.overlayRef.backdropElement;
  }

  private async trigger(action: VtsTriggerAction): Promise<void> {
    const trigger = { ok: this.config.vtsOnOk, cancel: this.config.vtsOnCancel }[action];
    const loadingKey = { ok: 'vtsOkLoading', cancel: 'vtsCancelLoading' }[action] as
      | 'vtsOkLoading'
      | 'vtsCancelLoading';
    const loading = this.config[loadingKey];
    if (loading) {
      return;
    }
    if (trigger instanceof EventEmitter) {
      trigger.emit(this.getContentComponent());
    } else if (typeof trigger === 'function') {
      const result = trigger(this.getContentComponent());
      if (isPromise(result)) {
        this.config[loadingKey] = true;
        let doClose: boolean | void | {} = false;
        try {
          doClose = (await result) as any;
        } finally {
          this.config[loadingKey] = false;
          this.closeWhitResult(doClose);
        }
      } else {
        this.closeWhitResult(result);
      }
    }
  }

  private closeWhitResult(result: VtsSafeAny): void {
    if (result !== false) {
      this.close(result);
    }
  }

  _finishDialogClose(): void {
    this.state = VtsModalState.CLOSED;
    this.overlayRef.dispose();
  }
}
