import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { VtsCheckboxGroupComponent } from './checkbox-group.component';
import { VtsCheckboxWrapperComponent } from './checkbox-wrapper.component';
import { VtsCheckboxComponent } from './checkbox.component';
import { VtsCheckboxModule } from './checkbox.module';

describe('checkbox', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsCheckboxModule, FormsModule, ReactiveFormsModule],
      declarations: [
        VtsTestCheckboxSingleComponent,
        VtsTestCheckboxGroupComponent,
        VtsTestCheckboxFormComponent,
        VtsTestCheckboxGroupFormComponent,
        VtsTestCheckboxWrapperComponent,
        VtsTestCheckboxSingleRtlComponent,
        VtsTestCheckboxGroupRtlComponent
      ]
    });
    TestBed.compileComponents();
  }));
  describe('checkbox basic', () => {
    let fixture: ComponentFixture<VtsTestCheckboxSingleComponent>;
    let testComponent: VtsTestCheckboxSingleComponent;
    let checkbox: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestCheckboxSingleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(VtsCheckboxComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList.contains('vts-checkbox-wrapper')).toBe(true);
      expect(checkbox.nativeElement.firstElementChild!.classList.contains('vts-checkbox')).toBe(
        true
      );
      expect(
        checkbox.nativeElement.firstElementChild.firstElementChild!.classList.contains(
          'vts-checkbox-input'
        )
      ).toBe(true);
      expect(
        checkbox.nativeElement.firstElementChild.lastElementChild.classList.contains(
          'vts-checkbox-inner'
        )
      ).toBe(true);
      expect(checkbox.nativeElement.lastElementChild.innerText).toBe(' Checkbox');
    });
    it('should click change', () => {
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(
        checkbox.nativeElement.firstElementChild!.classList.contains('vts-checkbox-checked')
      ).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      checkbox.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(
        checkbox.nativeElement.firstElementChild!.classList.contains('vts-checkbox-checked')
      ).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    });
    it('should click input a11y correct', () => {
      fixture.detectChanges();
      const inputElement = checkbox.nativeElement.querySelector('input');
      expect(testComponent.checked).toBe(false);
      expect(inputElement.checked).toBe(false);
      expect(
        checkbox.nativeElement.firstElementChild.classList.contains('vts-checkbox-checked')
      ).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(
        checkbox.nativeElement.firstElementChild.classList.contains('vts-checkbox-checked')
      ).toBe(true);
      expect(inputElement.checked).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    });
    it('should ngModel change', fakeAsync(() => {
      testComponent.checked = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(
        checkbox.nativeElement.firstElementChild!.classList.contains('vts-checkbox-checked')
      ).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should disabled work', () => {
      fixture.detectChanges();
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(
        checkbox.nativeElement.firstElementChild!.classList.contains('vts-checkbox-checked')
      ).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      checkbox.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(
        checkbox.nativeElement.firstElementChild!.classList.contains('vts-checkbox-checked')
      ).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    });
    it('should indeterminate work', () => {
      fixture.detectChanges();
      testComponent.indeterminate = true;
      fixture.detectChanges();
      expect(
        checkbox.nativeElement.firstElementChild!.classList.contains('vts-checkbox-indeterminate')
      ).toBe(true);
      testComponent.checked = true;
      fixture.detectChanges();
      expect(
        checkbox.nativeElement.firstElementChild!.classList.contains('vts-checkbox-indeterminate')
      ).toBe(true);
    });
    it('should autofocus work', () => {
      fixture.detectChanges();
      testComponent.autoFocus = true;
      fixture.detectChanges();
      expect(
        checkbox.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name
      ).toBe('autofocus');
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(
        checkbox.nativeElement.querySelector('input').attributes.getNamedItem('autofocus')
      ).toBe(null);
    });
    it('should focus and blur function work', () => {
      fixture.detectChanges();
      expect(checkbox.nativeElement.querySelector('input') === document.activeElement).toBe(false);
      testComponent.vtsCheckboxComponent.focus();
      fixture.detectChanges();
      expect(checkbox.nativeElement.querySelector('input') === document.activeElement).toBe(true);
      testComponent.vtsCheckboxComponent.blur();
      fixture.detectChanges();
      expect(checkbox.nativeElement.querySelector('input') === document.activeElement).toBe(false);
    });
  });
  describe('checkbox group basic', () => {
    let fixture: ComponentFixture<VtsTestCheckboxGroupComponent>;
    let testComponent: VtsTestCheckboxGroupComponent;
    let checkboxGroup: DebugElement;
    let checkboxs: HTMLElement[];

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(VtsTestCheckboxGroupComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkboxGroup = fixture.debugElement.query(By.directive(VtsCheckboxGroupComponent));
      checkboxs = checkboxGroup.nativeElement.children;
    }));
    it('should className correct', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(checkboxGroup.nativeElement.classList).toContain('vts-checkbox-group');
      expect(checkboxs[0].firstElementChild!.classList).toContain('vts-checkbox-checked');
      expect(checkboxs[1].firstElementChild!.classList).toContain('vts-checkbox-disabled');
      expect(checkboxs[1].firstElementChild!.classList).not.toContain('vts-checkbox-checked');
      expect(checkboxs[2].firstElementChild!.classList).not.toContain('vts-checkbox-checked');
    }));
    it('should click correct', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      checkboxs[0].click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      expect(checkboxs[0].firstElementChild!.classList).not.toContain('vts-checkbox-checked');
    });
    it('should sub disabled work', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      checkboxs[1].click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      expect(checkboxs[1].firstElementChild!.classList).not.toContain('vts-checkbox-checked');
    });
    it('should all disabled work', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      fixture.detectChanges();
      checkboxs[2].click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      expect(checkboxs[2].firstElementChild!.classList).not.toContain('vts-checkbox-checked');
    });
    it('should ngModel work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.options[0].checked = false;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(checkboxs[0].firstElementChild!.classList).not.toContain('vts-checkbox-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
  });
  describe('checkbox form', () => {
    let fixture: ComponentFixture<VtsTestCheckboxFormComponent>;
    let testComponent: VtsTestCheckboxFormComponent;
    let checkbox: DebugElement;
    let inputElement: HTMLInputElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(VtsTestCheckboxFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(VtsCheckboxComponent));
      inputElement = checkbox.nativeElement.querySelector('input') as HTMLInputElement;
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('checkbox')!.value).toBe(false);
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('checkbox')!.value).toBe(true);
      testComponent.disable();
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('checkbox')!.value).toBe(true);
    }));
  });
  describe('checkbox group form', () => {
    let fixture: ComponentFixture<VtsTestCheckboxGroupFormComponent>;
    let testComponent: VtsTestCheckboxGroupFormComponent;
    let checkboxGroup: DebugElement;
    let inputElement: HTMLInputElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(VtsTestCheckboxGroupFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkboxGroup = fixture.debugElement.query(By.directive(VtsCheckboxGroupComponent));
      inputElement = checkboxGroup.nativeElement.querySelector('input') as HTMLInputElement;
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('checkboxGroup')!.valid).toBe(true);
      expect(testComponent.formGroup.get('checkboxGroup')!.pristine).toBe(true);
      expect(testComponent.formGroup.get('checkboxGroup')!.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(JSON.stringify(testComponent.formGroup.get('checkboxGroup')!.value)).toBe(
        JSON.stringify([
          { label: 'Apple', value: 'Apple', checked: true },
          { label: 'Pear', value: 'Pear', disabled: true },
          { label: 'Orange', value: 'Orange' }
        ])
      );
      inputElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(JSON.stringify(testComponent.formGroup.get('checkboxGroup')!.value)).toBe(
        JSON.stringify([
          { label: 'Apple', value: 'Apple', checked: false },
          { label: 'Pear', value: 'Pear', disabled: true },
          { label: 'Orange', value: 'Orange' }
        ])
      );
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(JSON.stringify(testComponent.formGroup.get('checkboxGroup')!.value)).toBe(
        JSON.stringify([
          { label: 'Apple', value: 'Apple', checked: false },
          { label: 'Pear', value: 'Pear', disabled: true },
          { label: 'Orange', value: 'Orange' }
        ])
      );
    }));
  });
  describe('checkbox wrapper', () => {
    let fixture: ComponentFixture<VtsTestCheckboxWrapperComponent>;
    let testComponent: VtsTestCheckboxWrapperComponent;
    let checkboxWrapper: DebugElement;
    let inputElement: HTMLInputElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(VtsTestCheckboxWrapperComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkboxWrapper = fixture.debugElement.query(By.directive(VtsCheckboxWrapperComponent));
      inputElement = checkboxWrapper.nativeElement.querySelector('input') as HTMLInputElement;
    }));
    it('should className correct', fakeAsync(() => {
      expect(checkboxWrapper.nativeElement.classList).toContain('vts-checkbox-group');
    }));
    it('should onChange correct', fakeAsync(() => {
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(testComponent.onChange).toHaveBeenCalledWith([]);
      expect(testComponent.onChange).toHaveBeenCalledTimes(1);
    }));
  });
  describe('RTL', () => {
    it('should single checkbox className correct on dir change', () => {
      const fixture = TestBed.createComponent(VtsTestCheckboxSingleRtlComponent);
      const checkbox = fixture.debugElement.query(By.directive(VtsCheckboxComponent));
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList).toContain('vts-checkbox-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList).not.toContain('vts-checkbox-rtl');
    });

    it('should group checkbox className correct on dir change', () => {
      const fixture = TestBed.createComponent(VtsTestCheckboxGroupRtlComponent);
      const checkbox = fixture.debugElement.query(By.directive(VtsCheckboxGroupComponent));
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList).toContain('vts-checkbox-group-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList).not.toContain('vts-checkbox-group-rtl');
    });
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-single-checkbox',
  template: `
    <label
      vts-checkbox
      [vtsDisabled]="disabled"
      [(ngModel)]="checked"
      [vtsAutoFocus]="autoFocus"
      [vtsIndeterminate]="indeterminate"
      (ngModelChange)="modelChange($event)"
    >
      Checkbox
    </label>
  `
})
export class VtsTestCheckboxSingleComponent {
  @ViewChild(VtsCheckboxComponent, { static: false })
  vtsCheckboxComponent!: VtsCheckboxComponent;
  disabled = false;
  autoFocus = false;
  checked = false;
  indeterminate = false;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-group-checkbox',
  template: `
    <vts-checkbox-group
      [vtsDisabled]="disabled"
      [ngModel]="options"
      (ngModelChange)="modelChange($event)"
    ></vts-checkbox-group>
  `
})
export class VtsTestCheckboxGroupComponent {
  options = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', disabled: true },
    { label: 'Orange', value: 'Orange' }
  ];
  disabled = false;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  template: `
    <vts-checkbox-wrapper (vtsOnChange)="onChange($event)">
      <div><label vts-checkbox vtsValue="A" [ngModel]="true">A</label></div>
      <div><label vts-checkbox vtsValue="B">B</label></div>
      <div><label vts-checkbox vtsValue="C">C</label></div>
      <div><label vts-checkbox vtsValue="D">D</label></div>
      <div><label vts-checkbox vtsValue="E">E</label></div>
    </vts-checkbox-wrapper>
  `
})
export class VtsTestCheckboxWrapperComponent {
  onChange = jasmine.createSpy('change callback');
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <label vts-checkbox formControlName="checkbox"></label>
    </form>
  `
})
export class VtsTestCheckboxFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      checkbox: [false]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <vts-checkbox-group formControlName="checkboxGroup"></vts-checkbox-group>
    </form>
  `
})
export class VtsTestCheckboxGroupFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      checkboxGroup: [
        [
          { label: 'Apple', value: 'Apple', checked: true },
          { label: 'Pear', value: 'Pear', disabled: true },
          { label: 'Orange', value: 'Orange' }
        ]
      ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-single-checkbox></vts-test-single-checkbox>
    </div>
  `
})
export class VtsTestCheckboxSingleRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-group-checkbox></vts-test-group-checkbox>
    </div>
  `
})
export class VtsTestCheckboxGroupRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
