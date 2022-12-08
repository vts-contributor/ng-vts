import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';

import { VtsStatisticNumberComponent } from './statistic-number.component';
import { VtsStatisticModule } from './statistic.module';

describe('vts-number', () => {
  let testBed: ComponentBed<VtsTestNumberComponent>;
  let fixture: ComponentFixture<VtsTestNumberComponent>;
  let testComponent: VtsTestNumberComponent;
  let numberEl: DebugElement;

  describe('basic', () => {
    beforeEach(() => {
      testBed = createComponentBed(VtsTestNumberComponent, {
        imports: [VtsStatisticModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;
      numberEl = fixture.debugElement.query(By.directive(VtsStatisticNumberComponent));
    });

    it('should have correct class', () => {
      fixture.detectChanges();
      expect(
        numberEl.nativeElement.firstElementChild!.classList.contains('vts-statistic-content-value')
      ).toBeTruthy();
    });

    it('should render number', () => {
      // Int with group separator, decimal.
      testComponent.value = 12345.012;
      fixture.detectChanges();
      expect(
        numberEl.nativeElement.querySelector('.vts-statistic-content-value-int').innerText
      ).toBe('12,345');
      expect(
        numberEl.nativeElement.querySelector('.vts-statistic-content-value-decimal').innerText
      ).toBe('.012');
    });

    it('should support template', () => {
      testComponent.template = testComponent.tpl;
      testComponent.value = 12345.012;
      fixture.detectChanges();
      expect(numberEl.nativeElement.querySelector('.vts-statistic-content-value-int')).toBeFalsy();
      expect(
        numberEl.nativeElement.querySelector('.vts-statistic-content-value-decimal')
      ).toBeFalsy();
      expect(numberEl.nativeElement.innerText).toBe("It's 12,345.012");
    });
  });
});

@Component({
  template: `
    <vts-statistic-number
      [vtsValue]="value | number"
      [vtsValueTemplate]="template"
    ></vts-statistic-number>
    <ng-template #tpl let-value>It's {{ value }}</ng-template>
  `
})
export class VtsTestNumberComponent {
  @ViewChild('tpl', { static: true }) tpl?: TemplateRef<void>;

  value = 1;
  template?: TemplateRef<void>;
}
