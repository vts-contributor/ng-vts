import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';
import { VtsFormItemComponent } from './form-item.component';
import { VtsFormLabelComponent } from './form-label.component';
import { VtsFormDirective } from './form.directive';

const testBedOptions = {
  imports: [NoopAnimationsModule],
  declarations: [VtsFormDirective, VtsFormLabelComponent, VtsFormItemComponent]
};

describe('vts-form', () => {
  describe('default', () => {
    let testBed: ComponentBed<VtsTestFormDirectiveComponent>;
    let testComponent: VtsTestFormDirectiveComponent;
    let form: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(VtsTestFormDirectiveComponent, testBedOptions);
      testComponent = testBed.component;
      form = testBed.fixture.debugElement.query(By.directive(VtsFormDirective));
    });
    it('should className correct', () => {
      expect(form.nativeElement.classList).toContain('vts-form');
      expect(form.nativeElement.classList).toContain('vts-form-horizontal');
    });
    it('should layout work', () => {
      testComponent.layout = 'vertical';

      testBed.fixture.detectChanges();

      expect(form.nativeElement.classList).toContain('vts-form-vertical');
      expect(form.nativeElement.classList).not.toContain('vts-form-horizontal');

      testComponent.layout = 'inline';

      testBed.fixture.detectChanges();

      expect(form.nativeElement.classList).not.toContain('vts-form-vertical');
      expect(form.nativeElement.classList).not.toContain('vts-form-horizontal');
      expect(form.nativeElement.classList).toContain('vts-form-inline');
    });
  });

  describe('label integrate', () => {
    let testBed: ComponentBed<VtsTestFormLabelIntegrateComponent>;
    let testComponent: VtsTestFormLabelIntegrateComponent;
    let form: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(VtsTestFormLabelIntegrateComponent, testBedOptions);
      testComponent = testBed.component;
      form = testBed.fixture.debugElement.query(By.directive(VtsFormDirective));
    });

    afterEach(() => {
      testComponent.defaultNoColon = false;
      testComponent.noColon = false;
      testComponent.testPriority = false;
    });

    it('should set default `NoColon` value', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.vts-form-item-label label'
      );
      labels.forEach(label => expect(label.classList).not.toContain('vts-form-item-no-colon'));

      testComponent.defaultNoColon = true;

      testBed.fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('vts-form-item-no-colon'));
    });

    it('should label have high priority', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.vts-form-item-label label'
      );
      labels.forEach(label => expect(label.classList).not.toContain('vts-form-item-no-colon'));

      testComponent.defaultNoColon = true;

      testBed.fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('vts-form-item-no-colon'));
      testComponent.testPriority = true;

      testBed.fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('vts-form-item-no-colon'));
      labels.forEach(label => {
        if (label.innerText === 'TEST_PRIORITY') {
          expect(label.classList).not.toContain('vts-form-item-no-colon');
        } else {
          expect(label.classList).toContain('vts-form-item-no-colon');
        }
      });

      testComponent.defaultNoColon = false;
      testComponent.noColon = true;

      testBed.fixture.detectChanges();

      labels.forEach(label => {
        if (label.innerText === 'TEST_PRIORITY') {
          expect(label.classList).toContain('vts-form-item-no-colon');
        } else {
          expect(label.classList).not.toContain('vts-form-item-no-colon');
        }
      });
    });
  });
});

@Component({
  template: `
    <form vts-form [vtsLayout]="layout"></form>
  `
})
export class VtsTestFormDirectiveComponent {
  layout = 'horizontal';
}

@Component({
  template: `
    <form vts-form [vtsNoColon]="defaultNoColon">
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
      </vts-form-item>
      <vts-form-item *ngIf="testPriority">
        <vts-form-label [vtsNoColon]="noColon">TEST_PRIORITY</vts-form-label>
      </vts-form-item>
    </form>
  `
})
export class VtsTestFormLabelIntegrateComponent {
  defaultNoColon = false;
  testPriority = false;
  noColon = false;
}
