import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';
import { VtsFormTextComponent } from './form-text.component';

const testBedOptions = {
  imports: [NoopAnimationsModule],
  declarations: [VtsFormTextComponent]
};

describe('vts-form-text', () => {
  describe('default', () => {
    let testBed: ComponentBed<VtsTestFormTextComponent>;
    let text: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(VtsTestFormTextComponent, testBedOptions);
      text = testBed.fixture.debugElement.query(By.directive(VtsFormTextComponent));
    });
    it('should className correct', () => {
      expect(text.nativeElement.classList).toContain('vts-form-text');
    });
  });
});

@Component({
  template: `
    <vts-form-text></vts-form-text>
  `
})
export class VtsTestFormTextComponent {}
