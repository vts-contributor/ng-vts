//@ts-nocheck
import { getDocument } from 'ssr-window';

export default function createElementIfNotDefined(carousel, originalParams, params, checkProps) {
  const document = getDocument();
  if (carousel.params.createElements) {
    Object.keys(checkProps).forEach(key => {
      if (!params[key] && params.auto === true) {
        let element = carousel.$el.children(`.${checkProps[key]}`)[0];
        if (!element) {
          element = document.createElement('div');
          element.className = checkProps[key];
          carousel.$el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
