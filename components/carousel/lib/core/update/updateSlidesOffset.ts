//@ts-nocheck
export default function updateSlidesOffset() {
  const carousel = this;
  const slides = carousel.slides;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].carouselSlideOffset = carousel.isHorizontal()
      ? slides[i].offsetLeft
      : slides[i].offsetTop;
  }
}
