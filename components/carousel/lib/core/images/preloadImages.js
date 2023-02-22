export default function preloadImages() {
  const Carousel = this;
  Carousel.imagesToLoad = Carousel.$el.find('img');
  function onReady() {
    if (typeof Carousel === 'undefined' || Carousel === null || !Carousel || Carousel.destroyed) return;
    if (Carousel.imagesLoaded !== undefined) Carousel.imagesLoaded += 1;
    if (Carousel.imagesLoaded === Carousel.imagesToLoad.length) {
      if (Carousel.params.updateOnImagesReady) Carousel.update();
      Carousel.emit('imagesReady');
    }
  }
  for (let i = 0; i < Carousel.imagesToLoad.length; i += 1) {
    const imageEl = Carousel.imagesToLoad[i];
    Carousel.loadImage(
      imageEl,
      imageEl.currentSrc || imageEl.getAttribute('src'),
      imageEl.srcset || imageEl.getAttribute('srcset'),
      imageEl.sizes || imageEl.getAttribute('sizes'),
      true,
      onReady,
    );
  }
}
