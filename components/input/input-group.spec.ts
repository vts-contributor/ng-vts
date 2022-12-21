import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent } from '@ui-vts/ng-vts/core/testing';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsInputGroupComponent } from './input-group.component';
import { VtsInputModule } from './input.module';

describe('input-group', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsInputModule, FormsModule, ReactiveFormsModule, VtsIconTestModule],
      declarations: [
        VtsTestInputGroupAddonComponent,
        VtsTestInputGroupAffixComponent,
        VtsTestInputGroupMultipleComponent,
        VtsTestInputGroupColComponent,
        VtsTestInputGroupMixComponent
      ],
      providers: []
    }).compileComponents();
  }));
  describe('input group', () => {
    describe('addon', () => {
      let testComponent: VtsTestInputGroupAddonComponent;
      let fixture: ComponentFixture<VtsTestInputGroupAddonComponent>;
      let inputGroupElement: HTMLElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestInputGroupAddonComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(
          By.directive(VtsInputGroupComponent)
        ).nativeElement;
      });
      it('should not show addon without before and after content', () => {
        expect(inputGroupElement.firstElementChild!.classList).not.toContain('vts-input-group');
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input');
      });
      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input-group');
        expect(inputGroupElement.firstElementChild!.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild!.lastElementChild!.classList).toContain(
          'vts-input'
        );
        expect(
          (inputGroupElement.firstElementChild!.firstElementChild as HTMLElement).innerText
        ).toBe('before');
      });
      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input-group');
        expect(inputGroupElement.firstElementChild!.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild!.lastElementChild!.classList).toContain(
          'vts-input'
        );
        expect(
          (inputGroupElement.firstElementChild!.firstElementChild as HTMLElement).innerText
        ).toBe('beforeTemplate');
      });
      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input-group');
        expect(inputGroupElement.firstElementChild!.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild!.firstElementChild!.classList).toContain(
          'vts-input'
        );
        expect(
          (inputGroupElement.firstElementChild!.lastElementChild as HTMLElement).innerText
        ).toBe('after');
      });
      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input-group');
        expect(inputGroupElement.firstElementChild!.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild!.firstElementChild!.classList).toContain(
          'vts-input'
        );
        expect(
          (inputGroupElement.firstElementChild!.lastElementChild as HTMLElement).innerText
        ).toBe('afterTemplate');
      });
      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-group-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-group-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-group-wrapper-sm');
      });
    });
    describe('affix', () => {
      let fixture: ComponentFixture<VtsTestInputGroupAffixComponent>;
      let testComponent: VtsTestInputGroupAffixComponent;
      let inputGroupElement: HTMLElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestInputGroupAffixComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(
          By.directive(VtsInputGroupComponent)
        ).nativeElement;
      });

      it('should not show addon without before and after content', () => {
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input');
      });

      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input-prefix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.lastElementChild!.classList).toContain('vts-input');
        expect((inputGroupElement.firstElementChild as HTMLElement).innerText).toBe('before');
      });

      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input-prefix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.lastElementChild!.classList).toContain('vts-input');
        expect((inputGroupElement.firstElementChild as HTMLElement).innerText).toBe(
          'beforeTemplate'
        );
      });

      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputGroupElement.lastElementChild!.classList).toContain('vts-input-suffix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input');
        expect((inputGroupElement.lastElementChild as HTMLElement).innerText).toBe('after');
      });

      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.lastElementChild!.classList).toContain('vts-input-suffix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild!.classList).toContain('vts-input');
        expect((inputGroupElement.lastElementChild as HTMLElement).innerText).toBe('afterTemplate');
      });

      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-affix-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-affix-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-affix-wrapper-sm');
      });
      it('should disabled work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).not.toContain('vts-input-affix-wrapper-disabled');
        testComponent.disabled = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-affix-wrapper-disabled');
      });
      it('should focus work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).not.toContain('vts-input-affix-wrapper-focused');
        dispatchFakeEvent(inputGroupElement.querySelector('input')!, 'focus');
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-affix-wrapper-focused');
      });
    });
    describe('multiple', () => {
      let fixture: ComponentFixture<VtsTestInputGroupMultipleComponent>;
      let testComponent: VtsTestInputGroupMultipleComponent;
      let inputGroupElement: HTMLElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestInputGroupMultipleComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(
          By.directive(VtsInputGroupComponent)
        ).nativeElement;
      });
      it('should compact work', () => {
        expect(inputGroupElement.classList).not.toContain('vts-input-group-compact');
        testComponent.compact = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-group-compact');
      });
      it('should search work', () => {
        expect(inputGroupElement.classList).not.toContain('vts-input-search-enter-button');
        expect(inputGroupElement.classList).not.toContain('vts-input-search');
        testComponent.search = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-search-enter-button');
        expect(inputGroupElement.classList).toContain('vts-input-search');
      });
      it('should size work', () => {
        expect(inputGroupElement.classList).toContain('vts-input-group');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-group-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-group-sm');
      });
      it('should search size work', () => {
        testComponent.search = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-search');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-search-large');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('vts-input-search-sm');
      });
    });
    describe('col', () => {
      let fixture: ComponentFixture<VtsTestInputGroupColComponent>;
      let inputGroupElement: HTMLElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestInputGroupColComponent);
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(
          By.directive(VtsInputGroupComponent)
        ).nativeElement;
      });
      it('should compact work', () => {
        expect(inputGroupElement.classList).toContain('vts-input-group');
      });
    });
    describe('mix', () => {
      let fixture: ComponentFixture<VtsTestInputGroupMixComponent>;
      let inputGroupElement: HTMLElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(VtsTestInputGroupMixComponent);
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(
          By.directive(VtsInputGroupComponent)
        ).nativeElement;
      });
      it('should mix work', () => {
        expect(
          inputGroupElement.querySelector('.vts-input-affix-wrapper')!.nextElementSibling!.classList
        ).toContain('vts-input-group-addon');
      });
    });
  });
});

@Component({
  template: `
    <vts-input-group
      [vtsAddOnBefore]="beforeContent"
      [vtsAddOnAfter]="afterContent"
      [vtsSize]="size"
    >
      <input type="text" vts-input />
    </vts-input-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class VtsTestInputGroupAddonComponent {
  @ViewChild('beforeTemplate', { static: false })
  beforeTemplate!: TemplateRef<void>;
  @ViewChild('afterTemplate', { static: false })
  afterTemplate!: TemplateRef<void>;
  beforeContent?: string | TemplateRef<void>;
  afterContent?: string | TemplateRef<void>;
  size = 'default';
}

@Component({
  template: `
    <vts-input-group [vtsPrefix]="beforeContent" [vtsSuffix]="afterContent" [vtsSize]="size">
      <input type="text" vts-input [disabled]="disabled" />
    </vts-input-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class VtsTestInputGroupAffixComponent {
  @ViewChild('beforeTemplate', { static: false })
  beforeTemplate!: TemplateRef<void>;
  @ViewChild('afterTemplate', { static: false })
  afterTemplate!: TemplateRef<void>;
  beforeContent?: string | TemplateRef<void>;
  afterContent?: string | TemplateRef<void>;
  size = 'default';
  disabled = false;
}

@Component({
  template: `
    <vts-input-group [vtsCompact]="compact" [vtsSearch]="search" [vtsSize]="size">
      <input type="text" vts-input />
      <input type="text" vts-input />
    </vts-input-group>
  `
})
export class VtsTestInputGroupMultipleComponent {
  compact = false;
  search = false;
  size = 'default';
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1795 **/
@Component({
  template: `
    <vts-input-group vtsPrefixIcon="user" vtsAddOnAfter="@example.com">
      <input type="text" vts-input placeholder="邮箱地址" />
    </vts-input-group>
  `
})
export class VtsTestInputGroupMixComponent {}

@Component({
  template: `
    <vts-input-group>
      <div vts-col vtsSpan="4">
        <input type="text" vts-input [ngModel]="'0571'" />
      </div>
      <div vts-col vtsSpan="8">
        <input type="text" vts-input [ngModel]="'26888888'" />
      </div>
    </vts-input-group>
  `
})
export class VtsTestInputGroupColComponent {}
