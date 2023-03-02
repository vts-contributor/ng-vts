import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsInputDirective } from './input.directive';
import { VtsInputModule } from './input.module';

describe('input', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsInputModule, FormsModule, ReactiveFormsModule, VtsIconTestModule],
      declarations: [
        VtsTestInputWithInputComponent,
        VtsTestInputWithTextAreaComponent,
        VtsTestInputFormComponent
      ],
      providers: []
    }).compileComponents();
  }));
  describe('single input', () => {
    describe('input with input element', () => {
      let fixture: ComponentFixture<VtsTestInputWithInputComponent>;
      let testComponent: VtsTestInputWithInputComponent;
      let inputElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestInputWithInputComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(VtsInputDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('vts-input');
      });
      it('should disabled work', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).not.toContain('vts-input-disabled');
        testComponent.disabled = true;
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('vts-input-disabled');
      });
      it('should vtsSize work', () => {
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('vts-input');
        expect(inputElement.nativeElement.classList).toContain('vts-input-sm');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('vts-input');
        expect(inputElement.nativeElement.classList).toContain('vts-input-lg');
      });
    });

    describe('input with textarea element', () => {
      let fixture: ComponentFixture<VtsTestInputWithInputComponent>;
      let inputElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestInputWithInputComponent);
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(VtsInputDirective));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('vts-input');
      });
    });
  });

  describe('input form', () => {
    describe('input with form', () => {
      let fixture: ComponentFixture<VtsTestInputFormComponent>;
      let testComponent: VtsTestInputFormComponent;
      let inputElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestInputFormComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(VtsInputDirective));
      });
      it('should set disabled work', fakeAsync(() => {
        flush();
        expect(inputElement.nativeElement.attributes.getNamedItem('disabled')).toBeNull();
        testComponent.disable();
        flush();
        fixture.detectChanges();
        expect(inputElement.nativeElement.attributes.getNamedItem('disabled')).toBeDefined();
      }));
    });
  });
});

@Component({
  template: `
    <input vts-input [vtsSize]="size" [disabled]="disabled" />
  `
})
export class VtsTestInputWithInputComponent {
  size = 'default';
  disabled = false;
}

@Component({
  template: `
    <textarea vts-input></textarea>
  `
})
export class VtsTestInputWithTextAreaComponent {}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <input vts-input formControlName="input" />
    </form>
  `
})
export class VtsTestInputFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      input: ['abc']
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}
