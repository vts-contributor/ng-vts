/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

import { NgClassInterface, NgStyleInterface } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';

export type VtsToastPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface VtsToastDataOptions<T = {}> {
  vtsKey?: string;
  vtsStyle?: NgStyleInterface;
  vtsClass?: NgClassInterface | string;
  vtsCloseIcon?: TemplateRef<void> | string;
  vtsPlacement?: VtsToastPlacement;
  vtsData?: T;
  vtsDuration?: number;
  vtsAnimate?: boolean;
  vtsPauseOnHover?: boolean;
}

export interface VtsToastData {
  content?: string | TemplateRef<void>;
  createdAt?: Date;
  messageId?: string;
  options?: VtsToastDataOptions;
  state?: 'enter' | 'leave';
  template?: TemplateRef<{}>;
  title?: string;
  type?: 'success' | 'info' | 'warning' | 'error' | 'blank' | string;
  showIcon?: boolean;
  form?: boolean;
  // observables exposed to users
  onClose?: Subject<boolean>;
  onClick?: Subject<MouseEvent>;
}

export type VtsToastRef = Pick<
  Required<VtsToastData>,
  'onClose' | 'onClick' | 'messageId'
>;
