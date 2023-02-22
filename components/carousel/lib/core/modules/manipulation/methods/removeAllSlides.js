export default function removeAllSlides() {
  const Carousel = this;

  const slidesIndexes = [];
  for (let i = 0; i < Carousel.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  Carousel.removeSlide(slidesIndexes);
}
