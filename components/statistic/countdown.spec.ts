import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';

import { VtsCountdownComponent } from './countdown.component';
import { VtsStatisticModule } from './statistic.module';

describe('vts-countdown', () => {
  let testBed: ComponentBed<VtsTestCountdownComponent>;
  let fixture: ComponentFixture<VtsTestCountdownComponent>;
  let testComponent: VtsTestCountdownComponent;
  let countdownEl: DebugElement;

  describe('basic', () => {
    beforeEach(() => {
      testBed = createComponentBed(VtsTestCountdownComponent, {
        imports: [VtsStatisticModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;
      countdownEl = fixture.debugElement.query(By.directive(VtsCountdownComponent));
    });

    it('should render time', fakeAsync(() => {
      testComponent.resetTimerWithFormat('HH:mm:ss');
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      expect(
        countdownEl.nativeElement.querySelector('.vts-statistic-content-value').innerText
      ).toBe('48:00:29');
      testComponent.countdown.stopTimer();
    }));

    it('should stop timer when vtsValue is earlier than current', fakeAsync(() => {
      const beforeTime = new Date().getTime() - 1000 * 1000;
      const spyOnStop = spyOn(testComponent.countdown, 'stopTimer');
      testComponent.value = beforeTime;

      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      expect(
        countdownEl.nativeElement.querySelector('.vts-statistic-content-value').innerText
      ).toBe('00:00:00');
      expect(spyOnStop).toHaveBeenCalledTimes(1);
    }));

    it('should support template', fakeAsync(() => {
      testComponent.resetWithTemplate();
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();

      expect(
        countdownEl.nativeElement.querySelector('.vts-statistic-content-value').innerText
      ).toBe('172829900');
      testComponent.countdown.stopTimer();
    }));

    it('should stop timer and emit event', fakeAsync(() => {
      const nearTime = new Date().getTime() + 1000 * 2;
      testComponent.value = nearTime;

      fixture.detectChanges();
      tick(3000);
      fixture.detectChanges();
      expect(testComponent.finished).toBe(1);
    }));
  });
});

@Component({
  template: `
    <vts-countdown
      [vtsTitle]="'Countdown'"
      [vtsValue]="value"
      [vtsFormat]="format"
      [vtsValueTemplate]="template"
      (vtsCountdownFinish)="onFinish()"
    ></vts-countdown>
    <ng-template #tpl let-diff>
      {{ diff }}
    </ng-template>
  `
})
export class VtsTestCountdownComponent {
  @ViewChild(VtsCountdownComponent, { static: true })
  countdown!: VtsCountdownComponent;
  @ViewChild('tpl', { static: true }) tpl!: TemplateRef<number>;

  format?: string;
  value?: number;
  template?: TemplateRef<number>;
  finished = 0;

  resetTimerWithFormat(format: string): void {
    this.format = format;
    this.value = new Date().getTime() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  }

  resetWithTemplate(): void {
    this.template = this.tpl;
    this.value = new Date().getTime() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  }

  onFinish(): void {
    this.finished += 1;
  }
}
