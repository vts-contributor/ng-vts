/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { EventEmitter, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { VtsButtonShape, VtsButtonSize, VtsButtonType } from '@ui-vts/ng-vts/button';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export type OnClickCallback<T> = (instance: T) => (false | void | {}) | Promise<false | void | {}>;

export type ModalTypes = 'default' | 'confirm'; // Different modal styles we have supported

export type ConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning'; // Subtypes of Confirm Modal

export interface StyleObjectLike {
  [key: string]: string;
}

const noopFun = () => void 0;

export class ModalOptions<T = VtsSafeAny, R = VtsSafeAny> {
  vtsCentered?: boolean = false;
  vtsClosable?: boolean = true;
  vtsOkLoading?: boolean = false;
  vtsOkDisabled?: boolean = false;
  vtsCancelDisabled?: boolean = false;
  vtsCancelLoading?: boolean = false;
  vtsNoAnimation?: boolean = false;
  vtsAutofocus?: 'ok' | 'cancel' | 'auto' | null = 'auto';
  vtsMask?: boolean;
  vtsMaskClosable?: boolean;
  vtsKeyboard?: boolean = true;
  vtsZIndex?: number = 1000;
  vtsWidth?: number | string = 520;
  vtsCloseIcon?: string | TemplateRef<void> = 'close';
  vtsOkType?: VtsButtonType = 'primary';
  vtsOkDanger?: boolean = false;
  vtsModalType?: ModalTypes = 'default';
  vtsOnCancel?: EventEmitter<T> | OnClickCallback<T> = noopFun;
  vtsOnOk?: EventEmitter<T> | OnClickCallback<T> = noopFun;
  vtsComponentParams?: Partial<T>;
  vtsMaskStyle?: StyleObjectLike;
  vtsBodyStyle?: StyleObjectLike;
  vtsWrapClassName?: string;
  vtsClassName?: string;
  vtsStyle?: object;
  vtsTitle?: string | TemplateRef<{}>;
  vtsFooter?: string | TemplateRef<{}> | Array<ModalButtonOptions<T>> | null; // Default Modal ONLY
  vtsCancelText?: string | null;
  vtsOkText?: string | null;
  vtsContent?: string | TemplateRef<VtsSafeAny> | Type<T>;
  vtsCloseOnNavigation?: boolean;
  vtsViewContainerRef?: ViewContainerRef;
  // Template use only
  vtsAfterOpen?: EventEmitter<void>;
  vtsAfterClose?: EventEmitter<R>;

  // Confirm
  vtsIconType?: string = 'question-circle';
  vtsDirection?: Direction;
}

export interface ModalButtonOptions<T = VtsSafeAny> {
  label: string;
  type?: VtsButtonType | VtsSafeAny;
  danger?: boolean;
  shape?: VtsButtonShape;
  ghost?: boolean;
  size?: VtsButtonSize;
  autoLoading?: boolean; // Default: true, indicate whether show loading automatically while onClick returned a Promise

  // [NOTE] "componentInstance" will refer to the component's instance when using Component
  show?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  loading?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean); // This prop CAN'T use with autoLoading=true
  disabled?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  onClick?(
    this: ModalButtonOptions<T>,
    contentComponentInstance?: T
  ): VtsSafeAny | Promise<VtsSafeAny>;
  [key: string]: VtsSafeAny;
}
