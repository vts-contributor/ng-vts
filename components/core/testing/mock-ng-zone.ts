/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { EventEmitter, Injectable, NgZone } from '@angular/core';

/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 * @docs-private
 */
@Injectable()
export class MockNgZone extends NgZone {
  // tslint:disable-next-line:no-any
  override onStable: EventEmitter<any> = new EventEmitter(false);

  constructor() {
    super({ enableLongStackTrace: false });
  }

  // tslint:disable-next-line:no-any ban-types
  override run(fn: Function): any {
    return fn();
  }

  // tslint:disable-next-line:ban-types no-any
  override runOutsideAngular(fn: Function): any {
    return fn();
  }

  simulateZoneExit(): void {
    this.onStable.emit(null);
  }
}
