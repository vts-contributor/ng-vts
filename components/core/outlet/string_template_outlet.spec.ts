import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ɵcreateComponentBed as createComponentBed } from '@ui-vts/ng-vts/core/testing';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsOutletModule } from './outlet.module';
import { VtsStringTemplateOutletDirective } from './string_template_outlet.directive';

describe('string template outlet', () => {
  describe('null', () => {
    it('should no error when null', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, {
        imports: [VtsOutletModule]
      });
      expect(testBed.nativeElement.innerText).toBe('TargetText');
    });
  });
  describe('outlet change', () => {
    it('should work when switch between null and string', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, {
        imports: [VtsOutletModule]
      });
      testBed.component.stringTemplateOutlet = 'String Testing';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String Testing');
      testBed.component.stringTemplateOutlet = null;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText');
    });
    it('should work when switch between null and template', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, {
        imports: [VtsOutletModule]
      });
      testBed.component.stringTemplateOutlet = testBed.component.stringTpl;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is');
      testBed.component.stringTemplateOutlet = null;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText');
    });
    it('should work when switch between string', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, {
        imports: [VtsOutletModule]
      });
      testBed.component.stringTemplateOutlet = 'String Testing';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String Testing');
      testBed.component.stringTemplateOutlet = 'String String';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String String');
    });
    it('should work when switch between string and template', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, {
        imports: [VtsOutletModule]
      });
      testBed.component.stringTemplateOutlet = 'String Testing';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String Testing');
      testBed.component.stringTemplateOutlet = testBed.component.stringTpl;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is');
      testBed.component.stringTemplateOutlet = 'String Testing';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String Testing');
    });
    it('should work when switch between template', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, {
        imports: [VtsOutletModule]
      });
      testBed.component.stringTemplateOutlet = testBed.component.stringTpl;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is');
      testBed.component.stringTemplateOutlet = testBed.component.emptyTpl;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText Empty Template');
    });
  });
  describe('context shape change', () => {
    it('should work when context shape change', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, {
        imports: [VtsOutletModule]
      });
      testBed.component.stringTemplateOutlet = testBed.component.dataTimeTpl;
      const spyOnUpdateContext = spyOn(
        testBed.component.vtsStringTemplateOutletDirective as VtsSafeAny,
        'updateContext'
      ).and.callThrough();
      const spyOnRecreateView = spyOn(
        testBed.component.vtsStringTemplateOutletDirective as VtsSafeAny,
        'recreateView'
      ).and.callThrough();
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is , The time is');
      testBed.component.context = { $implicit: 'data', time: 'time' };
      testBed.fixture.detectChanges();
      expect(spyOnUpdateContext).toHaveBeenCalledTimes(0);
      expect(spyOnRecreateView).toHaveBeenCalledTimes(2);
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is data, The time is time');
    });
  });
  describe('context data change', () => {
    it('should work when context implicit change', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, {
        imports: [VtsOutletModule]
      });
      testBed.component.stringTemplateOutlet = testBed.component.stringTpl;
      const spyOnUpdateContext = spyOn(
        testBed.component.vtsStringTemplateOutletDirective as VtsSafeAny,
        'updateContext'
      ).and.callThrough();
      const spyOnRecreateView = spyOn(
        testBed.component.vtsStringTemplateOutletDirective as VtsSafeAny,
        'recreateView'
      ).and.callThrough();
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is');
      testBed.component.context = { $implicit: 'data' };
      testBed.fixture.detectChanges();
      expect(spyOnUpdateContext).toHaveBeenCalledTimes(1);
      expect(spyOnRecreateView).toHaveBeenCalledTimes(1);
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is data');
    });
  });
});

@Component({
  template: `
    TargetText
    <ng-container
      *vtsStringTemplateOutlet="stringTemplateOutlet; context: context; let stringTemplateOutlet"
    >
      {{ stringTemplateOutlet }}
    </ng-container>
    <ng-template #stringTpl let-data>The data is {{ data }}</ng-template>
    <ng-template #emptyTpl>Empty Template</ng-template>
    <ng-template #dataTimeTpl let-data let-time="time">
      The data is {{ data }}, The time is {{ time }}
    </ng-template>
  `
})
export class StringTemplateOutletTestComponent {
  @ViewChild('stringTpl') stringTpl!: TemplateRef<VtsSafeAny>;
  @ViewChild('emptyTpl') emptyTpl!: TemplateRef<VtsSafeAny>;
  @ViewChild('dataTimeTpl') dataTimeTpl!: TemplateRef<VtsSafeAny>;
  @ViewChild(VtsStringTemplateOutletDirective)
  vtsStringTemplateOutletDirective!: VtsStringTemplateOutletDirective;
  stringTemplateOutlet: TemplateRef<VtsSafeAny> | string | null = null;
  context: VtsSafeAny = { $implicit: '' };
}
