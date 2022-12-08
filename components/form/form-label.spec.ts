import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';
import { VtsFormLabelComponent, VtsFormTooltipIcon } from './form-label.component';

const testBedOptions = {
  imports: [NoopAnimationsModule],
  declarations: [VtsFormLabelComponent]
};

describe('vts-form-label', () => {
  describe('default', () => {
    let testBed: ComponentBed<VtsTestFormLabelComponent>;
    let testComponent: VtsTestFormLabelComponent;
    let label: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(VtsTestFormLabelComponent, testBedOptions);
      testComponent = testBed.component;
      label = testBed.fixture.debugElement.query(By.directive(VtsFormLabelComponent));
    });
    it('should className correct', () => {
      expect(label.nativeElement.classList).toContain('vts-form-item-label');
    });
    it('should label for work', () => {
      expect(label.nativeElement.querySelector('label').attributes.getNamedItem('for').value).toBe(
        'test'
      );
    });
    it('should required work', () => {
      expect(label.nativeElement.querySelector('label').classList).not.toContain(
        'vts-form-item-required'
      );

      testComponent.required = true;

      testBed.fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain(
        'vts-form-item-required'
      );
    });

    it('should no colon work', () => {
      expect(label.nativeElement.querySelector('label').classList).not.toContain(
        'vts-form-item-no-colon'
      );

      testComponent.noColon = true;

      testBed.fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain(
        'vts-form-item-no-colon'
      );
    });

    it('should tooltip work', () => {
      expect(label.nativeElement.querySelector('.vts-form-item-tooltip')).toBeNull();

      testComponent.tooltipTitle = 'tooltip';
      testBed.fixture.detectChanges();

      expect(label.nativeElement.querySelector('.vts-form-item-tooltip')).toBeDefined();
      expect(label.nativeElement.querySelector('.vtsicon-question-circle')).toBeDefined();

      testComponent.tooltipIcon = 'info-circle';
      testBed.fixture.detectChanges();

      expect(label.nativeElement.querySelector('.vts-form-item-tooltip')).toBeDefined();
      expect(label.nativeElement.querySelector('.vtsicon-info-circle')).toBeDefined();
    });
  });
});

@Component({
  template: `
    <vts-form-label
      [vtsFor]="forValue"
      [vtsNoColon]="noColon"
      [vtsRequired]="required"
      [vtsTooltipTitle]="tooltipTitle"
      [vtsTooltipIcon]="tooltipIcon"
    ></vts-form-label>
  `
})
export class VtsTestFormLabelComponent {
  forValue = 'test';
  required = false;
  noColon = false;
  tooltipTitle?: string;
  tooltipIcon?: string | VtsFormTooltipIcon;
}
