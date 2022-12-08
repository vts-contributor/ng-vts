/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { warn } from '@ui-vts/ng-vts/core/logger';
import { IndexableObject, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { isNotNil } from '@ui-vts/ng-vts/core/util';
import { defer, Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { MODAL_MASK_CLASS_NAME, VTS_CONFIG_MODULE_NAME } from './modal-config';
import { VtsModalConfirmContainerComponent } from './modal-confirm-container.component';
import { BaseModalContainerComponent } from './modal-container';
import { VtsModalContainerComponent } from './modal-container.component';
import { VtsModalRef } from './modal-ref';
import { ConfirmType, ModalOptions } from './modal-types';
import { applyConfigDefaults, getValueWithConfig, setContentInstanceParams } from './utils';

type ContentType<T> = ComponentType<T> | TemplateRef<T> | string;

@Injectable()
export class VtsModalService implements OnDestroy {
  private openModalsAtThisLevel: VtsModalRef[] = [];
  private readonly afterAllClosedAtThisLevel = new Subject<void>();

  get openModals(): VtsModalRef[] {
    return this.parentModal ? this.parentModal.openModals : this.openModalsAtThisLevel;
  }

  get _afterAllClosed(): Subject<void> {
    const parent = this.parentModal;
    return parent ? parent._afterAllClosed : this.afterAllClosedAtThisLevel;
  }

  readonly afterAllClose: Observable<void> = defer(() =>
    this.openModals.length ? this._afterAllClosed : this._afterAllClosed.pipe(startWith(undefined))
  ) as Observable<void>;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private vtsConfigService: VtsConfigService,
    @Optional() @SkipSelf() private parentModal: VtsModalService,
    @Optional() private directionality: Directionality
  ) {}

  create<T, R = VtsSafeAny>(config: ModalOptions<T, R>): VtsModalRef<T, R> {
    return this.open<T, R>(config.vtsContent as ComponentType<T>, config);
  }

  closeAll(): void {
    this.closeModals(this.openModals);
  }

  confirm<T>(options: ModalOptions<T> = {}, confirmType: ConfirmType = 'confirm'): VtsModalRef<T> {
    if ('vtsFooter' in options) {
      warn(`The Confirm-Modal doesn't support "vtsFooter", this property will be ignored.`);
    }
    if (!('vtsWidth' in options)) {
      options.vtsWidth = 416;
    }
    if (!('vtsMaskClosable' in options)) {
      options.vtsMaskClosable = false;
    }

    options.vtsModalType = 'confirm';
    options.vtsClassName = `vts-modal-confirm vts-modal-confirm-${confirmType} ${
      options.vtsClassName || ''
    }`;
    return this.create(options);
  }

  info<T>(options: ModalOptions<T> = {}): VtsModalRef<T> {
    return this.confirmFactory(options, 'info');
  }

  success<T>(options: ModalOptions<T> = {}): VtsModalRef<T> {
    return this.confirmFactory(options, 'success');
  }

  error<T>(options: ModalOptions<T> = {}): VtsModalRef<T> {
    return this.confirmFactory(options, 'error');
  }

  warning<T>(options: ModalOptions<T> = {}): VtsModalRef<T> {
    return this.confirmFactory(options, 'warning');
  }

  private open<T, R>(
    componentOrTemplateRef: ContentType<T>,
    config?: ModalOptions
  ): VtsModalRef<T, R> {
    const configMerged = applyConfigDefaults(config || {}, new ModalOptions());
    const overlayRef = this.createOverlay(configMerged);
    const modalContainer = this.attachModalContainer(overlayRef, configMerged);
    const modalRef = this.attachModalContent<T, R>(
      componentOrTemplateRef,
      modalContainer,
      overlayRef,
      configMerged
    );
    modalContainer.modalRef = modalRef;

    this.openModals.push(modalRef);
    modalRef.afterClose.subscribe(() => this.removeOpenModal(modalRef));

    return modalRef;
  }

  private removeOpenModal(modalRef: VtsModalRef): void {
    const index = this.openModals.indexOf(modalRef);
    if (index > -1) {
      this.openModals.splice(index, 1);

      if (!this.openModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private closeModals(dialogs: VtsModalRef[]): void {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
      if (!this.openModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private createOverlay(config: ModalOptions): OverlayRef {
    const globalConfig: VtsSafeAny =
      this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME) || {};
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: getValueWithConfig(
        config.vtsCloseOnNavigation,
        globalConfig.vtsCloseOnNavigation,
        true
      ),
      direction: getValueWithConfig(
        config.vtsDirection,
        globalConfig.vtsDirection,
        this.directionality.value
      )
    });
    if (getValueWithConfig(config.vtsMask, globalConfig.vtsMask, true)) {
      overlayConfig.backdropClass = MODAL_MASK_CLASS_NAME;
    }

    return this.overlay.create(overlayConfig);
  }

  private attachModalContainer(
    overlayRef: OverlayRef,
    config: ModalOptions
  ): BaseModalContainerComponent {
    const userInjector =
      config && config.vtsViewContainerRef && config.vtsViewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this.injector,
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: ModalOptions, useValue: config }
      ]
    });

    const ContainerComponent =
      config.vtsModalType === 'confirm'
        ? // If the mode is `confirm`, use `VtsModalConfirmContainerComponent`
          VtsModalConfirmContainerComponent
        : // If the mode is not `confirm`, use `VtsModalContainerComponent`
          VtsModalContainerComponent;

    const containerPortal = new ComponentPortal<BaseModalContainerComponent>(
      ContainerComponent,
      config.vtsViewContainerRef,
      injector
    );
    const containerRef = overlayRef.attach<BaseModalContainerComponent>(containerPortal);

    return containerRef.instance;
  }

  private attachModalContent<T, R>(
    componentOrTemplateRef: ContentType<T>,
    modalContainer: BaseModalContainerComponent,
    overlayRef: OverlayRef,
    config: ModalOptions<T>
  ): VtsModalRef<T, R> {
    const modalRef = new VtsModalRef<T, R>(overlayRef, config, modalContainer);

    if (componentOrTemplateRef instanceof TemplateRef) {
      modalContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!, {
          $implicit: config.vtsComponentParams,
          modalRef
        } as VtsSafeAny)
      );
    } else if (isNotNil(componentOrTemplateRef) && typeof componentOrTemplateRef !== 'string') {
      const injector = this.createInjector<T, R>(modalRef, config);
      const contentRef = modalContainer.attachComponentPortal<T>(
        new ComponentPortal(componentOrTemplateRef, config.vtsViewContainerRef, injector)
      );
      setContentInstanceParams<T>(contentRef.instance, config.vtsComponentParams);
      modalRef.componentInstance = contentRef.instance;
    } else {
      modalContainer.attachStringContent();
    }
    return modalRef;
  }

  private createInjector<T, R>(modalRef: VtsModalRef<T, R>, config: ModalOptions<T>): Injector {
    const userInjector =
      config && config.vtsViewContainerRef && config.vtsViewContainerRef.injector;

    return Injector.create({
      parent: userInjector || this.injector,
      providers: [{ provide: VtsModalRef, useValue: modalRef }]
    });
  }

  private confirmFactory<T>(
    options: ModalOptions<T> = {},
    confirmType: ConfirmType
  ): VtsModalRef<T> {
    const iconMap: IndexableObject = {
      info: 'info-circle',
      success: 'check-circle',
      error: 'Close',
      warning: 'exclamation-circle'
    };
    if (!('vtsIconType' in options)) {
      options.vtsIconType = iconMap[confirmType];
    }
    if (!('vtsCancelText' in options)) {
      // Remove the Cancel button if the user not specify a Cancel button
      options.vtsCancelText = null;
    }
    return this.confirm(options, confirmType);
  }

  ngOnDestroy(): void {
    this.closeModals(this.openModalsAtThisLevel);
    this.afterAllClosedAtThisLevel.complete();
  }
}
