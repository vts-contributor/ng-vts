import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CandyDate } from '@ui-vts/ng-vts/core/time';
import { VtsI18nModule } from '../i18n/vts-i18n.module';
import { VtsRadioGroupComponent as RadioGroup, VtsRadioModule } from '../radio/index';
import { VtsSelectComponent as Select } from '../select/select.component';
import { VtsSelectModule } from '../select/select.module';
import {
  VtsCalendarHeaderComponent,
  VtsCalendarHeaderComponent as CalendarHeader
} from './calendar-header.component';

registerLocaleData(zh);

describe('Calendar Header', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, VtsI18nModule, VtsRadioModule, VtsSelectModule, NoopAnimationsModule],
      declarations: [
        CalendarHeader,
        VtsTestCalendarHeaderModeComponent,
        VtsTestCalendarHeaderFullscreenComponent,
        VtsTestCalendarHeaderActiveDateComponent,
        VtsTestCalendarHeaderChangesComponent
      ]
    }).compileComponents();
  }));

  describe('mode', () => {
    let fixture: ComponentFixture<VtsTestCalendarHeaderModeComponent>;
    let component: VtsTestCalendarHeaderModeComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(VtsTestCalendarHeaderModeComponent);
      component = fixture.componentInstance;
    }));

    it('should be month by default', () => {
      fixture.detectChanges();

      const modeNgModel = fixture.debugElement
        .queryAll(By.directive(CalendarHeader))[0]
        .query(By.directive(RadioGroup))
        .injector.get(NgModel);
      expect(modeNgModel.model).toBe('month');
    });

    it('should update mode passed in', () => {
      component.mode = 'year';

      fixture.detectChanges();

      const modeNgModel = fixture.debugElement
        .queryAll(By.directive(CalendarHeader))[1]
        .query(By.directive(RadioGroup))
        .injector.get(NgModel);
      expect(modeNgModel.model).toBe('year');
    });

    it('should emit change event for mode selection', () => {
      const modeNgModel = fixture.debugElement
        .queryAll(By.directive(CalendarHeader))[1]
        .query(By.directive(RadioGroup))
        .injector.get(NgModel);
      modeNgModel.viewToModelUpdate('year');

      fixture.detectChanges();

      expect(component.mode).toBe('year');
    });
  });

  describe('fullscreen', () => {
    let fixture: ComponentFixture<VtsTestCalendarHeaderFullscreenComponent>;
    let component: VtsTestCalendarHeaderFullscreenComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(VtsTestCalendarHeaderFullscreenComponent);
      component = fixture.componentInstance;
    }));

    it('should be true by default', () => {
      fixture.detectChanges();

      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const [yearSelect, monthSelect] = header
        .queryAll(By.directive(Select))
        .map(x => x.injector.get(Select));
      const modeRadioGroup = header.query(By.directive(RadioGroup)).injector.get(RadioGroup);

      expect(yearSelect.vtsSize).not.toBe('small');
      expect(monthSelect.vtsSize).not.toBe('small');
      expect(modeRadioGroup.vtsSize).not.toBe('small');
    });

    it('should use small size when not in fullscreen', () => {
      component.fullscreen = false;

      fixture.detectChanges();

      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[1];
      const [yearSelect, monthSelect] = header
        .queryAll(By.directive(Select))
        .map(x => x.injector.get(Select));
      const modeRadioGroup = header.query(By.directive(RadioGroup)).injector.get(RadioGroup);

      expect(yearSelect.vtsSize).toBe('small');
      expect(monthSelect.vtsSize).toBe('small');
      expect(modeRadioGroup.vtsSize).toBe('small');
    });
  });

  describe('activeDate', () => {
    let fixture: ComponentFixture<VtsTestCalendarHeaderActiveDateComponent>;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(VtsTestCalendarHeaderActiveDateComponent);
    }));

    it('should be now by default', () => {
      const now = new Date();

      fixture.detectChanges();

      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const [yearModel, monthModel] = header
        .queryAll(By.directive(Select))
        .map(x => x.injector.get(NgModel));

      expect(yearModel.model).toBe(now.getFullYear());
      expect(monthModel.model).toBe(now.getMonth());
    });

    it('should update model binding to passed date', () => {
      fixture.detectChanges();

      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[1];
      const [yearModel, monthModel] = header
        .queryAll(By.directive(Select))
        .map(x => x.injector.get(NgModel));

      expect(yearModel.model).toBe(2001);
      expect(monthModel.model).toBe(1);
      const headerComponent = header.injector.get(VtsCalendarHeaderComponent);
      expect(headerComponent.years[0].value).toBe(1991);
    });
  });

  describe('changes', () => {
    let fixture: ComponentFixture<VtsTestCalendarHeaderChangesComponent>;
    let component: VtsTestCalendarHeaderChangesComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(VtsTestCalendarHeaderChangesComponent);
      component = fixture.componentInstance;
    }));

    it('should emit yearChange when year changed', () => {
      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const [yearModel] = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel));

      yearModel.viewToModelUpdate(2010);

      fixture.detectChanges();

      expect(component.year).toBe(2010);
    });

    it('should emit monthChange when month changed', () => {
      fixture.detectChanges();
      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const monthModel = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel))[1];

      monthModel.viewToModelUpdate(2);

      fixture.detectChanges();

      expect(component.month).toBe(2);
    });
    it('should update years when change year', () => {
      const header = fixture.debugElement.queryAll(By.directive(CalendarHeader))[0];
      const headerComponent = header.injector.get(VtsCalendarHeaderComponent);
      headerComponent.updateYear(2010);
      expect(headerComponent.years[0].value).toBe(2000);
    });
  });
});

@Component({
  template: `
    <vts-calendar-header></vts-calendar-header>
    <vts-calendar-header [(mode)]="mode"></vts-calendar-header>
  `
})
class VtsTestCalendarHeaderModeComponent {
  mode: 'month' | 'year' = 'month';
}

@Component({
  template: `
    <vts-calendar-header></vts-calendar-header>
    <vts-calendar-header [fullscreen]="fullscreen"></vts-calendar-header>
  `
})
class VtsTestCalendarHeaderFullscreenComponent {
  fullscreen = true;
}

@Component({
  template: `
    <vts-calendar-header></vts-calendar-header>
    <vts-calendar-header [activeDate]="activeDate"></vts-calendar-header>
  `
})
class VtsTestCalendarHeaderActiveDateComponent {
  activeDate = new CandyDate(new Date(2001, 1, 3));
}

@Component({
  template: `
    <vts-calendar-header
      (yearChange)="year = $event"
      (monthChange)="month = $event"
    ></vts-calendar-header>
  `
})
class VtsTestCalendarHeaderChangesComponent {
  year: number | null = null;
  month: number | null = null;
}
