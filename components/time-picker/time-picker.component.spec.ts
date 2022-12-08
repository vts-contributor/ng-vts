import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchMouseEvent } from '@ui-vts/ng-vts/core/testing';
import { getPickerInput } from '@ui-vts/ng-vts/date-picker/testing/util';
import { en_GB, VtsI18nModule, VtsI18nService } from '../i18n';
import { VtsTimePickerComponent } from './time-picker.component';
import { VtsTimePickerModule } from './time-picker.module';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

describe('time-picker', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, FormsModule, VtsI18nModule, VtsTimePickerModule],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [VtsTestTimePickerComponent]
      });
      TestBed.compileComponents();
      inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
      })();
    })
  );

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  describe('basic time-picker', () => {
    let testComponent: VtsTestTimePickerComponent;
    let fixture: ComponentFixture<VtsTestTimePickerComponent>;
    let timeElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestTimePickerComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      timeElement = fixture.debugElement.query(By.directive(VtsTimePickerComponent));
    });
    it('should init work', () => {
      fixture.detectChanges();
      expect(timeElement.nativeElement.classList).toContain('vts-picker');
    });
    it('should autofocus work', () => {
      fixture.detectChanges();
      testComponent.autoFocus = true;
      fixture.detectChanges();
      expect(
        timeElement.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name
      ).toBe('autofocus');
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(
        timeElement.nativeElement.querySelector('input').attributes.getNamedItem('autofocus')
      ).toBe(null);
    });
    it('should focus and blur function work', () => {
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(
        false
      );
      testComponent.vtsTimePickerComponent.focus();
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(
        true
      );
      testComponent.vtsTimePickerComponent.blur();
      fixture.detectChanges();
      expect(timeElement.nativeElement.querySelector('input') === document.activeElement).toBe(
        false
      );
    });
    it('should disabled work', () => {
      fixture.detectChanges();
      expect(
        timeElement.nativeElement.querySelector('input').attributes.getNamedItem('disabled')
      ).toBeNull();
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(
        timeElement.nativeElement.querySelector('input').attributes.getNamedItem('disabled')
      ).toBeDefined();
      expect(timeElement.nativeElement.querySelector('.vts-picker-clear')).not.toBeTruthy();
      testComponent.disabled = false;
      testComponent.vtsTimePickerComponent.setDisabledState(false);
      fixture.detectChanges();
      expect(
        timeElement.nativeElement.querySelector('input').attributes.getNamedItem('disabled')
      ).toBeNull();
    });
    it('should open and close work', () => {
      testComponent.open = true;
      fixture.detectChanges();
      expect(testComponent.openChange).toHaveBeenCalledTimes(0);
      testComponent.vtsTimePickerComponent.close();
      fixture.detectChanges();
      expect(testComponent.openChange).toHaveBeenCalledTimes(2);
      expect(testComponent.open).toBe(false);
      testComponent.vtsTimePickerComponent.open();
      fixture.detectChanges();
      expect(testComponent.openChange).toHaveBeenCalledTimes(3);
      expect(testComponent.open).toBe(true);
    });
    it('should clear work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.date = new Date('2018-11-11 11:11:11');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      timeElement.nativeElement.querySelector('.vts-picker-clear').click();
      fixture.detectChanges();
      expect(testComponent.date).toBeNull();
    }));
    it('should support default vtsfomat in 12-hours', () => {
      testComponent.use12Hours = true;
      fixture.detectChanges();
      expect(testComponent.vtsTimePickerComponent.vtsFormat).toBe('h:mm:ss a');
    });
    it('should support ngModelChange', fakeAsync(() => {
      testComponent.date = new Date('2020-03-26 11:33:00');
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const vtsOnChange = spyOn(testComponent, 'onChange');
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.vts-picker-time-panel-cell-selected > div')!
          .textContent
      ).toBe('11');

      dispatchMouseEvent(
        overlayContainerElement.querySelector('.vts-picker-time-panel-cell')!,
        'click'
      );
      fixture.detectChanges();
      getPickerInput(fixture.debugElement).dispatchEvent(
        new KeyboardEvent('keyup', { key: 'enter' })
      );
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(vtsOnChange).toHaveBeenCalled();
      const result = (vtsOnChange.calls.allArgs()[0] as Date[])[0];
      expect(result.getHours()).toBe(0);
      expect(testComponent.vtsTimePickerComponent.inputRef.nativeElement.value).toBe('00:33:00');
    }));
    it('should support ISO string', fakeAsync(() => {
      testComponent.date = '2020-03-27T13:49:54.917Z';
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const date = new Date(testComponent.date);
      expect(
        queryFromOverlay(
          '.vts-picker-time-panel-column:nth-child(1) .vts-picker-time-panel-cell-selected > div'
        )!.textContent
      ).toBe(date.getHours().toString());
      expect(
        queryFromOverlay(
          '.vts-picker-time-panel-column:nth-child(2) .vts-picker-time-panel-cell-selected > div'
        )!.textContent
      ).toBe(date.getMinutes().toString());
    }));
    it('should support custom suffixIcon', fakeAsync(() => {
      testComponent.vtsSuffixIcon = 'calendar';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css(`.vtsicon-calendar`))).toBeDefined();
    }));
    it('should backdrop work', fakeAsync(() => {
      testComponent.vtsBackdrop = true;
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
    }));

    describe('setup I18n service', () => {
      let srv: VtsI18nService;

      beforeEach(inject([VtsI18nService], (s: VtsI18nService) => {
        srv = s;
      }));

      it('should detect the language changes', fakeAsync(() => {
        let placeHolderValue: string | undefined;
        placeHolderValue = timeElement.nativeElement.querySelector('input').placeholder;

        expect(placeHolderValue).toBe('请选择时间');

        srv.setLocale(en_GB);
        tick(400);
        fixture.detectChanges();

        placeHolderValue = timeElement.nativeElement.querySelector('input').placeholder;
        expect(placeHolderValue).toBe('Select time');
      }));
    });
  });

  function queryFromOverlay(selector: string): HTMLElement {
    return overlayContainerElement.querySelector(selector) as HTMLElement;
  }
});

@Component({
  template: `
    <vts-time-picker
      [vtsAutoFocus]="autoFocus"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
      [(vtsOpen)]="open"
      (vtsOpenChange)="openChange($event)"
      [vtsDisabled]="disabled"
      [vtsUse12Hours]="use12Hours"
      [vtsSuffixIcon]="vtsSuffixIcon"
      [vtsBackdrop]="vtsBackdrop"
    ></vts-time-picker>
  `
})
export class VtsTestTimePickerComponent {
  open = false;
  openChange = jasmine.createSpy('open change');
  autoFocus = false;
  date: Date | string = new Date();
  disabled = false;
  use12Hours = false;
  vtsSuffixIcon?: string;
  vtsBackdrop = false;
  onChange(): void {}
  @ViewChild(VtsTimePickerComponent, { static: false })
  vtsTimePickerComponent!: VtsTimePickerComponent;
}
