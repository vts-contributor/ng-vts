import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';
import { VtsFormItemComponent } from './form-item.component';
import { VtsFormModule } from './form.module';

const testBedOptions = { imports: [VtsFormModule, NoopAnimationsModule] };

describe('vts-form-item', () => {
  describe('default', () => {
    let testBed: ComponentBed<VtsTestFormItemComponent>;
    let formItem: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(VtsTestFormItemComponent, testBedOptions);
      formItem = testBed.fixture.debugElement.query(By.directive(VtsFormItemComponent));
    });
    it('should className correct', () => {
      expect(formItem.nativeElement.classList).toContain('vts-form-item');
    });
  });
});

@Component({
  template: `
    <vts-form-item></vts-form-item>
  `
})
export class VtsTestFormItemComponent {}
