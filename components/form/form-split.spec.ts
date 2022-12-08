import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';
import { VtsFormSplitComponent } from './form-split.component';

const testBedOptions = {
  imports: [NoopAnimationsModule],
  declarations: [VtsFormSplitComponent]
};

describe('vts-form-split', () => {
  describe('default', () => {
    let testBed: ComponentBed<VtsTestFormSplitComponent>;
    let split: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(VtsTestFormSplitComponent, testBedOptions);
      split = testBed.fixture.debugElement.query(By.directive(VtsFormSplitComponent));
    });
    it('should className correct', () => {
      expect(split.nativeElement.classList).toContain('vts-form-split');
    });
  });
});

@Component({
  template: `
    <vts-form-split></vts-form-split>
  `
})
export class VtsTestFormSplitComponent {}
