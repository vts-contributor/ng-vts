import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';
import { VtsDescriptionsComponent } from './descriptions.component';
import { VtsDescriptionsModule } from './descriptions.module';

// tslint:disable-next-line no-any
declare const viewport: any;

describe('vts descriptions', () => {
  describe('with different spans', () => {
    let testBed: ComponentBed<VtsTestDescriptionsComponent>;
    let testComponent: VtsTestDescriptionsComponent;
    let componentElement: HTMLElement;
    let fixture: ComponentFixture<VtsTestDescriptionsComponent>;
    let rows;

    beforeEach(() => {
      testBed = createComponentBed(VtsTestDescriptionsComponent, {
        imports: [VtsDescriptionsModule]
      });
      fixture = testBed.fixture;
      testComponent = fixture.componentInstance;
      componentElement = fixture.debugElement.nativeElement;

      fixture.detectChanges();
    });

    it('should have correct layout', () => {
      let title = componentElement.querySelector('.vts-descriptions-title');
      const view = componentElement.querySelector('.vts-descriptions-view');

      expect(title).toBeTruthy();
      expect(view).toBeTruthy();

      testComponent.title = '';
      fixture.detectChanges();
      title = componentElement.querySelector('.vts-descriptions-title');
      expect(title).toBeFalsy();
    });

    it('should render spans correctly', () => {
      const spyOnWarn = spyOn(console, 'warn');
      spyOnWarn.calls.reset();
      rows = componentElement.querySelectorAll('.vts-descriptions-row');
      expect(rows.length).toBe(1);

      testComponent.colspanArray = [1, 1, 1, 2, 3, 1, 5];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.vts-descriptions-row');
      expect(rows.length).toBe(3);
      expect(spyOnWarn).toHaveBeenCalledTimes(2);
      expect(spyOnWarn).toHaveBeenCalledWith(
        '[NG-ZORRO]:',
        '"vtsColumn" is 3 but we have row length 5'
      );
      expect(spyOnWarn).toHaveBeenCalledWith(
        '[NG-ZORRO]:',
        '"vtsColumn" is 3 but we have row length 6'
      );

      testComponent.column = 5;
      testComponent.colspanArray = [1, 2, 3];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.vts-descriptions-row');
      expect(rows.length).toBe(1);
      expect(spyOnWarn).toHaveBeenCalledTimes(4);
      expect(spyOnWarn).toHaveBeenCalledWith(
        '[NG-ZORRO]:',
        '"vtsColumn" is 5 but we have row length 6'
      );

      testComponent.colspanArray = [1, 2, 2];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.vts-descriptions-row');
      expect(rows.length).toBe(1);

      // Should the last fill the rest space.
      testComponent.colspanArray = [1, 1];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.vts-descriptions-row');
      const tds = componentElement.querySelectorAll('.vts-descriptions-item');
      expect(rows.length).toBe(1);
      expect((tds[1] as HTMLTableDataCellElement).colSpan).toBe(4);
      spyOnWarn.calls.reset();
    });

    it('should responsive work', fakeAsync(() => {
      testComponent.column = {
        xl: 3,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
        xxs: 1,
        xxxs: 1
      };
      testComponent.colspanArray = [1, 1, 1, 2, 3, 1, 5];

      viewport.set(1024, 1024);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.vts-descriptions-row');
      expect(rows.length).toBe(3);

      viewport.set(320, 320);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();

      rows = componentElement.querySelectorAll('.vts-descriptions-row');
      expect(rows.length).toBe(7);

      viewport.reset();
    }));

    // fix #3795
    it('should change to use content work', fakeAsync(() => {
      let firstTitle = componentElement.querySelector(
        '.vts-descriptions-item-label'
      ) as HTMLSpanElement;
      expect(firstTitle.innerText).toBe('Item Title 0');

      testComponent.itemTitle = 'Item ';
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      firstTitle = componentElement.querySelector(
        '.vts-descriptions-item-label'
      ) as HTMLSpanElement;
      expect(firstTitle.innerText).toBe('Item 0');
    }));
  });

  describe('RTL', () => {
    let testBed: ComponentBed<VtsTestDescriptionsRtlComponent>;
    let fixture: ComponentFixture<VtsTestDescriptionsRtlComponent>;
    let componentElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(VtsTestDescriptionsRtlComponent, {
        declarations: [VtsTestDescriptionsComponent],
        imports: [VtsDescriptionsModule, BidiModule]
      });
      componentElement = testBed.debugElement.query(
        By.directive(VtsDescriptionsComponent)
      ).nativeElement;
      fixture = testBed.fixture;
      fixture.detectChanges();
    });

    it('should className correct on dir change', fakeAsync(() => {
      expect(componentElement.classList).toContain('vts-descriptions-rtl');
      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(componentElement.classList).not.toContain('vts-descriptions-rtl');
    }));
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-descriptions',
  template: `
    <vts-descriptions [vtsTitle]="title" [vtsBordered]="bordered" [vtsColumn]="column">
      <vts-descriptions-item
        *ngFor="let col of colspanArray; let i = index"
        [vtsTitle]="itemTitle + i"
        [vtsSpan]="col"
      ></vts-descriptions-item>
    </vts-descriptions>
  `
})
export class VtsTestDescriptionsComponent {
  bordered = false;
  colspanArray: number[] = [1, 1, 1];
  column: number | { [key: string]: number } = 3;
  title = 'Title';
  itemTitle = 'Item Title ';
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-descriptions></vts-test-descriptions>
    </div>
  `
})
export class VtsTestDescriptionsRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
