/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { VtsMentionTriggerDirective } from './mention-trigger';

@Injectable()
export class VtsMentionService implements OnDestroy {
  private trigger?: VtsMentionTriggerDirective;
  private triggerChange$ = new Subject<VtsMentionTriggerDirective>();

  triggerChanged(): Observable<VtsMentionTriggerDirective> {
    return this.triggerChange$.asObservable();
  }

  registerTrigger(trigger: VtsMentionTriggerDirective): void {
    if (this.trigger !== trigger) {
      this.trigger = trigger;
      this.triggerChange$.next(trigger);
    }
  }

  ngOnDestroy(): void {
    this.triggerChange$.complete();
  }
}
