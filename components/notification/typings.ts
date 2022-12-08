/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

import { NgClassInterface, NgStyleInterface } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';

export type VtsNotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface VtsNotificationDataOptions<T = {}> {
  vtsKey?: string;
  vtsStyle?: NgStyleInterface;
  vtsClass?: NgClassInterface | string;
  vtsCloseIcon?: TemplateRef<void> | string;
  vtsPlacement?: VtsNotificationPlacement;
  vtsData?: T;
  vtsDuration?: number;
  vtsAnimate?: boolean;
  vtsPauseOnHover?: boolean;
}

export interface VtsNotificationData {
  content?: string | TemplateRef<void>;
  createdAt?: Date;
  messageId?: string;
  options?: VtsNotificationDataOptions;
  state?: 'enter' | 'leave';
  template?: TemplateRef<{}>;
  title?: string;
  type?: 'success' | 'info' | 'warning' | 'error' | 'blank' | string;

  // observables exposed to users
  onClose?: Subject<boolean>;
  onClick?: Subject<MouseEvent>;
}

export type VtsNotificationRef = Pick<
  Required<VtsNotificationData>,
  'onClose' | 'onClick' | 'messageId'
>;
