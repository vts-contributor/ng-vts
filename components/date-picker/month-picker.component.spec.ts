import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import isBefore from 'date-fns/isBefore';

import { dispatchMouseEvent } from '@ui-vts/ng-vts/core/testing';
import { NgStyleInterface } from '@ui-vts/ng-vts/core/types';
import { getPickerAbstract, getPickerInput } from '@ui-vts/ng-vts/date-picker/testing/util';
import { PREFIX_CLASS } from '@ui-vts/ng-vts/date-picker/util';
import { VtsInputModule } from '@ui-vts/ng-vts/input';

import { VtsDatePickerModule } from './date-picker.module';

registerLocaleData(zh);

describe('VtsMonthPickerComponent', () => {
  let fixture: ComponentFixture<VtsTestMonthPickerComponent>;
  let fixtureInstance: VtsTestMonthPickerComponent;
  let debugElement: DebugElement;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule, VtsDatePickerModule, VtsInputModule],
      providers: [],
      declarations: [VtsTestMonthPickerComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsTestMonthPickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    // overlayContainer.ngOnDestroy();
  });

  describe('general api testing', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should open by click and close by click at outside', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should support vtsAllowClear and work properly', fakeAsync(() => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      const initial = (fixtureInstance.vtsValue = new Date());
      fixtureInstance.vtsAllowClear = false;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();

      fixtureInstance.vtsAllowClear = true;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.vtsValue).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const vtsOnChange = spyOn(fixtureInstance, 'vtsOnChange');
      debugElement.query(clearBtnSelector).nativeElement.click();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.vtsValue).toBe(initial);
      expect(vtsOnChange).toHaveBeenCalledWith(null);
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();
    }));

    it('should support vtsAutoFocus', () => {
      fixtureInstance.vtsAutoFocus = true;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    });

    it('should support vtsDisabled', fakeAsync(() => {
      // Make sure picker clear button shown up
      fixtureInstance.vtsAllowClear = true;
      fixtureInstance.vtsValue = new Date();

      fixtureInstance.vtsDisabled = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(debugElement.query(By.css('.vts-picker-disabled'))).not.toBeNull();
      expect(debugElement.query(By.css('.vts-picker-clear'))).toBeNull();

      fixtureInstance.vtsDisabled = false;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(debugElement.query(By.css('.vts-picker-disabled'))).toBeNull();
      expect(debugElement.query(By.css('.vts-picker-clear'))).not.toBeNull();
    }));

    it('should support vtsOpen if assigned', fakeAsync(() => {
      fixtureInstance.useSuite = 2;

      fixture.detectChanges();
      fixture.whenRenderingDone().then(() => {
        expect(getPickerContainer()).toBeNull();

        fixtureInstance.vtsOpen = true;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(getPickerContainer()).not.toBeNull();

        fixtureInstance.vtsOpen = false;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(getPickerContainer()).toBeNull();
      });
    }));

    it('should support vtsCompact', () => {
      fixtureInstance.useSuite = 4;

      fixture.detectChanges();
      const pickerInput = getPickerInput(fixture.debugElement);
      expect(pickerInput).not.toBeNull();
      const compStyles = window.getComputedStyle(pickerInput);
      expect(compStyles.getPropertyValue('border-top-right-radius') === '0px').toBeTruthy();
      expect(compStyles.getPropertyValue('border-bottom-right-radius') === '0px').toBeTruthy();
    });

    it('should support vtsDisabledDate', fakeAsync(() => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.vtsValue = new Date('2018-11-11 12:12:12');
      fixtureInstance.vtsDisabledDate = (current: Date) => isBefore(current, compareDate);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      openPickerByClickTrigger();
      const allDisabledCells = overlayContainerElement.querySelectorAll(
        '.vts-picker-month-panel tr td.vts-picker-cell-disabled'
      );
      const disabledCell = allDisabledCells[allDisabledCells.length - 1];
      expect(disabledCell.textContent).toContain('10');
    }));

    it('should support vtsLocale', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.vtsLocale = { lang: { monthPlaceholder: featureKey } };
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support vtsPlaceHolder', () => {
      const featureKey = (fixtureInstance.vtsPlaceHolder = 'TEST_PLACEHOLDER');
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support vtsPopupStyle', fakeAsync(() => {
      fixtureInstance.vtsPopupStyle = { color: 'red' };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-dropdown`).style.color).toBe('red');
    }));

    it('should support vtsDropdownClassName', fakeAsync(() => {
      const keyCls = (fixtureInstance.vtsDropdownClassName = 'my-test-class');
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-dropdown`).classList.contains(keyCls)).toBeTruthy();
    }));

    it('should support vtsSize', () => {
      fixtureInstance.vtsSize = 'large';
      fixture.detectChanges();
      expect(
        getPickerAbstract(fixture.debugElement).classList.contains('vts-picker-large')
      ).toBeTruthy();

      fixtureInstance.vtsSize = 'small';
      fixture.detectChanges();
      expect(
        getPickerAbstract(fixture.debugElement).classList.contains('vts-picker-small')
      ).toBeTruthy();
    });

    it('should support vtsOpenChange', fakeAsync(() => {
      const vtsOpenChange = spyOn(fixtureInstance, 'vtsOpenChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(vtsOpenChange).toHaveBeenCalledWith(true);

      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      flush();
      expect(vtsOpenChange).toHaveBeenCalledWith(false);
      expect(vtsOpenChange).toHaveBeenCalledTimes(2);
    }));

    it('should support vtsValue', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11-22');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getSelectedMonthCell().textContent).toContain('11');
    }));

    it('should support vtsOnChange', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11');
      const vtsOnChange = spyOn(fixtureInstance, 'vtsOnChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      const cell = getFirstMonthCell(); // Use the first cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnChange).toHaveBeenCalled();
      const result = (vtsOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getMonth() + 1).toBe(parseInt(cellText, 10));
    }));
  }); // /general api testing

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support year panel changes', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click year select to show year panel
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-month-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-year-panel')).toBeDefined();
      expect(queryFromOverlay('.vts-picker-header-year-btn').textContent).toContain('2010');
      expect(queryFromOverlay('.vts-picker-header-year-btn').textContent).toContain('2019');
      // Goto previous year
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-header-year-btn').textContent).toContain('2000');
      expect(queryFromOverlay('.vts-picker-header-year-btn').textContent).toContain('2009');
      // Goto next year * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-header-year-btn').textContent).toContain('2020');
      expect(queryFromOverlay('.vts-picker-header-year-btn').textContent).toContain('2029');
    }));

    it('should support decade panel changes', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11');
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click to show decade panel
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-month-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-decade-panel')).toBeDefined();
      // Goto previous decade
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-header-decade-btn').textContent).toContain('1900');
      expect(queryFromOverlay('.vts-picker-header-decade-btn').textContent).toContain('1999');
      // Goto next decade * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-header-decade-btn').textContent).toContain('2100');
      expect(queryFromOverlay('.vts-picker-header-decade-btn').textContent).toContain('2199');
    }));
  }); // /panel switch and move forward/afterward

  describe('specified date picker testing', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support vtsRenderExtraFooter', fakeAsync(() => {
      fixtureInstance.vtsRenderExtraFooter = () => fixtureInstance.tplExtraFooter;
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf('TEST_EXTRA_FOOTER') > -1).toBeTruthy();

      fixtureInstance.vtsRenderExtraFooter = 'TEST_EXTRA_FOOTER_STRING';
      fixture.detectChanges();
      expect(
        overlayContainerElement.textContent!.indexOf(fixtureInstance.vtsRenderExtraFooter) > -1
      ).toBeTruthy();
    }));

    it('should support selected month active', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2019-7-13 15:10:00');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      openPickerByClickTrigger();
      const activeMonthElement = overlayContainerElement.querySelector(
        '.vts-picker-month-panel tr td.vts-picker-cell-selected .vts-picker-cell-inner'
      );
      expect(activeMonthElement!.textContent).toContain('7月');
    }));
  }); // /specified date picker testing

  describe('ngModel value accesors', () => {
    beforeEach(() => (fixtureInstance.useSuite = 3));

    it('should specified date provide by "modelValue" be choosed', fakeAsync(() => {
      fixtureInstance.modelValue = new Date('2018-11');
      fixture.detectChanges();
      flush(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getSelectedMonthCell().textContent).toContain('11');

      // Click the first cell to change ngModel
      const cell = getFirstMonthCell();
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.modelValue.getMonth() + 1).toBe(parseInt(cellText, 10));
    }));
  });

  ////////////

  function getSuperPreBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-prev-btn`);
  }

  function getSuperNextBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-next-btn`);
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.vts-picker-panel-container') as HTMLElement;
  }

  function getSelectedMonthCell(): HTMLElement {
    return queryFromOverlay('.vts-picker-month-panel td.vts-picker-cell-selected') as HTMLElement;
  }

  function getFirstMonthCell(): HTMLElement {
    return queryFromOverlay(
      '.vts-picker-month-panel td.vts-picker-cell:nth-child(1) .vts-picker-cell-inner'
    ) as HTMLElement;
  }

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function openPickerByClickTrigger(): void {
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }
});

@Component({
  template: `
    <ng-container [ngSwitch]="useSuite">
      <!-- Suite 1 -->
      <vts-date-picker
        *ngSwitchCase="1"
        vtsMode="month"
        [vtsAllowClear]="vtsAllowClear"
        [vtsAutoFocus]="vtsAutoFocus"
        [vtsDisabled]="vtsDisabled"
        [vtsDisabledDate]="vtsDisabledDate"
        [vtsLocale]="vtsLocale"
        [vtsPlaceHolder]="vtsPlaceHolder"
        [vtsPopupStyle]="vtsPopupStyle"
        [vtsDropdownClassName]="vtsDropdownClassName"
        [vtsSize]="vtsSize"
        (vtsOpenChange)="vtsOpenChange($event)"
        [ngModel]="vtsValue"
        (ngModelChange)="vtsOnChange($event)"
        [vtsRenderExtraFooter]="vtsRenderExtraFooter"
      ></vts-date-picker>
      <ng-template #tplExtraFooter>TEST_EXTRA_FOOTER</ng-template>

      <!-- Suite 2 -->
      <!-- use another picker to avoid vtsOpen's side-effects beacuse vtsOpen act as "true" if used -->
      <vts-date-picker vtsMode="month" *ngSwitchCase="2" [vtsOpen]="vtsOpen"></vts-date-picker>

      <!-- Suite 3 -->
      <vts-date-picker
        vtsMode="month"
        *ngSwitchCase="3"
        vtsOpen
        [(ngModel)]="modelValue"
      ></vts-date-picker>

      <!-- Suite 4 -->
      <vts-input-group *ngSwitchCase="4" vtsCompact>
        <vts-date-picker vtsMode="month" style="width: 200px;"></vts-date-picker>
        <input vts-input type="text" style="width: 200px;" />
      </vts-input-group>
    </ng-container>
  `
})
class VtsTestMonthPickerComponent {
  useSuite!: 1 | 2 | 3 | 4;
  @ViewChild('tplExtraFooter', { static: true })
  tplExtraFooter!: TemplateRef<void>;
  // --- Suite 1
  vtsAllowClear: boolean = false;
  vtsAutoFocus: boolean = false;
  vtsDisabled: boolean = false;
  vtsDisabledDate!: (d: Date) => boolean;
  vtsLocale: any; // tslint:disable-line:no-any
  vtsPlaceHolder!: string;
  vtsPopupStyle!: NgStyleInterface;
  vtsDropdownClassName!: string;
  vtsSize!: string;

  vtsOpenChange(_: boolean): void {}

  vtsOnChange(_: Date | null): void {}

  vtsValue: Date | null = null;

  vtsRenderExtraFooter!: string | (() => TemplateRef<void> | string);

  // --- Suite 2
  vtsOpen: boolean = false;

  // --- Suite 3
  modelValue!: Date;
}
