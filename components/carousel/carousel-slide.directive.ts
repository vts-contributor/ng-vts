import { Directive, Input, TemplateRef } from '@angular/core';
import { coerceBooleanProperty } from './lib/utils/utils';
@Directive({
  selector: 'ng-template[vts-carousel-slide]'
})
export class CarouselSlideDirective {
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
      isActive: this._hasClass(['carousel-slide-active', 'carousel-slide-duplicate-active']),
      isVisible: this._hasClass(['carousel-slide-visible']),
      isDuplicate: this._hasClass(['carousel-slide-duplicate']),
      isPrev: this._hasClass(['carousel-slide-prev', 'carousel-slide-duplicate-prev']),
      isNext: this._hasClass(['carousel-slide-next', 'carousel-slide-duplicate-next'])
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
