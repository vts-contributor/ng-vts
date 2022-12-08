/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Observable } from 'rxjs';

export abstract class VtsModalLegacyAPI<T, R> {
  abstract afterOpen: Observable<void>;
  abstract afterClose: Observable<R>;

  abstract close(result?: R): void;
  abstract destroy(result?: R): void;

  /**
   * Trigger the vtsOnOk/vtsOnCancel by manual
   */
  abstract triggerOk(): void;
  abstract triggerCancel(): void;
  /**
   * Return the component instance of vtsContent when specify vtsContent as a Component
   */
  abstract getContentComponent(): T | void;

  /**
   * Get the dom element of this Modal
   */
  abstract getElement(): HTMLElement | void;
}
