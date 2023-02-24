import { Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import isEqual from 'date-fns/isEqual';
import isSameDay from 'date-fns/isSameDay';

import { enUS } from 'date-fns/locale';

import {
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement
} from '@ui-vts/ng-vts/core/testing';
import { NgStyleInterface } from '@ui-vts/ng-vts/core/types';
import { VtsI18nModule, VtsI18nService, VTS_DATE_LOCALE } from '@ui-vts/ng-vts/i18n';
import en_US from '../i18n/languages/en_US';
import { VtsDatePickerComponent } from './date-picker.component';
import { VtsDatePickerModule } from './date-picker.module';
import { ENTER_EVENT, getPickerAbstract, getPickerInput } from './testing/util';
import { PREFIX_CLASS } from './util';

registerLocaleData(zh);

describe('VtsDatePickerComponent', () => {
  let fixture: ComponentFixture<VtsTestDatePickerComponent>;
  let fixtureInstance: VtsTestDatePickerComponent;
  let debugElement: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let i18nService: VtsI18nService;

  beforeEach(fakeAsync(() => {
    const dir = 'ltr';
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NoopAnimationsModule,
        VtsDatePickerModule,
        VtsI18nModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Directionality, useFactory: () => ({ value: dir }) }
        // { provide: VTS_DATE_CONFIG, useValue: { firstDayOfWeek: 1 } }
      ],
      declarations: [VtsTestDatePickerComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsTestDatePickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject(
    [OverlayContainer, VtsI18nService],
    (oc: OverlayContainer, i18n: VtsI18nService) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
      i18nService = i18n;
    }
  ));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
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

    it('should open and close method work', fakeAsync(() => {
      fixture.detectChanges();
      fixtureInstance.datePicker.open();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      fixtureInstance.datePicker.close();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should focus on the trigger after a click outside', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
    }));

    it('should open on enter', fakeAsync(() => {
      fixture.detectChanges();
      getPickerInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();

      getPickerInput(fixture.debugElement).focus();
      getPickerInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
    }));

    it('should open by click and focus on inner calendar input', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
    }));

    it('should open by click, focus on inner calendar input, and submit on enter', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(document.activeElement).toEqual(getPickerInput(fixture.debugElement));
      getPickerInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));

    it('should not submit with invalid input', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement) as HTMLInputElement;
      input.value = 'invalid input';
      fixture.detectChanges();
      input.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();
    }));

    it('should support changing language at runtime', fakeAsync(() => {
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toBe('请选择日期');
      i18nService.setLocale(en_US);
      // i18nService.setDateLocale(en);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toBe('Select date');

      openPickerByClickTrigger();
      expect(queryFromOverlay(`.${PREFIX_CLASS}-content th`).textContent).toContain('Su');
    }));

    /* Issue https://github.com/NG-ZORRO/ng-zorro-antd/issues/1539 */
    it('should be openable after closed by "Escape" key', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();

      openPickerByClickTrigger();
      expect(getPickerContainer()).not.toBeNull();
    }));

    it('should support vtsAllowClear and work properly', fakeAsync(() => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      const initial = (fixtureInstance.vtsValue = new Date());
      fixtureInstance.vtsAllowClear = false;
      fixture.detectChanges();
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();

      fixtureInstance.vtsAllowClear = true;
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.vtsValue).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const vtsOnChange = spyOn(fixtureInstance, 'vtsOnChange');
      debugElement.query(clearBtnSelector).nativeElement.click();
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
      expect(debugElement.query(By.css('.vts-input-disabled'))).not.toBeNull();
      expect(debugElement.query(By.css('.vts-picker-clear'))).toBeNull();

      fixtureInstance.vtsDisabled = false;
      tick(500);
      fixture.detectChanges();
      expect(debugElement.query(By.css('.vts-input-disabled'))).toBeNull();
      expect(debugElement.query(By.css('.vts-picker-clear'))).not.toBeNull();
    }));

    it('should support vtsInputReadOnly', fakeAsync(() => {
      fixtureInstance.vtsInputReadOnly = true;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).toBeTruthy();

      fixtureInstance.vtsInputReadOnly = false;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).readOnly).not.toBeTruthy();
    }));

    it('should support vtsOpen if assigned', fakeAsync(() => {
      fixtureInstance.useSuite = 2;

      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
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
    }));

    it('should support vtsFormat', fakeAsync(() => {
      fixtureInstance.vtsFormat = 'dd.MM.yyyy';
      fixtureInstance.vtsValue = new Date('2020-03-04');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement);
      expect(input.value).toBe('04.03.2020');
      dispatchMouseEvent(queryFromOverlay('.vts-picker-cell')!, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(input.value).toBe('24.02.2020');
    }));

    it('should support vtsDisabledDate', fakeAsync(() => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.vtsValue = new Date('2018-11-11 12:12:12');
      fixtureInstance.vtsDisabledDate = (current: Date) => isSameDay(current, compareDate);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      const disabledCell = queryFromOverlay(`tbody tr td.${PREFIX_CLASS}-cell-disabled div`);
      expect(disabledCell.textContent!.trim()).toBe('15');
      const input = getPickerInput(fixture.debugElement);
      const submit = (date: string) => {
        input.value = date;
        fixture.detectChanges();
        input.dispatchEvent(ENTER_EVENT);
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
      };
      // Should fail to submit a disabled date
      submit('2018-11-15');
      expect(getPickerContainer()).not.toBeNull();
      // But it should be fine to submit an enabled date
      submit('2018-11-11');
      expect(getPickerContainer()).toBeNull();
    }));

    // #5633
    it('should support disable year and month right', fakeAsync(() => {
      fixture.detectChanges();
      fixtureInstance.vtsValue = new Date(2020, 0, 1);
      fixtureInstance.vtsDisabledDate = (date: Date): boolean =>
        date >= new Date(2019, 0, 1) && date < new Date(2019, 0, 2);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-year-btn'), 'click');
      fixture.detectChanges();

      const year2019 = getFirstCell();
      expect(year2019.textContent!.trim()).toBe('2019');
      expect(year2019.classList).not.toContain('vts-picker-cell-disabled');

      dispatchMouseEvent(year2019, 'click');
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-month-btn'), 'click');
      fixture.detectChanges();

      const january = getFirstCell();
      expect(january.textContent!.trim()).toContain('1');
      expect(january.classList).not.toContain('vts-picker-cell-disabled');
    }));

    it('should support vtsLocale', () => {
      const featureKey = 'TEST_PLACEHOLDER';
      fixtureInstance.vtsLocale = { lang: { placeholder: featureKey } };
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
        getPickerAbstract(fixture.debugElement).classList.contains(`${PREFIX_CLASS}-large`)
      ).toBeTruthy();

      fixtureInstance.vtsSize = 'small';
      fixture.detectChanges();
      expect(
        getPickerAbstract(fixture.debugElement).classList.contains(`${PREFIX_CLASS}-small`)
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

    it('should not emit vtsOpenChange second time when input clicked twice', fakeAsync(() => {
      const vtsOpenChange = spyOn(fixtureInstance, 'vtsOpenChange');

      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(vtsOpenChange).toHaveBeenCalledWith(true);
      expect(vtsOpenChange).toHaveBeenCalledTimes(1);
    }));

    it('should not emit vtsOpenChange when vtsOpen is false and input is clicked', fakeAsync(() => {
      const vtsOpenChange = spyOn(fixtureInstance, 'vtsOpenChange');
      fixtureInstance.useSuite = 2;
      fixtureInstance.vtsOpen = false;

      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(vtsOpenChange).not.toHaveBeenCalledWith(true);
    }));

    it('should support vtsValue', fakeAsync(() => {
      fixtureInstance.vtsDefaultPickerValue = new Date('2015-09-17');
      fixtureInstance.vtsValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getSelectedDayCell().textContent!.trim()).toBe('11');
    }));

    it('should support vtsOnChange', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11-11');
      const vtsOnChange = spyOn(fixtureInstance, 'vtsOnChange');
      const vtsOnCalendarChange = spyOn(fixtureInstance, 'vtsOnCalendarChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      const cell = getFirstCell(); // Use the first cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnChange).toHaveBeenCalled();
      expect(vtsOnCalendarChange).not.toHaveBeenCalled();
      const result = (vtsOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getDate()).toBe(+cellText);
    }));

    it('should support vtsDefaultPickerValue', fakeAsync(() => {
      fixture.detectChanges();
      fixtureInstance.vtsDefaultPickerValue = new Date('2015-09-17');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(
        queryFromOverlay('.vts-picker-header-year-btn').textContent!.indexOf('2015') > -1
      ).toBeTruthy();
      expect(
        queryFromOverlay('.vts-picker-header-month-btn').textContent!.indexOf('9') > -1
      ).toBeTruthy();
    }));

    it('should support custom suffixIcon', fakeAsync(() => {
      fixtureInstance.vtsSuffixIcon = 'clock-circle';
      fixture.detectChanges();
      expect(debugElement.query(By.css(`.vtsicon-clock-circle`))).toBeDefined();
    }));

    it('should support vtsBorderless', fakeAsync(() => {
      fixtureInstance.vtsBorderless = true;
      fixture.detectChanges();
      expect(debugElement.query(By.css(`.vts-picker-borderless`))).toBeDefined();
    }));

    it('should support vtsInline', fakeAsync(() => {
      const vtsOnChange = spyOn(fixtureInstance, 'vtsOnChange');
      fixtureInstance.vtsInline = true;
      fixture.detectChanges();
      overlayContainerElement = debugElement.nativeElement as HTMLLIElement;
      const cell = getFirstCell(); // Use the first cell
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnChange).toHaveBeenCalled();
      const result = (vtsOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getDate()).toBe(+cellText);
    }));

    it('should support vtsBackdrop', fakeAsync(() => {
      fixtureInstance.vtsBackdrop = true;
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
    }));
  });

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support date panel changes on click month', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click month
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-month-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getFirstCell(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      // click 2018-01-01
      dispatchMouseEvent(getFirstCell(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('2018-01-01');
    }));

    it('should support date panel changes', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click previous year button
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-year-btn').textContent!.indexOf('2017') > -1
      ).toBeTruthy();
      // Click next year button * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-year-btn').textContent!.indexOf('2019') > -1
      ).toBeTruthy();
      // Click previous month button
      dispatchMouseEvent(getPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-month-btn').textContent!.indexOf('10') > -1
      ).toBeTruthy();
      // Click next month button * 2
      dispatchMouseEvent(getNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-month-btn').textContent!.indexOf('12') > -1
      ).toBeTruthy();
    }));

    it('should support month panel changes', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click month select to show month panel
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-month-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-month-panel')).toBeDefined();
      expect(
        queryFromOverlay('.vts-picker-header-month-btn').textContent!.indexOf('2018') > -1
      ).toBeTruthy();
      // Goto previous year
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-month-btn').textContent!.indexOf('2017') > -1
      ).toBeTruthy();
      // Goto next year * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-month-btn').textContent!.indexOf('2019') > -1
      ).toBeTruthy();
      // Click to choose a year to change panel
      dispatchMouseEvent(queryFromOverlay('td.vts-picker-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-date-panel')).toBeTruthy();
    }));

    it('should support year panel changes', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click year select to show year panel
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-year-panel')).toBeDefined();
      expect(
        queryFromOverlay('.vts-picker-header-year-btn').textContent!.indexOf('2010') > -1
      ).toBeTruthy();
      expect(
        queryFromOverlay('.vts-picker-header-year-btn').textContent!.indexOf('2019') > -1
      ).toBeTruthy();
      // Coverage for last/next cell
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      // Goto previous decade
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-year-btn').textContent!.indexOf('2000') > -1
      ).toBeTruthy();
      expect(
        queryFromOverlay('.vts-picker-header-year-btn').textContent!.indexOf('2009') > -1
      ).toBeTruthy();
      // Goto next decade * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-year-btn').textContent!.indexOf('2020') > -1
      ).toBeTruthy();
      expect(
        queryFromOverlay('.vts-picker-header-year-btn').textContent!.indexOf('2029') > -1
      ).toBeTruthy();
      // Click to choose a year to change panel
      dispatchMouseEvent(queryFromOverlay('td.vts-picker-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-header .vts-picker-year-panel')).toBeFalsy();
    }));

    it('should support decade panel changes', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11-11');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click to show decade panel
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.vts-picker-header-year-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-decade-panel')).toBeDefined();
      // Coverage for last/next cell
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      // Goto previous century
      dispatchMouseEvent(getSuperPreBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-decade-btn').textContent!.indexOf('1900') > -1
      ).toBeTruthy();
      expect(
        queryFromOverlay('.vts-picker-header-decade-btn').textContent!.indexOf('1999') > -1
      ).toBeTruthy();
      // Goto next century * 2
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        queryFromOverlay('.vts-picker-header-decade-btn').textContent!.indexOf('2100') > -1
      ).toBeTruthy();
      expect(
        queryFromOverlay('.vts-picker-header-decade-btn').textContent!.indexOf('2199') > -1
      ).toBeTruthy();
      // Click to choose a decade to change panel
      dispatchMouseEvent(queryFromOverlay('td.vts-picker-cell'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-year-panel')).toBeDefined();
    }));
  }); // /panel switch and move forward/afterward

  describe('specified date picker testing', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support vtsDateRender', fakeAsync(() => {
      fixtureInstance.vtsDateRender = fixtureInstance.tplDateRender;
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.test-first-day').textContent!.trim()).toBe('1');
    }));

    it('should support vtsDateRender with typeof function', fakeAsync(() => {
      const featureKey = 'TEST_FIRST_DAY';
      fixtureInstance.vtsDateRender = (d: Date) => (d.getDate() === 1 ? featureKey : d.getDate());
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf(featureKey) > -1).toBeTruthy();
    }));

    it('should support vtsShowTime', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2018-11-11 11:22:33');
      // tslint:disable-next-line:no-any
      fixtureInstance.vtsShowTime = '' as any;
      fixture.detectChanges();
      openPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-ok')).toBeDefined();
      expect(queryFromOverlay('.vts-picker-time-panel')).toBeDefined();
      expect(
        queryFromOverlay(
          '.vts-picker-time-panel-cell-selected .vts-picker-time-panel-cell-inner'
        ).textContent!.trim()
      ).toBe('11');

      // Click to choose a hour
      dispatchMouseEvent(queryFromOverlay('.vts-picker-time-panel-cell:first-child'), 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('2018-11-11 00:22:33');
    }));

    it('should support vtsShowTime.vtsDefaultOpenValue', fakeAsync(() => {
      fixtureInstance.vtsValue = null;
      fixtureInstance.vtsShowTime = {
        vtsDefaultOpenValue: new Date(0, 0, 0, 0, 1, 2)
      };
      fixture.detectChanges();
      openPickerByClickTrigger();

      dispatchMouseEvent(getFirstCell(), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toContain('00:01:02');

      const listOfSelectedLi = overlayContainerElement.querySelectorAll(
        '.vts-picker-time-panel-cell-selected .vts-picker-time-panel-cell-inner'
      );
      expect(listOfSelectedLi[0].textContent!.trim()).toBe('00');
      expect(listOfSelectedLi[1].textContent!.trim()).toBe('01');
      expect(listOfSelectedLi[2].textContent!.trim()).toBe('02');
    }));

    it('should not reset time', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2019-08-02 13:03:33');
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      dispatchMouseEvent(getFirstCell(), 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('2019-07-29 13:03:33');
    }));

    it('should support vtsShowTime.vtsFormat', fakeAsync(() => {
      fixtureInstance.vtsShowTime = { vtsFormat: 'HH:mm' };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelectorAll('.vts-picker-time-panel-column').length).toBe(
        2
      );
    }));

    it('should support vtsDisabledTime and vtsShowTime.vtsHideDisabledOptions', fakeAsync(() => {
      fixtureInstance.vtsShowTime = true;
      fixtureInstance.vtsDisabledTime = () => {
        return {
          vtsDisabledHours: () => [0, 1, 2],
          vtsDisabledMinutes: () => [0, 1],
          vtsDisabledSeconds: () => [0]
        };
      };
      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(
        queryFromOverlay('.vts-picker-time-panel-column li:nth-child(3)').classList.contains(
          'vts-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();
      expect(
        queryFromOverlay(
          '.vts-picker-time-panel-column:nth-child(2) li:nth-child(2)'
        ).classList.contains('vts-picker-time-panel-cell-disabled')
      ).toBeTruthy();
      expect(
        queryFromOverlay(
          '.vts-picker-time-panel-column:nth-child(3) li:nth-child(1)'
        ).classList.contains('vts-picker-time-panel-cell-disabled')
      ).toBeTruthy();

      // Use vtsHideDisabledOptions to hide disabled times
      fixtureInstance.vtsShowTime = { vtsHideDisabledOptions: true };
      fixture.detectChanges();
      expect(
        +queryFromOverlay(
          '.vts-picker-time-panel-column:nth-child(1) li:first-child'
        ).textContent!.trim()
      ).toBe(3);
      expect(
        +queryFromOverlay(
          '.vts-picker-time-panel-column:nth-child(2) li:first-child'
        ).textContent!.trim()
      ).toBe(2);
      expect(
        +queryFromOverlay(
          '.vts-picker-time-panel-column:nth-child(3) li:first-child'
        ).textContent!.trim()
      ).toBe(1);
    }));

    it('should vtsDisabledTime invalid input not emit', fakeAsync(() => {
      fixtureInstance.vtsShowTime = true;
      fixtureInstance.vtsDisabledTime = () => {
        return {
          vtsDisabledHours: () => [0, 1, 2],
          vtsDisabledMinutes: () => [0, 1],
          vtsDisabledSeconds: () => [0]
        };
      };
      fixture.detectChanges();
      openPickerByClickTrigger();

      // input disabled value
      const input = getPickerInput(fixture.debugElement);
      typeInElement('2020-03-14 00:00:00', input);
      fixture.detectChanges();
      input.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).not.toBeNull();

      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('');
    }));

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

    it('should support vtsShowToday', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.vts-picker-footer')).toBeDefined();

      fixtureInstance.vtsShowToday = true;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.vts-picker-today-btn')).toBeDefined();

      // Click today button
      const vtsOnChange = spyOn(fixtureInstance, 'vtsOnChange');
      dispatchMouseEvent(queryFromOverlay('.vts-picker-today-btn'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const result = (vtsOnChange.calls.allArgs()[0] as Date[])[0];
      expect(isSameDay(new Date(), result)).toBeTruthy();
      expect(queryFromOverlay('.vts-picker-container')).toBeFalsy(); // Should closed
    }));

    it('should support vtsShowNow', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.vts-picker-footer')).toBeDefined();

      fixtureInstance.vtsShowTime = true;

      fixtureInstance.vtsShowNow = false;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.vts-picker-now-btn')).toBeNull();

      fixtureInstance.vtsShowNow = true;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.vts-picker-now-btn')).toBeDefined();

      // Click now button
      const vtsOnChange = spyOn(fixtureInstance, 'vtsOnChange');
      dispatchMouseEvent(queryFromOverlay('.vts-picker-now-btn'), 'click');
      fixture.detectChanges();

      // Click ok button
      dispatchMouseEvent(
        overlayContainerElement.querySelector('.vts-picker-ok > button')!,
        'click'
      );
      const result = (vtsOnChange.calls.allArgs()[0] as Date[])[0];
      expect(isEqual(new Date(), result)).toBeTruthy();
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-container')).toBeFalsy(); // Should closed
    }));

    it('should support vtsMode', fakeAsync(() => {
      fixtureInstance.vtsValue = new Date('2020-12-01');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toEqual('请选择日期');

      fixtureInstance.vtsMode = 'month';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).placeholder).toEqual('请选择月份');
      expect(getPickerInput(fixture.debugElement).value).toEqual('2020-12');

      openPickerByClickTrigger();
      expect(overlayContainerElement.querySelector('.vts-picker-month-panel')).toBeDefined();
    }));

    it('should support vtsOnPanelChange', fakeAsync(() => {
      spyOn(fixtureInstance, 'vtsOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click header to month panel
      dispatchMouseEvent(
        overlayContainerElement.querySelector('.vts-picker-header-month-btn')!,
        'click'
      );
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.vtsOnPanelChange).toHaveBeenCalledWith('month');
    }));

    it('should support vtsOnOk', fakeAsync(() => {
      spyOn(fixtureInstance, 'vtsOnOk');
      fixtureInstance.vtsValue = new Date('2018-11-11 11:22:33');
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click ok button
      dispatchMouseEvent(
        overlayContainerElement.querySelector('.vts-picker-ok > button')!,
        'click'
      );
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(fixtureInstance.vtsOnOk).toHaveBeenCalledWith(fixtureInstance.vtsValue);
    }));

    it('should custom input date', fakeAsync(() => {
      const vtsOnChange = spyOn(fixtureInstance, 'vtsOnChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement);

      // Wrong inputing support
      typeInElement('wrong', input);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      // expect(input.classList.contains('vts-calendar-input-invalid')).toBeTruthy();

      // Correct inputing
      input.value = '2018-11-22';
      input.dispatchEvent(ENTER_EVENT);
      // dispatchKeyboardEvent(input, 'keyup', ENTER); // Not working?
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(vtsOnChange).toHaveBeenCalled();
      const result = (vtsOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getDate()).toBe(22);
    }));

    // #6070
    it('should reset after inputing invalid value and close panel', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      const input = getPickerInput(fixture.debugElement);

      // Wrong inputing support
      typeInElement('wrong', input);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(input.value).toBe('');
    }));
  }); // /specified date picker testing

  function getPreBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-prev-btn`);
  }

  function getNextBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-next-btn`);
  }

  function getSuperPreBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-prev-btn`);
  }

  function getSuperNextBtn(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-header-super-next-btn`);
  }

  describe('ngModel value accesors', () => {
    beforeEach(() => (fixtureInstance.useSuite = 3));

    it('should specified date provide by "modelValue" be chosen', fakeAsync(() => {
      fixtureInstance.modelValue = new Date('2018-11-11');
      fixture.detectChanges();
      flush(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getSelectedDayCell().textContent!.trim()).toBe('11');

      // Click the first cell to change ngModel
      const cell = getFirstCell();
      const cellText = cell.textContent!.trim();
      dispatchMouseEvent(cell, 'click');
      fixture.detectChanges();
      expect(fixtureInstance.modelValue.getDate()).toBe(+cellText);
    }));
  });

  describe('formControl', () => {
    beforeEach(() => (fixtureInstance.useSuite = 4));

    it('should formControl init work', fakeAsync(() => {
      fixtureInstance.control = new UntypedFormControl(new Date('2020-04-08'));
      fixture.detectChanges();
      flush(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value!.trim()).toBe('2020-04-08');
    }));

    it('should disabled work', fakeAsync(() => {
      fixtureInstance.control = new UntypedFormControl({
        value: new Date('2020-04-24'),
        disabled: true
      });
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('disabled')).not.toBeNull();
    }));
  });

  ////////////

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-panel-container`) as HTMLElement;
  }

  function getSelectedDayCell(): HTMLElement {
    return queryFromOverlay(
      `.${PREFIX_CLASS}-body tr td.vts-picker-cell-selected div`
    ) as HTMLElement;
  }

  function getFirstCell(): HTMLElement {
    return queryFromOverlay(`.${PREFIX_CLASS}-body tr td`) as HTMLElement;
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

describe('date-fns testing', () => {
  let fixture: ComponentFixture<VtsTestDatePickerComponent>;
  let fixtureInstance: VtsTestDatePickerComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule, VtsDatePickerModule, VtsI18nModule],
      providers: [{ provide: VTS_DATE_LOCALE, useValue: enUS }],
      declarations: [VtsTestDatePickerComponent]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsTestDatePickerComponent);
    fixtureInstance = fixture.componentInstance;
    fixtureInstance.useSuite = 1;
  });

  it('should parse input value with vtsFormat', fakeAsync(() => {
    const vtsOnChange = spyOn(fixtureInstance, 'vtsOnChange');
    fixtureInstance.vtsFormat = 'dd.MM.yyyy';
    fixture.detectChanges();
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    const input = getPickerInput(fixture.debugElement);
    typeInElement('25.10.2019', input);
    fixture.detectChanges();
    input.dispatchEvent(ENTER_EVENT);
    fixture.detectChanges();
    flush();
    const result = (vtsOnChange.calls.allArgs()[0] as Date[])[0];
    expect(result.getFullYear()).toBe(2019);
    expect(result.getMonth() + 1).toBe(10);
    expect(result.getDate()).toBe(25);
  }));
});

@Component({
  template: `
    <ng-container [ngSwitch]="useSuite">
      <!-- Suite 1 -->
      <vts-date-picker
        *ngSwitchCase="1"
        [vtsAllowClear]="vtsAllowClear"
        [vtsAutoFocus]="vtsAutoFocus"
        [vtsDisabled]="vtsDisabled"
        [vtsInputReadOnly]="vtsInputReadOnly"
        [vtsDisabledDate]="vtsDisabledDate"
        [vtsFormat]="vtsFormat"
        [vtsLocale]="vtsLocale"
        [vtsPlaceHolder]="vtsPlaceHolder"
        [vtsPopupStyle]="vtsPopupStyle"
        [vtsDropdownClassName]="vtsDropdownClassName"
        [vtsSize]="vtsSize"
        (vtsOpenChange)="vtsOpenChange($event)"
        [ngModel]="vtsValue"
        (ngModelChange)="vtsOnChange($event)"
        [vtsDefaultPickerValue]="vtsDefaultPickerValue"
        [vtsDateRender]="vtsDateRender"
        [vtsDisabledTime]="vtsDisabledTime"
        [vtsRenderExtraFooter]="vtsRenderExtraFooter"
        [vtsShowToday]="vtsShowToday"
        [vtsShowNow]="vtsShowNow"
        [vtsMode]="vtsMode"
        (vtsOnPanelChange)="vtsOnPanelChange($event)"
        (vtsOnCalendarChange)="vtsOnCalendarChange($event)"
        [vtsShowTime]="vtsShowTime"
        (vtsOnOk)="vtsOnOk($event)"
        [vtsSuffixIcon]="vtsSuffixIcon"
        [vtsBorderless]="vtsBorderless"
        [vtsInline]="vtsInline"
        [vtsBackdrop]="vtsBackdrop"
      ></vts-date-picker>
      <ng-template #tplDateRender let-current>
        <div [class.test-first-day]="current.getDate() === 1">
          {{ current.getDate() }}
        </div>
      </ng-template>
      <ng-template #tplExtraFooter>TEST_EXTRA_FOOTER</ng-template>

      <!-- Suite 2 -->
      <!-- use another picker to avoid vtsOpen's side-effects beacuse vtsOpen act as "true" if used -->
      <vts-date-picker
        *ngSwitchCase="2"
        [vtsOpen]="vtsOpen"
        (vtsOpenChange)="vtsOpenChange($event)"
      ></vts-date-picker>

      <!-- Suite 3 -->
      <vts-date-picker *ngSwitchCase="3" vtsOpen [(ngModel)]="modelValue"></vts-date-picker>

      <!-- Suite 4 -->
      <vts-date-picker *ngSwitchCase="4" [formControl]="control"></vts-date-picker>
    </ng-container>
  `
})
class VtsTestDatePickerComponent {
  useSuite!: 1 | 2 | 3 | 4;
  @ViewChild('tplDateRender', { static: true })
  tplDateRender!: TemplateRef<Date>;
  @ViewChild('tplExtraFooter', { static: true })
  tplExtraFooter!: TemplateRef<void>;
  @ViewChild(VtsDatePickerComponent, { static: false })
  datePicker!: VtsDatePickerComponent;
  // --- Suite 1
  vtsAllowClear: boolean = false;
  vtsAutoFocus: boolean = false;
  vtsDisabled: boolean = false;
  vtsInputReadOnly: boolean = false;
  vtsFormat!: string;
  vtsDisabledDate!: (d: Date) => boolean;
  vtsLocale: any; // tslint:disable-line:no-any
  vtsPlaceHolder!: string;
  vtsPopupStyle!: NgStyleInterface;
  vtsDropdownClassName!: string;
  vtsSize!: string;

  vtsOnChange(_: Date | null): void {}
  vtsOnCalendarChange(): void {}
  vtsOpenChange(_: boolean): void {}

  vtsValue: Date | null = null;
  vtsDefaultPickerValue: Date | null = null;
  vtsDateRender: any; // tslint:disable-line:no-any
  vtsShowTime: boolean | object = false;
  vtsDisabledTime: any; // tslint:disable-line:no-any
  vtsRenderExtraFooter!: string | (() => TemplateRef<void> | string);
  vtsShowToday = false;
  vtsShowNow = false;
  vtsMode: string = 'date';
  vtsSuffixIcon!: string;
  vtsBorderless = false;
  vtsInline = false;
  vtsBackdrop = false;

  // vtsRanges;
  vtsOnPanelChange(_: string): void {}

  vtsOnOk(_: Date): void {}

  // --- Suite 2
  vtsOpen: boolean = false;

  // --- Suite 3
  modelValue!: Date;

  // --- Suite 4
  control!: UntypedFormControl;
}
