// tslint:disable
// TODO remove tslint:disable @hsuanxyz
import { fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { VtsScrollService } from '@ui-vts/ng-vts/core/services';
import { VtsAnchorModule } from './anchor.module';
import { VtsAnchorComponent } from './anchor.component';

const throttleTime = 51;

describe('anchor', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;
  let page: PageObject;
  let srv: VtsScrollService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VtsAnchorModule],
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    dl = fixture.debugElement;
    context = fixture.componentInstance;
    fixture.detectChanges();
    page = new PageObject();
    spyOn(context, '_scroll');
    srv = TestBed.inject(VtsScrollService);
  });
  afterEach(() => context.comp.ngOnDestroy());

  describe('[default]', () => {
    it(`should scolling to target via click a link`, () => {
      spyOn(srv, 'scrollTo').and.callFake((_containerEl, _targetTopValue = 0, options = {}) => {
        if (options.callback) {
          options.callback();
        }
      });
      expect(context._scroll).not.toHaveBeenCalled();
      page.to('#何时使用');
      expect(context._scroll).toHaveBeenCalled();
    });

    it('should hava remove listen when the component is destroyed', () => {
      expect(context.comp['destroy$']!.isStopped).toBeFalsy();
      context.comp.ngOnDestroy();
      fixture.detectChanges();
      expect(context.comp['destroy$']!.isStopped).toBeTruthy();
    });

    it('should actived when scrolling to the anchor', (done: () => void) => {
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      setTimeout(() => {
        const inkNode = page.getEl('.vts-anchor-ink-ball');
        expect(+inkNode.style.top!.replace('px', '')).toBeGreaterThan(0);
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });

    it('should clean actived when leave all anchor', fakeAsync(() => {
      spyOn(context.comp, 'clearActive' as any);
      page.scrollTo();
      tick(throttleTime);
      fixture.detectChanges();
      expect(context.comp['clearActive']).not.toHaveBeenCalled();
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('scroll'));
      tick(throttleTime);
      fixture.detectChanges();
      expect(context.comp['clearActive']!).toHaveBeenCalled();
    }));

    it(`won't scolling when is not exists link`, () => {
      spyOn(srv, 'getScroll');
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page!.to('#invalid');
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`won't scolling when is invalid link`, () => {
      spyOn(srv, 'getScroll');
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page.to('invalidLink');
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`supports complete href link (e.g. http://www.example.com/#id)`, () => {
      spyOn(srv, 'getScroll');
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page.getEl('.mock-complete').click();
      fixture.detectChanges();
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`should priorities most recently`, (done: () => void) => {
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo('#parallel1');
      setTimeout(() => {
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });
  });

  describe('property', () => {
    describe('[vtsAffix]', () => {
      it(`is [true]`, () => {
        const linkList = dl.queryAll(By.css('vts-affix'));
        expect(linkList.length).toBe(1);
      });
      it(`is [false]`, () => {
        let linkList = dl.queryAll(By.css('vts-affix'));
        expect(linkList.length).toBe(1);
        context.vtsAffix = false;
        fixture.detectChanges();
        linkList = dl.queryAll(By.css('vts-affix'));
        expect(linkList.length).toBe(0);
      });
    });

    describe('[vtsOffsetTop]', () => {
      it('should be using "calc" method calculate max-height', () => {
        const wrapperEl = dl.query(By.css('.vts-anchor-wrapper'));
        expect(wrapperEl.styles['max-height']).toContain('calc(');
      });
    });

    describe('[vtsShowInkInFixed]', () => {
      beforeEach(() => {
        context.vtsAffix = false;
        fixture.detectChanges();
      });
      it('should be show ink when [false]', () => {
        context.vtsShowInkInFixed = false;
        fixture.detectChanges();
        scrollTo();
        expect(dl.query(By.css('.fixed')) == null).toBe(false);
      });
      it('should be hide ink when [true]', () => {
        context.vtsShowInkInFixed = true;
        fixture.detectChanges();
        scrollTo();
        expect(dl.query(By.css('.fixed')) == null).toBe(true);
      });
    });

    describe('[vtsContainer]', () => {
      it('with window', () => {
        spyOn(window, 'addEventListener');
        context.vtsContainer = window;
        fixture.detectChanges();
        expect(window.addEventListener).toHaveBeenCalled();
      });
      it('with string', () => {
        spyOn(context, '_click');
        const el = document.querySelector('#target')!;
        spyOn(el, 'addEventListener');
        context.vtsContainer = '#target';
        fixture.detectChanges();
        expect(el.addEventListener).toHaveBeenCalled();
        page.to('#basic-target');
        expect(context._click).toHaveBeenCalled();
      });
    });

    it('(vtsClick)', () => {
      spyOn(context, '_click');
      expect(context._click).not.toHaveBeenCalled();
      const linkList = dl.queryAll(By.css('.vts-anchor-link-title'));
      expect(linkList.length).toBeGreaterThan(0);
      (linkList[0].nativeElement as HTMLLinkElement).click();
      fixture.detectChanges();
      expect(context._click).toHaveBeenCalled();
    });
  });

  describe('link', () => {
    it(`should show custom template of [vtsTemplate]`, () => {
      expect(dl.query(By.css('.vtsTemplate-title')) != null).toBe(true);
    });
    it(`should show custom template of [vtsTitle]`, () => {
      expect(dl.query(By.css('.vtsTitle-title')) != null).toBe(true);
    });
  });

  describe('**boundary**', () => {
    it('#getOffsetTop', (done: () => void) => {
      const el1 = document.getElementById('何时使用')!;
      spyOn(el1, 'getClientRects').and.returnValue([] as any);
      const el2 = document.getElementById('parallel1')!;
      spyOn(el2, 'getBoundingClientRect').and.returnValue({
        top: 0
      } as any);
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      setTimeout(() => {
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });
  });

  class PageObject {
    getEl(cls: string): HTMLElement {
      const el = dl.query(By.css(cls));
      expect(el).not.toBeNull();
      return el.nativeElement as HTMLElement;
    }
    to(href: string = '#basic'): this {
      this.getEl(`vts-affix [href="${href}"]`).click();
      fixture.detectChanges();
      return this;
    }
    scrollTo(href: string = '#basic'): this {
      const toNode = dl.query(By.css(href));
      (toNode.nativeElement as HTMLElement).scrollIntoView();
      fixture.detectChanges();
      return this;
    }
  }
});

@Component({
  template: `
    <vts-anchor
      [vtsAffix]="vtsAffix"
      [vtsBounds]="vtsBounds"
      [vtsShowInkInFixed]="vtsShowInkInFixed"
      [vtsOffsetTop]="vtsOffsetTop"
      [vtsContainer]="vtsContainer"
      (vtsClick)="_click($event)"
      (vtsScroll)="_scroll($event)"
    >
      <vts-link vtsHref="#何时使用" vtsTitle="何时使用"></vts-link>
      <vts-link vtsHref="#basic" vtsTitle="Basic demo"></vts-link>
      <vts-link vtsHref="#API-AnchorLink">
        <ng-template #vtsTemplate>
          <span class="vtsTemplate-title">tpl</span>
        </ng-template>
      </vts-link>
      <vts-link vtsHref="#API" vtsTitle="API">
        <vts-link vtsHref="#API-Anchor" vtsTitle="vts-anchor"></vts-link>
        <vts-link vtsHref="#API-AnchorLink" [vtsTitle]="title">
          <ng-template #title>
            <span class="vtsTitle-title">tpl-title</span>
          </ng-template>
        </vts-link>
      </vts-link>
      <vts-link vtsHref="#invalid" vtsTitle="invalid"></vts-link>
      <vts-link vtsHref="invalidLink" vtsTitle="invalidLink"></vts-link>
      <vts-link
        vtsHref="http://www.example.com/#id"
        vtsTitle="complete"
        class="mock-complete"
      ></vts-link>
      <vts-link vtsHref="#parallel1" vtsTitle="parallel1"></vts-link>
      <vts-link vtsHref="#parallel2" vtsTitle="parallel2"></vts-link>
      <vts-link vtsHref="#basic-target" vtsTitle="basic-target"></vts-link>
    </vts-anchor>
    <h2 id="何时使用"></h2>
    <div style="height: 1000px"></div>
    <h2 id="basic"></h2>
    <div style="height: 100px"></div>
    <h2 id="API"></h2>
    <div style="height: 100px"></div>
    <h2 id="API-Anchor"></h2>
    <div style="height: 100px"></div>
    <h2 id="API-AnchorLink"></h2>
    <table>
      <tr>
        <td><h2 id="parallel1">parallel1</h2></td>
        <td><h2 id="parallel2">parallel2</h2></td>
      </tr>
    </table>

    <div style="height: 1000px"></div>
    <div id="target">
      <div style="height: 1000px"></div>
      <h2 id="basic-target"></h2>
    </div>
  `,
  styleUrls: ['./style/patch.less']
})
export class TestComponent {
  @ViewChild(VtsAnchorComponent, { static: false }) comp!: VtsAnchorComponent;
  vtsAffix = true;
  vtsBounds = 5;
  vtsOffsetTop = 0;
  vtsShowInkInFixed = false;
  vtsContainer: any = null;
  _click() {}
  _scroll() {}
}
