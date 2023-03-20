import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { VtsRadioGroupComponent } from './radio-group.component';
import { VtsRadioComponent } from './radio.component';
import { VtsRadioModule } from './radio.module';

describe('radio', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsRadioModule, FormsModule, ReactiveFormsModule],
      declarations: [
        VtsTestRadioSingleComponent,
        VtsTestRadioButtonComponent,
        VtsTestRadioGroupComponent,
        VtsTestRadioFormComponent,
        VtsTestRadioGroupFormComponent,
        VtsTestRadioGroupDisabledComponent,
        VtsTestRadioGroupDisabledFormComponent,
        VtsTestRadioSingleRtlComponent,
        VtsTestRadioGroupRtlComponent,
        VtsTestRadioButtonRtlComponent
      ]
    });
    TestBed.compileComponents();
  }));
  describe('single radio basic', () => {
    let fixture: ComponentFixture<VtsTestRadioSingleComponent>;
    let testComponent: VtsTestRadioSingleComponent;
    let radio: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestRadioSingleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(VtsRadioComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(radio.nativeElement.classList).toContain('vts-radio-wrapper');
      expect(radio.nativeElement.firstElementChild!.classList).toContain('vts-radio');
      expect(radio.nativeElement.firstElementChild.lastElementChild.classList).toContain(
        'vts-radio-inner'
      );
    });
    it('should click work', fakeAsync(() => {
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('vts-radio-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radio.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).toContain('vts-radio-checked');
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      radio.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).toContain('vts-radio-checked');
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));
    it('should disabled work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('vts-radio-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radio.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('vts-radio-checked');
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should autofocus work', () => {
      fixture.detectChanges();
      testComponent.autoFocus = true;
      fixture.detectChanges();
      expect(
        radio.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name
      ).toBe('autofocus');
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input').attributes.getNamedItem('autofocus')).toBe(
        null
      );
    });
    it('should focus and blur function work', () => {
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input') === document.activeElement).toBe(false);
      testComponent.vtsRadioComponent.focus();
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input') === document.activeElement).toBe(true);
      testComponent.vtsRadioComponent.blur();
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input') === document.activeElement).toBe(false);
    });
  });
  describe('single radio button', () => {
    let fixture: ComponentFixture<VtsTestRadioButtonComponent>;
    let radio: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestRadioButtonComponent);
      fixture.detectChanges();
      radio = fixture.debugElement.query(By.directive(VtsRadioComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(radio.nativeElement.classList).toContain('vts-radio-button-wrapper');
      expect(radio.nativeElement.firstElementChild!.classList).toContain('vts-radio-button');
      expect(radio.nativeElement.firstElementChild.lastElementChild.classList).toContain(
        'vts-radio-button-inner'
      );
    });
  });

  describe('radio group', () => {
    let fixture: ComponentFixture<VtsTestRadioGroupComponent>;
    let testComponent: VtsTestRadioGroupComponent;
    let radios: DebugElement[];
    let radioGroup: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestRadioGroupComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(VtsRadioComponent));
      radioGroup = fixture.debugElement.query(By.directive(VtsRadioGroupComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(radioGroup.nativeElement.classList).toContain('vts-radio-group');
    });
    it('should click work', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[0].nativeElement.firstElementChild!.classList).not.toContain(
        'vts-radio-button-checked'
      );
      expect(radios[1].nativeElement.firstElementChild!.classList).toContain(
        'vts-radio-button-checked'
      );
      expect(testComponent.value).toBe('B');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe('B');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));
    it('should disable work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[1].nativeElement.firstElementChild!.classList).not.toContain(
        'vts-radio-button-checked'
      );
      expect(testComponent.value).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should name work', fakeAsync(() => {
      testComponent.name = 'test';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(
        radios.every(radio => radio.nativeElement.querySelector('input').name === 'test')
      ).toBe(true);
    }));
  });
  describe('radio group disabled', () => {
    let fixture: ComponentFixture<VtsTestRadioGroupDisabledComponent>;
    let testComponent: VtsTestRadioGroupDisabledComponent;
    let radios: DebugElement[];
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestRadioGroupDisabledComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(VtsRadioComponent));
    });
    it('should group disable work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[1].nativeElement.firstElementChild!.classList).not.toContain(
        'vts-radio-button-checked'
      );
      expect(testComponent.value).toBe('A');
    }));
    it('should single disable work', fakeAsync(() => {
      testComponent.disabled = false;
      fixture.detectChanges();
      testComponent.singleDisabled = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      radios[2].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[2].nativeElement.firstElementChild!.classList).not.toContain(
        'vts-radio-button-checked'
      );
      expect(testComponent.value).toBe('A');
    }));
  });
  describe('radio group solid', () => {
    let fixture: ComponentFixture<VtsTestRadioGroupSolidComponent>;
    let radioGroup: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestRadioGroupSolidComponent);
      fixture.detectChanges();
      radioGroup = fixture.debugElement.query(By.directive(VtsRadioGroupComponent));
      it('should support solid css', () => {
        fixture.detectChanges();
        expect(radioGroup.nativeElement.classList).toContain('vts-radio-group-solid');
      });
    });
  });
  describe('radio form', () => {
    let fixture: ComponentFixture<VtsTestRadioFormComponent>;
    let testComponent: VtsTestRadioFormComponent;
    let radio: DebugElement;
    let inputElement: HTMLElement;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(VtsTestRadioFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(VtsRadioComponent));
      inputElement = radio.nativeElement.querySelector('input') as HTMLInputElement;
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('radio')!.value).toBe(false);
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radio')!.value).toBe(true);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('radio')!.setValue(false);
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radio')!.value).toBe(false);
    }));
  });
  describe('radio group form', () => {
    let fixture: ComponentFixture<VtsTestRadioGroupFormComponent>;
    let testComponent: VtsTestRadioGroupFormComponent;
    let radios: DebugElement[];

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(VtsTestRadioGroupFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(VtsRadioComponent));
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('radioGroup')!.value).toBe('B');
      radios[0].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radioGroup')!.value).toBe('A');
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radioGroup')!.value).toBe('A');
    }));
  });
  describe('radio group disable form', () => {
    it('expect not to thrown error', fakeAsync(() => {
      expect(() => {
        const fixture = TestBed.createComponent(VtsTestRadioGroupDisabledFormComponent);
        fixture.detectChanges();
      }).not.toThrow();
    }));
  });
  describe('RTL', () => {
    it('should single radio className correct', () => {
      const fixture = TestBed.createComponent(VtsTestRadioSingleRtlComponent);
      const radio = fixture.debugElement.query(By.directive(VtsRadioComponent));
      fixture.detectChanges();
      expect(radio.nativeElement.className).toContain('vts-radio-wrapper-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(radio.nativeElement.className).not.toContain('vts-radio-wrapper-rtl');
    });

    it('should radio button className correct', () => {
      const fixture = TestBed.createComponent(VtsTestRadioButtonRtlComponent);
      const radio = fixture.debugElement.query(By.directive(VtsRadioComponent));
      fixture.detectChanges();
      expect(radio.nativeElement.className).toContain('vts-radio-button-wrapper-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(radio.nativeElement.className).not.toContain('vts-radio-button-wrapper-rtl');
    });

    it('should radio group className correct', () => {
      const fixture = TestBed.createComponent(VtsTestRadioGroupRtlComponent);
      const radioGroup = fixture.debugElement.query(By.directive(VtsRadioGroupComponent));
      fixture.detectChanges();
      expect(radioGroup.nativeElement.classList).toContain('vts-radio-group-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(radioGroup.nativeElement.className).not.toContain('vts-radio-group-rtl');
    });
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-radio-single',
  template: `
    <label
      vts-radio
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [vtsDisabled]="disabled"
      [vtsAutoFocus]="autoFocus"
    >
      Radio
    </label>
  `
})
export class VtsTestRadioSingleComponent {
  @ViewChild(VtsRadioComponent, { static: false })
  vtsRadioComponent!: VtsRadioComponent;
  value = false;
  autoFocus = false;
  disabled = false;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  template: `
    <label vts-radio-button>Radio</label>
  `
})
export class VtsTestRadioButtonComponent {}

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-radio-group',
  template: `
    <vts-radio-group
      [(ngModel)]="value"
      [vtsName]="name"
      [vtsDisabled]="disabled"
      (ngModelChange)="modelChange($event)"
      [vtsSize]="size"
    >
      <ng-container [ngClass]>
        <label vts-radio-button vtsValue="A">A</label>
        <label vts-radio-button vtsValue="B">B</label>
        <label vts-radio-button vtsValue="C">C</label>
        <label vts-radio-button vtsValue="D">D</label>
      </ng-container>
    </vts-radio-group>
  `
})
export class VtsTestRadioGroupComponent {
  size = 'default';
  value = 'A';
  disabled = false;
  name?: string;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <label vts-radio formControlName="radio"></label>
    </form>
  `
})
export class VtsTestRadioFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      radio: [false]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <vts-radio-group formControlName="radioGroup">
        <label vts-radio-button vtsValue="A">A</label>
        <label vts-radio-button vtsValue="B">B</label>
        <label vts-radio-button vtsValue="C">C</label>
        <label vts-radio-button vtsValue="D">D</label>
      </vts-radio-group>
    </form>
  `
})
export class VtsTestRadioGroupFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      radioGroup: ['B']
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1543 **/
/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1734 **/

@Component({
  template: `
    <vts-radio-group [(ngModel)]="value" [vtsName]="name" [vtsDisabled]="disabled" [vtsSize]="size">
      <label vts-radio-button vtsValue="A">A</label>
      <label vts-radio-button vtsValue="B">B</label>
      <label vts-radio-button vtsValue="C" [vtsDisabled]="singleDisabled">C</label>
      <label vts-radio-button vtsValue="D">D</label>
    </vts-radio-group>
  `
})
export class VtsTestRadioGroupDisabledComponent {
  size = 'default';
  value = 'A';
  disabled = false;
  name?: string;
  singleDisabled = false;
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1735 **/
@Component({
  template: `
    <form vts-form [formGroup]="validateForm">
      <vts-radio-group formControlName="radio">
        <label vts-radio *ngFor="let val of radioValues" [vtsValue]="val">
          {{ val }}
        </label>
      </vts-radio-group>
    </form>
  `
})
export class VtsTestRadioGroupDisabledFormComponent implements OnInit {
  validateForm?: UntypedFormGroup;
  radioValues = ['A', 'B', 'C', 'D'];

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      radio: [{ value: 'B', disabled: true }]
    });
  }
}

@Component({
  template: `
    <vts-radio-group [(ngModel)]="value" [vtsButtonStyle]="'solid'">
      <label vts-radio-button vtsValue="A">A</label>
      <label vts-radio-button vtsValue="B">B</label>
      <label vts-radio-button vtsValue="C" [vtsDisabled]="singleDisabled">C</label>
      <label vts-radio-button vtsValue="D">D</label>
    </vts-radio-group>
  `
})
export class VtsTestRadioGroupSolidComponent {
  value = 'A';
  singleDisabled = false;
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-radio-single></vts-test-radio-single>
    </div>
  `
})
export class VtsTestRadioSingleRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}

@Component({
  template: `
    <div [dir]="direction">
      <label vts-radio-button>Radio</label>
    </div>
  `
})
export class VtsTestRadioButtonRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-radio-group></vts-test-radio-group>
    </div>
  `
})
export class VtsTestRadioGroupRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
