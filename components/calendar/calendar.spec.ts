import { BidiModule, Dir } from '@angular/cdk/bidi';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CandyDate } from '@ui-vts/ng-vts/core/time';
import { VTS_DATE_CONFIG } from '../i18n/date-config';
import { VtsCalendarHeaderComponent as CalendarHeader } from './calendar-header.component';
import { VtsCalendarComponent as Calendar } from './calendar.component';
import { VtsCalendarModule } from './calendar.module';

registerLocaleData(zh);

describe('Calendar', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, FormsModule, VtsCalendarModule, NoopAnimationsModule],
        declarations: [
          VtsTestCalendarModeComponent,
          VtsTestCalendarValueComponent,
          VtsTestCalendarFullscreenComponent,
          VtsTestCalendarDateCellComponent,
          VtsTestCalendarDateFullCellComponent,
          VtsTestCalendarMonthCellComponent,
          VtsTestCalendarMonthFullCellComponent,
          VtsTestCalendarChangesComponent,
          VtsTestCalendarRtlComponent
        ],
        providers: [{ provide: VTS_DATE_CONFIG, useValue: { firstDayOfWeek: 0 } }]
      }).compileComponents();
    })
  );

  describe('mode', () => {
    let fixture: ComponentFixture<VtsTestCalendarModeComponent>;
    let component: VtsTestCalendarModeComponent;

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(VtsTestCalendarModeComponent);
        component = fixture.componentInstance;
      })
    );

    it('should be month by default', () => {
      fixture.detectChanges();

      const header = fixture.debugElement
        .queryAll(By.directive(Calendar))[0]
        .query(By.directive(CalendarHeader))
        .injector.get(CalendarHeader);
      expect(header.mode).toBe('month');
    });

    it('should update mode passed in', () => {
      component.mode = 'year';

      fixture.detectChanges();

      const header = fixture.debugElement
        .queryAll(By.directive(Calendar))[1]
        .query(By.directive(CalendarHeader))
        .injector.get(CalendarHeader);
      expect(header.mode).toBe('year');
    });

    it('should emit change event for mode selection', () => {
      const header = fixture.debugElement
        .queryAll(By.directive(Calendar))[1]
        .query(By.directive(CalendarHeader))
        .injector.get(CalendarHeader);
      header.modeChange.emit('year');

      fixture.detectChanges();

      expect(component.mode).toBe('year');
    });

    it('should display date grid in month mode', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const table = host.query(By.css('.vts-picker-date-panel'));

      expect(table.nativeElement).toBeTruthy();
    });

    it('should display date grid in year mode', () => {
      component.mode = 'year';
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const table = host.query(By.css('.vts-picker-month-panel'));

      expect(table.nativeElement).toBeTruthy();
    });
  });

  describe('value', () => {
    let fixture: ComponentFixture<VtsTestCalendarValueComponent>;
    let component: VtsTestCalendarValueComponent;

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(VtsTestCalendarValueComponent);
        component = fixture.componentInstance;
      })
    );

    it('should be now by default', () => {
      const now = new Date();

      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const header = host.query(By.directive(CalendarHeader)).injector.get(CalendarHeader);

      expect(header.activeDate.getYear()).toBe(now.getFullYear());
      expect(header.activeDate.getMonth()).toBe(now.getMonth());
      expect(header.activeDate.getDate()).toBe(now.getDate());
    });

    it('should support two-way binding without model', () => {
      fixture.detectChanges();
      const now = new Date();

      const calendar = fixture.debugElement
        .queryAll(By.directive(Calendar))[1]
        .injector.get(Calendar);

      expect(calendar.activeDate.nativeDate).toBe(component.date0);

      calendar.onDateSelect(new CandyDate(now));
      fixture.detectChanges();

      expect(component.date0).toBe(now);
    });

    it('should support model binding', fakeAsync(() => {
      fixture.detectChanges();
      const now = new Date();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[2];
      const calendar = host.injector.get(Calendar);
      const model = host.injector.get(NgModel);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(calendar.activeDate.nativeDate).toBe(component.date1);

      model.viewToModelUpdate(now);
      fixture.detectChanges();

      expect(component.date1).toBe(now);
    }));

    it('should update value when year changed', () => {
      fixture.detectChanges();
      const calendar = fixture.debugElement
        .queryAll(By.directive(Calendar))[1]
        .injector.get(Calendar);
      calendar.onYearSelect(2010);
      fixture.detectChanges();

      expect(component.date0.getFullYear()).toBe(2010);
    });

    it('should update value when month changed', () => {
      fixture.detectChanges();
      const calendar = fixture.debugElement
        .queryAll(By.directive(Calendar))[1]
        .injector.get(Calendar);
      calendar.onMonthSelect(10);
      fixture.detectChanges();

      expect(component.date0.getMonth()).toBe(10);
    });

    it('should mark current date in month mode', () => {
      const now = new Date();

      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const today = host.query(By.css('td.vts-picker-cell-today .vts-picker-calendar-date-value'));

      expect(today).toBeDefined();
      expect(parseInt(today.nativeElement.textContent!, 10)).toBe(now.getDate());
    });

    it('should mark active date in month mode', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const active = host.query(
        By.css('td.vts-picker-cell-selected .vts-picker-calendar-date-value')
      );

      expect(active).toBeDefined();
      expect(parseInt(active.nativeElement.textContent!, 10)).toBe(3);
    });

    it('should mark previous/next month date in month mode', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const cells = host.queryAll(By.css('td'));
      const lastPrevious = cells[3];
      const firstNext = cells[32];

      expect(lastPrevious.nativeElement.className).not.toContain('vts-picker-cell-in-view');
      expect(firstNext.nativeElement.className).not.toContain('vts-picker-cell-in-view');
    });

    it('should mark current month in year mode', () => {
      const now = new Date();
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[3];
      const cells = host.queryAll(By.css('td'));
      const current = cells[now.getMonth()];

      expect(current.nativeElement.className).toContain('vts-picker-cell-selected');
    });

    it('should mark active month in year mode', () => {
      component.date2.setDate(1);
      component.date2.setMonth(10);
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[3];
      const cells = host.queryAll(By.css('td'));
      const current = cells[10];

      expect(current.nativeElement.className).toContain('vts-picker-cell-selected');
    });
  });

  describe('fullscreen', () => {
    let fixture: ComponentFixture<VtsTestCalendarFullscreenComponent>;
    let component: VtsTestCalendarFullscreenComponent;

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(VtsTestCalendarFullscreenComponent);
        component = fixture.componentInstance;
      })
    );

    it('should be true by default', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const header = host.query(By.directive(CalendarHeader)).injector.get(CalendarHeader);

      expect(header.fullscreen).toBe(true);
    });

    it('should update fullscreen by vtsFullscreen', () => {
      component.fullscreen = false;

      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const header = host.query(By.directive(CalendarHeader)).injector.get(CalendarHeader);

      expect(header.fullscreen).toBe(false);
    });

    it('should support imperative access', () => {
      component.fullscreen = false;

      fixture.detectChanges();

      const calendar = fixture.debugElement
        .queryAll(By.directive(Calendar))[1]
        .injector.get(Calendar);

      expect(calendar.vtsFullscreen).toBe(false);
    });
  });

  describe('dateCell', () => {
    let fixture: ComponentFixture<VtsTestCalendarDateCellComponent>;

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(VtsTestCalendarDateCellComponent);
      })
    );

    it('should work when passed via property', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const content = host.query(By.css('td')).query(By.css('.vts-picker-calendar-date-content'));

      expect(content.nativeElement.textContent).toContain('Foo');
    });

    it('should work when passed via content child', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const content = host.query(By.css('td')).query(By.css('.vts-picker-calendar-date-content'));

      expect(content.nativeElement.textContent).toContain('Bar');
    });
  });

  describe('dateFullCell', () => {
    let fixture: ComponentFixture<VtsTestCalendarDateFullCellComponent>;

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(VtsTestCalendarDateFullCellComponent);
      })
    );

    it('should work when passed via property', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const content = host.query(By.css('td')).query(By.css('.vts-picker-cell-inner'));
      expect(content.nativeElement.textContent!.trim()).toBe('Foo');
    });

    it('should work when passed via content child', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const content = host.query(By.css('td')).query(By.css('.vts-picker-cell-inner'));

      expect(content.nativeElement.textContent!.trim()).toBe('Bar');
    });
  });

  describe('monthCell', () => {
    let fixture: ComponentFixture<VtsTestCalendarMonthCellComponent>;

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(VtsTestCalendarMonthCellComponent);
      })
    );

    it('should work when passed via property', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const content = host.query(By.css('td')).query(By.css('.vts-picker-calendar-date-content'));
      expect(content.nativeElement.textContent).toContain('Foo');
    });

    it('should work when passed via content child', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const content = host.query(By.css('td')).query(By.css('.vts-picker-calendar-date-content'));
      expect(content.nativeElement.textContent).toContain('Bar');
    });
  });

  describe('monthFullCell', () => {
    let fixture: ComponentFixture<VtsTestCalendarMonthFullCellComponent>;

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(VtsTestCalendarMonthFullCellComponent);
      })
    );

    it('should work when passed via property', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[0];
      const content = host.query(By.css('td')).query(By.css('.vts-picker-cell-inner'));
      expect(content.nativeElement.textContent!.trim()).toBe('Foo');
    });

    it('should work when passed via content child', () => {
      fixture.detectChanges();

      const host = fixture.debugElement.queryAll(By.directive(Calendar))[1];
      const content = host.query(By.css('td')).query(By.css('.vts-picker-cell-inner'));
      expect(content.nativeElement.textContent!.trim()).toBe('Bar');
    });
  });

  describe('changes', () => {
    let fixture: ComponentFixture<VtsTestCalendarChangesComponent>;
    let component: VtsTestCalendarChangesComponent;

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(VtsTestCalendarChangesComponent);
        component = fixture.componentInstance;
      })
    );

    it('should panelChange work', fakeAsync(() => {
      fixture.detectChanges();

      expect(component.panelChange).toHaveBeenCalledTimes(0);

      const calendar = fixture.debugElement
        .queryAll(By.directive(Calendar))[0]
        .injector.get(Calendar);
      calendar.onModeChange('year');
      fixture.detectChanges();

      expect(component.panelChange).toHaveBeenCalledTimes(1);
    }));

    it('should selectChange work', () => {
      fixture.detectChanges();

      expect(component.panelChange).toHaveBeenCalledTimes(0);

      const calendar = fixture.debugElement
        .queryAll(By.directive(Calendar))[0]
        .injector.get(Calendar);
      calendar.onYearSelect(2019);
      fixture.detectChanges();

      expect(component.selectChange).toHaveBeenCalledTimes(1);

      calendar.onMonthSelect(2);
      fixture.detectChanges();

      expect(component.selectChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<VtsTestCalendarRtlComponent>;
    let componentElement: HTMLElement;

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(VtsTestCalendarRtlComponent);
        componentElement = fixture.debugElement.query(By.directive(Calendar)).nativeElement;
        fixture.detectChanges();
      })
    );

    it('should className correct on dir change', fakeAsync(() => {
      expect(componentElement.classList).toContain('vts-picker-calendar-rtl');
      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(componentElement.classList).not.toContain('vts-picker-calendar-rtl');
    }));
  });
});

@Component({
  template: `
    <vts-calendar></vts-calendar>
    <vts-calendar [(vtsMode)]="mode"></vts-calendar>
  `
})
class VtsTestCalendarModeComponent {
  mode: 'month' | 'year' = 'month';
}

@Component({
  template: `
    <vts-calendar></vts-calendar>
    <vts-calendar [(vtsValue)]="date0"></vts-calendar>
    <vts-calendar [(ngModel)]="date1"></vts-calendar>
    <vts-calendar [(vtsValue)]="date2" [(vtsMode)]="mode"></vts-calendar>
  `
})
class VtsTestCalendarValueComponent {
  date0 = new Date(2001, 1, 3);
  date1 = new Date(2001, 1, 3);
  date2 = new Date();
  mode = 'year';
}

@Component({
  template: `
    <vts-calendar></vts-calendar>
    <vts-calendar [vtsFullscreen]="fullscreen"></vts-calendar>
  `
})
class VtsTestCalendarFullscreenComponent {
  fullscreen = true;
  card = false;
}

@Component({
  template: `
    <vts-calendar [vtsDateCell]="tpl"></vts-calendar>
    <ng-template #tpl>Foo</ng-template>
    <vts-calendar>
      <ng-container *vtsDateCell>Bar</ng-container>
    </vts-calendar>
  `
})
class VtsTestCalendarDateCellComponent {}

@Component({
  template: `
    <vts-calendar [vtsDateFullCell]="tpl"></vts-calendar>
    <ng-template #tpl>Foo</ng-template>
    <vts-calendar>
      <ng-container *vtsDateFullCell>Bar</ng-container>
    </vts-calendar>
  `
})
class VtsTestCalendarDateFullCellComponent {}

@Component({
  template: `
    <vts-calendar vtsMode="year" [vtsMonthCell]="tpl"></vts-calendar>
    <ng-template #tpl>Foo</ng-template>
    <vts-calendar vtsMode="year">
      <ng-container *vtsMonthCell>Bar</ng-container>
    </vts-calendar>
  `
})
class VtsTestCalendarMonthCellComponent {}

@Component({
  template: `
    <vts-calendar vtsMode="year" [vtsMonthFullCell]="tpl"></vts-calendar>
    <ng-template #tpl>Foo</ng-template>
    <vts-calendar vtsMode="year">
      <ng-container *vtsMonthFullCell>Bar</ng-container>
    </vts-calendar>
  `
})
class VtsTestCalendarMonthFullCellComponent {}

@Component({
  template: `
    <vts-calendar
      [(vtsMode)]="mode"
      [(ngModel)]="date0"
      (vtsPanelChange)="panelChange($event)"
      (vtsSelectChange)="selectChange($event)"
    ></vts-calendar>
  `
})
class VtsTestCalendarChangesComponent {
  mode: 'month' | 'year' = 'month';
  date0 = new Date(2014, 3, 14);
  panelChange = jasmine.createSpy('panelChange callback');
  selectChange = jasmine.createSpy('selectChange callback');
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-calendar></vts-calendar>
    </div>
  `
})
export class VtsTestCalendarRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
