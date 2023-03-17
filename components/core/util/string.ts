/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { words } from './word';

/**
 * Much like lodash.
 */
export function padStart(toPad: string, length: number, element: string): string {
  if (toPad.length > length) {
    return toPad;
  }

  const joined = `${getRepeatedElement(length, element)}${toPad}`;
  return joined.slice(joined.length - length, joined.length);
}

export function padEnd(toPad: string, length: number, element: string): string {
  const joined = `${toPad}${getRepeatedElement(length, element)}`;
  return joined.slice(0, length);
}

export function getRepeatedElement(length: number, element: string): string {
  return Array(length).fill(element).join('');
}

export function isNullOrEmpty(value?: string | null) {
  return !value;
}

export function defaultValue(value?: string | null, defaultValue: string = '') {
  return isNullOrEmpty(value) ? defaultValue : value!;
}

export function upperFirst(value?: string | null) {
  const val = defaultValue(value);
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function camelCase(value?: string | null) {
  const arr = words(defaultValue(value).replace(/['\u2019]/g, '')) as string[];
  return arr.reduce((result, word, index) => {
    word = word.toLowerCase();
    return result + (index ? upperFirst(word) : word);
  }, '');
}

export function capitalize(value?: string | null) {
  const arr = words(defaultValue(value).replace(/['\u2019]/g, '')) as string[];
  return arr.reduce(
    (result, word, index) =>
      result + (index ? ' ' : '') + (index ? word : upperFirst(word.toLowerCase())),
    ''
  );
}
