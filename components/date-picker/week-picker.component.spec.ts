import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '@ui-vts/ng-vts/core/testing';
import { getPickerInput } from '@ui-vts/ng-vts/date-picker/testing/util';
import { VtsDatePickerModule } from './date-picker.module';

describe('VtsWeekPickerComponent', () => {
  let fixture: ComponentFixture<VtsTestWeekPickerComponent>;
  let fixtureInstance: VtsTestWeekPickerComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, VtsDatePickerModule, FormsModule],
      declarations: [VtsTestWeekPickerComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsTestWeekPickerComponent);
    fixtureInstance = fixture.componentInstance;
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should show week num', fakeAsync(() => {
    fixtureInstance.vtsFormat = undefined; // cover branch
    fixture.detectChanges();
    openPickerByClickTrigger();
    expect(queryFromOverlay('.vts-picker-week-panel-row .vts-picker-cell-week')).toBeDefined();
  }));

  it('should change input value when click week', fakeAsync(() => {
    fixtureInstance.vtsValue = new Date('2020-02-25');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    openPickerByClickTrigger();
    dispatchMouseEvent(queryFromOverlay('.vts-picker-cell'), 'click');
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(getPickerInput(fixture.debugElement).value).toBe('2020-05');
  }));

  it('should change panel to week from month', fakeAsync(() => {
    fixtureInstance.vtsValue = new Date('2020-02-25');
    fixture.detectChanges();
    openPickerByClickTrigger();
    dispatchMouseEvent(queryFromOverlay('.vts-picker-header-month-btn'), 'click');
    fixture.detectChanges();
    dispatchMouseEvent(queryFromOverlay('.vts-picker-cell'), 'click');
    fixture.detectChanges();
    expect(queryFromOverlay('.vts-picker-week-panel')).toBeTruthy();
  }));

  ////////////

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
    <vts-date-picker vtsMode="week" [vtsFormat]="vtsFormat" [ngModel]="vtsValue"></vts-date-picker>
  `
})
export class VtsTestWeekPickerComponent {
  vtsFormat?: string;
  vtsValue: Date | null = null;
}
