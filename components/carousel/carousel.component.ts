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
  ContentChild
} from '@angular/core';
import Carousel from './lib/carousel';
import { Observable, of, Subject } from 'rxjs';
import { getParams } from './lib/utils/get-params';
import { VtsCarouselSlideDirective } from './carousel-slide.directive';
import { EventsParams } from './carousel-events';
import {
  extend,
  isObject,
  setProperty,
  ignoreNgOnChanges,
  coerceBooleanProperty,
  isShowEl,
  isEnabled
} from './lib/utils/utils';
import {
  CarouselOptions as VtsCarouselOptions,
  CarouselEvents as VtsCarouselEvents,
  NavigationOptions as VtsCarouselNavigationOptions,
  PaginationOptions as VtsCarouselPaginationOptions,
  ScrollbarOptions as VtsCarouselScrollbarOptions,
  VirtualOptions as VtsCarouselVirtualOptions,
  ControllerOptions as VtsCarouselControllerOptions,
  ThumbsOptions as VtsCarouselThumbsOptions,
  AutoplayOptions as VtsCarouselAutoplayOptions,
  ICarousel
} from './lib/types';
import { isPlatformBrowser } from '@angular/common';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { camelCase, upperFirst } from '@ui-vts/ng-vts/core/util';
import { EventMappers } from './lib/utils/events';
import { VtsCarouselPaginationComponent } from './carousel-pagination.component';
import { VtsDestroyService } from '@ui-vts/ng-vts/core/services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-carousel',
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'vtsCarousel',
  providers: [VtsDestroyService]
})
export class VtsCarouselComponent implements OnInit {
  // @Input() enabled?: boolean;
  // @Input() on?: "on";
  // @Input() touchEventsTarget: "touchEventsTarget";
  // @Input() initialSlide: "initialSlide";
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
  // @Input() freeMode: "freeMode";
  // @Input() autoHeight: "autoHeight";
  // @Input() setWrapperSize: "setWrapperSize";
  // @Input() virtualTranslate: "virtualTranslate";
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
  // @Input() loopedSlidesLimit: "loopedSlidesLimit";
  // @Input() loopFillGroupWithBlank: "loopFillGroupWithBlank";
  // @Input() loopPreventsSlide: "loopPreventsSlide";
  // @Input() rewind: "rewind";
  // @Input() swipeHandler: "swipeHandler";
  // @Input() noSwiping: "noSwiping";
  // @Input() noSwipingClass: "noSwipingClass";
  // @Input() noSwipingSelector: "noSwipingSelector";
  // @Input() passiveListeners: "passiveListeners";
  // @Input() containerModifierClass: "containerModifierClass";
  // @Input() slideBlankClass: "slideBlankClass";
  // @Input() slideActiveClass: "slideActiveClass";
  // @Input() slideDuplicateActiveClass: "slideDuplicateActiveClass";
  // @Input() slideVisibleClass: "slideVisibleClass";
  // @Input() slideNextClass: "slideNextClass";
  // @Input() slideDuplicateNextClass: "slideDuplicateNextClass";
  // @Input() slidePrevClass: "slidePrevClass";
  // @Input() slideDuplicatePrevClass: "slideDuplicatePrevClass";
  // @Input() runCallbacksOnInit: "runCallbacksOnInit";
  // @Input() observeParents: "observeParents";
  // @Input() observeSlideChildren: "observeSlideChildren";
  // @Input() a11y: "a11y";
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
  // @Input() zoom: "zoom";

  @Input() vtsInitialSlide?: number = 0;
  @Input() vtsDirection?: VtsCarouselOptions['direction'] = 'horizontal';
  @Input() vtsSpeed?: number;
  @Input() vtsEdgeSwipeDetection: boolean | string = '';
  @Input() vtsEdgeSwipeThreshold: number = 1;
  @Input() vtsBreakpoints?: VtsCarouselBreakpointOptions;
  @Input() vtsSpaceBetween?: number;
  @Input() vtsSlidesPerView?: number | 'auto';
  @Input() vtsLoop?: boolean;
  vtsLoopAdditionalSlides?: number;
  vtsLoopedSlides?: number | null;
  @Input() vtsAllowSlidePrev?: boolean;
  @Input() vtsAllowSlideNext?: boolean;
  @Input() vtsSlideClass?: string = 'vts-carousel-slide';
  @Input() vtsSlideDuplicateClass: string = 'slideDuplicateClass';
  @Input() vtsWrapperClass: string = 'vts-carousel-wrapper';
  @Input() vtsAutoplay?: VtsCarouselAutoplayOptions | boolean | '';
  @Input() vtsController?: VtsCarouselControllerOptions;
  @Input() vtsThumbs?: VtsCarouselThumbsOptions;
  @Input() vtsEffect?: VtsCarouselOptions['effect'] = 'slide';

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

    const newVal: typeof this._vtsNavigation = setProperty(val, {
      enabled: true,
      nextEl: currentNext || null,
      prevEl: currentPrev || null
    }) as VtsCarouselNavigationOptions;

    // Set default
    newVal.nextEl = newVal.nextEl || this._nextElRef?.nativeElement;
    newVal.prevEl = newVal.prevEl || this._prevElRef?.nativeElement;

    this._vtsNavigation = newVal;

    this.showNextNavigation = !(
      coerceBooleanProperty(val) !== true ||
      (this._vtsNavigation &&
        typeof this._vtsNavigation !== 'boolean' &&
        this._vtsNavigation.nextEl !== null &&
        this._vtsNavigation.nextEl !== this._nextElRef?.nativeElement &&
        (typeof this._vtsNavigation.nextEl === 'string' ||
          typeof this._vtsNavigation.nextEl === 'object'))
    );

    this.showPrevNavigation = !(
      coerceBooleanProperty(val) !== true ||
      (this._vtsNavigation &&
        typeof this._vtsNavigation !== 'boolean' &&
        this._vtsNavigation.prevEl !== null &&
        this._vtsNavigation.prevEl !== this._prevElRef?.nativeElement &&
        (typeof this._vtsNavigation.prevEl === 'string' ||
          typeof this._vtsNavigation.prevEl === 'object'))
    );
  }
  get vtsNavigation() {
    return this._vtsNavigation;
  }
  private _vtsNavigation: VtsCarouselNavigationOptions | boolean | '';
  showNextNavigation: boolean = true;
  showPrevNavigation: boolean = true;

  @Input()
  set vtsPagination(val) {
    const current = this._paginationElRef;
    this._vtsPagination = setProperty(val, {
      enabled: true,
      el: current || null,
      type: this._useCustomPagination ? 'custom' : 'bullets'
    });
    this.showPagination = isShowEl(val, this._vtsPagination, this._paginationElRef);
  }
  get vtsPagination() {
    return this._vtsPagination;
  }
  private _vtsPagination: VtsCarouselPaginationOptions | boolean | '';
  showPagination: boolean = true;

  @Input()
  set vtsScrollbar(val) {
    const current =
      typeof this._vtsScrollbar !== 'boolean' && this._vtsScrollbar !== ''
        ? this._vtsScrollbar?.el
        : null;
    this._vtsScrollbar = setProperty(val, {
      enabled: true,
      el: current || null
    });
    this.showScrollbar = isShowEl(val, this._vtsScrollbar, this._vtsScrollbarElRef);
  }
  get vtsScrollbar() {
    return this._vtsScrollbar;
  }
  private _vtsScrollbar: VtsCarouselScrollbarOptions | boolean | '';
  showScrollbar: boolean = true;

  @Input()
  set virtual(val) {
    this._vtsVirtual = setProperty(val, {
      enabled: true
    });
  }
  get virtual() {
    return this._vtsVirtual;
  }
  private _vtsVirtual: VtsCarouselVirtualOptions | boolean | '';

  @Input()
  set config(val: VtsCarouselOptions) {
    this.updateCarousel(val);
    const { params } = getParams(val);
    this.setSelfParams(params);
  }

  //#region Public

  @Output() vtsAfterInit = new EventEmitter<EventsParams['afterInit']>();

  @Output() vtsAutoplayChange = new EventEmitter<EventsParams['autoplay']>();

  @Output() vtsAutoplayStart = new EventEmitter<EventsParams['autoplayStart']>();

  @Output() vtsAutoplayStop = new EventEmitter<EventsParams['autoplayStop']>();

  @Output() vtsAutoplayPause = new EventEmitter<EventsParams['autoplayPause']>();

  @Output() vtsAutoplayResume = new EventEmitter<EventsParams['autoplayResume']>();

  @Output() vtsBeforeDestroy = new EventEmitter<EventsParams['beforeDestroy']>();

  @Output() vtsBeforeInit = new EventEmitter<EventsParams['beforeInit']>();

  @Output() vtsBeforeLoopFix = new EventEmitter<EventsParams['beforeLoopFix']>();

  @Output() vtsBeforeResize = new EventEmitter<EventsParams['beforeResize']>();

  @Output() vtsBeforeSlideChangeStart = new EventEmitter<EventsParams['beforeSlideChangeStart']>();

  @Output() vtsBeforeTransitionStart = new EventEmitter<EventsParams['beforeTransitionStart']>();

  @Output() vtsBreakpoint = new EventEmitter<EventsParams['breakpoint']>();

  @Output() vtsChangeDirection = new EventEmitter<EventsParams['changeDirection']>();

  @Output() vtsClick = new EventEmitter<EventsParams['click']>();

  @Output() vtsDoubleTap = new EventEmitter<EventsParams['doubleTap']>();

  @Output() vtsDoubleClick = new EventEmitter<EventsParams['doubleClick']>();

  @Output() vtsDestroy = new EventEmitter<EventsParams['destroy']>();

  @Output() vtsFromEdge = new EventEmitter<EventsParams['fromEdge']>();

  @Output() vtsHashChange = new EventEmitter<EventsParams['hashChange']>();

  @Output() vtsHashSet = new EventEmitter<EventsParams['hashSet']>();

  @Output() vtsImagesReady = new EventEmitter<EventsParams['imagesReady']>();

  @Output() vtsInited = new EventEmitter<EventsParams['init']>();

  @Output() vtsKeyPress = new EventEmitter<EventsParams['keyPress']>();

  @Output() vtsLazyImageLoad = new EventEmitter<EventsParams['lazyImageLoad']>();

  @Output() vtsLazyImageReady = new EventEmitter<EventsParams['lazyImageReady']>();

  @Output() vtsLoopFix = new EventEmitter<EventsParams['loopFix']>();

  @Output() vtsMomentumBounce = new EventEmitter<EventsParams['momentumBounce']>();

  @Output() vtsNavigationHide = new EventEmitter<EventsParams['navigationHide']>();

  @Output() vtsNavigationShow = new EventEmitter<EventsParams['navigationShow']>();

  @Output() vtsNavigationPrev = new EventEmitter<EventsParams['navigationPrev']>();

  @Output() vtsNavigationNext = new EventEmitter<EventsParams['navigationNext']>();

  @Output() vtsObserverUpdate = new EventEmitter<EventsParams['observerUpdate']>();

  @Output() vtsOrientationchange = new EventEmitter<EventsParams['orientationchange']>();

  @Output() vtsPaginationHide = new EventEmitter<EventsParams['paginationHide']>();

  @Output() vtsPaginationRender = new EventEmitter<EventsParams['paginationRender']>();

  @Output() vtsPaginationShow = new EventEmitter<EventsParams['paginationShow']>();

  @Output() vtsPaginationUpdate = new EventEmitter<EventsParams['paginationUpdate']>();

  @Output() vtsProgress = new EventEmitter<EventsParams['progress']>();

  @Output() vtsReachBeginning = new EventEmitter<EventsParams['reachBeginning']>();

  @Output() vtsReachEnd = new EventEmitter<EventsParams['reachEnd']>();

  @Output() vtsResize = new EventEmitter<EventsParams['resize']>();

  @Output() vtsScroll = new EventEmitter<EventsParams['scroll']>();

  @Output() vtsScrollbarDragEnd = new EventEmitter<EventsParams['scrollbarDragEnd']>();

  @Output() vtsScrollbarDragMove = new EventEmitter<EventsParams['scrollbarDragMove']>();

  @Output() vtsScrollbarDragStart = new EventEmitter<EventsParams['scrollbarDragStart']>();

  @Output() vtsSetTransition = new EventEmitter<EventsParams['setTransition']>();

  @Output() vtsSetTranslate = new EventEmitter<EventsParams['setTranslate']>();

  @Output() vtsSlideChange = new EventEmitter<EventsParams['slideChange']>();

  @Output() vtsSlideChangeTransitionEnd = new EventEmitter<
    EventsParams['slideChangeTransitionEnd']
  >();

  @Output() vtsSlideChangeTransitionStart = new EventEmitter<
    EventsParams['slideChangeTransitionStart']
  >();

  @Output() vtsSlideNextTransitionEnd = new EventEmitter<EventsParams['slideNextTransitionEnd']>();

  @Output() vtsSlideNextTransitionStart = new EventEmitter<
    EventsParams['slideNextTransitionStart']
  >();

  @Output() vtsSlidePrevTransitionEnd = new EventEmitter<EventsParams['slidePrevTransitionEnd']>();

  @Output() vtsSlidePrevTransitionStart = new EventEmitter<
    EventsParams['slidePrevTransitionStart']
  >();

  @Output() vtsSlideResetTransitionStart = new EventEmitter<
    EventsParams['slideResetTransitionStart']
  >();

  @Output() vtsSlideResetTransitionEnd = new EventEmitter<
    EventsParams['slideResetTransitionEnd']
  >();

  @Output() vtsSliderMove = new EventEmitter<EventsParams['sliderMove']>();

  @Output() sliderFirstMove = new EventEmitter<EventsParams['sliderFirstMove']>();

  @Output() vtsSlidesGridLengthChange = new EventEmitter<EventsParams['slidesGridLengthChange']>();

  @Output() vtsSnapGridLengthChange = new EventEmitter<EventsParams['snapGridLengthChange']>();

  @Output() vtsSnapIndexChange = new EventEmitter<EventsParams['snapIndexChange']>();

  @Output() vtsTap = new EventEmitter<EventsParams['tap']>();

  @Output() vtsToEdge = new EventEmitter<EventsParams['toEdge']>();

  @Output() vtsTouchEnd = new EventEmitter<EventsParams['touchEnd']>();

  @Output() vtsTouchMove = new EventEmitter<EventsParams['touchMove']>();

  @Output() vtsTouchMoveOpposite = new EventEmitter<EventsParams['touchMoveOpposite']>();

  @Output() vtsTouchStart = new EventEmitter<EventsParams['touchStart']>();

  @Output() vtsTransitionEnd = new EventEmitter<EventsParams['transitionEnd']>();

  @Output() vtsTransitionStart = new EventEmitter<EventsParams['transitionStart']>();

  @Output() vtsUpdate = new EventEmitter<EventsParams['update']>();

  @Output() vtsZoomChange = new EventEmitter<EventsParams['zoomChange']>();

  @Output() vtsCarousel = new EventEmitter<any>();

  @Output() vtsLock = new EventEmitter<EventsParams['lock']>();

  @Output() vtsUnlock = new EventEmitter<EventsParams['unlock']>();

  @Output() vtsActiveIndexChange = new EventEmitter<number>();

  @Output() vtsSlidesLengthChange = new EventEmitter<number>();

  // vtsActiveIndexChange emit real index instead of this
  // @Output() vtsRealIndexChange = new EventEmitter<number>();

  // Public properties

  //#endregion

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
    this._vtsScrollbarElRef = el;
    this._setElement(el, this.vtsScrollbar, 'vtsScrollbar');
  }
  _vtsScrollbarElRef!: ElementRef;

  // #region "Pagination"

  _paginationElRef!: ElementRef;
  _useCustomPagination: boolean = false;

  // Default pagination
  @ViewChild('vtsPaginationElRef', { static: false, read: ElementRef })
  set paginationElRef(el: ElementRef) {
    if (!this._paginationElRef) {
      this._paginationElRef = el;
      this._setElement(el, this.vtsPagination, 'vtsPagination');
    }
  }

  // Custom pagination
  @ContentChild(VtsCarouselPaginationComponent, { static: false })
  set customPaginationRef(custom: VtsCarouselPaginationComponent) {
    if (custom) {
      this._useCustomPagination = true;
      this._paginationElRef = custom.elementRef;
      this._setElement(custom.elementRef, this.vtsPagination, 'vtsPagination');
    }
  }

  //#endregion

  @ContentChildren(VtsCarouselSlideDirective, { descendants: false, emitDistinctChangesOnly: true })
  slidesEl!: QueryList<VtsCarouselSlideDirective>;
  private slides!: VtsCarouselSlideDirective[];

  prependSlides!: Observable<VtsCarouselSlideDirective[]>;
  appendSlides!: Observable<VtsCarouselSlideDirective[]>;

  carouselRef?: ICarousel;
  readonly _activeSlides = new Subject<VtsCarouselSlideDirective[]>();

  get activeSlides() {
    if (this.virtual) {
      return this._activeSlides;
    }
    return of(this.slides);
  }

  get zoomContainerClass() {
    return 'vts-carousel-zoom-container';
  }

  @HostBinding('class') containerClasses: string = 'vts-carousel';
  constructor(
    private _ngZone: NgZone,
    private elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private vtsDestroyService: VtsDestroyService
  ) {
    this._vtsPagination = false;
    this._vtsNavigation = false;
    this._vtsScrollbar = false;
    this._vtsVirtual = false;
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
    this.setSelfParams(params);
  }

  ngAfterViewInit() {
    this.childrenSlidesInit();
    this.initCarousel();
    this._changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.vtsCarousel.emit(this.carouselRef);
    });
  }

  private setSelfParams(params: any) {
    Object.keys(params).forEach(k => {
      const selfKey = `vts${upperFirst(k)}`;
      //@ts-ignore
      this[selfKey] = params[k];
    });
  }

  private childrenSlidesInit() {
    this.slidesChanges(this.slidesEl);
    this.slidesEl.changes.pipe(takeUntil(this.vtsDestroyService)).subscribe(this.slidesChanges);
  }

  private slidesChanges = (val: QueryList<VtsCarouselSlideDirective>) => {
    this.slides = val.map((slide: VtsCarouselSlideDirective, index: number) => {
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
    this._ngZone.runOutsideAngular(() => {
      this.carouselRef?.update();
    });
  };

  get isCarouselActive() {
    return this.carouselRef && !this.carouselRef.destroyed;
  }

  initCarousel() {
    // const { params: carouselParams, passedParams } = getParams(this);
    const { params: carouselParams } = getParams(this);
    this.setSelfParams(carouselParams);
    this._ngZone.runOutsideAngular(() => {
      carouselParams.init = false;
      if (!carouselParams.virtual) {
        carouselParams.observer = true;
      }

      carouselParams.onAny = (eventName: keyof VtsCarouselComponent, ...args: any[]) => {
        const emitter = this[
          ('vts' + upperFirst(eventName)) as keyof VtsCarouselComponent
        ] as EventEmitter<any>;
        if (emitter) {
          if (!(emitter instanceof EventEmitter)) return;
          if (Object.keys(EventMappers).includes(eventName)) {
            emitter.emit(EventMappers[eventName as keyof typeof EventMappers](args as any));
          } else emitter.emit([...args]);
        }
      };
      const _slideClasses: VtsCarouselEvents['_slideClasses'] = (_, updated) => {
        updated.forEach(({ slideEl, classNames }, index) => {
          const dataIndex = slideEl.getAttribute('data-carousel-slide-index');
          const slideIndex = dataIndex ? parseInt(dataIndex) : index;
          if (this.virtual) {
            const virtualSlide = this.slides.find(item => {
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
      const _containerClasses: VtsCarouselEvents['_containerClasses'] = (_, classes) => {
        setTimeout(() => {
          this.containerClasses = classes;
        });
      };
      Object.assign(carouselParams.on, {
        _containerClasses,
        _slideClasses
      });
      const carouselRef = new Carousel(carouselParams) as any as ICarousel;
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
          renderExternalUpdate: false
        };
        extend(carouselRef.params.virtual, extendWith);
        extend(carouselRef.originalParams.virtual, extendWith);
      }

      if (isPlatformBrowser(this._platformId)) {
        this.carouselRef = carouselRef.init(this.elementRef.nativeElement) as any as ICarousel;
        const isVirtualEnabled = isEnabled(this.carouselRef?.params.virtual!);
        if (this.carouselRef?.virtual && isVirtualEnabled) {
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
          [this.carouselRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`
        }
      : {
          top: `${virtualData.offset}px`
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
        thumbs
      } = this.carouselRef!;

      if (changedParams.vtsPagination) {
        if (
          this.vtsPagination &&
          typeof this.vtsPagination !== 'boolean' &&
          this.vtsPagination.el &&
          pagination &&
          !pagination.el
        ) {
          this.updateParameter('vtsPagination', this.vtsPagination);
          pagination.init();
          pagination.render();
          pagination.update();
        } else {
          pagination.destroy();
          // pagination.el = null;
        }
      }

      if (changedParams.vtsScrollbar) {
        if (
          this.vtsScrollbar &&
          typeof this.vtsScrollbar !== 'boolean' &&
          this.vtsScrollbar.el &&
          scrollbar &&
          !scrollbar.el
        ) {
          this.updateParameter('vtsScrollbar', this.vtsScrollbar);
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
          this.updateParameter('vtsNavigation', this.vtsNavigation);
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
        this.carouselRef!.controller.control = this.vtsController.control;
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
      const breakpoint = Carousel.prototype.getBreakpoint(this.vtsBreakpoints) as VtsSafeAny;
      const breakpointOnlyParams =
        breakpoint in this.vtsBreakpoints ? this.vtsBreakpoints[breakpoint] : undefined;
      if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
        vtsSlidesPerViewParams = breakpointOnlyParams.slidesPerView;
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
    const _key = camelCase(key.replace(/^_/, '').replace(/^vts/, '')) as keyof VtsCarouselOptions;
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

type OmitPaginationOptions = Omit<VtsCarouselPaginationOptions, 'el' | 'renderCustom'>;
type VtsCarouselBreakpointOptions = {
  [width: number]: VtsCarouselOptions;
  [ratio: string]: VtsCarouselOptions;
};

export {
  VtsCarouselOptions,
  VtsCarouselEvents,
  VtsCarouselNavigationOptions,
  OmitPaginationOptions as VtsCarouselPaginationOptions,
  VtsCarouselScrollbarOptions,
  VtsCarouselVirtualOptions,
  VtsCarouselControllerOptions,
  VtsCarouselThumbsOptions,
  VtsCarouselAutoplayOptions,
  VtsCarouselBreakpointOptions
};
