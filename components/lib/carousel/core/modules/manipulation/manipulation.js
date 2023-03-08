import appendSlide from './methods/appendSlide.js';
import prependSlide from './methods/prependSlide.js';
import addSlide from './methods/addSlide.js';
import removeSlide from './methods/removeSlide.js';
import removeAllSlides from './methods/removeAllSlides.js';

export default function Manipulation({ carousel }) {
  Object.assign(carousel, {
    appendSlide: appendSlide.bind(carousel),
    prependSlide: prependSlide.bind(carousel),
    addSlide: addSlide.bind(carousel),
    removeSlide: removeSlide.bind(carousel),
    removeAllSlides: removeAllSlides.bind(carousel),
  });
}
