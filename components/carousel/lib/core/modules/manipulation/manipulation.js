import appendSlide from './methods/appendSlide.js';
import prependSlide from './methods/prependSlide.js';
import addSlide from './methods/addSlide.js';
import removeSlide from './methods/removeSlide.js';
import removeAllSlides from './methods/removeAllSlides.js';

export default function Manipulation({ Carousel }) {
  Object.assign(Carousel, {
    appendSlide: appendSlide.bind(Carousel),
    prependSlide: prependSlide.bind(Carousel),
    addSlide: addSlide.bind(Carousel),
    removeSlide: removeSlide.bind(Carousel),
    removeAllSlides: removeAllSlides.bind(Carousel),
  });
}
