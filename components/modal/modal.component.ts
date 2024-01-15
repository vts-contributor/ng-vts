/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { VtsButtonType } from '@ui-vts/ng-vts/button';
import { warnDeprecation } from '@ui-vts/ng-vts/core/logger';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Observable } from 'rxjs';

import { VtsModalContentDirective } from './modal-content.directive';
import { VtsModalFooterDirective } from './modal-footer.directive';
import { VtsModalLegacyAPI } from './modal-legacy-api';
import { VtsModalRef } from './modal-ref';
import { VtsModalTitleDirective } from './modal-title.directive';
import {
  ModalButtonOptions,
  ModalOptions,
  ModalTypes,
  OnClickCallback,
  StyleObjectLike
} from './modal-types';
import { VtsModalService } from './modal.service';
import { getConfigFromComponent } from './utils';

@Component({
  selector: 'vts-modal',
  exportAs: 'vtsModal',
  template: `
    <ng-template><ng-content></ng-content></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsModalComponent<T = VtsSafeAny, R = VtsSafeAny>
  implements OnChanges, VtsModalLegacyAPI<T, R>, OnDestroy
{
  static ngAcceptInputType_vtsMask: BooleanInput;
  static ngAcceptInputType_vtsMaskClosable: BooleanInput;
  static ngAcceptInputType_vtsCloseOnNavigation: BooleanInput;
  static ngAcceptInputType_vtsVisible: BooleanInput;
  static ngAcceptInputType_vtsClosable: BooleanInput;
  static ngAcceptInputType_vtsOkLoading: BooleanInput;
  static ngAcceptInputType_vtsOkDisabled: BooleanInput;
  static ngAcceptInputType_vtsCancelDisabled: BooleanInput;
  static ngAcceptInputType_vtsCancelLoading: BooleanInput;
  static ngAcceptInputType_vtsKeyboard: BooleanInput;
  static ngAcceptInputType_vtsNoAnimation: BooleanInput;
  static ngAcceptInputType_vtsOkDanger: BooleanInput;
  static ngAcceptInputType_vtsCentered: BooleanInput;

  @Input() @InputBoolean() vtsMask?: boolean;
  @Input() @InputBoolean() vtsMaskClosable?: boolean;
  @Input() @InputBoolean() vtsCloseOnNavigation?: boolean;
  @Input() @InputBoolean() vtsVisible: boolean = false;
  @Input() @InputBoolean() vtsClosable: boolean = true;
  @Input() @InputBoolean() vtsOkLoading: boolean = false;
  @Input() @InputBoolean() vtsOkDisabled: boolean = false;
  @Input() @InputBoolean() vtsCancelDisabled: boolean = false;
  @Input() @InputBoolean() vtsCancelLoading: boolean = false;
  @Input() @InputBoolean() vtsKeyboard: boolean = true;
  @Input() @InputBoolean() vtsNoAnimation = false;
  @Input() @InputBoolean() vtsCentered = false;
  @Input() vtsContent?: string | TemplateRef<{}> | Type<T>;
  @Input() vtsComponentParams?: T;
  @Input() vtsFooter?: string | TemplateRef<{}> | Array<ModalButtonOptions<T>> | null;
  @Input() vtsZIndex: number = 1000;
  @Input() vtsWidth: number | string = 520;
  @Input() vtsWrapClassName?: string;
  @Input() vtsClassName?: string;
  @Input() vtsStyle?: object;
  @Input() vtsTitle?: string | TemplateRef<{}>;
  @Input() vtsCloseIcon: string | TemplateRef<void> = 'Close:vts';
  @Input() vtsMaskStyle?: StyleObjectLike;
  @Input() vtsBodyStyle?: StyleObjectLike;
  @Input() vtsOkText?: string | null;
  @Input() vtsCancelText?: string | null;
  @Input() vtsOkType: VtsButtonType = 'primary';
  @Input() @InputBoolean() vtsOkDanger: boolean = false;
  @Input() vtsIconType: string = 'question-circle'; // Confirm Modal ONLY
  @Input() vtsModalType: ModalTypes = 'default';
  @Input() vtsAutofocus: 'ok' | 'cancel' | 'auto' | null = 'auto';

  // TODO(@hsuanxyz) Input will not be supported
  @Input()
  @Output()
  readonly vtsOnOk: EventEmitter<T> | OnClickCallback<T> | VtsSafeAny = new EventEmitter<T>();

  // TODO(@hsuanxyz) Input will not be supported
  @Input()
  @Output()
  readonly vtsOnCancel: EventEmitter<T> | OnClickCallback<T> | VtsSafeAny = new EventEmitter<T>();

  @Output() readonly vtsAfterOpen = new EventEmitter<void>();
  @Output() readonly vtsAfterClose = new EventEmitter<R>();
  @Output() readonly vtsVisibleChange = new EventEmitter<boolean>();

  @ViewChild(TemplateRef, { static: true })
  contentTemplateRef!: TemplateRef<{}>;
  @ContentChild(VtsModalTitleDirective, { static: true, read: TemplateRef })
  set modalTitle(value: TemplateRef<VtsSafeAny>) {
    if (value) {
      this.setTitleWithTemplate(value);
    }
  }
  @ContentChild(VtsModalContentDirective, { static: true, read: TemplateRef })
  contentFromContentChild!: TemplateRef<VtsSafeAny>;
  @ContentChild(VtsModalFooterDirective, { static: true, read: TemplateRef })
  set modalFooter(value: TemplateRef<VtsSafeAny>) {
    if (value) {
      this.setFooterWithTemplate(value);
    }
  }

  private modalRef: VtsModalRef | null = null;

  get afterOpen(): Observable<void> {
    // Observable alias for vtsAfterOpen
    return this.vtsAfterOpen.asObservable();
  }

  get afterClose(): Observable<R> {
    // Observable alias for vtsAfterClose
    return this.vtsAfterClose.asObservable();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private modal: VtsModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  open(): void {
    if (!this.vtsVisible) {
      this.vtsVisible = true;
      this.vtsVisibleChange.emit(true);
    }

    if (!this.modalRef) {
      const config = this.getConfig();
      this.modalRef = this.modal.create(config);
    }
  }

  close(result?: R): void {
    if (this.vtsVisible) {
      this.vtsVisible = false;
      this.vtsVisibleChange.emit(false);
    }

    if (this.modalRef) {
      this.modalRef.close(result);
      this.modalRef = null;
    }
  }

  destroy(result?: R): void {
    this.close(result);
  }

  triggerOk(): void {
    this.modalRef?.triggerOk();
  }

  triggerCancel(): void {
    this.modalRef?.triggerCancel();
  }

  getContentComponent(): T | void {
    return this.modalRef?.getContentComponent();
  }

  getElement(): HTMLElement | void {
    return this.modalRef?.getElement();
  }

  getModalRef(): VtsModalRef | null {
    return this.modalRef;
  }

  private setTitleWithTemplate(templateRef: TemplateRef<{}>): void {
    this.vtsTitle = templateRef;
    if (this.modalRef) {
      // If modalRef already created, set the title in next tick
      Promise.resolve().then(() => {
        this.modalRef!.updateConfig({
          vtsTitle: this.vtsTitle
        });
      });
    }
  }

  private setFooterWithTemplate(templateRef: TemplateRef<{}>): void {
    this.vtsFooter = templateRef;
    if (this.modalRef) {
      // If modalRef already created, set the footer in next tick
      Promise.resolve().then(() => {
        this.modalRef!.updateConfig({
          vtsFooter: this.vtsFooter
        });
      });
    }

    this.cdr.markForCheck();
  }

  private getConfig(): ModalOptions {
    const componentConfig = getConfigFromComponent(this);
    componentConfig.vtsViewContainerRef = this.viewContainerRef;
    if (!this.vtsContent && !this.contentFromContentChild) {
      componentConfig.vtsContent = this.contentTemplateRef;
      warnDeprecation(
        'Usage `<ng-content></ng-content>` is deprecated, which will be removed in 12.0.0. Please instead use `<ng-template vtsModalContent></ng-template>` to declare the content of the modal.'
      );
    } else {
      componentConfig.vtsContent = this.vtsContent || this.contentFromContentChild;
    }
    return componentConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsVisible, ...otherChanges } = changes;

    if (Object.keys(otherChanges).length && this.modalRef) {
      this.modalRef.updateConfig(getConfigFromComponent(this));
    }

    if (vtsVisible) {
      if (this.vtsVisible) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  ngOnDestroy(): void {
    this.modalRef?._finishDialogClose();
  }
}
