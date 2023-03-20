import { camelCase } from '@ui-vts/ng-vts/core/util';
import Carousel from '../carousel';
import { paramsList } from './params-list';
import { extend, isObject } from './utils';
type KeyValueType = { [x: string]: any };

export const allowedParams = paramsList;
export const getKey = (key: string) => camelCase(key.replace(/^_/, '').replace(/^vts/, ''));

export function getParams(obj: any = {}) {
  const params: any = {
    on: {}
  };
  // const events = {};
  const passedParams: KeyValueType = {};
  extend(params, Carousel.defaults);
  extend(params, Carousel.extendedDefaults);
  params._emitClasses = true;
  params.init = false;

  const rest: KeyValueType = {};
  Object.keys(obj).forEach((key: string) => {
    if (allowedParams.indexOf(key) >= 0) {
      const _key = getKey(key);
      if (isObject(obj[key])) {
        params[_key] = {};
        passedParams[_key] = {};
        extend(params[_key], obj[key]);
        extend(passedParams[_key], obj[key]);
      } else {
        params[_key] = obj[key];
        passedParams[_key] = obj[key];
      }
    } else {
      rest[key] = obj[key];
    }
  });
  ['navigation', 'pagination', 'scrollbar'].forEach(key => {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });

  return { params, passedParams, rest };
}
