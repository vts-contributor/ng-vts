import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnInit,
  Output,
  PLATFORM_ID,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import Carousel from './lib/carousel';
import { Observable, of, Subject } from 'rxjs';
import { getParams } from './lib/utils/get-params';
import { CarouselSlideDirective } from './carousel-slide.directive';
import { EventsParams } from './carousel-events';
import { ThumbsOptions } from './lib/types/modules/thumbs';
import { ControllerOptions } from './lib/types/modules/controller';
import {
  extend,
  isObject,
  setProperty,
  ignoreNgOnChanges,
  coerceBooleanProperty,
  isShowEl,
  isEnabled,
} from './lib/utils/utils';
import {
  CarouselOptions,
  CarouselEvents,
  NavigationOptions,
  PaginationOptions,
  ScrollbarOptions,
  VirtualOptions,
} from './lib/types';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'vts-carousel',
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'vtsCarousel'
})
export class VtsCarouselComponent implements OnInit {
  //@Input() enabled?: boolean;
  // @Input() on?: "on";
  @Input() vtsDirection?: string = 'horizontal';
  //@Input() touchEventsTarget: "touchEventsTarget";
  //@Input() initialSlide: "initialSlide";
  @Input() vtsSpeed?: number;
  // @Input() cssMode: "cssMode";
  // @Input() updateOnWindowResize: "updateOnWindowResize";
  // @Input() resizeObserver: "resizeObserver";
  // @Input() nested: "nested";
  // @Input() focusableElements: "focusableElements";
  // @Input() width: "width";
  // @Input() height: "height";
  // @Input() preventInteractionOnTransition: "preventInteractionOnTransition";
  // @Input() userAgent: "userAgent";
  // @Input() url: "url";
  @Input() vtsEdgeSwipeDetection: boolean | string = '';
  @Input() vtsEdgeSwipeThreshold: number = 1;
  // @Input() freeMode: "freeMode";
  // @Input() autoHeight: "autoHeight";
  // @Input() setWrapperSize: "setWrapperSize";
  // @Input() virtualTranslate: "virtualTranslate";
  // @Input() effect: "effect";
  @Input() vtsBreakpoints?: {
    [width: number]: CarouselOptions;
    [ratio: string]: CarouselOptions;
  };
  @Input() vtsSpaceBetween?: number;
  @Input() vtsSlidesPerView?: number | "auto";
  // @Input() maxBackfaceHiddenSlides: "maxBackfaceHiddenSlides";
  // @Input() grid: "grid";
  // @Input() slidesPerGroup: "slidesPerGroup";
  // @Input() slidesPerGroupSkip: "slidesPerGroupSkip";
  // @Input() centeredSlides: "centeredSlides";
  // @Input() centeredSlidesBounds: "centeredSlidesBounds";
  // @Input() slidesOffsetBefore: "slidesOffsetBefore";
  // @Input() slidesOffsetAfter: "slidesOffsetAfter";
  // @Input() normalizeSlideIndex: "normalizeSlideIndex";
  // @Input() centerInsufficientSlides: "centerInsufficientSlides";
  // @Input() watchOverflow: "watchOverflow";
  // @Input() roundLengths: "roundLengths";
  // @Input() touchRatio: "touchRatio";
  // @Input() touchAngle: "touchAngle";
  // @Input() simulateTouch: "simulateTouch";
  // @Input() shortSwipes: "shortSwipes";
  // @Input() longSwipes: "longSwipes";
  // @Input() longSwipesRatio: "longSwipesRatio";
  // @Input() longSwipesMs: "longSwipesMs";
  // @Input() followFinger: "followFinger";
  // @Input() allowTouchMove: "allowTouchMove";
  // @Input() threshold: "threshold";
  // @Input() touchMoveStopPropagation: "touchMoveStopPropagation";
  // @Input() touchStartPreventDefault: "touchStartPreventDefault";
  // @Input() touchStartForcePreventDefault: "touchStartForcePreventDefault";
  // @Input() touchReleaseOnEdges: "touchReleaseOnEdges";
  // @Input() uniqueNavElements: "uniqueNavElements";
  // @Input() resistance: "resistance";
  // @Input() resistanceRatio: "resistanceRatio";
  // @Input() watchSlidesProgress: "watchSlidesProgress";
  // @Input() grabCursor: "grabCursor";
  // @Input() preventClicks: "preventClicks";
  // @Input() preventClicksPropagation: "preventClicksPropagation";
  // @Input() slideToClickedSlide: "slideToClickedSlide";
  // @Input() preloadImages: "preloadImages";
  // @Input() updateOnImagesReady: "updateOnImagesReady";
  @Input() vtsLoop?: boolean;
  @Input() vtsLoopAdditionalSlides?: number;
  @Input() vtsLoopedSlides?: number | null;
  // @Input() loopedSlidesLimit: "loopedSlidesLimit";
  // @Input() loopFillGroupWithBlank: "loopFillGroupWithBlank";
  // @Input() loopPreventsSlide: "loopPreventsSlide";
  // @Input() rewind: "rewind";
  @Input() vtsAllowSlidePrev?: boolean;
  @Input() vtsAllowSlideNext?: boolean;
  // @Input() swipeHandler: "swipeHandler";
  // @Input() noSwiping: "noSwiping";
  // @Input() noSwipingClass: "noSwipingClass";
  // @Input() noSwipingSelector: "noSwipingSelector";
  // @Input() passiveListeners: "passiveListeners";
  // @Input() containerModifierClass: "containerModifierClass";
  @Input() vtsSlideClass?: string;
  // @Input() slideBlankClass: "slideBlankClass";
  // @Input() slideActiveClass: "slideActiveClass";
  // @Input() slideDuplicateActiveClass: "slideDuplicateActiveClass";
  // @Input() slideVisibleClass: "slideVisibleClass";
  @Input() vtsSlideDuplicateClass: string = "slideDuplicateClass";
  // @Input() slideNextClass: "slideNextClass";
  // @Input() slideDuplicateNextClass: "slideDuplicateNextClass";
  // @Input() slidePrevClass: "slidePrevClass";
  // @Input() slideDuplicatePrevClass: "slideDuplicatePrevClass";
  @Input() vtsWrapperClass: string = 'carousel-wrapper';
  // @Input() runCallbacksOnInit: "runCallbacksOnInit";
  // @Input() observeParents: "observeParents";
  // @Input() observeSlideChildren: "observeSlideChildren";
  // @Input() a11y: "a11y";
  @Input() vtsAutoplay?: boolean;
  @Input() vtsController?: ControllerOptions;
  // @Input() coverflowEffect: "coverflowEffect";
  // @Input() cubeEffect: "cubeEffect";
  // @Input() fadeEffect: "fadeEffect";
  // @Input() flipEffect: "flipEffect";
  // @Input() creativeEffect: "creativeEffect";
  // @Input() cardsEffect: "cardsEffect";
  // @Input() hashNavigation: "hashNavigation";
  // @Input() history: "history";
  // @Input() keyboard: "keyboard";
  // @Input() lazy: "lazy";
  // @Input() mousewheel: "mousewheel";
  // @Input() parallax: "parallax";
  @Input() vtsThumbs?: ThumbsOptions;
  // @Input() zoom: "zoom";
  @Input() class: string = '';
  @Input() id: string = '';
  @Input()
  set vtsNavigation(val) {
    const currentNext =
      typeof this._vtsNavigation !== 'boolean' && this._vtsNavigation !== ''
        ? this._vtsNavigation?.nextEl
        : null;
    const currentPrev =
      typeof this._vtsNavigation !== 'boolean' && this._vtsNavigation !== ''
        ? this._vtsNavigation?.prevEl
        : null;
    this._vtsNavigation = setProperty(val, {
      nextEl: currentNext || null,
      prevEl: currentPrev || null,
    });
    this.showNavigation = !(
      coerceBooleanProperty(val) !== true ||
      (this._vtsNavigation &&
        typeof this._vtsNavigation !== 'boolean' &&
        this._vtsNavigation.prevEl !== this._prevElRef?.nativeElement &&
        (this._vtsNavigation.prevEl !== null || this._vtsNavigation.nextEl !== null) &&
        (typeof this._vtsNavigation.nextEl === 'string' ||
          typeof this._vtsNavigation.prevEl === 'string' ||
          typeof this._vtsNavigation.nextEl === 'object' ||
          typeof this._vtsNavigation.prevEl === 'object'))
    );
  }
  get vtsNavigation() {
    return this._vtsNavigation;
  }
  private _vtsNavigation: NavigationOptions | boolean | '';
  showNavigation: boolean = true;

  @Input()
  set vtsPagination(val) {
    const current =
      typeof this._vtsPagination !== 'boolean' && this._vtsPagination !== ''
        ? this._vtsPagination?.el
        : null;
    this._vtsPagination = setProperty(val, {
      el: current || null,
    });
    this.showPagination = isShowEl(val, this._vtsPagination, this._paginationElRef);
  }
  get vtsPagination() {
    return this._vtsPagination;
  }
  private _vtsPagination: PaginationOptions | boolean | '';
  showPagination: boolean = true;

  @Input()
  set scrollbar(val) {
    const current =
      typeof this._scrollbar !== 'boolean' && this._scrollbar !== '' ? this._scrollbar?.el : null;
    this._scrollbar = setProperty(val, {
      el: current || null,
    });
    this.showScrollbar = isShowEl(val, this._scrollbar, this._scrollbarElRef);
  }
  get scrollbar() {
    return this._scrollbar;
  }
  private _scrollbar: ScrollbarOptions | boolean | '';
  showScrollbar: boolean = true;

  @Input()
  set virtual(val) {
    this._virtual = setProperty(val);
  }
  get virtual() {
    return this._virtual;
  }
  private _virtual: VirtualOptions | boolean | '';

  @Input()
  set config(val: CarouselOptions) {
    this.updateCarousel(val);
    const { params } = getParams(val);
    Object.assign(this, params);
  }
  @Output('_vtsBeforeBreakpoint') s__beforeBreakpoint = new EventEmitter<
    EventsParams['_beforeBreakpoint']
  >();

  @Output('_vtsContainerClasses') s__containerClasses = new EventEmitter<
    EventsParams['_containerClasses']
  >();

  @Output('_vtsSlideClass') s__vtsSlideClass = new EventEmitter<EventsParams['_vtsSlideClass']>();

  @Output('_vtsCarousel') s__carousel = new EventEmitter<EventsParams['_carousel']>();

  @Output('vtsActiveIndexChange') s_activeIndexChange = new EventEmitter<
    EventsParams['activeIndexChange']
  >();

  @Output('vtsAfterInit') s_afterInit = new EventEmitter<EventsParams['afterInit']>();

  @Output('vtsAutoplay') s_autoplay = new EventEmitter<EventsParams['autoplay']>();

  @Output('vtsAutoplayStart') s_autoplayStart = new EventEmitter<EventsParams['autoplayStart']>();

  @Output('vtsAutoplayStop') s_autoplayStop = new EventEmitter<EventsParams['autoplayStop']>();

  @Output('vtsAutoplayPause') s_autoplayPause = new EventEmitter<EventsParams['autoplayPause']>();

  @Output('vtsAutoplayResume') s_autoplayResume = new EventEmitter<EventsParams['autoplayResume']>();

  @Output('vtsBeforeDestroy') s_beforeDestroy = new EventEmitter<EventsParams['beforeDestroy']>();

  @Output('vtsBeforeInit') s_beforeInit = new EventEmitter<EventsParams['beforeInit']>();

  @Output('vtsBeforeLoopFix') s_beforeLoopFix = new EventEmitter<EventsParams['beforeLoopFix']>();

  @Output('vtsBeforeResize') s_beforeResize = new EventEmitter<EventsParams['beforeResize']>();

  @Output('vtsBeforeSlideChangeStart') s_beforeSlideChangeStart = new EventEmitter<
    EventsParams['beforeSlideChangeStart']
  >();

  @Output('vtsBeforeTransitionStart') s_beforeTransitionStart = new EventEmitter<
    EventsParams['beforeTransitionStart']
  >();

  @Output('vtsBreakpoint') s_breakpoint = new EventEmitter<EventsParams['breakpoint']>();

  @Output('vtsChangeDirection') s_changeDirection = new EventEmitter<
    EventsParams['changeDirection']
  >();

  @Output('vtsClick') s_click = new EventEmitter<EventsParams['click']>();

  @Output('vtsDoubleTap') s_doubleTap = new EventEmitter<EventsParams['doubleTap']>();

  @Output('vtsDoubleClick') s_doubleClick = new EventEmitter<EventsParams['doubleClick']>();

  @Output('vtsDestroy') s_destroy = new EventEmitter<EventsParams['destroy']>();

  @Output('vtsFromEdge') s_fromEdge = new EventEmitter<EventsParams['fromEdge']>();

  @Output('vtsHashChange') s_hashChange = new EventEmitter<EventsParams['hashChange']>();

  @Output('vtsHashSet') s_hashSet = new EventEmitter<EventsParams['hashSet']>();

  @Output('vtsImagesReady') s_imagesReady = new EventEmitter<EventsParams['imagesReady']>();

  @Output('vtsInit') s_init = new EventEmitter<EventsParams['init']>();

  @Output('vtsKeyPress') s_keyPress = new EventEmitter<EventsParams['keyPress']>();

  @Output('vtsLazyImageLoad') s_lazyImageLoad = new EventEmitter<EventsParams['lazyImageLoad']>();

  @Output('vtsLazyImageReady') s_lazyImageReady = new EventEmitter<EventsParams['lazyImageReady']>();

  @Output('vtsLoopFix') s_loopFix = new EventEmitter<EventsParams['loopFix']>();

  @Output('vtsMomentumBounce') s_momentumBounce = new EventEmitter<EventsParams['momentumBounce']>();

  @Output('vtsNavigationHide') s_navigationHide = new EventEmitter<EventsParams['navigationHide']>();

  @Output('vtsNavigationShow') s_navigationShow = new EventEmitter<EventsParams['navigationShow']>();

  @Output('vtsNavigationPrev') s_navigationPrev = new EventEmitter<EventsParams['navigationPrev']>();

  @Output('vtsNavigationNext') s_navigationNext = new EventEmitter<EventsParams['navigationNext']>();

  @Output('vtsObserverUpdate') s_observerUpdate = new EventEmitter<EventsParams['observerUpdate']>();

  @Output('vtsOrientationchange') s_orientationchange = new EventEmitter<
    EventsParams['orientationchange']
  >();

  @Output('vtsPaginationHide') s_paginationHide = new EventEmitter<EventsParams['paginationHide']>();

  @Output('vtsPaginationRender') s_paginationRender = new EventEmitter<
    EventsParams['paginationRender']
  >();

  @Output('vtsPaginationShow') s_paginationShow = new EventEmitter<EventsParams['paginationShow']>();

  @Output('vtsPaginationUpdate') s_paginationUpdate = new EventEmitter<
    EventsParams['paginationUpdate']
  >();

  @Output('vtsProgress') s_progress = new EventEmitter<EventsParams['progress']>();

  @Output('vtsReachBeginning') s_reachBeginning = new EventEmitter<EventsParams['reachBeginning']>();

  @Output('vtsReachEnd') s_reachEnd = new EventEmitter<EventsParams['reachEnd']>();

  @Output('vtsRealIndexChange') s_realIndexChange = new EventEmitter<
    EventsParams['realIndexChange']
  >();

  @Output('vtsResize') s_resize = new EventEmitter<EventsParams['resize']>();

  @Output('vtsScroll') s_scroll = new EventEmitter<EventsParams['scroll']>();

  @Output('vtsScrollbarDragEnd') s_scrollbarDragEnd = new EventEmitter<
    EventsParams['scrollbarDragEnd']
  >();

  @Output('vtsScrollbarDragMove') s_scrollbarDragMove = new EventEmitter<
    EventsParams['scrollbarDragMove']
  >();

  @Output('vtsScrollbarDragStart') s_scrollbarDragStart = new EventEmitter<
    EventsParams['scrollbarDragStart']
  >();

  @Output('vtsSetTransition') s_setTransition = new EventEmitter<EventsParams['setTransition']>();

  @Output('vtsSetTranslate') s_setTranslate = new EventEmitter<EventsParams['setTranslate']>();

  @Output('vtsSlideChange') s_slideChange = new EventEmitter<EventsParams['slideChange']>();

  @Output('vtsSlideChangeTransitionEnd') s_slideChangeTransitionEnd = new EventEmitter<
    EventsParams['slideChangeTransitionEnd']
  >();

  @Output('vtsSlideChangeTransitionStart') s_slideChangeTransitionStart = new EventEmitter<
    EventsParams['slideChangeTransitionStart']
  >();

  @Output('vtsSlideNextTransitionEnd') s_slideNextTransitionEnd = new EventEmitter<
    EventsParams['slideNextTransitionEnd']
  >();

  @Output('vtsSlideNextTransitionStart') s_slideNextTransitionStart = new EventEmitter<
    EventsParams['slideNextTransitionStart']
  >();

  @Output('vtsSlidePrevTransitionEnd') s_slidePrevTransitionEnd = new EventEmitter<
    EventsParams['slidePrevTransitionEnd']
  >();

  @Output('vtsSlidePrevTransitionStart') s_slidePrevTransitionStart = new EventEmitter<
    EventsParams['slidePrevTransitionStart']
  >();

  @Output('vtsSlideResetTransitionStart') s_slideResetTransitionStart = new EventEmitter<
    EventsParams['slideResetTransitionStart']
  >();

  @Output('vtsSlideResetTransitionEnd') s_slideResetTransitionEnd = new EventEmitter<
    EventsParams['slideResetTransitionEnd']
  >();

  @Output('vtsSliderMove') s_sliderMove = new EventEmitter<EventsParams['sliderMove']>();

  @Output('sliderFirstMove') s_sliderFirstMove = new EventEmitter<
    EventsParams['sliderFirstMove']
  >();

  @Output('vtsSlidesLengthChange') s_slidesLengthChange = new EventEmitter<
    EventsParams['slidesLengthChange']
  >();

  @Output('vtsSlidesGridLengthChange') s_slidesGridLengthChange = new EventEmitter<
    EventsParams['slidesGridLengthChange']
  >();

  @Output('vtsSnapGridLengthChange') s_snapGridLengthChange = new EventEmitter<
    EventsParams['snapGridLengthChange']
  >();

  @Output('vtsSnapIndexChange') s_snapIndexChange = new EventEmitter<
    EventsParams['snapIndexChange']
  >();

  @Output('vtsTap') s_tap = new EventEmitter<EventsParams['tap']>();

  @Output('vtsToEdge') s_toEdge = new EventEmitter<EventsParams['toEdge']>();

  @Output('vtsTouchEnd') s_touchEnd = new EventEmitter<EventsParams['touchEnd']>();

  @Output('vtsTouchMove') s_touchMove = new EventEmitter<EventsParams['touchMove']>();

  @Output('vtsTouchMoveOpposite') s_touchMoveOpposite = new EventEmitter<
    EventsParams['touchMoveOpposite']
  >();

  @Output('vtsTouchStart') s_touchStart = new EventEmitter<EventsParams['touchStart']>();

  @Output('vtsTransitionEnd') s_transitionEnd = new EventEmitter<EventsParams['transitionEnd']>();

  @Output('vtsTransitionStart') s_transitionStart = new EventEmitter<
    EventsParams['transitionStart']
  >();

  @Output('vtsUpdate') s_update = new EventEmitter<EventsParams['update']>();

  @Output('vtsZoomChange') s_zoomChange = new EventEmitter<EventsParams['zoomChange']>();

  @Output('vtsCarousel') s_carousel = new EventEmitter<any>();

  @Output('vtsLock') s_lock = new EventEmitter<EventsParams['lock']>();

  @Output('vtsUnlock') s_unlock = new EventEmitter<EventsParams['unlock']>();

  @ViewChild('vtsPrevElRef', { static: false })
  set prevElRef(el: ElementRef) {
    this._prevElRef = el;
    this._setElement(el, this.vtsNavigation, 'vtsNavigation', 'prevEl');
  }
  _prevElRef!: ElementRef;
  @ViewChild('vtsNextElRef', { static: false })
  set nextElRef(el: ElementRef) {
    this._nextElRef = el;
    this._setElement(el, this.vtsNavigation, 'vtsNavigation', 'nextEl');
  }
  _nextElRef!: ElementRef;
  @ViewChild('vtsScrollbarElRef', { static: false })
  set scrollbarElRef(el: ElementRef) {
    this._scrollbarElRef = el;
    this._setElement(el, this.scrollbar, 'scrollbar');
  }
  _scrollbarElRef!: ElementRef;
  @ViewChild('vtsPaginationElRef', { static: false })
  set paginationElRef(el: ElementRef) {
    this._paginationElRef = el;
    this._setElement(el, this.vtsPagination, 'pagination');
  }
  _paginationElRef!: ElementRef;
  @ContentChildren(CarouselSlideDirective, { descendants: false, emitDistinctChangesOnly: true })
  slidesEl!: QueryList<CarouselSlideDirective>;
  private slides!: CarouselSlideDirective[];

  prependSlides!: Observable<CarouselSlideDirective[]>;
  appendSlides!: Observable<CarouselSlideDirective[]>;

  carouselRef?: Carousel;
  readonly _activeSlides = new Subject<CarouselSlideDirective[]>();

  get activeSlides() {
    if (this.virtual) {
      return this._activeSlides;
    }
    return of(this.slides);
  }

  get zoomContainerClass() {
    // return this.zoom && typeof this.zoom !== 'boolean'
    //   ? this.zoom.containerClass
    //   : 'carousel-zoom-container';
    return 'carousel-zoom-container';
  }

  @HostBinding('class') containerClasses: string = 'carousel';
  constructor(
    private _ngZone: NgZone,
    private elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) {
    this._vtsPagination = false;
    this._vtsNavigation = false;
    this._scrollbar = false;
    this._virtual = false;
  }

  private _setElement(el: ElementRef, ref: any, update: string, key = 'el') {
    if (!ref || !el) return;
    if (el.nativeElement) {
      if (ref[key] === el.nativeElement) {
        return;
      }
      ref[key] = el.nativeElement;
    }
    const updateObj: { [key: string]: boolean } = {};
    updateObj[update] = true;
    this.updateInitCarousel(updateObj);
  }
  ngOnInit(): void {
    const { params } = getParams(this);
    Object.assign(this, params);
  }
  ngAfterViewInit() {
    this.childrenSlidesInit();
    this.initCarousel();
    this._changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.s_carousel.emit(this.carouselRef);
    });
  }

  private childrenSlidesInit() {
    this.slidesChanges(this.slidesEl);
    this.slidesEl.changes.subscribe(this.slidesChanges);
  }

  private slidesChanges = (val: QueryList<CarouselSlideDirective>) => {
    this.slides = val.map((slide: CarouselSlideDirective, index: number) => {
      slide.slideIndex = index;
      slide.classNames = this.vtsSlideClass || '';
      return slide;
    });
    if (this.vtsLoop && !this.vtsLoopedSlides) {
      this.calcLoopedSlides();
    }
    if (!this.virtual) {
      if (this.vtsLoopedSlides) {
        this.prependSlides = of(this.slides.slice(this.slides.length - this.vtsLoopedSlides));
        this.appendSlides = of(this.slides.slice(0, this.vtsLoopedSlides));
      }
    } else if (this.carouselRef && this.carouselRef.hasOwnProperty('virtual')) {
      this._ngZone.runOutsideAngular(() => {
        this.carouselRef!.virtual.slides = this.slides;
        this.carouselRef!.virtual.update(true);
      });
    }
    this._changeDetectorRef.detectChanges();
  };

  get isCarouselActive() {
    return this.carouselRef && !this.carouselRef.destroyed;
  }

  initCarousel() {
    // const { params: carouselParams, passedParams } = getParams(this);
    const { params: carouselParams} = getParams(this);
    Object.assign(this, carouselParams);
    this._ngZone.runOutsideAngular(() => {
      carouselParams.init = false;
      if (!carouselParams.virtual) {
        carouselParams.observer = true;
      }

      carouselParams.onAny = (eventName: keyof VtsCarouselComponent, ...args: any[]) => {
        const emitter = this[('s_' + eventName) as keyof VtsCarouselComponent] as EventEmitter<any>;
        if (emitter) {
          emitter.emit([...args]);
        }
      };
      const _slideClasses: CarouselEvents['_slideClasses'] = (_, updated) => {
        updated.forEach(({ slideEl, classNames }, index) => {
          const dataIndex = slideEl.getAttribute('data-carousel-slide-index');
          const slideIndex = dataIndex ? parseInt(dataIndex) : index;
          if (this.virtual) {
            const virtualSlide = this.slides.find((item) => {
              return item.virtualIndex && item.virtualIndex === slideIndex;
            });
            if (virtualSlide) {
              virtualSlide.classNames = classNames;
              return;
            }
          }

          if (this.slides[slideIndex]) {
            this.slides[slideIndex].classNames = classNames;
          }
        });
        this._changeDetectorRef.detectChanges();
      };
      const _containerClasses: CarouselEvents['_containerClasses'] = (_, classes) => {
        setTimeout(() => {
          this.containerClasses = classes;
        });
      };
      Object.assign(carouselParams.on, {
        _containerClasses,
        _slideClasses,
      });
      const carouselRef = new Carousel(carouselParams);
      carouselRef.loopCreate = () => {};
      carouselRef.loopDestroy = () => {};
      if (carouselParams.vtsLoop) {
        carouselRef.vtsLoopedSlides = this.vtsLoopedSlides!;
      }
      const isVirtualEnabled = isEnabled(carouselRef.params.virtual!);
      if (carouselRef.virtual && isVirtualEnabled) {
        carouselRef.virtual.slides = this.slides;
        const extendWith = {
          cache: false,
          slides: this.slides,
          renderExternal: this.updateVirtualSlides,
          renderExternalUpdate: false,
        };
        extend(carouselRef.params.virtual, extendWith);
        extend(carouselRef.originalParams.virtual, extendWith);
      }

      if (isPlatformBrowser(this._platformId)) {
        this.carouselRef = carouselRef.init(this.elementRef.nativeElement);
        const isVirtualEnabled = isEnabled(this.carouselRef.params.virtual!);
        if (this.carouselRef.virtual && isVirtualEnabled) {
          this.carouselRef.virtual.update(true);
        }
        this._changeDetectorRef.detectChanges();
      }
    });
  }

  style: any = null;
  currentVirtualData: any; // TODO: type virtualData;
  private updateVirtualSlides = (virtualData: any) => {
    // TODO: type virtualData
    if (
      !this.carouselRef ||
      (this.currentVirtualData &&
        this.currentVirtualData.from === virtualData.from &&
        this.currentVirtualData.to === virtualData.to &&
        this.currentVirtualData.offset === virtualData.offset)
    ) {
      return;
    }
    this.style = this.carouselRef.isHorizontal()
      ? {
          [this.carouselRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
        }
      : {
          top: `${virtualData.offset}px`,
        };
    this.currentVirtualData = virtualData;
    this._activeSlides.next(virtualData.slides);
    this._ngZone.run(() => {
      this._changeDetectorRef.detectChanges();
    });
    this._ngZone.runOutsideAngular(() => {
      this.carouselRef!.updateSlides();
      this.carouselRef!.updateProgress();
      this.carouselRef!.updateSlidesClasses();
      if (isEnabled(this.carouselRef!.params.lazy!)) {
        this.carouselRef!.lazy.load();
      }
      this.carouselRef!.virtual.update(true);
    });
    return;
  };

  ngOnChanges(changedParams: SimpleChanges) {
    this.updateCarousel(changedParams);
    this._changeDetectorRef.detectChanges();
  }

  updateInitCarousel(changedParams: any) {
    if (!(changedParams && this.carouselRef && !this.carouselRef.destroyed)) {
      return;
    }

    this._ngZone.runOutsideAngular(() => {
      const {
        // params: currentParams,
        pagination,
        navigation,
        scrollbar,
        // virtual,
        thumbs,
      } = this.carouselRef!;

      if (changedParams.pagination) {
        if (
          this.vtsPagination &&
          typeof this.vtsPagination !== 'boolean' &&
          this.vtsPagination.el &&
          pagination &&
          !pagination.el
        ) {
          this.updateParameter('pagination', this.vtsPagination);
          pagination.init();
          pagination.render();
          pagination.update();
        } else {
          pagination.destroy();
          // pagination.el = null;
        }
      }

      if (changedParams.scrollbar) {
        if (
          this.scrollbar &&
          typeof this.scrollbar !== 'boolean' &&
          this.scrollbar.el &&
          scrollbar &&
          !scrollbar.el
        ) {
          this.updateParameter('scrollbar', this.scrollbar);
          scrollbar.init();
          scrollbar.updateSize();
          scrollbar.setTranslate();
        } else {
          scrollbar.destroy();
          // scrollbar.el = null;
        }
      }

      if (changedParams.vtsNavigation) {
        if (
          this.vtsNavigation &&
          typeof this.vtsNavigation !== 'boolean' &&
          this.vtsNavigation.prevEl &&
          this.vtsNavigation.nextEl &&
          navigation &&
          !navigation.prevEl &&
          !navigation.nextEl
        ) {
          this.updateParameter('navigation', this.vtsNavigation);
          navigation.init();
          navigation.update();
        } else if (navigation.prevEl && navigation.nextEl) {
          navigation.destroy();
          // navigation.nextEl = null;
          // navigation.prevEl = null;
        }
      }
      if (changedParams.vtsThumbs && this.vtsThumbs && this.vtsThumbs.carousel) {
        this.updateParameter('vtsThumbs', this.vtsThumbs);
        const initialized = thumbs.init();
        if (initialized) thumbs.update(true);
      }

      if (changedParams.vtsController && this.vtsController && this.vtsController.control) {
        this.carouselRef!.vtsController.control = this.vtsController.control;
      }

      this.carouselRef!.update();
    });
  }

  updateCarousel(changedParams: SimpleChanges | any) {
    this._ngZone.runOutsideAngular(() => {
      if (changedParams.config) {
        return;
      }
      if (!(changedParams && this.carouselRef && !this.carouselRef.destroyed)) {
        return;
      }
      for (const key in changedParams) {
        if (ignoreNgOnChanges.indexOf(key) >= 0) {
          continue;
        }
        const newValue = changedParams[key]?.currentValue ?? changedParams[key];
        this.updateParameter(key, newValue);
      }

      if (changedParams.vtsAllowSlideNext) {
        this.carouselRef.vtsAllowSlideNext = this.vtsAllowSlideNext ? true : false;
      }
      if (changedParams.vtsAllowSlidePrev) {
        this.carouselRef.vtsAllowSlidePrev = this.vtsAllowSlidePrev ? true : false;
      }
      if (changedParams.vtsDirection) {
        this.carouselRef.changeDirection(this.vtsDirection, false);
      }
      if (changedParams.vtsBreakpoints) {
        if (this.vtsLoop && !this.vtsLoopedSlides) {
          this.calcLoopedSlides();
        }
        this.carouselRef.currentBreakpoint = null;
        this.carouselRef.setBreakpoint();
      }

      if (changedParams.vtsThumbs || changedParams.vtsController) {
        this.updateInitCarousel(changedParams);
      }
      this.carouselRef.update();
    });
  }

  calcLoopedSlides() {
    if (!this.vtsLoop) {
      return false;
    }
    let vtsSlidesPerViewParams = this.vtsSlidesPerView;
    if (this.vtsBreakpoints) {
      const breakpoint = Carousel.prototype.getBreakpoint(this.vtsBreakpoints);
      const breakpointOnlyParams =
        breakpoint in this.vtsBreakpoints ? this.vtsBreakpoints[breakpoint] : undefined;
      if (breakpointOnlyParams && breakpointOnlyParams.vtsSlidesPerView) {
        vtsSlidesPerViewParams = breakpointOnlyParams.vtsSlidesPerView;
      }
    }
    if (vtsSlidesPerViewParams === 'auto') {
      this.vtsLoopedSlides = this.slides.length;
      return this.slides.length;
    }
    let vtsLoopedSlides = this.vtsLoopedSlides || vtsSlidesPerViewParams;
    if (!vtsLoopedSlides) {
      // ?
      return false;
    }

    if (this.vtsLoopAdditionalSlides) {
      vtsLoopedSlides += this.vtsLoopAdditionalSlides;
    }
    if (vtsLoopedSlides > this.slides.length) {
      vtsLoopedSlides = this.slides.length;
    }
    this.vtsLoopedSlides = vtsLoopedSlides;
    return true;
  }

  updateParameter(key: string, value: any) {
    if (!(this.carouselRef && !this.carouselRef.destroyed)) {
      return;
    }
    const _key = key.replace(/^_/, '') as keyof CarouselOptions;
    const isCurrentParamObj = isObject(this.carouselRef.params[_key]);

    if (_key === 'enabled') {
      if (value === true) {
        this.carouselRef.enable();
      } else if (value === false) {
        this.carouselRef.disable();
      }
      return;
    }
    if (isCurrentParamObj && isObject(value)) {
      extend(this.carouselRef.params[_key], value);
    } else {
      (this.carouselRef.params[_key] as any) = value;
    }
  }

  ngOnDestroy() {
    this._ngZone.runOutsideAngular(() => {
      this.carouselRef?.destroy(true, false);
    });
  }
}
