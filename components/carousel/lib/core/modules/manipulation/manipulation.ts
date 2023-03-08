//@ts-nocheck
import appendSlide from './methods/appendSlide';
import prependSlide from './methods/prependSlide';
import addSlide from './methods/addSlide';
import removeSlide from './methods/removeSlide';
import removeAllSlides from './methods/removeAllSlides';

export default function Manipulation({ carousel }) {
  Object.assign(carousel, {
    appendSlide: appendSlide.bind(carousel),
    prependSlide: prependSlide.bind(carousel),
    addSlide: addSlide.bind(carousel),
    removeSlide: removeSlide.bind(carousel),
    removeAllSlides: removeAllSlides.bind(carousel)
  });
}
