export default function updateSlidesOffset() {
  const Carousel = this;
  const slides = Carousel.slides;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].CarouselSlideOffset = Carousel.isHorizontal()
      ? slides[i].offsetLeft
      : slides[i].offsetTop;
  }
}
