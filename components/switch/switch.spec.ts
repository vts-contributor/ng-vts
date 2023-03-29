import { BidiModule, Dir } from '@angular/cdk/bidi';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchKeyboardEvent } from '@ui-vts/ng-vts/core/testing';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsSwitchComponent } from './switch.component';
import { VtsSwitchModule } from './switch.module';

describe('switch', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsSwitchModule, FormsModule, ReactiveFormsModule, VtsIconTestModule],
      declarations: [
        VtsTestSwitchBasicComponent,
        VtsTestSwitchFormComponent,
        VtsTestSwitchTemplateComponent,
        VtsTestSwitchRtlComponent
      ]
    });
    TestBed.compileComponents();
  }));
  describe('basic switch', () => {
    let fixture: ComponentFixture<VtsTestSwitchBasicComponent>;
    let testComponent: VtsTestSwitchBasicComponent;
    let switchElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestSwitchBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      switchElement = fixture.debugElement.query(By.directive(VtsSwitchComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('vts-switch');
    });
    it('should ngModel work', fakeAsync(() => {
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).not.toContain(
        'vts-switch-checked'
      );
      expect(testComponent.value).toBe(false);
      testComponent.value = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain(
        'vts-switch-checked'
      );
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should click work', fakeAsync(() => {
      expect(testComponent.value).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      testComponent.control = true;
      fixture.detectChanges();
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
    }));
    it('should disable work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should loading work', fakeAsync(() => {
      testComponent.loading = true;
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain(
        'vts-switch-loading'
      );
      expect(testComponent.value).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should size work', () => {
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain(
        'vts-switch-small'
      );
    });
    it('should key down work', () => {
      expect(testComponent.value).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      expect(testComponent.value).toBe(true);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', LEFT_ARROW);

      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', SPACE);
      fixture.detectChanges();
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control = true;
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control = false;
      testComponent.loading = true;
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control = false;
      testComponent.loading = false;
      testComponent.disabled = true;
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
    });
    it('should children work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.querySelector('.vts-switch-inner').innerText).toBe('off');
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.querySelector('.vts-switch-inner').innerText).toBe('on');
    }));
    it('should focus and blur function work', () => {
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild === document.activeElement).toBe(false);
      testComponent.vtsSwitchComponent.focus();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild === document.activeElement).toBe(true);
      testComponent.vtsSwitchComponent.blur();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild === document.activeElement).toBe(false);
    });
  });
  describe('template switch', () => {
    let fixture: ComponentFixture<VtsTestSwitchTemplateComponent>;
    let switchElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestSwitchTemplateComponent);
      fixture.detectChanges();
      switchElement = fixture.debugElement.query(By.directive(VtsSwitchComponent));
    });
    it('should children template work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(
        switchElement.nativeElement.querySelector('.vts-switch-inner').firstElementChild!.classList
      ).toContain('vtsicon-close');
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(
        switchElement.nativeElement.querySelector('.vts-switch-inner').firstElementChild!.classList
      ).toContain('vtsicon-check');
    }));
  });
  describe('switch form', () => {
    let fixture: ComponentFixture<VtsTestSwitchFormComponent>;
    let testComponent: VtsTestSwitchFormComponent;
    let switchElement: DebugElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(VtsTestSwitchFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      switchElement = fixture.debugElement.query(By.directive(VtsSwitchComponent));
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('switchValue')!.value).toBe(true);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('switchValue')!.value).toBe(false);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('switchValue')!.setValue(true);
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('switchValue')!.value).toBe(true);
    }));
  });
  describe('RTL', () => {
    it('should className correct on dir change', () => {
      const fixture = TestBed.createComponent(VtsTestSwitchRtlComponent);
      const switchElement = fixture.debugElement.query(By.directive(VtsSwitchComponent));
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('vts-switch-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).not.toContain(
        'vts-switch-rtl'
      );
    });
  });
});

@Component({
  template: `
    <ng-template #checkedChildrenTemplate>
      <i vts-icon vtsType="check"></i>
    </ng-template>
    <ng-template #unCheckedChildrenTemplate>
      <i vts-icon vtsType="closs"></i>
    </ng-template>
    <vts-switch
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [vtsDisabled]="disabled"
      [vtsLoading]="loading"
      [vtsSize]="size"
      [vtsControl]="control"
      [vtsCheckedChildren]="checkedChildren"
      [vtsUnCheckedChildren]="unCheckedChildren"
    ></vts-switch>
  `
})
export class VtsTestSwitchBasicComponent {
  @ViewChild(VtsSwitchComponent, { static: false })
  vtsSwitchComponent!: VtsSwitchComponent;
  @ViewChild('checkedChildrenTemplate', { static: false })
  checkedChildrenTemplate!: TemplateRef<void>;
  @ViewChild('unCheckedChildrenTemplate', { static: false })
  unCheckedChildrenTemplate!: TemplateRef<void>;
  checkedChildren = 'on';
  unCheckedChildren = 'off';
  value = false;
  control = false;
  disabled = false;
  size = 'default';
  loading = false;
  modelChange = jasmine.createSpy('model change callback');
}

@Component({
  template: `
    <ng-template #checkedChildrenTemplate>
      <i vts-icon vtsType="check"></i>
    </ng-template>
    <ng-template #unCheckedChildrenTemplate>
      <i vts-icon vtsType="Close"></i>
    </ng-template>
    <vts-switch
      [vtsCheckedChildren]="checkedChildrenTemplate"
      [vtsUnCheckedChildren]="unCheckedChildrenTemplate"
    ></vts-switch>
  `
})
export class VtsTestSwitchTemplateComponent {}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <vts-switch formControlName="switchValue"></vts-switch>
    </form>
  `
})
export class VtsTestSwitchFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      switchValue: [true]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-switch [(ngModel)]="switchValue"></vts-switch>
    </div>
  `
})
export class VtsTestSwitchRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
  switchValue = false;
}
