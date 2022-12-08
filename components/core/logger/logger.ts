/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { isDevMode } from '@angular/core';
import { environment } from '@ui-vts/ng-vts/core/environments';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

const record: Record<string, boolean> = {};

export const PREFIX = '[NG-ZORRO]:';

function notRecorded(...args: VtsSafeAny[]): boolean {
  const asRecord = args.reduce((acc, c) => acc + c.toString(), '');

  if (record[asRecord]) {
    return false;
  } else {
    record[asRecord] = true;
    return true;
  }
}

function consoleCommonBehavior(
  consoleFunc: (...args: VtsSafeAny) => void,
  ...args: VtsSafeAny[]
): void {
  if (environment.isTestMode || (isDevMode() && notRecorded(...args))) {
    consoleFunc(...args);
  }
}

// Warning should only be printed in dev mode and only once.
export const warn = (...args: VtsSafeAny[]) =>
  consoleCommonBehavior((...arg: VtsSafeAny[]) => console.warn(PREFIX, ...arg), ...args);

export const warnDeprecation = (...args: VtsSafeAny[]) => {
  if (!environment.isTestMode) {
    const stack = new Error().stack;
    return consoleCommonBehavior(
      (...arg: VtsSafeAny[]) => console.warn(PREFIX, 'deprecated:', ...arg, stack),
      ...args
    );
  } else {
    return () => {};
  }
};

// Log should only be printed in dev mode.
export const log = (...args: VtsSafeAny[]) => {
  if (isDevMode()) {
    console.log(PREFIX, ...args);
  }
};
