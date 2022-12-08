import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VtsScrollService } from '@ui-vts/ng-vts/core/services';

import { VtsBackTopComponent } from './back-top.component';
import { VtsBackTopModule } from './back-top.module';

describe('Component:vts-back-top', () => {
  let scrollService: MockVtsScrollService;
  let fixture: ComponentFixture<TestBackTopComponent>;
  let debugElement: DebugElement;
  let component: VtsBackTopComponent;
  let componentObject: VtsBackTopPageObject;
  const defaultVisibilityHeight = 400;

  class VtsBackTopPageObject {
    scrollTo(el: Element | Window, scrollTop: number): void {
      scrollService.mockTopOffset = scrollTop;
      el.dispatchEvent(new Event('scroll'));
    }

    clickBackTop(): void {
      this.backTopButton().nativeElement.click();
    }

    backTopButton(): DebugElement {
      return debugElement.query(By.css('.vts-back-top'));
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VtsBackTopModule, NoopAnimationsModule],
      declarations: [TestBackTopComponent, TestBackTopTemplateComponent],
      providers: [
        {
          provide: VtsScrollService,
          useClass: MockVtsScrollService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestBackTopComponent);
    component = fixture.componentInstance.vtsBackTopComponent;
    componentObject = new VtsBackTopPageObject();
    debugElement = fixture.debugElement;
    // tslint:disable-next-line:no-any
    scrollService = TestBed.inject(VtsScrollService) as any;
  });

  describe('[default]', () => {
    it(`should not show when scroll is below ${defaultVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight - 1);
      tick();
      fixture.detectChanges();
      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    it(`should not show when scroll is at ${defaultVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    describe(`when scrolled at least ${defaultVisibilityHeight + 1}`, () => {
      beforeEach(fakeAsync(() => {
        componentObject.scrollTo(window, defaultVisibilityHeight + 1);
        tick();
        fixture.detectChanges();
      }));

      it(`should show back to top button`, () => {
        expect(componentObject.backTopButton() === null).toBe(false);
      });

      it(`should show default template`, () => {
        expect(debugElement.query(By.css('.vts-back-top-content')) === null).toBe(false);
      });

      it(`should scroll to top when button is clicked`, fakeAsync(() => {
        componentObject.clickBackTop();
        tick();

        expect(scrollService.getScroll()).toEqual(0);
      }));
    });
  });

  describe('[vtsVisibilityHeight]', () => {
    const customVisibilityHeight = 100;

    beforeEach(() => {
      component.vtsVisibilityHeight = customVisibilityHeight;
    });

    it(`should not show when scroll is below ${customVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, customVisibilityHeight - 1);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    it(`should not show when scroll is at ${customVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, customVisibilityHeight);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    describe(`when scrolled at least ${customVisibilityHeight + 1}`, () => {
      beforeEach(fakeAsync(() => {
        componentObject.scrollTo(window, customVisibilityHeight + 1);
        tick();
        fixture.detectChanges();
      }));

      it(`should show back to top button`, () => {
        expect(componentObject.backTopButton() === null).toBe(false);
      });
    });
  });

  describe('(vtsClick)', () => {
    beforeEach(fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();
    }));

    describe('when clicked', () => {
      it(`emit event on vtsClick`, fakeAsync(() => {
        component.vtsClick.subscribe((returnValue: boolean) => {
          expect(returnValue).toBe(true);
        });

        componentObject.clickBackTop();
      }));
    });
  });

  describe('[vtsTarget]', () => {
    let fakeTarget: HTMLElement;
    beforeEach(fakeAsync(() => {
      fakeTarget = debugElement.query(By.css('#fakeTarget')).nativeElement;
      fixture.componentInstance.setTarget(fakeTarget);
      fixture.detectChanges();
    }));

    it('window scroll does not show the button', fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    it('element scroll shows the button', fakeAsync(() => {
      const throttleTime = 50;

      componentObject.scrollTo(fakeTarget, defaultVisibilityHeight + 1);
      tick(throttleTime + 1);
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(false);
    }));

    it('element (use string id) scroll shows the button', fakeAsync(() => {
      component.vtsTarget = '#fakeTarget';

      const throttleTime = 50;

      componentObject.scrollTo(fakeTarget, defaultVisibilityHeight + 1);
      tick(throttleTime + 1);
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(false);
    }));
  });

  describe('#vtsTemplate', () => {
    it(`should show custom template`, fakeAsync(() => {
      let fixtureTemplate: ComponentFixture<TestBackTopTemplateComponent>;
      fixtureTemplate = TestBed.createComponent(TestBackTopTemplateComponent);

      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixtureTemplate.detectChanges();
      expect(fixtureTemplate.debugElement.query(By.css('.this-is-my-template')) === null).toBe(
        false
      );
    }));
  });
});

@Component({
  template: `
    <vts-back-top [vtsTarget]="target"></vts-back-top>
    <div id="fakeTarget"></div>
  `
})
class TestBackTopComponent {
  @ViewChild(VtsBackTopComponent, { static: true })
  vtsBackTopComponent!: VtsBackTopComponent;

  target: HTMLElement | null = null;

  setTarget(target: HTMLElement): void {
    this.target = target;
  }
}

@Component({
  template: `
    my comp
    <vts-back-top [vtsTemplate]="tpl">
      <ng-template #tpl>
        <div class="this-is-my-template"></div>
      </ng-template>
    </vts-back-top>
  `
})
class TestBackTopTemplateComponent {
  @ViewChild(VtsBackTopComponent, { static: false })
  vtsBackTopComponent!: VtsBackTopComponent;
}

class MockVtsScrollService {
  mockTopOffset: number = 0;

  getScroll(): number {
    return this.mockTopOffset;
  }

  scrollTo(_containerEl: Element | Window, targetTopValue: number = 0): void {
    this.mockTopOffset = targetTopValue;
  }
}
