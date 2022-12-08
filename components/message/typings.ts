/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

export type VtsMessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

export interface VtsMessageDataOptions {
  vtsDuration?: number;
  vtsAnimate?: boolean;
  vtsPauseOnHover?: boolean;
}

export interface VtsMessageData {
  type?: VtsMessageType | string;
  content?: string | TemplateRef<void>;
  messageId?: string;
  createdAt?: Date;
  options?: VtsMessageDataOptions;
  state?: 'enter' | 'leave';

  onClose?: Subject<boolean>;
}

export type VtsMessageRef = Pick<Required<VtsMessageData>, 'onClose' | 'messageId'>;
