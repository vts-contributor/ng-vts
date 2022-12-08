import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';

import { VtsStatisticComponent } from './statistic.component';
import { VtsStatisticModule } from './statistic.module';

describe('vts-statistic', () => {
  describe('basic', () => {
    let testBed: ComponentBed<VtsTestStatisticComponent>;
    let fixture: ComponentFixture<VtsTestStatisticComponent>;
    let testComponent: VtsTestStatisticComponent;
    let statisticEl: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(VtsTestStatisticComponent, {
        imports: [VtsStatisticModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;
      statisticEl = fixture.debugElement.query(By.directive(VtsStatisticComponent));
    });

    it('should render title, prefix and suffix', () => {
      fixture.detectChanges();
      expect(statisticEl.nativeElement.querySelector('.vts-statistic-title').innerText).toBe(
        'title'
      );
      expect(statisticEl.nativeElement.querySelector('.vts-statistic-content-prefix')).toBeFalsy();
      expect(statisticEl.nativeElement.querySelector('.vts-statistic-content-suffix')).toBeFalsy();

      testComponent.prefix = 'prefix';
      testComponent.suffix = 'suffix';
      fixture.detectChanges();
      expect(
        statisticEl.nativeElement.querySelector('.vts-statistic-content-prefix').innerText
      ).toBe('prefix');
      expect(
        statisticEl.nativeElement.querySelector('.vts-statistic-content-suffix').innerText
      ).toBe('suffix');
    });
  });

  describe('RTL', () => {
    let testBed: ComponentBed<VtsTestStatisticRtlComponent>;
    let fixture: ComponentFixture<VtsTestStatisticRtlComponent>;
    let statisticEl: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(VtsTestStatisticRtlComponent, {
        imports: [BidiModule, VtsStatisticModule]
      });
      fixture = testBed.fixture;
      statisticEl = fixture.debugElement.query(By.directive(VtsStatisticComponent));
    });

    it('should className correct on dir change', () => {
      fixture.detectChanges();
      expect(statisticEl.nativeElement.querySelector('.vts-statistic').classList).toContain(
        'vts-statistic-rtl'
      );

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(statisticEl.nativeElement.querySelector('.vts-statistic').classList).not.toContain(
        'vts-statistic-rtl'
      );
    });
  });
});

@Component({
  template: `
    <vts-statistic
      [vtsValue]="123.45"
      [vtsTitle]="title"
      [vtsSuffix]="suffix"
      [vtsPrefix]="prefix"
    ></vts-statistic>
  `
})
export class VtsTestStatisticComponent {
  title = 'title';
  prefix = '';
  suffix = '';
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-statistic [vtsValue]="123.45" vtsTitle="test title"></vts-statistic>
    </div>
  `
})
export class VtsTestStatisticRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
