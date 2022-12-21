import { BidiModule, Dir } from '@angular/cdk/bidi';
import { ENTER } from '@angular/cdk/keycodes';
import { Component, DebugElement, Injector, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createKeyboardEvent, dispatchKeyboardEvent } from '@ui-vts/ng-vts/core/testing';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import en_US from '../i18n/languages/en_US';
import { VtsI18nService } from '../i18n/vts-i18n.service';
import { VtsPaginationComponent } from './pagination.component';
import { VtsPaginationModule } from './pagination.module';

declare const viewport: VtsSafeAny;

describe('pagination', () => {
  let injector: Injector;

  beforeEach(waitForAsync(() => {
    injector = TestBed.configureTestingModule({
      imports: [BidiModule, VtsPaginationModule, NoopAnimationsModule],
      declarations: [
        VtsTestPaginationComponent,
        VtsTestPaginationRenderComponent,
        VtsTestPaginationTotalComponent,
        VtsTestPaginationAutoResizeComponent,
        VtsTestPaginationRtlComponent
      ]
    });
    TestBed.compileComponents();
  }));

  describe('pagination complex', () => {
    let fixture: ComponentFixture<VtsTestPaginationComponent>;
    let testComponent: VtsTestPaginationComponent;
    let pagination: DebugElement;
    let paginationElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestPaginationComponent);
      testComponent = fixture.debugElement.componentInstance;
      pagination = fixture.debugElement.query(By.directive(VtsPaginationComponent));
      fixture.detectChanges();
      paginationElement = pagination.nativeElement;
    });

    describe('not simple mode', () => {
      it('should className correct', () => {
        fixture.detectChanges();
        expect(paginationElement.classList.contains('vts-pagination')).toBe(true);
        expect(paginationElement.firstElementChild!.classList.contains('vts-pagination-prev')).toBe(
          true
        );
        expect(
          paginationElement.firstElementChild!.classList.contains('vts-pagination-disabled')
        ).toBe(true);
        expect(paginationElement.lastElementChild!.classList.contains('vts-pagination-next')).toBe(
          true
        );
        const length = paginationElement.children.length;
        const array = Array.prototype.slice.call(paginationElement.children).slice(1, length - 1);
        expect(array[0].classList.contains('vts-pagination-item-active')).toBe(true);
        expect(
          array.every((node: HTMLElement) => node.classList.contains('vts-pagination-item'))
        ).toBe(true);
      });

      it('should small size className correct', () => {
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(paginationElement.classList.contains('mini')).toBe(true);
      });

      it('should pageIndex change work', () => {
        testComponent.pageIndex = 2;
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        const length = paginationElement.children.length;
        const array = Array.prototype.slice.call(paginationElement.children).slice(1, length - 1);
        expect(array[1].classList.contains('vts-pagination-item-active')).toBe(true);
      });

      it('should pageIndex change not trigger when same', () => {
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        const length = paginationElement.children.length;
        const array = Array.prototype.slice.call(paginationElement.children).slice(1, length - 1);
        expect(array[0].classList.contains('vts-pagination-item-active')).toBe(true);
        array[0].click();
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      });

      it('should change pageIndex change pages list', () => {
        fixture.detectChanges();
        testComponent.total = 500;
        fixture.detectChanges();
        expect(paginationElement.children.length).toBe(9);
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        expect(paginationElement.children.length).toBe(11);
      });

      it('should pre button disabled', () => {
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.children[0] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        expect(testComponent.pageIndex).toBe(1);
      });

      it('should pre button work', () => {
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.children[0] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(4);
      });

      it('should next button disabled', () => {
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.lastElementChild as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        expect(testComponent.pageIndex).toBe(5);
      });

      it('should next button work', () => {
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.lastElementChild as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(2);
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      });

      it('should click pageIndex work', () => {
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        (paginationElement.children[3] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(3);
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      });

      it('should total change style work', () => {
        testComponent.total = 500;
        fixture.detectChanges();
        expect(paginationElement.children.length).toBe(9);
      });

      it('should next five work', () => {
        testComponent.total = 500;
        fixture.detectChanges();
        testComponent.pageIndex = 46;
        fixture.detectChanges();
        (paginationElement.children[8] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(50);
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(paginationElement.children.length).toBe(9);
      });

      it('should pre five work', () => {
        testComponent.total = 500;
        fixture.detectChanges();
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        expect(paginationElement.children.length).toBe(11);
        (paginationElement.children[2] as HTMLElement).click();
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(1);
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(paginationElement.children.length).toBe(9);
      });

      it('should showSizeChanger work', waitForAsync(() => {
        testComponent.total = 500;
        testComponent.pageIndex = 50;
        testComponent.showSizeChanger = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(paginationElement.children.length).toBe(10);
          expect(
            paginationElement.lastElementChild!.classList.contains('vts-pagination-options')
          ).toBe(true);
        });
      }));

      it('should change pageSize correct', () => {
        testComponent.pageIndex = 5;
        fixture.detectChanges();
        testComponent.vtsPaginationComponent.onPageSizeChange(20);
        fixture.detectChanges();
        expect(testComponent.pageIndex).toBe(3);
        expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(1);
      });

      it('should showQuickJumper work', () => {
        testComponent.showQuickJumper = true;
        fixture.detectChanges();
        const input = pagination.nativeElement.querySelector('input');
        input.value = 5;
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        const event = createKeyboardEvent('keydown', ENTER, input, 'enter');
        input.dispatchEvent(event);
        dispatchKeyboardEvent(input, 'keydown', ENTER, input);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
        expect(input.value).toBe('');
        dispatchKeyboardEvent(input, 'keydown', ENTER, input);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
        input.value = 'abc';
        dispatchKeyboardEvent(input, 'keydown', ENTER, input);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
        input.value = -1;
        dispatchKeyboardEvent(input, 'keydown', ENTER, input);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
        input.value = 10;
        dispatchKeyboardEvent(input, 'keydown', ENTER, input);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
      });

      it('should vtsDisabled work', () => {
        fixture.detectChanges();
        testComponent.disabled = true;
        fixture.detectChanges();
        expect(paginationElement.classList.contains('vts-pagination-disabled')).toBe(true);
      });
    });

    describe('simple mode', () => {
      beforeEach(() => {
        testComponent.simple = true;
        fixture.detectChanges();
        paginationElement = pagination.nativeElement;
      });
      it('should simple className work', () => {
        expect(paginationElement.classList.contains('vts-pagination-simple')).toBe(true);
        expect(paginationElement.firstElementChild!.classList.contains('vts-pagination-prev')).toBe(
          true
        );
        expect(paginationElement.lastElementChild!.classList.contains('vts-pagination-next')).toBe(
          true
        );
      });
      it('should simple pager jump', () => {
        fixture.detectChanges();
        const input = pagination.nativeElement.querySelector('input');
        input.value = 5;
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
        const event = createKeyboardEvent('keydown', ENTER, input, 'enter');
        input.dispatchEvent(event);
        dispatchKeyboardEvent(input, 'keydown', ENTER, input);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('5');
        expect(testComponent.pageIndex).toBe(5);
        dispatchKeyboardEvent(input, 'keydown', ENTER, input);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('5');
        input.value = 100;
        expect(testComponent.pageIndex).toBe(5);
        dispatchKeyboardEvent(input, 'keydown', ENTER, input);
        fixture.detectChanges();
        expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
        expect(testComponent.pageIndex).toBe(5);
      });
    });
    it('should zero total hide all', () => {
      testComponent.total = 0;
      fixture.detectChanges();
      expect(pagination.nativeElement.innerText).toEqual('');
    });
    it('should be hidden pagination when total is 0 and vtsHidePaginationOnSinglePage is true', () => {
      (testComponent as VtsTestPaginationComponent).total = 0;
      (testComponent as VtsTestPaginationComponent).hideOnSinglePage = true;
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('.vts-pagination').children.length
      ).toBe(0);
    });
  });

  describe('pagination render items', () => {
    let fixture: ComponentFixture<VtsTestPaginationRenderComponent>;
    let pagination: DebugElement;
    let paginationElement: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestPaginationRenderComponent);
      pagination = fixture.debugElement.query(By.directive(VtsPaginationComponent));
      fixture.detectChanges();
      paginationElement = pagination.nativeElement;
    });
    it('should render correct', () => {
      fixture.detectChanges();
      expect((paginationElement.firstElementChild as HTMLElement).innerText).toBe('Previous');
      expect((paginationElement.lastElementChild as HTMLElement).innerText).toBe('Next');
      expect((paginationElement.children[1] as HTMLElement).innerText).toBe('2');
    });
  });

  describe('pagination total items', () => {
    let fixture: ComponentFixture<VtsTestPaginationTotalComponent>;
    let testComponent: VtsTestPaginationTotalComponent;
    let pagination: DebugElement;
    let paginationElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestPaginationTotalComponent);
      testComponent = fixture.debugElement.componentInstance;
      pagination = fixture.debugElement.query(By.directive(VtsPaginationComponent));
      fixture.detectChanges();
      paginationElement = pagination.nativeElement;
    });

    it('should render correct', () => {
      fixture.detectChanges();
      expect((paginationElement.firstElementChild as HTMLElement).innerText.trim()).toBe(
        '1-20 of 85 items'
      );
      testComponent.pageIndex = 2;
      fixture.detectChanges();
      expect((paginationElement.firstElementChild as HTMLElement).innerText.trim()).toBe(
        '21-40 of 85 items'
      );
      testComponent.pageIndex = 5;
      fixture.detectChanges();
      expect((paginationElement.firstElementChild as HTMLElement).innerText.trim()).toBe(
        '81-85 of 85 items'
      );
    });
  });

  it('should auto resize work', fakeAsync(() => {
    const fixture = TestBed.createComponent(VtsTestPaginationAutoResizeComponent);
    const pagination = fixture.debugElement.query(By.directive(VtsPaginationComponent));

    viewport.set(1200, 350);
    fixture.detectChanges();
    let paginationElement = pagination.nativeElement;
    expect(paginationElement.classList).not.toContain('mini');

    viewport.set(350, 350);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    paginationElement = pagination.nativeElement;
    expect(paginationElement.classList).toContain('mini');
    viewport.reset();
  }));

  it('#i18n', () => {
    const fixture = TestBed.createComponent(VtsTestPaginationComponent);
    const dl = fixture.debugElement;
    fixture.detectChanges();
    injector.get(VtsI18nService).setLocale(en_US);
    fixture.detectChanges();
    const prevText = (dl.query(By.css('.vts-pagination-prev')).nativeElement as HTMLElement).title;
    expect(prevText).toBe(en_US.Pagination.prev_page);
    const nextText = (dl.query(By.css('.vts-pagination-next')).nativeElement as HTMLElement).title;
    expect(nextText).toBe(en_US.Pagination.next_page);
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<VtsTestPaginationRtlComponent>;
    let pagination: DebugElement;
    let paginationElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestPaginationRtlComponent);
      pagination = fixture.debugElement.query(By.directive(VtsPaginationComponent));
      fixture.detectChanges();
      paginationElement = pagination.nativeElement;
    });

    it('should pagination className correct on dir change', () => {
      fixture.detectChanges();
      expect(pagination.nativeElement.classList).toContain('vts-pagination-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(pagination.nativeElement.classList).not.toContain('vts-pagination-rtl');
    });

    it('should render icons correct', () => {
      fixture.detectChanges();
      fixture.componentInstance.total = 500;
      fixture.detectChanges();
      fixture.componentInstance.pageIndex = 7;
      fixture.detectChanges();
      const prev = paginationElement.firstElementChild as HTMLElement;
      const next = paginationElement.lastElementChild as HTMLElement;
      expect(prev.querySelector('.vtsicon')?.classList.contains('vtsicon-right')).toBe(true);
      expect(next.querySelector('.vtsicon')?.classList.contains('vtsicon-left')).toBe(true);

      const prev_5 = paginationElement.querySelector('.vts-pagination-jump-prev') as HTMLElement;
      const next_5 = paginationElement.querySelector('.vts-pagination-jump-next') as HTMLElement;

      expect(prev_5.querySelector('.vtsicon')?.classList.contains('vtsicon-double-right')).toBe(
        true
      );
      expect(next_5.querySelector('.vtsicon')?.classList.contains('vtsicon-double-left')).toBe(
        true
      );
    });
  });
});

@Component({
  template: `
    <vts-pagination
      [vtsSimple]="simple"
      [(vtsPageIndex)]="pageIndex"
      [vtsDisabled]="disabled"
      (vtsPageIndexChange)="pageIndexChange($event)"
      [(vtsPageSize)]="pageSize"
      (vtsPageSizeChange)="pageSizeChange($event)"
      [vtsSize]="size"
      [vtsTotal]="total"
      [vtsHidePaginationOnSinglePage]="hideOnSinglePage"
      [vtsPageSizeOptions]="pageSizeOptions"
      [vtsShowSizeChanger]="showSizeChanger"
      [vtsShowQuickJumper]="showQuickJumper"
    ></vts-pagination>
  `
})
export class VtsTestPaginationComponent {
  @ViewChild(VtsPaginationComponent, { static: false })
  vtsPaginationComponent!: VtsPaginationComponent;
  pageIndex = 1;
  pageSize = 10;
  total = 50;
  disabled = false;
  pageIndexChange = jasmine.createSpy('pageIndexChange callback');
  pageSizeChange = jasmine.createSpy('pageSizeChange callback');
  showQuickJumper = false;
  showSizeChanger = false;
  hideOnSinglePage = false;
  pageSizeOptions = [10, 20, 30, 40];
  simple = false;
  size = '';
}

@Component({
  template: `
    <vts-pagination
      [vtsPageIndex]="1"
      [vtsTotal]="50"
      [vtsItemRender]="renderItemTemplate"
    ></vts-pagination>
    <ng-template #renderItemTemplate let-type let-page="page">
      <a *ngIf="type === 'prev'">Previous</a>
      <a *ngIf="type === 'next'">Next</a>
      <a *ngIf="type === 'page'">{{ page * 2 }}</a>
    </ng-template>
  `
})
export class VtsTestPaginationRenderComponent {}

@Component({
  template: `
    <vts-pagination
      [(vtsPageIndex)]="pageIndex"
      [vtsTotal]="85"
      [vtsPageSize]="20"
      [vtsShowTotal]="rangeTemplate"
    ></vts-pagination>
    <ng-template #rangeTemplate let-range="range" let-total>
      {{ range[0] }}-{{ range[1] }} of {{ total }} items
    </ng-template>
  `
})
export class VtsTestPaginationTotalComponent {
  pageIndex = 1;
}

@Component({
  template: `
    <vts-pagination vtsResponsive></vts-pagination>
  `
})
export class VtsTestPaginationAutoResizeComponent {}

@Component({
  template: `
    <div [dir]="direction">
      <vts-pagination
        [vtsSimple]="false"
        [(vtsPageIndex)]="pageIndex"
        [vtsTotal]="total"
        [(vtsPageSize)]="pageSize"
      ></vts-pagination>
    </div>
  `
})
export class VtsTestPaginationRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
  pageIndex = 1;
  pageSize = 10;
  total = 50;
}
