import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent, dispatchTouchEvent, MockNgZone } from '@ui-vts/ng-vts/core/testing';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';

import { VtsDemoResizableBasicComponent } from './demo/basic';
import { VtsDemoResizableCustomizeComponent } from './demo/customize';
import { VtsDemoResizableGridComponent } from './demo/grid';
import { VtsDemoResizableLockAspectRatioComponent } from './demo/lock-aspect-ratio';
import { VtsDemoResizablePreviewComponent } from './demo/preview';

import { VtsResizableDirective } from './resizable.directive';
import { VtsResizableModule } from './resizable.module';
import { DEFAULT_RESIZE_DIRECTION } from './resize-handles.component';

describe('resizable', () => {
  let zone: MockNgZone;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsResizableModule, VtsIconTestModule, VtsGridModule],
      declarations: [
        VtsDemoResizableBasicComponent,
        VtsDemoResizableCustomizeComponent,
        VtsDemoResizableLockAspectRatioComponent,
        VtsDemoResizablePreviewComponent,
        VtsDemoResizableGridComponent,
        VtsTestResizableBoundsComponent
      ],
      providers: [
        {
          provide: NgZone,
          useFactory: () => {
            zone = new MockNgZone();
            return zone;
          }
        }
      ]
    }).compileComponents();
  }));

  describe('basic', () => {
    let fixture: ComponentFixture<VtsDemoResizableBasicComponent>;
    let testComponent: VtsDemoResizableBasicComponent;
    let resizableEle: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoResizableBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(VtsResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should render handles', () => {
      const handles = resizableEle.querySelectorAll('.vts-resizable-handle');
      expect(handles.length).toBe(8);
      handles.forEach(e => {
        expect(
          DEFAULT_RESIZE_DIRECTION.some(d => e.classList.contains(`vts-resizable-handle-${d}`))
        ).toBe(true);
      });
    });

    it('should add hover class when mouseenter', () => {
      dispatchMouseEvent(resizableEle, 'mouseenter');
      fixture.detectChanges();
      const handles = resizableEle.querySelectorAll('.vts-resizable-handle');
      expect(handles.length).toBe(8);
      handles.forEach(e => {
        expect(e.classList).toContain('vts-resizable-handle-box-hover');
      });
      dispatchMouseEvent(resizableEle, 'mouseleave');
      fixture.detectChanges();
      handles.forEach(e => {
        expect(e.classList).not.toContain('vts-resizable-handle-box-hover');
      });
    });

    it('should maximum size work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const handel = resizableEle.querySelector('.vts-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handel,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 500,
          y: rect.bottom + 200
        }
      );
      zone.simulateZoneExit();
      fixture.detectChanges();
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.width).toBe(600);
      expect(testComponent.height).toBe(200);
    }));

    it('should minimum size work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const handel = resizableEle.querySelector('.vts-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handel,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right - 600,
          y: rect.bottom - 200
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.width).toBe(80);
      expect(testComponent.height).toBe(80);
    }));

    describe('should resize work', () => {
      let rect: ClientRect | DOMRect;

      beforeEach(() => {
        testComponent.height = 200;
        testComponent.width = 400;
        fixture.detectChanges();
        rect = resizableEle.getBoundingClientRect();
        expect(testComponent.width).toBe(400);
        expect(testComponent.height).toBe(200);
      });

      it('should touch event work', fakeAsync(() => {
        const handle = resizableEle.querySelector('.vts-resizable-handle-top') as HTMLElement;
        touchMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.top
          },
          {
            x: rect.left,
            y: rect.top + 100
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  +---↓---+
       *  |       |
       *  +-------+
       */
      it('top', fakeAsync(() => {
        const handle = resizableEle.querySelector('.vts-resizable-handle-top') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.top
          },
          {
            x: rect.left,
            y: rect.top + 100
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  +-------+
       *  |       |
       *  +---↑---+
       */
      it('bottom', fakeAsync(() => {
        const handle = resizableEle.querySelector('.vts-resizable-handle-bottom') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.bottom
          },
          {
            x: rect.left,
            y: rect.bottom - 100
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  +-------+
       *  →       |
       *  +-------+
       */
      it('left', fakeAsync(() => {
        const handle = resizableEle.querySelector('.vts-resizable-handle-left') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.bottom
          },
          {
            x: rect.left + 100,
            y: rect.bottom
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
      }));

      /**
       *  +-------+
       *  |       ←
       *  +-------+
       */
      it('right', fakeAsync(() => {
        const handle = resizableEle.querySelector('.vts-resizable-handle-right') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.bottom
          },
          {
            x: rect.right - 100,
            y: rect.bottom
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
      }));

      /**
       *  +-------↙
       *  |       |
       *  +------+
       */
      it('topRight', fakeAsync(() => {
        const handle = resizableEle.querySelector('.vts-resizable-handle-topRight') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.top
          },
          {
            x: rect.right - 100,
            y: rect.top + 90
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
        expect(testComponent.height).toBeLessThanOrEqual(210);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  ↘-------+
       *  |       |
       *  +-------+
       */
      it('topLeft', fakeAsync(() => {
        const handle = resizableEle.querySelector('.vts-resizable-handle-topLeft') as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.top
          },
          {
            x: rect.left + 100,
            y: rect.top + 100
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  +-------+
       *  |       |
       *  +-------↖
       */
      it('bottomRight', fakeAsync(() => {
        const handle = resizableEle.querySelector(
          '.vts-resizable-handle-bottomRight'
        ) as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.right,
            y: rect.bottom
          },
          {
            x: rect.right - 100,
            y: rect.bottom - 90
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
        expect(testComponent.height).toBeLessThanOrEqual(190);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));

      /**
       *  +-------+
       *  |       |
       *  ↗-------+
       */
      it('bottomLeft', fakeAsync(() => {
        const handle = resizableEle.querySelector(
          '.vts-resizable-handle-bottomLeft'
        ) as HTMLElement;
        mouseMoveTrigger(
          handle,
          {
            x: rect.left,
            y: rect.bottom
          },
          {
            x: rect.left + 100,
            y: rect.bottom - 100
          }
        );
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(testComponent.width).toBeLessThanOrEqual(400);
        expect(testComponent.width).toBeGreaterThanOrEqual(300);
        expect(testComponent.height).toBeLessThanOrEqual(200);
        expect(testComponent.height).toBeGreaterThanOrEqual(100);
      }));
    });

    it('should disabled work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(resizableEle.classList).toContain(`vts-resizable-disabled`);
      expect(testComponent.width).toBe(400);
      const rect = resizableEle.getBoundingClientRect();
      const handle = resizableEle.querySelector('.vts-resizable-handle-left') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.left,
          y: rect.bottom
        },
        {
          x: rect.left + 100,
          y: rect.bottom
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.width).toBe(400);
    }));
  });

  describe('customize', () => {
    let fixture: ComponentFixture<VtsDemoResizableCustomizeComponent>;
    let testComponent: VtsDemoResizableCustomizeComponent;
    let resizableEle: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoResizableCustomizeComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(VtsResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should customize handles', fakeAsync(() => {
      const bottomRightHandel = resizableEle.querySelector(
        '.vts-resizable-handle-bottomRight'
      ) as HTMLElement;
      expect(bottomRightHandel.querySelector('.bottom-right')).toBeTruthy();
      const rightHandel = resizableEle.querySelector('.vts-resizable-handle-right') as HTMLElement;
      expect(rightHandel.querySelector('.right-wrap')).toBeTruthy();

      const rect = resizableEle.getBoundingClientRect();
      mouseMoveTrigger(
        bottomRightHandel,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 200,
          y: rect.bottom
        }
      );
      zone.simulateZoneExit();
      fixture.detectChanges();
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      zone.simulateZoneExit();
      fixture.detectChanges();
      expect(testComponent.width).toBeGreaterThanOrEqual(600);
    }));
  });

  describe('lock aspect ratio', () => {
    let fixture: ComponentFixture<VtsDemoResizableLockAspectRatioComponent>;
    let resizableEle: HTMLElement;
    let testComponent: VtsDemoResizableLockAspectRatioComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoResizableLockAspectRatioComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(VtsResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should lock aspect ratio when resize', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const leftHandel = resizableEle.querySelector('.vts-resizable-handle-right') as HTMLElement;
      const topHandel = resizableEle.querySelector('.vts-resizable-handle-top') as HTMLElement;
      const bottomRightHandel = resizableEle.querySelector(
        '.vts-resizable-handle-bottomRight'
      ) as HTMLElement;
      const ratio = testComponent.width / testComponent.height;
      mouseMoveTrigger(
        leftHandel,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 100,
          y: rect.bottom
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      mouseMoveTrigger(
        bottomRightHandel,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right - 123,
          y: rect.bottom - 321
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      mouseMoveTrigger(
        topHandel,
        {
          x: rect.right,
          y: rect.top
        },
        {
          x: rect.right,
          y: rect.top + 100
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(Math.round(testComponent.width / testComponent.height)).toBe(ratio);
    }));
  });

  describe('preview', () => {
    let fixture: ComponentFixture<VtsDemoResizablePreviewComponent>;
    let resizableEle: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoResizablePreviewComponent);
      resizableEle = fixture.debugElement.query(By.directive(VtsResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should preview work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const handle = resizableEle.querySelector('.vts-resizable-handle-bottomRight') as HTMLElement;
      dispatchMouseEvent(handle, 'mousedown', rect.right, rect.bottom);
      dispatchMouseEvent(window.document, 'mousemove', rect.right + 20, rect.bottom + 20);
      fixture.detectChanges();
      const preview = resizableEle.querySelector('.vts-resizable-preview') as HTMLElement;
      expect(preview).toBeTruthy();
      dispatchMouseEvent(window.document, 'mouseup');
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
    }));
  });

  describe('grid', () => {
    let fixture: ComponentFixture<VtsDemoResizableGridComponent>;
    let resizableEle: HTMLElement;
    let testComponent: VtsDemoResizableGridComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoResizableGridComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(VtsResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should grid work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const handle = resizableEle.querySelector('.vts-resizable-handle-right') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: 0,
          y: rect.bottom
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.col).toBe(3);
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: 9999,
          y: rect.bottom
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.col).toBe(20);
    }));
  });

  describe('bounds', () => {
    let fixture: ComponentFixture<VtsTestResizableBoundsComponent>;
    let resizableEle: HTMLElement;
    let testComponent: VtsTestResizableBoundsComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestResizableBoundsComponent);
      testComponent = fixture.debugElement.componentInstance;
      resizableEle = fixture.debugElement.query(By.directive(VtsResizableDirective)).nativeElement;
      fixture.detectChanges();
    });

    it('should parent bounds work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      const handle = resizableEle.querySelector('.vts-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 200,
          y: rect.bottom + 200
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.width).toBe(200);
      expect(testComponent.height).toBe(200);
    }));

    it('should element ref bounds work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      testComponent.bounds = testComponent.boxRef;
      fixture.detectChanges();
      const handle = resizableEle.querySelector('.vts-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + 300,
          y: rect.bottom + 300
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.width).toBe(256);
      expect(testComponent.height).toBe(256);
    }));

    it('should window bounds work', fakeAsync(() => {
      const rect = resizableEle.getBoundingClientRect();
      testComponent.bounds = 'window';
      fixture.detectChanges();
      const handle = resizableEle.querySelector('.vts-resizable-handle-bottomRight') as HTMLElement;
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + window.innerWidth,
          y: rect.bottom + window.innerHeight
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.width).toBe(300);
      expect(testComponent.height).toBe(300);
      testComponent.maxHeight = window.innerHeight * 2;
      testComponent.maxWidth = window.innerWidth * 2;
      fixture.detectChanges();
      mouseMoveTrigger(
        handle,
        {
          x: rect.right,
          y: rect.bottom
        },
        {
          x: rect.right + window.innerWidth,
          y: rect.bottom + window.innerHeight
        }
      );
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      expect(testComponent.width).toBe(window.innerWidth);
      expect(testComponent.height).toBe(window.innerHeight);
    }));
  });
});

function mouseMoveTrigger(
  el: HTMLElement,
  from: { x: number; y: number },
  to: { x: number; y: number }
): void {
  dispatchMouseEvent(el, 'mousedown', from.x, from.y);
  dispatchMouseEvent(window.document, 'mousemove', to.x, to.y);
  dispatchMouseEvent(window.document, 'mouseup');
}

function touchMoveTrigger(
  el: HTMLElement,
  from: { x: number; y: number },
  to: { x: number; y: number }
): void {
  dispatchTouchEvent(el, 'touchstart', from.x, from.y);
  dispatchTouchEvent(window.document, 'touchmove', to.x, to.y);
  dispatchTouchEvent(window.document, 'touchend');
}

@Component({
  template: `
    <div class="box-ref" #boxRef>
      <div class="parent">
        <div
          class="box"
          vts-resizable
          [vtsBounds]="bounds"
          [vtsMaxWidth]="maxWidth"
          [vtsMinWidth]="80"
          [vtsMaxHeight]="maxHeight"
          [vtsMinHeight]="80"
          [style.height.px]="height"
          [style.width.px]="width"
          (vtsResize)="onResize($event)"
        >
          <vts-resize-handles></vts-resize-handles>
          content
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .box-ref {
        width: 256px;
        height: 256px;
      }
      .parent {
        width: 200px;
        height: 200px;
      }
    `
  ]
})
class VtsTestResizableBoundsComponent {
  @ViewChild('boxRef', { static: false }) boxRef!: ElementRef<HTMLDivElement>;
  bounds: string | ElementRef = 'parent';
  maxWidth = 300;
  maxHeight = 300;
  width = 100;
  height = 100;
  id = -1;

  onResize({ width, height }: { width: number; height: number }): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width;
      this.height = height;
    });
  }
}
