/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

// tslint:disable: typedef no-invalid-this
const availablePrefixes = ['moz', 'ms', 'webkit'];

function requestAnimationFramePolyfill(): typeof requestAnimationFrame {
  let lastTime = 0;
  return function (callback: FrameRequestCallback): number {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall) as any as number;
    lastTime = currTime + timeToCall;
    return id;
  };
}

function getRequestAnimationFrame(): typeof requestAnimationFrame {
  if (typeof window === 'undefined') {
    return () => 0;
  }
  if (window.requestAnimationFrame) {
    // https://github.com/vuejs/vue/issues/4465
    return window.requestAnimationFrame.bind(window);
  }

  const prefix = availablePrefixes.filter(key => `${key}RequestAnimationFrame` in window)[0];

  return prefix
    ? (window as VtsSafeAny)[`${prefix}RequestAnimationFrame`]
    : requestAnimationFramePolyfill();
}
export function cancelRequestAnimationFrame(id: number): VtsSafeAny {
  if (typeof window === 'undefined') {
    return null;
  }
  if (window.cancelAnimationFrame) {
    return window.cancelAnimationFrame(id);
  }
  const prefix = availablePrefixes.filter(
    key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window
  )[0];

  return prefix
    ? (
        (window as VtsSafeAny)[`${prefix}CancelAnimationFrame`] ||
        (window as VtsSafeAny)[`${prefix}CancelRequestAnimationFrame`]
      )
        // @ts-ignore
        .call(this, id)
    : clearTimeout(id);
}

export const reqAnimFrame = getRequestAnimationFrame();
