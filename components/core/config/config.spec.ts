import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VtsButtonComponent, VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VTS_CONFIG } from './config';
import { VtsConfigService } from './config.service';

@Component({
  template: `
    <button vts-button vtsType="primary" [vtsSize]="size">Global Config</button>
  `
})
export class VtsGlobalConfigTestBasicComponent {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';

  constructor(public vtsConfigService: VtsConfigService) {}
}

describe('vts global config', () => {
  let fixture: ComponentFixture<VtsGlobalConfigTestBasicComponent>;
  let testComponent: VtsGlobalConfigTestBasicComponent;
  let button: DebugElement;
  let buttonEl: HTMLButtonElement;

  describe('without config', () => {
    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [VtsButtonModule],
          declarations: [VtsGlobalConfigTestBasicComponent]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsGlobalConfigTestBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      button = fixture.debugElement.query(By.directive(VtsButtonComponent));
      buttonEl = button.nativeElement;
    });

    it('should render with in-component props', () => {
      fixture.detectChanges();
      expect(buttonEl.className).toContain('vts-btn vts-btn-primary');

      testComponent.size = 'lg';
      fixture.detectChanges();
      expect(buttonEl.classList).toContain('vts-btn-lg');
    });
  });

  describe('with config', () => {
    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [VtsButtonModule],
          declarations: [VtsGlobalConfigTestBasicComponent],
          providers: [
            {
              provide: VTS_CONFIG,
              useValue: {
                button: {
                  vtsSize: 'large'
                }
              }
            }
          ]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsGlobalConfigTestBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      button = fixture.debugElement.query(By.directive(VtsButtonComponent));
      buttonEl = button.nativeElement;
    });

    it('should static config work', () => {
      fixture.detectChanges();
      expect(buttonEl.classList).toContain('vts-btn-lg');

      testComponent.size = 'md';
      fixture.detectChanges();
      expect(buttonEl.classList).not.toContain('vts-btn-lg');
    });

    it('should dynamic config work', () => {
      fixture.detectChanges();
      expect(buttonEl.classList).toContain('vts-btn-lg');

      testComponent.vtsConfigService.set('button', { vtsSize: 'small' });
      fixture.detectChanges();
      expect(buttonEl.classList).toContain('vts-btn-sm');

      testComponent.size = 'md';
      fixture.detectChanges();
      expect(buttonEl.classList).not.toContain('vts-btn-lg');
      expect(buttonEl.classList).not.toContain('vts-btn-sm');
    });

    // It would fail silently. User cannot input a component name wrong - TypeScript comes to help!
    // it('should raise error when the component with given name is not defined', () => {
    //   expect(() => {
    //     testComponent.vtsConfigService.set('vtsNotExist' as any, {}); // tslint:disable-line no-any
    //   }).toThrowError();
    // });
  });
});
