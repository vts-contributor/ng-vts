import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsAlertComponent } from './alert.component';
import { VtsAlertModule } from './alert.module';

describe('alert', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, VtsAlertModule, NoopAnimationsModule, VtsIconTestModule],
        declarations: [
          VtsDemoTestBasicComponent,
          VtsDemoTestBannerComponent,
          VtsTestAlertRtlComponent
        ]
      });
      TestBed.compileComponents();
    })
  );

  describe('basic alert', () => {
    let fixture: ComponentFixture<VtsDemoTestBasicComponent>;
    let testComponent: VtsDemoTestBasicComponent;
    let alert: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoTestBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      alert = fixture.debugElement.query(By.directive(VtsAlertComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.firstElementChild!.classList).toContain('vts-alert');
    });
    it('should banner work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.firstElementChild!.classList).not.toContain('vts-alert-banner');
      expect(alert.nativeElement.querySelector('.vts-alert').classList).toContain(`vts-alert-info`);
      expect(alert.nativeElement.querySelector('.vts-alert-icon')).toBeNull();
      testComponent.banner = true;
      fixture.detectChanges();
      expect(alert.nativeElement.firstElementChild!.classList).toContain('vts-alert-banner');
      expect(alert.nativeElement.querySelector('.vts-alert').classList).toContain(`vts-alert-info`);
      expect(alert.nativeElement.querySelector('.vts-alert-icon')).toBeNull();
    });
    it('should closeable work', fakeAsync(() => {
      testComponent.closeable = true;
      fixture.detectChanges();
      expect(testComponent.onClose).toHaveBeenCalledTimes(0);
      expect(alert.nativeElement.querySelector('.vtsicon-close')).toBeDefined();
      alert.nativeElement.querySelector('.vts-alert-close-icon').click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      alert = fixture.debugElement.query(By.directive(VtsAlertComponent));
      expect(alert.nativeElement.innerText).toBe('');
      expect(testComponent.onClose).toHaveBeenCalledTimes(1);
    }));
    it('should closeText work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert-close-icon')).toBeNull();
      testComponent.closeText = 'closeText';
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert-close-icon').innerText).toBe(
        'closeText'
      );
      testComponent.closeText = testComponent.template;
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert-close-icon').innerText).toBe('template');
    });
    it('should description work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert-description').innerText).toBe(
        'description'
      );
      testComponent.description = testComponent.template;
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert-description').innerText).toBe(
        'template'
      );
    });
    it('should message work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert-message').innerText).toBe('message');
      testComponent.message = testComponent.template;
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert-message').innerText).toBe('template');
    });
    it('should showIcon work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert-icon')).toBeNull();
      testComponent.showIcon = true;
      expect(alert.nativeElement.querySelector('.vts-alert-icon')).toBeDefined();
    });
    it('should iconType work', () => {
      fixture.detectChanges();
      testComponent.showIcon = true;
      testComponent.iconType = 'lock';
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert-icon').classList).toContain('vtsicon');
      expect(alert.nativeElement.querySelector('.vts-alert-icon').classList).toContain(
        'vtsicon-lock'
      );
    });
    it('should type work', () => {
      const listOfType = ['success', 'info', 'warning', 'error'];
      listOfType.forEach(type => {
        testComponent.type = type;
        fixture.detectChanges();
        expect(alert.nativeElement.querySelector('.vts-alert').classList).toContain(
          `vts-alert-${type}`
        );
      });
    });
  });
  describe('banner alert', () => {
    let fixture: ComponentFixture<VtsDemoTestBannerComponent>;
    let alert: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoTestBannerComponent);
      fixture.detectChanges();
      alert = fixture.debugElement.query(By.directive(VtsAlertComponent));
    });

    it('should banner work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.vts-alert').classList).toContain(
        `vts-alert-warning`
      );
      expect(alert.nativeElement.querySelector('.vts-alert-icon')).toBeDefined();
    });
  });
  describe('RTL', () => {
    it('should className correct on dir change', () => {
      const fixture = TestBed.createComponent(VtsTestAlertRtlComponent);
      const alert = fixture.debugElement.query(By.directive(VtsAlertComponent));
      fixture.detectChanges();
      expect(alert.nativeElement.firstElementChild!.classList).toContain('vts-alert-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(alert.nativeElement.firstElementChild!.classList).not.toContain('vts-alert-rtl');
    });
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-basic-alert',
  template: `
    <ng-template #template>template</ng-template>
    <vts-alert
      [vtsBanner]="banner"
      [vtsCloseable]="closeable"
      [vtsCloseText]="closeText"
      [vtsDescription]="description"
      [vtsMessage]="message"
      [vtsShowIcon]="showIcon"
      [vtsIconType]="iconType"
      [vtsType]="type"
      (vtsOnClose)="onClose($event)"
    ></vts-alert>
  `
})
export class VtsDemoTestBasicComponent {
  @ViewChild('template', { static: false }) template!: TemplateRef<void>;
  banner = false;
  closeable = false;
  closeText?: string | TemplateRef<void>;
  description: string | TemplateRef<void> = 'description';
  message: string | TemplateRef<void> = 'message';
  showIcon = false;
  iconType?: string;
  type = 'info';
  onClose = jasmine.createSpy('close callback');
}

@Component({
  template: `
    <vts-alert vtsBanner></vts-alert>
  `
})
export class VtsDemoTestBannerComponent {}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-basic-alert></vts-test-basic-alert>
    </div>
  `
})
export class VtsTestAlertRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
