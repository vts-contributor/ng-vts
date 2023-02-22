import { getDocument } from 'ssr-window';

export default function createElementIfNotDefined(Carousel, originalParams, params, checkProps) {
  const document = getDocument();
  if (Carousel.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = Carousel.$el.children(`.${checkProps[key]}`)[0];
        if (!element) {
          element = document.createElement('div');
          element.className = checkProps[key];
          Carousel.$el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
