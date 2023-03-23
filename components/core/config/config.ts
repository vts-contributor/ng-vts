/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { InjectionToken, TemplateRef, Type } from '@angular/core';

import { SafeUrl } from '@angular/platform-browser';
import { VtsBreakpointEnum } from '@ui-vts/ng-vts/core/services';
import {
  VtsSafeAny,
  VtsShapeSCType,
  VtsSizeDSType,
  VtsSizeLDSType,
  VtsSizeMDSType,
  VtsTSType
} from '@ui-vts/ng-vts/core/types';

export interface VtsConfig {
  affix?: AffixConfig;
  select?: SelectConfig;
  alert?: AlertConfig;
  anchor?: AnchorConfig;
  avatar?: AvatarConfig;
  backTop?: BackTopConfig;
  badge?: BadgeConfig;
  button?: ButtonConfig;
  card?: CardConfig;
  cardLayout?: CardLayoutConfig;
  carousel?: CarouselConfig;
  cascader?: CascaderConfig;
  codeEditor?: CodeEditorConfig;
  accordion?: AccordionConfig;
  accordionPanel?: AccordionPanelConfig;
  datePicker?: DatePickerConfig;
  descriptions?: DescriptionsConfig;
  drawer?: DrawerConfig;
  empty?: EmptyConfig;
  form?: FormConfig;
  icon?: IconConfig;
  message?: MessageConfig;
  modal?: ModalConfig;
  pageHeader?: PageHeaderConfig;
  pagination?: PaginationConfig;
  progress?: ProgressConfig;
  rate?: RateConfig;
  space?: SpaceConfig;
  spin?: SpinConfig;
  switch?: SwitchConfig;
  table?: TableConfig;
  tabs?: TabsConfig;
  timePicker?: TimePickerConfig;
  toast?: ToastConfig;
  tree?: TreeConfig;
  treeSelect?: TreeSelectConfig;
  typography?: TypographyConfig;
  image?: ImageConfig;
  popconfirm?: PopConfirmConfig;
  popover?: PopoverConfig;
}

export interface SelectConfig {
  vtsBorderless?: boolean;
  vtsSuffixIcon?: TemplateRef<VtsSafeAny> | string | null;
  vtsBackdrop?: boolean;
}

export interface AffixConfig {
  vtsOffsetBottom?: number;
  vtsOffsetTop?: number;
}

export interface AlertConfig {
  vtsCloseable?: boolean;
  vtsShowIcon?: boolean;
}

export interface AvatarConfig {
  vtsShape?: VtsShapeSCType;
  vtsSize?: VtsSizeLDSType | number;
  vtsGap?: number;
}

export interface AnchorConfig {
  vtsBounds?: number;
  vtsOffsetBottom?: number;
  vtsOffsetTop?: number;
  vtsShowInkInFixed?: boolean;
}

export interface BackTopConfig {
  vtsVisibilityHeight?: number;
}

export interface BadgeConfig {
  vtsColor?: number;
  vtsOverflowCount?: number;
  vtsShowZero?: number;
}

export interface ButtonConfig {
  vtsSize?: 'large' | 'default' | 'small';
}

export interface CodeEditorConfig {
  assetsRoot?: string | SafeUrl;
  defaultEditorOption?: VtsSafeAny;
  useStaticLoading?: boolean;

  onLoad?(): void;

  onFirstEditorInit?(): void;

  onInit?(): void;
}

export interface CardConfig {
  vtsSize?: VtsSizeDSType;
  vtsHoverable?: boolean;
  vtsBordered?: boolean;
  vtsBorderless?: boolean;
}

export interface CardLayoutConfig {
  vtsCardLayout?: 'basic' | 'cover';
  vtsAlign?: 'left' | 'center' | 'right';
}

export interface CarouselConfig {
  vtsAutoPlay?: boolean;
  vtsAutoPlaySpeed?: boolean;
  vtsDots?: boolean;
  vtsEffect?: 'scrollx' | 'fade' | string;
  vtsEnableSwipe?: boolean;
  vtsVertical?: boolean;
  vtsNavigation?: boolean;
  vtsRtl?: boolean;
  vtsItems: number;
  vtsSlideMargin: number;
}

export interface CascaderConfig {
  vtsSize?: string;
  vtsBackdrop?: boolean;
}

export interface AccordionConfig {
  vtsAccordion?: boolean;
  vtsBordered?: boolean;
  vtsGhost?: boolean;
}

export interface AccordionPanelConfig {
  vtsShowArrow?: boolean;
}

export interface DatePickerConfig {
  vtsSeparator?: string;
  vtsSuffixIcon?: string | TemplateRef<VtsSafeAny>;
  vtsBackdrop?: boolean;
}

export interface DescriptionsConfig {
  vtsBordered?: boolean;
  vtsColumn?: { [key in VtsBreakpointEnum]?: number } | number;
  vtsSize?: 'default' | 'middle' | 'small';
  vtsColon?: boolean;
}

export interface DrawerConfig {
  vtsMask?: boolean;
  vtsMaskClosable?: boolean;
  vtsCloseOnNavigation?: boolean;
  vtsDirection?: Direction;
}

export interface EmptyConfig {
  vtsDefaultEmptyContent?: Type<VtsSafeAny> | TemplateRef<string> | string | undefined;
}

export interface FormConfig {
  vtsNoColon?: boolean;
  vtsAutoTips?: Record<string, Record<string, string>>;
  vtsTooltipIcon?: string;
}

export interface IconConfig {
  vtsTheme?: 'all';
  vtsTwotoneColor?: string;
}

export interface MessageConfig {
  vtsAnimate?: boolean;
  vtsDuration?: number;
  vtsMaxStack?: number;
  vtsPauseOnHover?: boolean;
  vtsTop?: number | string;
  vtsDirection?: Direction;
}

export interface ModalConfig {
  vtsMask?: boolean;
  vtsMaskClosable?: boolean;
  vtsCloseOnNavigation?: boolean;
  vtsDirection?: Direction;
}

export interface ToastConfig extends MessageConfig {
  vtsTop?: string | number;
  vtsBottom?: string | number;
  vtsPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

export interface PageHeaderConfig {
  vtsGhost: boolean;
}

export interface PaginationConfig {
  vtsSize?: 'default' | 'small';
  vtsPageSizeOptions?: number[];
  vtsShowSizeChanger?: boolean;
  vtsShowQuickJumper?: boolean;
  vtsSimple?: boolean;
}

export interface ProgressConfig {
  vtsGapDegree?: number;
  vtsGapPosition?: 'top' | 'right' | 'bottom' | 'left';
  vtsShowInfo?: boolean;
  vtsStrokeSwitch?: number;
  vtsStrokeWidth?: number;
  vtsSize?: 'default' | 'small';
  vtsStrokeLinecap?: 'round' | 'square';
  vtsStrokeColor?: string;
}

export interface RateConfig {
  vtsAllowClear?: boolean;
  vtsAllowHalf?: boolean;
}

export interface SpaceConfig {
  vtsSize?: 'small' | 'middle' | 'large' | number;
}

export interface SpinConfig {
  vtsIndicator?: TemplateRef<VtsSafeAny>;
}

export interface SwitchConfig {
  vtsSize: VtsSizeDSType;
}

export interface TableConfig {
  vtsBordered?: boolean;
  vtsSize?: VtsSizeMDSType;
  vtsShowQuickJumper?: boolean;
  vtsLoadingIndicator?: TemplateRef<VtsSafeAny>;
  vtsShowSizeChanger?: boolean;
  vtsSimple?: boolean;
  vtsHidePaginationOnSinglePage?: boolean;
}

export interface TabsConfig {
  vtsAnimated?:
    | boolean
    | {
        inkBar: boolean;
        tabPane: boolean;
      };
  vtsSize?: VtsSizeLDSType;
  vtsType?: 'line' | 'card';
  vtsTabBarGutter?: number;
  vtsShowPagination?: boolean;
}

export interface TimePickerConfig {
  vtsAllowEmpty?: boolean;
  vtsClearText?: string;
  vtsNowText?: string;
  vtsOkText?: string;
  vtsFormat?: string;
  vtsHourStep?: number;
  vtsMinuteStep?: number;
  vtsSecondStep?: number;
  vtsDropdownClassName?: string;
  vtsUse12Hours?: string;
  vtsSuffixIcon?: string | TemplateRef<VtsSafeAny>;
  vtsBackdrop?: boolean;
}

export interface TreeConfig {
  vtsBlockNode?: boolean;
  vtsShowIcon?: boolean;
  vtsHideUnMatched?: boolean;
}

export interface TreeSelectConfig {
  vtsShowIcon?: string;
  vtsShowLine?: boolean;
  vtsDropdownMatchSelectWidth?: boolean;
  vtsHideUnMatched?: boolean;
  vtsSize?: 'large' | 'small' | 'default';
  vtsBackdrop?: boolean;
}

export interface TypographyConfig {
  vtsEllipsisRows?: number;
  vtsCopyTooltips?: [VtsTSType, VtsTSType] | null;
  vtsCopyIcons: [VtsTSType, VtsTSType];
  vtsEditTooltip?: null | VtsTSType;
  vtsEditIcon: VtsTSType;
}

export interface ImageConfig {
  vtsFallback?: string;
  vtsPlaceholder?: string;
  vtsCloseOnNavigation?: boolean;
  vtsDirection?: Direction;
}

export interface PopConfirmConfig {
  vtsPopconfirmBackdrop?: boolean;
}

export interface PopoverConfig {
  vtsPopoverBackdrop?: boolean;
}

export type VtsConfigKey = keyof VtsConfig;

/**
 * User should provide an object implements this interface to set global configurations.
 */
export const VTS_CONFIG = new InjectionToken<VtsConfig>('vts-config');
