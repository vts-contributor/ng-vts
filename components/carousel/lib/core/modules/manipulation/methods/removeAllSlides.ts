//@ts-nocheck
export default function removeAllSlides() {
  const carousel = this;

  const slidesIndexes = [];
  for (let i = 0; i < carousel.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  carousel.removeSlide(slidesIndexes);
}
