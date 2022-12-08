/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class VtsRadioService {
  selected$ = new ReplaySubject<VtsSafeAny>(1);
  touched$ = new Subject<void>();
  disabled$ = new ReplaySubject<boolean>(1);
  name$ = new ReplaySubject<string>(1);
  touch(): void {
    this.touched$.next();
  }
  select(value: VtsSafeAny): void {
    this.selected$.next(value);
  }
  setDisabled(value: boolean): void {
    this.disabled$.next(value);
  }
  setName(value: string): void {
    this.name$.next(value);
  }
}
