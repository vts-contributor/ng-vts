/**
 * Export types using for pro-layout
 */

import { VtsSizeLDSType } from '@ui-vts/ng-vts/core/types';

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
  size: VtsSizeLDSType;
};

export type VtsAvatarMenu = {
  url: string;
  label: string;
};
