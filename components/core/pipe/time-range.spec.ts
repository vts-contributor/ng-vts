import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtsPipesModule } from '@ui-vts/ng-vts/core/pipe';

@Component({
  template: `
    {{ diff | vtsTimeRange : format }}
  `
})
export class VtsTestTimeRangeComponent {
  diff = 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  format = 'HH:mm:ss';
}

describe('vts time range pipeline', () => {
  let fixture: ComponentFixture<VtsTestTimeRangeComponent>;
  let testComponent: VtsTestTimeRangeComponent;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, VtsPipesModule],
      declarations: [VtsTestTimeRangeComponent]
    }).compileComponents();
  });

  describe('basic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestTimeRangeComponent);
      testComponent = fixture.debugElement.componentInstance;
      element = fixture.debugElement.nativeElement;
    });

    it('should render time correctly with different formats', () => {
      fixture.detectChanges();
      expect(element.innerText).toBe('48:00:30');

      testComponent.format = 'HH:mm';
      fixture.detectChanges();
      expect(element.innerText).toBe('48:00');

      testComponent.format = 'D 天 H 时 m 分 s 秒';
      fixture.detectChanges();
      expect(element.innerText).toBe('2 天 0 时 0 分 30 秒');
    });

    it('should render time correctly with different values', () => {
      testComponent.diff = 0;
      fixture.detectChanges();
      expect(element.innerText).toBe('00:00:00');

      testComponent.diff = -1000 * 60 * 60 * 24 * 2 + 1000 * 30;
      fixture.detectChanges();
      expect(element.innerText).toBe('-48:00:30');
    });
  });
});
