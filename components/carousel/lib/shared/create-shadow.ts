//@ts-nocheck
import $ from './dom';

export default function createShadow(params, $slideEl, side) {
  const shadowClass = `carousel-slide-shadow${side ? `-${side}` : ''}`;
  const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
  let $shadowEl = $shadowContainer.children(`.${shadowClass}`);

  if (!$shadowEl.length) {
    $shadowEl = $(`<div class="vts-carousel-slide-shadow${side ? `-${side}` : ''}"></div>`);
    $shadowContainer.append($shadowEl);
  }
  return $shadowEl;
}
