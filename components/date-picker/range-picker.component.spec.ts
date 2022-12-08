import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import differenceInDays from 'date-fns/differenceInDays';
import isSameDay from 'date-fns/isSameDay';

import {
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement
} from '@ui-vts/ng-vts/core/testing';
import { CandyDate } from '@ui-vts/ng-vts/core/time';
import { NgStyleInterface } from '@ui-vts/ng-vts/core/types';
import { RangePartType } from '@ui-vts/ng-vts/date-picker/standard-types';
import {
  ENTER_EVENT,
  getPickerAbstract,
  getPickerInput,
  getRangePickerRightInput
} from '@ui-vts/ng-vts/date-picker/testing/util';
import { PREFIX_CLASS } from '@ui-vts/ng-vts/date-picker/util';
import { VtsDatePickerModule } from './date-picker.module';

registerLocaleData(zh);

describe('VtsRangePickerComponent', () => {
  let fixture: ComponentFixture<VtsTestRangePickerComponent>;
  let fixtureInstance: VtsTestRangePickerComponent;
  let debugElement: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule, VtsDatePickerModule],
      providers: [],
      declarations: [VtsTestRangePickerComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsTestRangePickerComponent);
    fixtureInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

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

    it('should focus on the trigger after a click outside', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).matches(':focus-within')).toBeTruthy();
    }));

    it('should open on enter while focusing', fakeAsync(() => {
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

    it('should support vtsAllowClear and work properly', fakeAsync(() => {
      const clearBtnSelector = By.css(`.${PREFIX_CLASS}-clear`);
      const initial = (fixtureInstance.modelValue = [new Date(), new Date()]);
      fixtureInstance.vtsAllowClear = false;
      fixture.detectChanges();
      expect(debugElement.query(clearBtnSelector)).toBeNull();

      fixtureInstance.vtsAllowClear = true;
      tick();
      fixture.detectChanges();
      expect(fixtureInstance.modelValue).toBe(initial);
      expect(debugElement.query(clearBtnSelector)).toBeDefined();

      const vtsOnChange = spyOn(fixtureInstance, 'modelValueChange');
      debugElement.query(clearBtnSelector).nativeElement.click();
      fixture.detectChanges();
      expect(fixtureInstance.modelValue.length).toBe(0);
      expect(vtsOnChange).toHaveBeenCalledWith([]);
      expect(debugElement.query(clearBtnSelector)).toBeFalsy();
    }));

    it('should support vtsAutoFocus', fakeAsync(() => {
      fixtureInstance.vtsAutoFocus = true;
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    }));

    it('should support vtsDisabled', fakeAsync(() => {
      // Make sure picker clear button shown up
      fixtureInstance.vtsAllowClear = true;
      fixtureInstance.modelValue = [new Date(), new Date()];

      fixtureInstance.vtsDisabled = true;
      fixture.detectChanges();
      expect(debugElement.query(By.css('.vts-picker-disabled'))).not.toBeNull();
      expect(debugElement.query(By.css('.vts-picker-clear'))).toBeNull();

      fixtureInstance.vtsDisabled = false;
      tick();
      fixture.detectChanges();
      expect(debugElement.query(By.css('.vts-picker-disabled'))).toBeNull();
      expect(debugElement.query(By.css('.vts-picker-clear'))).not.toBeNull();
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

    it('should support vtsDisabledDate', fakeAsync(() => {
      fixture.detectChanges();
      const compareDate = new Date('2018-11-15 00:00:00');
      fixtureInstance.modelValue = [new Date('2018-11-11 12:12:12'), null];
      fixtureInstance.vtsDisabledDate = (current: Date) => isSameDay(current, compareDate);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      const disabledCell = queryFromOverlay('td.vts-picker-cell-disabled .vts-picker-cell-inner');
      expect(disabledCell.textContent!.trim()).toBe('15');
    }));

    it('should support vtsLocale', () => {
      const featureKey = 'LEFT_PLACEHOLDER';
      fixtureInstance.vtsLocale = {
        lang: { rangePlaceholder: [featureKey, 'End'] }
      };
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).getAttribute('placeholder')).toBe(featureKey);
    });

    it('should support vtsPlaceHolder', () => {
      const featureKey = 'RIGHT_PLACEHOLDER';
      fixtureInstance.vtsPlaceHolder = ['Start', featureKey];
      fixture.detectChanges();
      expect(getRangePickerRightInput(fixture.debugElement).getAttribute('placeholder')).toBe(
        featureKey
      );
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
      tick(500);
      fixture.detectChanges();
      expect(vtsOpenChange).toHaveBeenCalledWith(false);
      expect(vtsOpenChange).toHaveBeenCalledTimes(2);
    }));

    it('should support vtsValue', fakeAsync(() => {
      fixtureInstance.vtsDefaultPickerValue = [new Date('2012-03-18'), new Date('2019-12-12')];
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-12-11')];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getFirstSelectedDayCell().textContent!.trim()).toBe('11');
    }));

    it('should support vtsDefaultPickerValue', fakeAsync(() => {
      fixtureInstance.vtsDefaultPickerValue = [new Date('2012-01-18'), new Date('2019-11-11')];
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(getHeaderMonthBtn().textContent!.indexOf('1') > -1).toBeTruthy();
      expect(
        queryFromRightPanel('.vts-picker-header-month-btn').textContent!.indexOf('2') > -1
      ).toBeTruthy();
    }));

    it('should support vtsSeparator', fakeAsync(() => {
      fixtureInstance.vtsSeparator = '→';
      fixture.detectChanges();
      expect(
        fixture.debugElement
          .query(By.css(`.vts-picker-range-separator`))
          .nativeElement.textContent.trim()
      ).toBe('→');
    }));

    it('should support vtsOnCalendarChange', fakeAsync(() => {
      const vtsOnCalendarChange = spyOn(fixtureInstance, 'vtsOnCalendarChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const left = getFirstCell('left');
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnCalendarChange).toHaveBeenCalled();
      let result = (vtsOnCalendarChange.calls.allArgs()[0] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
      const right = getFirstCell('right');
      const rightText = right.textContent!.trim();
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnCalendarChange).toHaveBeenCalled();
      result = (vtsOnCalendarChange.calls.allArgs()[1] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
      expect((result[1] as Date).getDate()).toBe(+rightText);
    }));

    it('should support vtsOnCalendarChange when vtsShowTime is true', fakeAsync(() => {
      const vtsOnCalendarChange = spyOn(fixtureInstance, 'vtsOnCalendarChange');
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();
      const left = getFirstCell('left');
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      dispatchMouseEvent(queryFromOverlay('.vts-picker-ok > button'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnCalendarChange).toHaveBeenCalled();
    }));

    it('should support vtsOnChange', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-11-11')];
      const vtsOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(vtsOnChange).not.toHaveBeenCalled();
      // now the cursor focus on right
      const right = getFirstCell('right');
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const result = (vtsOnChange.calls.allArgs()[0] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
    }));

    it('should support vtsInline', fakeAsync(() => {
      const vtsOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-11-11')];
      fixtureInstance.vtsInline = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      overlayContainerElement = debugElement.nativeElement as HTMLLIElement;

      const left = getFirstCell('left'); // Use the first cell
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(vtsOnChange).not.toHaveBeenCalled();
      // now the cursor focus on right
      const right = getFirstCell('right');
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const result = (vtsOnChange.calls.allArgs()[0] as Date[][])[0];
      expect((result[0] as Date).getDate()).toBe(+leftText);
    }));
  }); // /general api testing

  describe('panel switch and move forward/afterward', () => {
    beforeEach(() => (fixtureInstance.useSuite = 1));

    it('should support date panel changes', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-6-11'), new Date('2018-12-12')];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click previous year button
      dispatchMouseEvent(getSuperPreBtn('left'), 'click');
      fixture.detectChanges();
      expect(getHeaderYearBtn('left').textContent!.indexOf('2017') > -1).toBeTruthy();
      // Click next year button * 2
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();
      expect(getHeaderYearBtn('left').textContent!.indexOf('2019') > -1).toBeTruthy();
      // Click previous month button
      dispatchMouseEvent(getPreBtn('left'), 'click');
      fixture.detectChanges();
      expect(getHeaderMonthBtn().textContent!.indexOf('5') > -1).toBeTruthy();
      // Click next month button * 2
      dispatchMouseEvent(getNextBtn('left'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(getNextBtn('left'), 'click');
      fixture.detectChanges();
      expect(getHeaderMonthBtn().textContent!.indexOf('7') > -1).toBeTruthy();
    }));

    it('should support keep initValue when reopen panel', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-6-11'), new Date('2018-12-12')];
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Click next year button * 2
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();
      dispatchMouseEvent(getSuperNextBtn('left'), 'click');
      fixture.detectChanges();

      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      openPickerByClickTrigger();
      expect(getHeaderYearBtn('left').textContent!.indexOf('2018') > -1).toBeTruthy();
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
      fixtureInstance.vtsDateRender = (d: CandyDate) =>
        d.getDate() === 1 ? featureKey : d.getDate();
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(overlayContainerElement.textContent!.indexOf(featureKey) > -1).toBeTruthy();
    }));

    it('should support vtsShowTime', fakeAsync(() => {
      fixtureInstance.modelValue = [
        new Date('2018-11-11 11:22:33'),
        new Date('2018-12-12 11:22:33')
      ];
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-ok')).toBeDefined();
      expect(
        queryFromOverlay(
          '.vts-picker-panel .vts-picker-time-picker-inner.vts-picker-time-picker-column-3'
        )
      ).toBeDefined();
      expect(
        queryFromOverlay(
          '.vts-picker-panel .vts-picker-time-panel-cell-selected .vts-picker-time-panel-cell-inner'
        ).textContent!.trim()
      ).toBe('11');

      // Click to choose a hour
      dispatchMouseEvent(
        queryFromOverlay('.vts-picker-time-panel-column .vts-picker-time-panel-cell:first-child'),
        'click'
      );
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement).value).toBe('2018-11-11 00:22:33');
    }));

    it('should support hover date cell style', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const rightInNextMonth = queryFromRightPanel('table tr:nth-child(3) td.vts-picker-cell');
      dispatchMouseEvent(rightInNextMonth, 'mouseenter');
      fixture.detectChanges();
      expect(rightInNextMonth.classList.contains('vts-picker-cell-range-hover-end')).toBeTruthy();
    }));

    it('should support active part change when select one', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      // Choose left part first
      dispatchMouseEvent(getFirstCell('left'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        getRangePickerRightInput(fixture.debugElement) === document.activeElement
      ).toBeTruthy();

      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      // Choose right part first
      openRightPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      dispatchMouseEvent(getFirstCell('right'), 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    }));

    it('should support select end date first with time panel', fakeAsync(() => {
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      openRightPickerByClickTrigger();
      flush();
      fixture.detectChanges();
      const okButton = queryFromOverlay('.vts-picker-ok > button');
      expect(okButton.getAttribute('disabled')).not.toBeNull();

      // Click to choose a hour
      dispatchMouseEvent(
        queryFromRightPanel(
          '.vts-picker-time-panel-column .vts-picker-time-panel-cell:first-child'
        ),
        'click'
      );
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(okButton.getAttribute('disabled')).toBeNull();

      dispatchMouseEvent(okButton, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerInput(fixture.debugElement) === document.activeElement).toBeTruthy();
    }));

    it('should support vtsShowTime.vtsFormat', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-12-12')];
      fixtureInstance.vtsShowTime = { vtsFormat: 'HH:mm' };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(
        overlayContainerElement.querySelectorAll(
          '.vts-picker-panel:first-child .vts-picker-time-panel-column'
        ).length
      ).toBe(2);
    }));

    it('should support vtsDisabledTime and vtsShowTime.vtsHideDisabledOptions', fakeAsync(() => {
      fixtureInstance.modelValue = [
        new Date('2018-11-11 11:11:11'),
        new Date('2018-12-12 12:12:12')
      ];
      fixtureInstance.vtsShowTime = true;
      fixtureInstance.vtsDisabledTime = (_current: Date, partial: 'start' | 'end') => {
        return partial === 'start'
          ? {
              vtsDisabledHours: () => [0, 1, 2],
              vtsDisabledMinutes: () => [0, 1],
              vtsDisabledSeconds: () => [0]
            }
          : {
              vtsDisabledHours: () => [0, 1, 2, 3],
              vtsDisabledMinutes: () => [0, 1, 2],
              vtsDisabledSeconds: () => [0, 1]
            };
      };
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Left time picker
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

      // Close left panel
      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();

      // Right time picker
      openRightPickerByClickTrigger();
      expect(
        queryFromRightPanel('.vts-picker-time-panel-column li:nth-child(4)').classList.contains(
          'vts-picker-time-panel-cell-disabled'
        )
      ).toBeTruthy();
      expect(
        queryFromRightPanel(
          '.vts-picker-time-panel-column:nth-child(2) li:nth-child(3)'
        ).classList.contains('vts-picker-time-panel-cell-disabled')
      ).toBeTruthy();
      expect(
        queryFromRightPanel(
          '.vts-picker-time-panel-column:nth-child(3) li:nth-child(2)'
        ).classList.contains('vts-picker-time-panel-cell-disabled')
      ).toBeTruthy();

      // Use vtsHideDisabledOptions to hide disabled times
      fixtureInstance.vtsShowTime = { vtsHideDisabledOptions: true };
      fixture.detectChanges();

      // Close left panel
      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openPickerByClickTrigger();
      // Left time picker
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

      // Close left panel
      dispatchMouseEvent(document.body, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      openRightPickerByClickTrigger();
      // Right time picker
      expect(
        +queryFromRightPanel(
          '.vts-picker-time-panel-column:nth-child(1) li:first-child'
        ).textContent!.trim()
      ).toBe(4);
      expect(
        +queryFromRightPanel(
          '.vts-picker-time-panel-column:nth-child(2) li:first-child'
        ).textContent!.trim()
      ).toBe(3);
      expect(
        +queryFromRightPanel(
          '.vts-picker-time-panel-column:nth-child(3) li:first-child'
        ).textContent!.trim()
      ).toBe(2);
    }));

    it('should focus to invalid input when sorted', fakeAsync(() => {
      const vtsOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.modelValue = [
        new Date('2018-11-11 01:00:00'),
        new Date('2018-12-12 00:00:00')
      ];
      fixtureInstance.vtsShowTime = true;
      fixtureInstance.vtsDisabledTime = (_current: Date, partial: 'start' | 'end') => {
        return partial === 'start'
          ? {
              vtsDisabledHours: () => [0]
            }
          : {
              vtsDisabledHours: () => [1]
            };
      };
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      const okButton = queryFromOverlay('.vts-picker-ok > button');
      // will sort value
      typeInElement('2019-11-11 01:00:00', leftInput);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(leftInput.value.trim()).toBe('2019-11-11 01:00:00');
      expect(okButton.getAttribute('disabled')).toEqual(null);

      const newValidDateString = ['2020-12-12 01:00:00', '2021-11-11 00:00:00'];
      typeInElement(newValidDateString[0], leftInput);
      fixture.detectChanges();
      dispatchMouseEvent(okButton, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(rightInput === document.activeElement).toBe(true);

      typeInElement(newValidDateString[1], rightInput);
      fixture.detectChanges();
      dispatchMouseEvent(okButton, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnChange).toHaveBeenCalledWith([
        new Date(newValidDateString[0]),
        new Date(newValidDateString[1])
      ]);
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

    it('should support vtsOnPanelChange', fakeAsync(() => {
      spyOn(fixtureInstance, 'vtsOnPanelChange');
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click header to month panel
      // Left
      dispatchMouseEvent(
        overlayContainerElement.querySelector('.vts-picker-panel .vts-picker-header-month-btn')!,
        'click'
      );
      fixture.detectChanges();
      // Right
      dispatchMouseEvent(
        overlayContainerElement.querySelector(
          '.vts-picker-panel:last-child .vts-picker-header-year-btn'
        )!,
        'click'
      );
      fixture.detectChanges();
      expect(fixtureInstance.vtsOnPanelChange).toHaveBeenCalledWith(['month', 'year']);
    }));

    it('should support vtsOnOk', fakeAsync(() => {
      spyOn(fixtureInstance, 'vtsOnOk');
      fixtureInstance.modelValue = [
        new Date('2018-11-11 11:22:33'),
        new Date('2018-12-12 11:22:33')
      ];
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click ok button
      dispatchMouseEvent(
        overlayContainerElement.querySelector('.vts-picker-ok > button')!,
        'click'
      );
      fixture.detectChanges();
      tick(500);
      expect(fixtureInstance.vtsOnOk).toHaveBeenCalledWith(fixtureInstance.modelValue);
    }));

    it('should select date from start to end with side effects', fakeAsync(() => {
      const initial = (fixtureInstance.modelValue = [
        new Date('2018-05-15'),
        new Date('2018-06-15')
      ]);
      fixtureInstance.vtsDisabledDate = (current: Date) =>
        differenceInDays(current, initial[0]) < 0;
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      // Click start date
      const startDate = queryFromOverlay('.vts-picker-panel td.vts-picker-cell-selected');
      dispatchMouseEvent(startDate, 'click');
      fixture.detectChanges();
      expect(startDate.classList.contains('vts-picker-cell-selected')).toBeTruthy();
    }));

    it('should display expected date when the range values are the same day (include the scenario of timepicker)', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-05-15'), new Date('2018-05-15')];
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      expect(getHeaderMonthBtn().textContent).toContain('5');
    }));

    it('should support vtsRanges', fakeAsync(() => {
      const today = new Date();
      const vtsOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.vtsRanges = { Today: [today, today] };
      fixture.detectChanges();
      openPickerByClickTrigger();
      expect(queryFromOverlay('.vts-picker-ranges .vts-picker-preset')).toBeDefined();

      let selector: HTMLElement;

      selector = queryFromOverlay('.vts-picker-ranges li.vts-picker-preset:first-child');
      dispatchMouseEvent(selector, 'mouseenter');
      fixture.detectChanges();
      expect(
        queryFromOverlay(
          '.vts-picker-panel td.vts-picker-cell-range-hover-start .vts-picker-cell-inner'
        ).textContent
      ).toContain(`${today.getDate()}`);

      // selector = queryFromOverlay('.vts-picker-ranges li.vts-picker-preset:first-child');
      dispatchMouseEvent(selector, 'mouseleave');
      tick(500);
      fixture.detectChanges();
      expect(queryFromOverlay('.vts-picker-panel td.vts-picker-cell-selected')).toBeFalsy();

      // selector = queryFromOverlay('.vts-picker-range-quick-selector > a');
      dispatchMouseEvent(selector, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnChange).toHaveBeenCalled();
      expect(getPickerContainer()).toBeFalsy();
    }));

    it('should custom input date range', fakeAsync(() => {
      const vtsOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixture.detectChanges();
      openPickerByClickTrigger();
      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);

      typeInElement('2018-11-11', leftInput);
      fixture.detectChanges();

      // should focus the other input
      leftInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      expect(
        getRangePickerRightInput(fixture.debugElement) === document.activeElement
      ).toBeTruthy();

      typeInElement('2018-12-12', rightInput);
      rightInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnChange).toHaveBeenCalled();
      const result = (vtsOnChange.calls.allArgs()[0] as Date[][])[0];
      expect(result[0].getDate()).toBe(11);
      expect(result[1].getDate()).toBe(12);
    }));

    it('should custom input time range', fakeAsync(() => {
      const vtsOnChange = spyOn(fixtureInstance, 'modelValueChange');
      fixtureInstance.modelValue = [
        new Date('2019-11-11 11:22:33'),
        new Date('2019-12-12 11:22:33')
      ];
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      const newDateString = ['2019-09-15 11:08:22', '2020-10-10 11:08:22'];
      typeInElement(newDateString[0], leftInput);
      fixture.detectChanges();
      typeInElement(newDateString[1], rightInput);
      fixture.detectChanges();
      rightInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      expect(vtsOnChange).toHaveBeenCalledWith([
        new Date(newDateString[0]),
        new Date(newDateString[1])
      ]);
    }));

    it('should not change value when click ESC', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-09-11'), new Date('2020-09-12')];
      fixture.detectChanges();
      tick(); // Wait writeValue() tobe done
      fixture.detectChanges();
      openPickerByClickTrigger();
      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);

      typeInElement('2019-11-05', leftInput);
      fixture.detectChanges();
      // TODO: value should be change
      // expect(getFirstSelectedDayCell().textContent!.trim()).toBe('5');
      typeInElement('2019-12-08', rightInput);
      fixture.detectChanges();
      // expect(getSecondSelectedDayCell().textContent!.trim()).toBe('8');
      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      // TODO: input value should not be change
      // expect(leftInput.value).toBe('2018-09-11');
    }));

    it('should auto sort range value when start is after end', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();
      const leftInput = getPickerInput(fixture.debugElement);
      const rightInput = getRangePickerRightInput(fixture.debugElement);
      typeInElement('2019-08-10', leftInput);
      fixture.detectChanges();
      typeInElement('2018-02-06', rightInput);
      fixture.detectChanges();
      getRangePickerRightInput(fixture.debugElement).dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(leftInput.value).toBe('');
      expect(rightInput.value).toBe('2018-02-06');
    }));

    it('should panel date follows the selected date', fakeAsync(() => {
      fixtureInstance.vtsShowTime = true;
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftInput = getPickerInput(fixture.debugElement);
      typeInElement('2027-09-17 11:08:22', leftInput);
      fixture.detectChanges();
      leftInput.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getHeaderYearBtn('left').textContent).toContain('2027');
      // panel month will increase 1
      expect(getHeaderMonthBtn().textContent).toContain('9');
    }));
  }); // /specified date picker testing

  describe('ngModel value accesors', () => {
    beforeEach(() => (fixtureInstance.useSuite = 3));

    it('should specified date provide by "modelValue" be choosed', fakeAsync(() => {
      fixtureInstance.modelValue = [new Date('2018-11-11'), new Date('2018-12-12')];
      fixture.detectChanges();
      tick(); // Wait writeValue() tobe done
      fixture.detectChanges();
      expect(getFirstSelectedDayCell().textContent!.trim()).toBe('11');

      // Click the first cell to change ngModel
      const left = getFirstCell('left');
      const right = getFirstCell('right');
      const leftText = left.textContent!.trim();
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      dispatchMouseEvent(right, 'click');
      fixture.detectChanges();
      expect(fixtureInstance.modelValue[0]!.getDate()).toBe(+leftText);
    }));
  });

  describe('week mode', () => {
    beforeEach(() => {
      fixtureInstance.useSuite = 1;
      fixtureInstance.vtsMode = 'week';
    });

    it('should support week row style', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const leftThirdRow = queryFromOverlay('.vts-picker-panel:first-child table tr:nth-child(3)');
      const leftThirdRowCell = leftThirdRow.querySelector('td.vts-picker-cell')!;
      dispatchMouseEvent(leftThirdRowCell, 'click');
      fixture.detectChanges();
      expect(leftThirdRow.classList.contains('vts-picker-week-panel-row-selected')).toBeTruthy();
      const rightThirdRowCell = queryFromRightPanel('table tr:nth-child(3) td.vts-picker-cell');
      dispatchMouseEvent(rightThirdRowCell, 'click');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(getPickerContainer()).toBeNull();
    }));
  });

  describe('month mode', () => {
    beforeEach(() => {
      fixtureInstance.useSuite = 1;
      fixtureInstance.vtsMode = 'month';
    });

    it('should support month cell style', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left'); // Use the first cell
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const rightThirdRowCell = queryFromRightPanel('table tr:nth-child(3) td.vts-picker-cell');
      dispatchMouseEvent(rightThirdRowCell, 'mouseenter');
      fixture.detectChanges();
      expect(rightThirdRowCell.classList.contains('vts-picker-cell-range-hover-end')).toBeTruthy();
    }));
  });

  describe('year mode', () => {
    beforeEach(() => {
      fixtureInstance.useSuite = 1;
      fixtureInstance.vtsMode = 'year';
    });

    it('should support year cell style', fakeAsync(() => {
      fixture.detectChanges();
      openPickerByClickTrigger();

      const left = getFirstCell('left');
      dispatchMouseEvent(left, 'click');
      fixture.detectChanges();
      const rightThirdRowCell = queryFromRightPanel('table tr:nth-child(3) td.vts-picker-cell');
      dispatchMouseEvent(rightThirdRowCell, 'mouseenter');
      fixture.detectChanges();
      expect(rightThirdRowCell.classList.contains('vts-picker-cell-range-hover-end')).toBeTruthy();
    }));
  });

  ////////////

  function getCssIndex(part: RangePartType): string {
    return part === 'left' ? 'first-child' : 'last-child';
  }

  function getPickerContainer(): HTMLElement {
    return queryFromOverlay('.vts-picker-panel-container') as HTMLElement;
  }

  function getFirstSelectedDayCell(): HTMLElement {
    return queryFromOverlay(
      '.vts-picker-panel:first-child td.vts-picker-cell-selected .vts-picker-cell-inner'
    ) as HTMLElement;
  }

  // function getSecondSelectedDayCell(): HTMLElement {
  //   return queryFromOverlay('.vts-picker-panel:last-child td.vts-picker-cell-selected .vts-picker-cell-inner') as HTMLElement;
  // }

  function getPreBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(
      `.vts-picker-panel:${getCssIndex(part)} .${PREFIX_CLASS}-header-prev-btn`
    );
  }

  function getNextBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(
      `.vts-picker-panel:${getCssIndex(part)} .${PREFIX_CLASS}-header-next-btn`
    );
  }

  function getSuperPreBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(
      `.vts-picker-panel:${getCssIndex(part)} .${PREFIX_CLASS}-header-super-prev-btn`
    );
  }

  function getSuperNextBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(
      `.vts-picker-panel:${getCssIndex(part)} .${PREFIX_CLASS}-header-super-next-btn`
    );
  }

  function getHeaderYearBtn(part: RangePartType): HTMLElement {
    return queryFromOverlay(`.vts-picker-panel .vts-picker-header-year-btn:${getCssIndex(part)}`);
  }

  function getHeaderMonthBtn(): HTMLElement {
    return queryFromOverlay(`.vts-picker-panel .vts-picker-header-month-btn`);
  }

  function getFirstCell(partial: 'left' | 'right'): HTMLElement {
    const flg = partial === 'left' ? 'first' : 'last';
    return queryFromOverlay(
      `.vts-picker-panel:${flg}-child td:first-child .vts-picker-cell-inner`
    ) as HTMLElement;
  }

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }

  function queryFromRightPanel(selector: string): HTMLElement {
    return overlayContainerElement
      .querySelector('.vts-picker-panel:last-child')!
      .querySelector(selector) as HTMLElement;
  }

  function openPickerByClickTrigger(): void {
    dispatchMouseEvent(getPickerInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    dispatchFakeEvent(getPickerInput(fixture.debugElement), 'focus');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  function openRightPickerByClickTrigger(): void {
    dispatchMouseEvent(getRangePickerRightInput(fixture.debugElement), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    dispatchFakeEvent(getRangePickerRightInput(fixture.debugElement), 'focus');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }
});

@Component({
  template: `
    <ng-container [ngSwitch]="useSuite">
      <!-- Suite 1 -->
      <vts-range-picker
        *ngSwitchCase="1"
        [vtsAllowClear]="vtsAllowClear"
        [vtsAutoFocus]="vtsAutoFocus"
        [vtsDisabled]="vtsDisabled"
        [vtsDisabledDate]="vtsDisabledDate"
        [vtsLocale]="vtsLocale"
        [vtsPlaceHolder]="vtsPlaceHolder"
        [vtsPopupStyle]="vtsPopupStyle"
        [vtsDropdownClassName]="vtsDropdownClassName"
        [vtsSize]="vtsSize"
        [vtsSeparator]="vtsSeparator"
        (vtsOpenChange)="vtsOpenChange($event)"
        [(ngModel)]="modelValue"
        (ngModelChange)="modelValueChange($event)"
        [vtsDateRender]="vtsDateRender"
        [vtsDisabledTime]="vtsDisabledTime"
        [vtsRenderExtraFooter]="vtsRenderExtraFooter"
        [vtsShowToday]="vtsShowToday"
        [vtsShowNow]="vtsShowNow"
        [vtsMode]="vtsMode"
        [vtsRanges]="vtsRanges"
        [vtsDefaultPickerValue]="vtsDefaultPickerValue"
        [vtsInline]="vtsInline"
        (vtsOnPanelChange)="vtsOnPanelChange($event)"
        (vtsOnCalendarChange)="vtsOnCalendarChange($event)"
        [vtsShowTime]="vtsShowTime"
        (vtsOnOk)="vtsOnOk($event)"
      ></vts-range-picker>
      <ng-template #tplDateRender let-current>
        <div [class.test-first-day]="current.getDate() === 1">
          {{ current.getDate() }}
        </div>
      </ng-template>
      <ng-template #tplExtraFooter>TEST_EXTRA_FOOTER</ng-template>

      <!-- Suite 2 -->
      <!-- use another picker to avoid vtsOpen's side-effects beacuse vtsOpen act as "true" if used -->
      <vts-range-picker *ngSwitchCase="2" [vtsOpen]="vtsOpen"></vts-range-picker>

      <!-- Suite 3 -->
      <vts-range-picker *ngSwitchCase="3" vtsOpen [(ngModel)]="modelValue"></vts-range-picker>
    </ng-container>
  `
})
class VtsTestRangePickerComponent {
  useSuite!: 1 | 2 | 3;
  @ViewChild('tplDateRender', { static: true })
  tplDateRender!: TemplateRef<Date>;
  @ViewChild('tplExtraFooter', { static: true })
  tplExtraFooter!: TemplateRef<void>;

  // --- Suite 1
  vtsAllowClear: boolean = false;
  vtsAutoFocus: boolean = false;
  vtsDisabled: boolean = false;
  vtsDisabledDate!: (d: Date) => boolean;
  vtsLocale: any; // tslint:disable-line:no-any
  vtsPlaceHolder!: string[];
  vtsPopupStyle!: NgStyleInterface;
  vtsDropdownClassName!: string;
  vtsSize!: string;
  vtsOpenChange(_: boolean): void {}
  modelValue: Array<Date | null> = [];
  modelValueChange(_: Date[]): void {}
  vtsDefaultPickerValue!: Array<Date | null>;
  vtsSeparator!: string;
  vtsInline: boolean = false;

  vtsDateRender: any; // tslint:disable-line:no-any
  vtsShowTime: boolean | object = false;
  vtsDisabledTime: any; // tslint:disable-line:no-any
  vtsRenderExtraFooter!: string | (() => TemplateRef<void> | string);
  vtsShowToday = false;
  vtsShowNow = false;
  vtsMode = 'date';

  vtsRanges: any; // tslint:disable-line:no-any
  vtsOnPanelChange(_: string[]): void {}
  vtsOnCalendarChange(): void {}
  vtsOnOk(_: Array<null | Date>): void {}

  // --- Suite 2
  vtsOpen: boolean = false;
}
