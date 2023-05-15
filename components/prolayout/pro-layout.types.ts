/**
 * Export types using for pro-layout
 */

import { TemplateRef } from '@angular/core';
import { VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';

export type VtsMenuItemProLayout = {
  title: string;
  children?: VtsMenuItemProLayout[];
  isOpen?: boolean;
  isSelected?: boolean;
  icon?: string;
  id?: string | number;
  url?: string;
};

export type VtsThemeColorType = {
  value: string;
  isChecked: boolean;
};

export type VtsAvatarUser = {
  name?: string;
  subname?: string;
  imgUrl?: string;
  size: VtsSizeXLMSType;
};

export type VtsAvatarMenu = {
  url: string;
  label: string;
};

export type VtsNotificationConfig = {
  type: VtsNotiPaneType;
  overflowCount: number;
};

export type VtsNotiPaneType = 'drawer' | 'menuContext';

export type VtsBlockUIConfig = {
  /**
   * decide if this feature is enabled or disabled
   */
  isEnabled: boolean;
  modalRef?: TemplateRef<void> | null;
  modalLockTitle?: string;
  modalUnlockTitle?: string;
  cancelText?: string;
  locktext?: string;
  unlockText?: string;
};
