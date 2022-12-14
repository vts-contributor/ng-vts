import { BidiModule, Dir } from '@angular/cdk/bidi';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent, dispatchMouseEvent } from '@ui-vts/ng-vts/core/testing';

import { VtsCarouselContentDirective } from './carousel-content.directive';
import { VtsCarouselComponent } from './carousel.component';
import { VtsCarouselModule } from './carousel.module';
import { VtsCarouselOpacityStrategy } from './strategies/opacity-strategy';
import { VTS_CAROUSEL_CUSTOM_STRATEGIES } from './typings';

describe('carousel', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsCarouselModule],
      declarations: [VtsTestCarouselBasicComponent, VtsTestCarouselRtlComponent]
    });
    TestBed.compileComponents();
  }));

  describe('carousel basic', () => {
    let fixture: ComponentFixture<VtsTestCarouselBasicComponent>;
    let testComponent: VtsTestCarouselBasicComponent;
    let carouselWrapper: DebugElement;
    let carouselContents: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestCarouselBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      carouselWrapper = fixture.debugElement.query(By.directive(VtsCarouselComponent));
      carouselContents = fixture.debugElement.queryAll(By.directive(VtsCarouselContentDirective));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.classList).toContain('vts-carousel');
      expect(
        carouselContents.every(content => content.nativeElement.classList.contains('slick-slide'))
      ).toBe(true);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    });

    it('should dynamic change content work', fakeAsync(() => {
      fixture.detectChanges();
      tick(3000);
      fixture.detectChanges();
      expect(carouselContents.length).toBe(4);
      testComponent.array = [];
      fixture.detectChanges();
      tick(3000);
      fixture.detectChanges();
      carouselContents = fixture.debugElement.queryAll(By.directive(VtsCarouselContentDirective));
      expect(carouselContents.length).toBe(0);
    }));

    it('should vtsDots work', () => {
      fixture.detectChanges();
      expect(testComponent.dots).toBe(true);
      expect(carouselWrapper.nativeElement.querySelector('.slick-dots').children.length).toBe(4);
      testComponent.dots = false;
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.querySelector('.slick-dots')).toBeNull();
    });

    it('should vtsDotRender work', () => {
      fixture.detectChanges();
      expect(testComponent.dots).toBe(true);
      expect(carouselWrapper.nativeElement.querySelector('.slick-dots').children.length).toBe(4);
      expect(
        carouselWrapper.nativeElement.querySelector('.slick-dots').firstElementChild.innerText
      ).toBe('1');
      expect(
        carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.innerText
      ).toBe('4');
      expect(
        carouselWrapper.nativeElement.querySelector('.slick-dots').firstElementChild
          .firstElementChild.tagName
      ).toBe('A');
    });

    it('should click content change', () => {
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      fixture.detectChanges();
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
    });

    it('should keydown change content work', fakeAsync(() => {
      fixture.detectChanges();
      const list = carouselWrapper.nativeElement.querySelector('.slick-list');

      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');

      dispatchKeyboardEvent(list, 'keydown', LEFT_ARROW);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', LEFT_ARROW);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[2].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', RIGHT_ARROW);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', RIGHT_ARROW);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    }));

    it('should vtsDotPosition work', () => {
      testComponent.dotPosition = 'left';
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.firstElementChild!.classList).toContain(
        'slick-vertical'
      );
    });

    it('should effect change work', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).toBe(
        'translate3d(0px, 0px, 0px)'
      );
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      tickMilliseconds(fixture, 700);
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).not.toBe(
        ''
      );

      testComponent.effect = 'fade';
      testComponent.dotPosition = 'left';
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      tickMilliseconds(fixture, 700);
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).toBe('');

      testComponent.effect = 'scrollx';
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      tickMilliseconds(fixture, 700);
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).not.toBe(
        'translate3d(0px, 0px, 0px)'
      );
    }));

    it('should autoplay work', fakeAsync(() => {
      testComponent.autoPlay = true;
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      fixture.detectChanges();
      tick(5000);
      fixture.detectChanges();
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      fixture.detectChanges();
      tick(5000);
      fixture.detectChanges();
      testComponent.autoPlay = false;
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    }));

    it('should autoplay speed work', fakeAsync(() => {
      testComponent.autoPlay = true;
      testComponent.autoPlaySpeed = 1000;
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      fixture.detectChanges();
      tick(1000 + 10);
      fixture.detectChanges();
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
      testComponent.autoPlaySpeed = 0;
      fixture.detectChanges();
      tick(2000 + 10);
      fixture.detectChanges();
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
    }));

    it('should func work', fakeAsync(() => {
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      testComponent.vtsCarouselComponent.next();
      tickMilliseconds(fixture, 700);
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
      testComponent.vtsCarouselComponent.pre();
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      testComponent.vtsCarouselComponent.goTo(2);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[2].nativeElement.classList).toContain('slick-active');
    }));

    it('should resize content after window resized', fakeAsync(() => {
      const resizeSpy = spyOn(testComponent.vtsCarouselComponent.strategy!, 'withCarouselContents');
      window.dispatchEvent(new Event('resize'));
      tick(16);
      expect(resizeSpy).toHaveBeenCalledTimes(1);
    }));

    // TODO(wendellhu95): no idea why this stops working with auditTime
    it('should support swiping to switch', fakeAsync(() => {
      swipe(testComponent.vtsCarouselComponent, 500);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).not.toContain('slick-active');
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');

      swipe(testComponent.vtsCarouselComponent, -500);
      tickMilliseconds(fixture, 700);
      swipe(testComponent.vtsCarouselComponent, -500);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).not.toContain('slick-active');
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
    }));

    it('should prevent swipes that are not long enough', fakeAsync(() => {
      swipe(testComponent.vtsCarouselComponent, 57);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    }));

    it('should disable dragging during transitioning', fakeAsync(() => {
      tickMilliseconds(fixture, 700);
      testComponent.vtsCarouselComponent.goTo(1);
      swipe(testComponent.vtsCarouselComponent, 500);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
    }));
  });

  describe('strategies', () => {
    let fixture: ComponentFixture<VtsTestCarouselBasicComponent>;
    let testComponent: VtsTestCarouselBasicComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestCarouselBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
    });

    describe('transform strategy', () => {
      it('horizontal transform', fakeAsync(() => {
        expect(testComponent.vtsCarouselComponent.slickTrackEl.style.transform).toBe(
          `translate3d(0px, 0px, 0px)`
        );

        testComponent.vtsCarouselComponent.next();
        tickMilliseconds(fixture, 700);
        expect(testComponent.vtsCarouselComponent.slickTrackEl.style.transform).not.toBe(
          `translate3d(0px, 0px, 0px)`
        );

        testComponent.vtsCarouselComponent.pre();
        tickMilliseconds(fixture, 700);
        expect(testComponent.vtsCarouselComponent.slickTrackEl.style.transform).toBe(
          `translate3d(0px, 0px, 0px)`
        );

        // From first to last.
        testComponent.vtsCarouselComponent.pre();
        tickMilliseconds(fixture, 700);
        expect(testComponent.vtsCarouselComponent.slickTrackEl.style.transform).not.toBe(
          `translate3d(0px, 0px, 0px)`
        );

        // From last to first.
        testComponent.vtsCarouselComponent.next();
        tickMilliseconds(fixture, 700);
        expect(testComponent.vtsCarouselComponent.slickTrackEl.style.transform).toBe(
          `translate3d(0px, 0px, 0px)`
        );
      }));

      it('vertical', fakeAsync(() => {
        testComponent.dotPosition = 'left';
        fixture.detectChanges();

        expect(testComponent.vtsCarouselComponent.slickTrackEl.style.transform).toBe(
          `translate3d(0px, 0px, 0px)`
        );

        testComponent.vtsCarouselComponent.next();
        tickMilliseconds(fixture, 700);
        expect(testComponent.vtsCarouselComponent.el.style.transform).not.toBe(
          `translate3d(0px, 0px, 0px)`
        );

        testComponent.vtsCarouselComponent.pre();
        tickMilliseconds(fixture, 700);
        expect(testComponent.vtsCarouselComponent.slickTrackEl.style.transform).toBe(
          `translate3d(0px, 0px, 0px)`
        );

        // From first to last.
        testComponent.vtsCarouselComponent.pre();
        tickMilliseconds(fixture, 700);
        expect(testComponent.vtsCarouselComponent.slickTrackEl.style.transform).not.toBe(
          `translate3d(0px, 0px, 0px)`
        );

        // From last to first.
        testComponent.vtsCarouselComponent.next();
        tickMilliseconds(fixture, 700);
        expect(testComponent.vtsCarouselComponent.slickTrackEl.style.transform).toBe(
          `translate3d(0px, 0px, 0px)`
        );
      }));
    });

    // Already covered in components specs.
    // describe('opacity strategy', () => {});
  });
});

describe('carousel custom strategies', () => {
  let fixture: ComponentFixture<VtsTestCarouselBasicComponent>;
  let testComponent: VtsTestCarouselBasicComponent;
  let carouselWrapper: DebugElement;
  let carouselContents: DebugElement[];

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsCarouselModule],
      declarations: [VtsTestCarouselBasicComponent],
      providers: [
        {
          provide: VTS_CAROUSEL_CUSTOM_STRATEGIES,
          useValue: [
            {
              name: 'fade',
              strategy: VtsCarouselOpacityStrategy
            }
          ]
        }
      ]
    });
  }));

  it('could use custom strategies', fakeAsync(() => {
    fixture = TestBed.createComponent(VtsTestCarouselBasicComponent);
    fixture.detectChanges();
    testComponent = fixture.debugElement.componentInstance;
    carouselWrapper = fixture.debugElement.query(By.directive(VtsCarouselComponent));
    carouselContents = fixture.debugElement.queryAll(By.directive(VtsCarouselContentDirective));

    // The custom provided strategy should also do the work.
    testComponent.effect = 'fade';
    fixture.detectChanges();
    expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
    tickMilliseconds(fixture, 700);
    expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).toBe('');
  }));
});

function tickMilliseconds<T>(fixture: ComponentFixture<T>, seconds: number = 1): void {
  fixture.detectChanges();
  tick(seconds);
  fixture.detectChanges();
}

/*
 * Swipe a carousel.
 *
 * @param carousel: Carousel component.
 * @param Distance: Positive to right. Negative to left.
 */
function swipe(carousel: VtsCarouselComponent, distance: number): void {
  carousel.pointerDown(
    new MouseEvent('mousedown', {
      clientX: 500,
      clientY: 0
    })
  );

  dispatchMouseEvent(document, 'mousemove', 500 - distance, 0);
  dispatchMouseEvent(document, 'mouseup');
}

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-carousel',
  template: `
    <vts-carousel
      [vtsEffect]="effect"
      [vtsDots]="dots"
      [vtsDotPosition]="dotPosition"
      [vtsDotRender]="dotRender"
      [vtsAutoPlay]="autoPlay"
      [vtsAutoPlaySpeed]="autoPlaySpeed"
      (vtsAfterChange)="afterChange($event)"
      (vtsBeforeChange)="beforeChange($event)"
    >
      <div vts-carousel-content *ngFor="let index of array">
        <h3>{{ index }}</h3>
      </div>
      <ng-template #dotRender let-index>
        <a>{{ index + 1 }}</a>
      </ng-template>
    </vts-carousel>
  `
})
export class VtsTestCarouselBasicComponent {
  @ViewChild(VtsCarouselComponent, { static: false })
  vtsCarouselComponent!: VtsCarouselComponent;
  dots = true;
  dotPosition = 'bottom';
  effect = 'scrollx';
  array = [1, 2, 3, 4];
  autoPlay = false;
  autoPlaySpeed = 3000;
  afterChange = jasmine.createSpy('afterChange callback');
  beforeChange = jasmine.createSpy('beforeChange callback');
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-carousel></vts-test-carousel>
    </div>
  `
})
export class VtsTestCarouselRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
