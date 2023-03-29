//@ts-nocheck
export default function preloadImages() {
  const carousel = this;
  carousel.imagesToLoad = carousel.$el.find('img');
  function onReady() {
    if (typeof carousel === 'undefined' || carousel === null || !carousel || carousel.destroyed)
      return;
    if (carousel.imagesLoaded !== undefined) carousel.imagesLoaded += 1;
    if (carousel.imagesLoaded === carousel.imagesToLoad.length) {
      if (carousel.params.updateOnImagesReady) carousel.update();
      carousel.emit('imagesReady');
    }
  }
  for (let i = 0; i < carousel.imagesToLoad.length; i += 1) {
    const imageEl = carousel.imagesToLoad[i];
    carousel.loadImage(
      imageEl,
      imageEl.currentSrc || imageEl.getAttribute('src'),
      imageEl.srcset || imageEl.getAttribute('srcset'),
      imageEl.sizes || imageEl.getAttribute('sizes'),
      true,
      onReady
    );
  }
}
