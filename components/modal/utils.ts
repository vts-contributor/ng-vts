/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ModalOptions } from './modal-types';
import { VtsModalComponent } from './modal.component';

export function applyConfigDefaults(
  config: ModalOptions,
  defaultOptions: ModalOptions
): ModalOptions {
  return { ...defaultOptions, ...config };
}

export function getValueWithConfig<T>(
  userValue: T | undefined,
  configValue: T | undefined,
  defaultValue: T
): T | undefined {
  return typeof userValue === 'undefined'
    ? typeof configValue === 'undefined'
      ? defaultValue
      : configValue
    : userValue;
}

/**
 * Assign the params into the content component instance.
 * @deprecated Should use dependency injection to get the params for user
 * @breaking-change 12.0.0
 */
export function setContentInstanceParams<T>(instance: T, params: Partial<T> | undefined): void {
  Object.assign(instance, params);
}

export function getConfigFromComponent(component: VtsModalComponent): ModalOptions {
  const {
    vtsCentered,
    vtsMask,
    vtsMaskClosable,
    vtsClosable,
    vtsOkLoading,
    vtsOkDisabled,
    vtsCancelDisabled,
    vtsCancelLoading,
    vtsKeyboard,
    vtsNoAnimation,
    vtsContent,
    vtsComponentParams,
    vtsFooter,
    vtsZIndex,
    vtsWidth,
    vtsWrapClassName,
    vtsClassName,
    vtsStyle,
    vtsTitle,
    vtsCloseIcon,
    vtsMaskStyle,
    vtsBodyStyle,
    vtsOkText,
    vtsCancelText,
    vtsOkType,
    vtsOkDanger,
    vtsIconType,
    vtsModalType,
    vtsOnOk,
    vtsOnCancel,
    vtsAfterOpen,
    vtsAfterClose,
    vtsCloseOnNavigation,
    vtsAutofocus
  } = component;
  return {
    vtsCentered,
    vtsMask,
    vtsMaskClosable,
    vtsClosable,
    vtsOkLoading,
    vtsOkDisabled,
    vtsCancelDisabled,
    vtsCancelLoading,
    vtsKeyboard,
    vtsNoAnimation,
    vtsContent,
    vtsComponentParams,
    vtsFooter,
    vtsZIndex,
    vtsWidth,
    vtsWrapClassName,
    vtsClassName,
    vtsStyle,
    vtsTitle,
    vtsCloseIcon,
    vtsMaskStyle,
    vtsBodyStyle,
    vtsOkText,
    vtsCancelText,
    vtsOkType,
    vtsOkDanger,
    vtsIconType,
    vtsModalType,
    vtsOnOk,
    vtsOnCancel,
    vtsAfterOpen,
    vtsAfterClose,
    vtsCloseOnNavigation,
    vtsAutofocus
  };
}
