import { ModalOptions } from './modal-types';

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

export function setContentInstanceParams<T>(instance: T, params: Partial<T> | undefined): void {
  Object.assign(instance, params);
}

export function getConfigFromComponent<T extends ModalOptions>(component: T): ModalOptions {
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
