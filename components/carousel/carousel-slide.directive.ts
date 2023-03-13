import { Directive, Input, TemplateRef } from '@angular/core';
import { coerceBooleanProperty } from './lib/utils/utils';
@Directive({
  selector: 'ng-template[vtsCarouselSlide]'
})
export class VtsCarouselSlideDirective {
  @Input() virtualIndex: number = 0;
  @Input() class: string = '';
  @Input()
  set ngClass(val: string) {
    this.class = [this.class || '', val].join(' ');
  }
  @Input('data-carousel-autoplay') autoplayDelay: string | null = null;
  @Input()
  set zoom(val: boolean) {
    this._zoom = coerceBooleanProperty(val);
  }
  get zoom() {
    return this._zoom;
  }
  private _zoom: boolean = false;
  slideIndex: number = 1;
  get classNames() {
    return this._classNames;
  }
  set classNames(val) {
    if (this._classNames === val) {
      return;
    }
    this._classNames = val;
    this.slideData = {
      isActive: this._hasClass([
        'vts-carousel-slide-active',
        'vts-carousel-slide-duplicate-active'
      ]),
      isVisible: this._hasClass(['vts-carousel-slide-visible']),
      isDuplicate: this._hasClass(['vts-carousel-slide-duplicate']),
      isPrev: this._hasClass(['vts-carousel-slide-prev', 'vts-carousel-slide-duplicate-prev']),
      isNext: this._hasClass(['vts-carousel-slide-next', 'vts-carousel-slide-duplicate-next'])
    };
  }

  private _hasClass(classNames: string[]) {
    return classNames.some(className => this._classNames.indexOf(className) >= 0);
  }
  slideData = {
    isActive: false,
    isPrev: false,
    isNext: false,
    isVisible: false,
    isDuplicate: false
  };

  private _classNames: string = '';
  constructor(public template: TemplateRef<any>) {}
}
